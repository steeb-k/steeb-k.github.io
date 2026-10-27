#!/usr/bin/env node
// Validates data/objectives.js, data/domain*.js and data/pbq.js. Exit 0 = OK.
// Usage: node tests/validate-bank.js [--quiet] [--min-per-domain N] [--min-pbq N] [file ...]
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const args = process.argv.slice(2);
const quiet = args.includes('--quiet');
const argVal = (flag, def) => { const i = args.indexOf(flag); return i >= 0 ? Number(args[i + 1]) : def; };
const MIN_PER_DOMAIN = argVal('--min-per-domain', 95);
const MIN_PBQ = argVal('--min-pbq', 18);
const MIN_PER_OBJECTIVE = argVal('--min-per-objective', 3);
const explicitFiles = args.filter(a => a.endsWith('.js') && !a.startsWith('--'));

const root = path.resolve(__dirname, '..');
const dataDir = path.join(root, 'data');
const sandbox = { window: {} };
vm.createContext(sandbox);

function load(file) {
  const code = fs.readFileSync(file, 'utf8');
  try { vm.runInContext(code, sandbox, { filename: file }); }
  catch (e) { fail(`${path.relative(root, file)} failed to parse/run: ${e.message}`); throw e; }
}

const errors = [];
const warnings = [];
const fail = m => errors.push(m);
const warn = m => warnings.push(m);

load(path.join(dataDir, 'objectives.js'));
const files = explicitFiles.length
  ? explicitFiles.map(f => path.resolve(f))
  : fs.readdirSync(dataDir).filter(f => /^(domain\d|pbq)\.js$/.test(f)).sort().map(f => path.join(dataDir, f));
for (const f of files) { try { load(f); } catch (_) { /* recorded */ } }

const OBJ = sandbox.window.SEC_OBJECTIVES;
const BANK = sandbox.window.SEC_BANK || [];
const PBQ = sandbox.window.SEC_PBQ || [];
const validObjectives = new Set();
for (const d of Object.keys(OBJ)) for (const o of Object.keys(OBJ[d].objectives)) validObjectives.add(o);

const norm = s => String(s).toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
const ids = new Set();
const stems = new Map();
const perDomain = {};
const perObjective = {};
const perDomainMulti = {};
const perDomainDiff = {};

BANK.forEach((q, i) => {
  const where = `MCQ[${i}] id=${q && q.id}`;
  if (!q || typeof q !== 'object') return fail(`${where}: not an object`);
  if (!/^d[1-5]-\d{3}$/.test(q.id || '')) fail(`${where}: bad id format`);
  if (ids.has(q.id)) fail(`${where}: duplicate id`); ids.add(q.id);
  if (![1, 2, 3, 4, 5].includes(q.domain)) fail(`${where}: bad domain`);
  if (q.id && q.domain && !q.id.startsWith(`d${q.domain}-`)) fail(`${where}: id/domain mismatch`);
  if (!validObjectives.has(q.objective)) fail(`${where}: unknown objective ${q.objective}`);
  if (q.objective && q.domain && !q.objective.startsWith(`${q.domain}.`)) fail(`${where}: objective ${q.objective} not in domain ${q.domain}`);
  if (!['single', 'multi'].includes(q.type)) fail(`${where}: bad type`);
  if (typeof q.question !== 'string' || q.question.trim().length < 20) fail(`${where}: stem too short`);
  if (!Array.isArray(q.options) || q.options.length < 4 || q.options.length > 6) fail(`${where}: need 4–6 options`);
  else {
    q.options.forEach((o, k) => { if (typeof o !== 'string' || !o.trim()) fail(`${where}: option ${k} empty`); if (/^[A-F][.)]\s/.test(o)) fail(`${where}: option ${k} has letter prefix`); });
    const lower = q.options.map(o => norm(o));
    if (new Set(lower).size !== lower.length) fail(`${where}: duplicate options`);
    if (lower.some(o => /^(all|none) of the above$/.test(o) || /^both /.test(o))) fail(`${where}: forbidden option style`);
  }
  if (!Array.isArray(q.answer) || !q.answer.length) fail(`${where}: answer must be a non-empty array`);
  else {
    if (q.answer.some(a => !Number.isInteger(a) || a < 0 || a >= (q.options || []).length)) fail(`${where}: answer index out of range`);
    if (new Set(q.answer).size !== q.answer.length) fail(`${where}: duplicate answer indexes`);
    if (q.type === 'single' && q.answer.length !== 1) fail(`${where}: single must have exactly 1 answer`);
    if (q.type === 'multi') {
      if (q.answer.length < 2 || q.answer.length > 3) fail(`${where}: multi must have 2–3 answers`);
      const want = q.answer.length === 2 ? 'Choose TWO.' : 'Choose THREE.';
      if (!q.question.includes(want)) fail(`${where}: multi stem must contain "${want}"`);
      if (q.options.length < q.answer.length + 2) fail(`${where}: multi needs at least ${q.answer.length + 2} options`);
    } else if (/Choose (TWO|THREE)/.test(q.question)) fail(`${where}: single stem says Choose TWO/THREE`);
  }
  if (typeof q.explanation !== 'string' || q.explanation.trim().length < 60) fail(`${where}: explanation < 60 chars`);
  if (![1, 2, 3].includes(q.difficulty)) fail(`${where}: difficulty must be 1–3`);
  if (!Array.isArray(q.tags) || q.tags.length < 1 || q.tags.length > 4) fail(`${where}: 1–4 tags required`);
  const s = norm(q.question);
  if (stems.has(s)) fail(`${where}: duplicate stem of ${stems.get(s)}`); else stems.set(s, q.id);
  perDomain[q.domain] = (perDomain[q.domain] || 0) + 1;
  perObjective[q.objective] = (perObjective[q.objective] || 0) + 1;
  if (q.type === 'multi') perDomainMulti[q.domain] = (perDomainMulti[q.domain] || 0) + 1;
  perDomainDiff[q.domain] = perDomainDiff[q.domain] || { 1: 0, 2: 0, 3: 0 };
  perDomainDiff[q.domain][q.difficulty]++;
});

// Which domains are present (so partial validation of one file still works)
const domainsPresent = new Set(BANK.map(q => q.domain));
for (const d of domainsPresent) {
  if (perDomain[d] < MIN_PER_DOMAIN) fail(`domain ${d}: only ${perDomain[d]} MCQs (need ≥ ${MIN_PER_DOMAIN})`);
  const multi = perDomainMulti[d] || 0;
  if (multi < Math.floor(perDomain[d] * 0.08)) warn(`domain ${d}: only ${multi} multi-select (aim ~15%)`);
  if (multi > Math.ceil(perDomain[d] * 0.25)) warn(`domain ${d}: ${multi} multi-select (aim ~15%)`);
  for (const o of Object.keys(OBJ[d].objectives)) {
    const n = perObjective[o] || 0;
    if (n < MIN_PER_OBJECTIVE) fail(`objective ${o}: only ${n} MCQs (need ≥ ${MIN_PER_OBJECTIVE})`);
  }
  const diff = perDomainDiff[d];
  if (diff && diff[1] / perDomain[d] > 0.45) warn(`domain ${d}: ${diff[1]} easy questions — too many recall items`);
}

// PBQs
const pbqIds = new Set();
const pbqPerDomain = {};
const pbqPerType = { match: 0, order: 0, config: 0 };
PBQ.forEach((p, i) => {
  const where = `PBQ[${i}] id=${p && p.id}`;
  if (!p || typeof p !== 'object') return fail(`${where}: not an object`);
  if (!/^pbq-\d{3}$/.test(p.id || '')) fail(`${where}: bad id format`);
  if (pbqIds.has(p.id)) fail(`${where}: duplicate id`); pbqIds.add(p.id);
  if (![1, 2, 3, 4, 5].includes(p.domain)) fail(`${where}: bad domain`);
  if (!validObjectives.has(p.objective) || !String(p.objective).startsWith(`${p.domain}.`)) fail(`${where}: bad objective`);
  if (typeof p.title !== 'string' || !p.title.trim()) fail(`${where}: title required`);
  if (typeof p.instructions !== 'string' || p.instructions.length < 20) fail(`${where}: instructions too short`);
  if (typeof p.explanation !== 'string' || p.explanation.length < 40) fail(`${where}: explanation too short`);
  if (!['match', 'order', 'config'].includes(p.type)) return fail(`${where}: bad type`);
  pbqPerType[p.type]++;
  pbqPerDomain[p.domain] = (pbqPerDomain[p.domain] || 0) + 1;
  if (p.type === 'match') {
    if (!Array.isArray(p.left) || p.left.length < 3) fail(`${where}: match needs ≥ 3 left items`);
    if (!Array.isArray(p.right) || p.right.length < 3) fail(`${where}: match needs ≥ 3 right options`);
    if (!Array.isArray(p.answer) || p.answer.length !== (p.left || []).length) fail(`${where}: answer length must equal left length`);
    else if (p.answer.some(a => !Number.isInteger(a) || a < 0 || a >= p.right.length)) fail(`${where}: answer indexes right`);
    else if (p.unique && new Set(p.answer).size !== p.answer.length) fail(`${where}: unique:true but answers repeat`);
    if (p.right && new Set(p.right.map(norm)).size !== p.right.length) fail(`${where}: duplicate right options`);
  } else if (p.type === 'order') {
    if (!Array.isArray(p.items) || p.items.length < 3) fail(`${where}: order needs ≥ 3 items`);
    const n = (p.items || []).length;
    if (!Array.isArray(p.answer) || p.answer.length !== n || [...p.answer].sort((a, b) => a - b).join() !== [...Array(n).keys()].join())
      fail(`${where}: answer must be a permutation of 0..${n - 1}`);
  } else if (p.type === 'config') {
    if (!Array.isArray(p.columns) || !p.columns.length) fail(`${where}: columns required`);
    const cols = {};
    (p.columns || []).forEach((c, k) => {
      if (!c.key || !c.label || !Array.isArray(c.choices) || c.choices.length < 2) fail(`${where}: column ${k} malformed`);
      cols[c.key] = new Set((c.choices || []).map(String));
    });
    if (!Array.isArray(p.rows) || !p.rows.length) fail(`${where}: rows required`);
    let scorable = 0;
    (p.rows || []).forEach((r, k) => {
      if (!r.label) fail(`${where}: row ${k} needs label`);
      const fixed = r.fixed || {};
      const ans = r.answer || {};
      for (const key of Object.keys(ans)) {
        if (!cols[key]) fail(`${where}: row ${k} answer key ${key} not a column`);
        else if (!cols[key].has(String(ans[key]))) fail(`${where}: row ${k} answer ${key}=${ans[key]} not in choices`);
        if (key in fixed) fail(`${where}: row ${k} key ${key} is both fixed and answer`);
        scorable++;
      }
      for (const key of Object.keys(fixed)) if (!cols[key]) fail(`${where}: row ${k} fixed key ${key} not a column`);
      for (const key of Object.keys(cols)) if (!(key in fixed) && !(key in ans)) fail(`${where}: row ${k} column ${key} neither fixed nor answer`);
    });
    if (scorable < 2) fail(`${where}: config needs ≥ 2 scorable cells`);
  }
});
if (PBQ.length) {
  if (PBQ.length < MIN_PBQ) fail(`only ${PBQ.length} PBQs (need ≥ ${MIN_PBQ})`);
  for (const d of [1, 2, 3, 4, 5]) if ((pbqPerDomain[d] || 0) < 3) fail(`domain ${d}: only ${pbqPerDomain[d] || 0} PBQs (need ≥ 3)`);
  for (const t of Object.keys(pbqPerType)) if (pbqPerType[t] < 5) warn(`PBQ type ${t}: only ${pbqPerType[t]} (aim ≥ 5)`);
}

if (!quiet) {
  console.log('MCQ per domain:', perDomain, ' total', BANK.length);
  console.log('MCQ per objective:', perObjective);
  console.log('Multi per domain:', perDomainMulti, ' difficulty:', perDomainDiff);
  console.log('PBQ total', PBQ.length, 'per domain', pbqPerDomain, 'per type', pbqPerType);
  for (const w of warnings) console.log('WARN', w);
}
if (errors.length) {
  for (const e of errors) console.error('ERROR', e);
  console.error(`\n${errors.length} error(s)`);
  process.exit(1);
}
console.log(`OK — ${BANK.length} MCQs, ${PBQ.length} PBQs, ${warnings.length} warning(s)`);
