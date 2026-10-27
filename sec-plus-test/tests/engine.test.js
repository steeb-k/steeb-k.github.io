#!/usr/bin/env node
'use strict';
const assert = require('assert');
const E = require('../js/engine.js');
let n = 0;
function t(name, fn) { try { fn(); n++; console.log('ok   ' + name); } catch (e) { console.error('FAIL ' + name + '\n  ' + e.message); process.exitCode = 1; } }

const EXAM = { pbqCount: 5, mcqPerDomain: { 1: 10, 2: 19, 3: 15, 4: 24, 5: 17 }, minutes: 90, passScaled: 750 };
const bank = [];
for (let d = 1; d <= 5; d++) for (let i = 1; i <= 100; i++)
  bank.push({ id: `d${d}-${String(i).padStart(3, '0')}`, domain: d, objective: `${d}.${1 + (i % 3)}`, type: i % 10 === 0 ? 'multi' : 'single',
    question: 'q' + i, options: ['a', 'b', 'c', 'd', 'e'], answer: i % 10 === 0 ? [0, 2] : [1], explanation: 'x' });
const pbq = [];
for (let i = 1; i <= 20; i++) {
  const d = 1 + (i % 5), type = ['match', 'order', 'config'][i % 3];
  const base = { id: 'pbq-' + String(i).padStart(3, '0'), domain: d, objective: `${d}.${1 + (i % 4)}`, type, title: 't', instructions: 'i', explanation: 'x' };
  if (type === 'match') Object.assign(base, { left: ['l1', 'l2', 'l3', 'l4'], right: ['r1', 'r2', 'r3', 'r4'], answer: [0, 1, 2, 3] });
  if (type === 'order') Object.assign(base, { items: ['a', 'b', 'c', 'd'], answer: [2, 0, 3, 1] });
  if (type === 'config') Object.assign(base, { columns: [{ key: 'x', label: 'X', choices: ['p', 'q'] }, { key: 'y', label: 'Y', choices: ['p', 'q'] }],
    rows: [{ label: 'r1', fixed: {}, answer: { x: 'p', y: 'q' } }, { label: 'r2', fixed: { y: 'p' }, answer: { x: 'q' } }] });
  pbq.push(base);
}
const byId = {}; bank.concat(pbq).forEach(q => byId[q.id] = q);
const uniq = a => new Set(a).size === a.length;

t('final composition: 5 PBQ first then 85 MCQ with exact per-domain counts', () => {
  const ids = E.buildSession({ type: 'final', bank, pbq, qstats: {}, exam: EXAM, rng: E.makeRng('f1') });
  assert.strictEqual(ids.length, 90);
  assert(uniq(ids));
  ids.slice(0, 5).forEach(id => assert(id.startsWith('pbq-'), id));
  const mc = ids.slice(5);
  mc.forEach(id => assert(id.startsWith('d'), id));
  const c = {}; mc.forEach(id => { const d = byId[id].domain; c[d] = (c[d] || 0) + 1; });
  assert.deepStrictEqual(c, { 1: 10, 2: 19, 3: 15, 4: 24, 5: 17 });
});
t('final PBQs spread over domains and objectives', () => {
  for (let s = 0; s < 20; s++) {
    const ids = E.buildSession({ type: 'final', bank, pbq, qstats: {}, exam: EXAM, rng: E.makeRng('sp' + s) }).slice(0, 5);
    assert.strictEqual(new Set(ids.map(i => byId[i].domain)).size, 5, 'domains ' + ids);
    assert(uniq(ids.map(i => byId[i].objective)));
  }
});
t('module draw size, domain, and no duplicates', () => {
  [10, 25, 50].forEach(cnt => {
    const ids = E.buildSession({ type: 'module', domain: 3, count: cnt, includePBQs: false, bank, pbq, qstats: {}, rng: E.makeRng('m' + cnt) });
    assert.strictEqual(ids.length, cnt); assert(uniq(ids));
    ids.forEach(id => assert.strictEqual(byId[id].domain, 3));
  });
  const all = E.buildSession({ type: 'module', domain: 2, count: 'all', includePBQs: false, bank, pbq, qstats: {}, rng: E.makeRng('a') });
  assert.strictEqual(all.length, 100);
  const withP = E.buildSession({ type: 'module', domain: 2, count: 10, includePBQs: true, bank, pbq, qstats: {}, rng: E.makeRng('p') });
  assert(withP.length > 10 && withP.length <= 12); assert(uniq(withP));
});
t('least-seen preference', () => {
  const qs = {};
  bank.filter(q => q.domain === 1).forEach((q, i) => { qs[q.id] = { seen: i < 60 ? 3 : 0 }; });
  for (let s = 0; s < 10; s++) {
    const ids = E.buildSession({ type: 'module', domain: 1, count: 40, includePBQs: false, bank, pbq, qstats: qs, rng: E.makeRng('ls' + s) });
    ids.forEach(id => assert.strictEqual((qs[id] || {}).seen || 0, 0, id + ' was seen'));
  }
  const ids = E.buildSession({ type: 'module', domain: 1, count: 50, includePBQs: false, bank, pbq, qstats: qs, rng: E.makeRng('x') });
  assert.strictEqual(ids.filter(id => qs[id].seen === 0).length, 40);
});
t('random tie-break varies between seeds', () => {
  const a = E.buildSession({ type: 'module', domain: 4, count: 10, bank, pbq, qstats: {}, rng: E.makeRng('s1') }).join();
  const b = E.buildSession({ type: 'module', domain: 4, count: 10, bank, pbq, qstats: {}, rng: E.makeRng('s2') }).join();
  assert.notStrictEqual(a, b);
});
t('option shuffle deterministic per attempt+question, valid permutation', () => {
  const q = bank[0];
  const a = E.optionOrder(q, 'att1'), b = E.optionOrder(q, 'att1');
  assert.deepStrictEqual(a, b);
  assert.deepStrictEqual(a.slice().sort(), [0, 1, 2, 3, 4]);
  const diff = ['att2', 'att3', 'att4', 'att5', 'att6'].some(x => E.optionOrder(q, x).join() !== a.join());
  assert(diff, 'different seeds should differ');
  const r1 = E.makeRng('z'), r2 = E.makeRng('z');
  assert.strictEqual(r1(), r2());
});
t('order PBQ start is never the solution', () => {
  pbq.filter(q => q.type === 'order').forEach(q => { for (let i = 0; i < 30; i++) assert.notDeepStrictEqual(E.orderStart(q, 'a' + i), q.answer); });
});
t('MCQ scoring single and multi (exact set, no partial)', () => {
  const s = bank.find(q => q.type === 'single'), m = bank.find(q => q.type === 'multi');
  assert.strictEqual(E.scoreQuestion(s, [1]).points, 1);
  assert.strictEqual(E.scoreQuestion(s, [0]).points, 0);
  assert.strictEqual(E.scoreQuestion(s, undefined).points, 0);
  assert.strictEqual(E.scoreQuestion(m, [2, 0]).points, 1);
  assert.strictEqual(E.scoreQuestion(m, [0]).points, 0);
  assert.strictEqual(E.scoreQuestion(m, [0, 2, 3]).points, 0);
});
t('PBQ partial credit', () => {
  const m = pbq.find(q => q.type === 'match'), o = pbq.find(q => q.type === 'order'), c = pbq.find(q => q.type === 'config');
  assert.strictEqual(E.scoreQuestion(m, [0, 1, 2, 3]).points, 1);
  assert.strictEqual(E.scoreQuestion(m, [0, 1, 0, null]).points, 0.5);
  assert.strictEqual(E.scoreQuestion(m, [0, 1, 0, null]).correct, false);
  assert.strictEqual(E.scoreQuestion(o, [2, 0, 3, 1]).points, 1);
  assert.strictEqual(E.scoreQuestion(o, [2, 0, 1, 3]).points, 0.5);
  assert.strictEqual(E.scoreQuestion(c, { 0: { x: 'p', y: 'q' }, 1: { x: 'q' } }).points, 1);
  assert.strictEqual(E.scoreQuestion(c, { 0: { x: 'p', y: 'p' }, 1: { x: 'q' } }).points, 2 / 3);
  assert.strictEqual(E.scoreQuestion(c, undefined).points, 0);
});
t('scaled score and pass threshold', () => {
  assert.strictEqual(E.scaled(0), 100); assert.strictEqual(E.scaled(1), 900);
  assert.strictEqual(E.scaled(0.8125), 750); assert(E.passed(750)); assert(!E.passed(749));
  assert(E.scaled(0.81) < 750);
  const qs = bank.filter(q => q.type === 'single').slice(0, 16), ans = {};
  qs.slice(0, 13).forEach(q => ans[q.id] = [1]);                   // 13/16 = 0.8125
  const r = E.scoreSession(qs, ans, 750);
  assert.strictEqual(r.scaled, 750); assert.strictEqual(r.pass, true);
  qs.slice(0, 12).forEach(q => ans[q.id] = [1]); ans[qs[12].id] = [0];
  const r2 = E.scoreSession(qs, ans, 750);
  assert.strictEqual(r2.pass, false); assert.strictEqual(r2.total, 16);
});
t('scoreSession aggregates per domain/objective incl. PBQ equivalent', () => {
  const m = pbq.find(q => q.type === 'match'), s = bank.find(q => q.domain === m.domain);
  const r = E.scoreSession([m, s], { [m.id]: [0, 1, 0, 0], [s.id]: s.answer }, 750);
  assert.strictEqual(r.total, 2); assert.strictEqual(r.points, 1.5); assert.strictEqual(r.perDomain[m.domain].count, 2);
  assert.strictEqual(E.weakestObjectives(r.perObjective, 5)[0].pct <= 1, true);
});
t('qstats update and drill (missed) selection', () => {
  const qs = {};
  E.applyStats(qs, [{ id: 'd1-001', correct: false, answered: true }, { id: 'd1-002', correct: true, answered: true }, { id: 'd1-003', correct: false, answered: false }], 5);
  assert.deepStrictEqual(qs['d1-001'], { seen: 1, correct: 0, wrong: 1, lastCorrect: false, lastAt: 5 });
  assert(!qs['d1-003']);
  assert.deepStrictEqual(E.missedIds(bank, qs), ['d1-001']);
  const ids = E.buildSession({ type: 'drill', count: 'all', bank, pbq, qstats: qs, rng: E.makeRng('d') });
  assert.deepStrictEqual(ids, ['d1-001']);
  E.applyStats(qs, [{ id: 'd1-001', correct: true, answered: true }], 9);
  assert.deepStrictEqual(E.missedIds(bank, qs), []);
  assert.strictEqual(qs['d1-001'].seen, 2);
});
t('readiness badges', () => {
  const mk = (...p) => p.map((x, i) => ({ type: 'module', domain: 1, pct: x, finishedAt: i }));
  assert.strictEqual(E.readiness([], 1), 'none');
  assert.strictEqual(E.readiness(mk(0.5, 0.9, 0.9, 0.9), 1), 'green');
  assert.strictEqual(E.readiness(mk(0.5, 0.5, 0.9), 1), 'yellow');
  assert.strictEqual(E.readiness(mk(0.9, 0.5), 1), 'red');
  // green needs >= 3 attempts with the last 3 all >= 83%
  assert.strictEqual(E.readiness(mk(0.95), 1), 'yellow');
  assert.strictEqual(E.readiness(mk(0.9, 0.9), 1), 'yellow');
  assert.strictEqual(E.readiness(mk(0.83, 0.83, 0.83), 1), 'green');
  assert.strictEqual(E.readiness(mk(0.9, 0.8, 0.9), 1), 'yellow');
  assert.strictEqual(E.readiness(mk(0.5), 1), 'red');
  // other domains / non-module attempts are ignored; order by finishedAt not array order
  const mixed = [{ type: 'module', domain: 1, pct: 0.9, finishedAt: 3 }, { type: 'module', domain: 1, pct: 0.2, finishedAt: 1 },
    { type: 'final', domain: null, pct: 0.1, finishedAt: 4 }, { type: 'module', domain: 2, pct: 0.1, finishedAt: 5 }];
  assert.strictEqual(E.readiness(mixed, 1), 'yellow');
  assert.strictEqual(E.readiness(mixed, 3), 'none');
});
t('order PBQ: untouched is scored as displayed but stays unanswered', () => {
  const o = pbq.find(q => q.type === 'order');
  for (let i = 0; i < 20; i++) {
    const seed = 'att' + i, start = E.orderStart(o, seed);
    assert.deepStrictEqual(E.orderStart(o, seed), start, 'deterministic');
    assert.notDeepStrictEqual(start, o.answer);
    assert.deepStrictEqual(start.slice().sort(), [0, 1, 2, 3]);
    const exp = start.filter((v, p) => v === o.answer[p]).length / 4;
    const r = E.scoreQuestion(o, undefined, seed);
    assert.strictEqual(r.points, exp); assert.strictEqual(r.answered, false);
    const ss = E.scoreSession([o], {}, 750, seed);
    assert.strictEqual(ss.points, exp); assert.strictEqual(ss.items[0].answered, false);
  }
  assert.strictEqual(E.scoreQuestion(o, undefined).points, 0, 'no seed -> no implicit answer');
  assert.strictEqual(E.scoreQuestion(o, [2, 0, 3, 1], 'x').points, 1, 'explicit answer wins');
  assert.strictEqual(E.isAnswered(o, undefined), false);
  // a 2-item order PBQ must still not start solved
  const two = { id: 'o2', type: 'order', items: ['a', 'b'], answer: [0, 1] };
  for (let i = 0; i < 20; i++) assert.deepStrictEqual(E.orderStart(two, 's' + i), [1, 0]);
});
t('markSeen counts presentations; applyStats does not double count them', () => {
  const qs = {};
  E.markSeen(qs, 'd1-005', 1); E.markSeen(qs, 'd1-006', 1);
  assert.strictEqual(qs['d1-005'].seen, 1); assert.strictEqual(qs['d1-005'].lastCorrect, null);
  assert.deepStrictEqual(E.missedIds(bank, qs), [], 'seen-only questions are not missed');
  E.applyStats(qs, [{ id: 'd1-005', correct: false, answered: true }, { id: 'd1-007', correct: true, answered: true }], 2, { 'd1-005': 1 });
  assert.strictEqual(qs['d1-005'].seen, 1); assert.strictEqual(qs['d1-005'].wrong, 1); assert.strictEqual(qs['d1-005'].lastCorrect, false);
  assert.strictEqual(qs['d1-007'].seen, 1, 'not pre-marked -> counted at submit');
  assert.strictEqual(qs['d1-006'].seen, 1);
  assert.deepStrictEqual(E.missedIds(bank, qs), ['d1-005']);
  // abandoned-session presentations steer least-seen selection
  const ids = E.buildSession({ type: 'module', domain: 1, count: 97, includePBQs: false, bank, pbq, qstats: qs, rng: E.makeRng('ab') });
  ['d1-005', 'd1-006', 'd1-007'].forEach(id => assert(!ids.includes(id), id + ' should be least preferred'));
});

/* ---- composition against the real banks (skipped if they cannot be loaded, e.g. mid-edit) ---- */
(function realBank() {
  const fs = require('fs'), path = require('path'), vm = require('vm');
  const dir = path.join(__dirname, '..', 'data'), ctx = { window: {} };
  vm.createContext(ctx);
  try {
    ['objectives.js', 'domain1.js', 'domain2.js', 'domain3.js', 'domain4.js', 'domain5.js', 'pbq.js'].forEach(f =>
      vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, { filename: f }));
  } catch (e) { console.log('skip real-bank tests (' + e.message.split('\n')[0] + ')'); return; }
  const W = ctx.window, RB = W.SEC_BANK || [], RP = W.SEC_PBQ || [], X = W.SEC_EXAM, rid = {};
  RB.concat(RP).forEach(q => rid[q.id] = q);
  t('real bank: final = 5 spread PBQs then 85 MCQs 10/19/15/24/17, no duplicates', () => {
    assert.strictEqual(X.pbqCount, 5); assert.deepStrictEqual(Object.assign({}, X.mcqPerDomain), { 1: 10, 2: 19, 3: 15, 4: 24, 5: 17 });
    const pd = new Set(RP.map(q => q.domain)).size;
    for (let s = 0; s < 50; s++) {
      const ids = E.buildSession({ type: 'final', bank: RB, pbq: RP, qstats: {}, exam: X, rng: E.makeRng('real' + s) });
      assert.strictEqual(ids.length, 90); assert(uniq(ids), 'dupes');
      const p = ids.slice(0, 5).map(i => rid[i]), m = ids.slice(5).map(i => rid[i]);
      p.forEach(q => assert(['match', 'order', 'config'].includes(q.type), q.id));
      m.forEach(q => assert(['single', 'multi'].includes(q.type), q.id));
      assert.strictEqual(new Set(p.map(q => q.domain)).size, Math.min(5, pd), 'PBQ domains ' + p.map(q => q.domain));
      assert(uniq(p.map(q => q.objective)), 'PBQ objectives repeat');
      const c = {}; m.forEach(q => c[q.domain] = (c[q.domain] || 0) + 1);
      assert.deepStrictEqual(c, { 1: 10, 2: 19, 3: 15, 4: 24, 5: 17 });
      const sc = E.scoreSession(ids.map(i => rid[i]), {}, 750, 'real' + s);
      assert.strictEqual(Object.values(sc.perDomain).reduce((a, d) => a + d.count, 0), 90);
    }
  });
})();
t('timer fold logic', () => {
  const T = E.Timer, tm = T.create(90 * 60000);
  T.start(tm, 1000);
  assert.strictEqual(T.elapsed(tm, 6000), 5000);
  T.fold(tm, 11000);
  assert.strictEqual(tm.elapsedMs, 10000); assert.strictEqual(tm.runningSince, null);
  assert.strictEqual(T.elapsed(tm, 99999), 10000);   // not running: no growth
  T.start(tm, 20000); T.pause(tm, 25000);
  assert.strictEqual(tm.elapsedMs, 15000); assert(tm.paused);
  T.start(tm, 30000); assert.strictEqual(tm.runningSince, null); // paused: start is a no-op
  T.unpause(tm, 40000); assert.strictEqual(T.remaining(tm, 50000), 90 * 60000 - 25000);
  assert(!T.expired(tm, 50000)); assert(T.expired(tm, 40000 + 90 * 60000));
  assert.strictEqual(T.remaining(tm, 40000 + 100 * 60000), 0);
  assert.strictEqual(E.fmtClock(90 * 60000), '1:30:00'); assert.strictEqual(E.fmtClock(65000), '01:05');
});

/* ---------- acronymsIn ---------- */
const G = { OCSP: 'Online Certificate Status Protocol', CA: 'Certificate Authority', CRL: 'Certificate Revocation List', TLS: 'Transport Layer Security',
  MAC: 'Media Access Control (or Mandatory Access Control)', 'SHA-256': 'Secure Hash Algorithm 256-bit', 'TACACS+': 'Terminal Access Controller Access Control System Plus',
  'CI/CD': 'Continuous Integration/Continuous Delivery', 'EAP-TLS': 'Extensible Authentication Protocol-Transport Layer Security' };
const mcq = (question, explanation, options) => ({ id: 'x', type: 'single', question, options: options || ['a', 'b'], answer: [0], explanation });
const keys = (item, g) => E.acronymsIn(item, g || G).map(x => x.key);
t('acronymsIn: undefined/empty glossary -> []', () => {
  assert.deepStrictEqual(E.acronymsIn(mcq('OCSP?', 'x'), undefined), []);
  assert.deepStrictEqual(E.acronymsIn(mcq('OCSP?', 'x'), {}), []);
});
t('acronymsIn: case-sensitive boundary matching', () => {
  assert.deepStrictEqual(keys(mcq('Which Mac address or mac filter?', 'x')), []);
  assert.deepStrictEqual(keys(mcq('Which MAC filter?', 'x')), ['MAC']);
  assert.deepStrictEqual(keys(mcq('MACHINE and CAT and ACA', 'x')), []);
  assert.deepStrictEqual(keys(mcq('(CA), then CA.', 'x')), ['CA']);
});
t('acronymsIn: punctuation keys', () => {
  assert.deepStrictEqual(keys(mcq('Use TACACS+ here', 'x')), ['TACACS+']);
  assert.deepStrictEqual(keys(mcq('Use TACACS+, not x', 'x')), ['TACACS+']);
  assert.deepStrictEqual(keys(mcq('Hash with SHA-256.', 'x')), ['SHA-256']);
  assert.deepStrictEqual(keys(mcq('A CI/CD pipeline', 'x')), ['CI/CD']);
  assert.deepStrictEqual(keys(mcq('SHA-2565 is not', 'x')), []);
});
t('acronymsIn: already expanded in item text is suppressed', () => {
  assert.deepStrictEqual(keys(mcq('A Certificate Authority (CA) signs', 'The CA and CRL matter')), ['CRL']);
  assert.deepStrictEqual(keys(mcq('Q?', 'certificate authority: the CA')), []);
  assert.deepStrictEqual(keys(mcq('Which MAC?', 'media access control is meant')), []);
});
t('acronymsIn: stem-first ordering and de-dup', () => {
  const r = E.acronymsIn(mcq('About OCSP stapling', 'The CA, CRL, TLS and OCSP and CA again', ['uses TLS', 'b']), G);
  assert.deepStrictEqual(r.map(x => x.key), ['OCSP', 'TLS', 'CA', 'CRL']);
  assert.strictEqual(r[0].expansion, 'Online Certificate Status Protocol');
});
t('acronymsIn: EAP-TLS covers TLS (expansion contains it); PBQ fields scanned', () => {
  assert.deepStrictEqual(keys(mcq('EAP-TLS', 'x')), ['EAP-TLS']);
  assert.deepStrictEqual(keys(mcq('EAP-TLS or plain TLS?', 'x')), ['EAP-TLS', 'TLS']);
  const p = { id: 'p', type: 'config', title: 'Config', instructions: 'i', explanation: 'CRL',
    columns: [{ key: 'a', label: 'A', choices: ['SHA-256', 'x'] }], rows: [{ label: 'CA row', fixed: {}, answer: { a: 'x' } }] };
  assert.deepStrictEqual(keys(p), ['SHA-256', 'CA', 'CRL']);
  assert.deepStrictEqual(keys({ type: 'match', title: 't', instructions: 'i', left: ['TLS'], right: ['r'], answer: [0], explanation: 'MAC' }), ['TLS', 'MAC']);
});
t('acronymsIn: plurals and version suffixes match; other glued letters do not', () => {
  const g = { CA: 'Certificate Authority', VLAN: 'Virtual Local Area Network', SNMP: 'Simple Network Management Protocol', IP: 'Internet Protocol', DES: 'Data Encryption Standard' };
  assert.deepStrictEqual(keys(mcq('Two CAs and VLANs', 'x'), g), ['CA', 'VLAN']);
  assert.deepStrictEqual(keys(mcq('Use SNMPv3 over IPv6', 'x'), g), ['SNMP', 'IP']);
  assert.deepStrictEqual(keys(mcq('CAst VLANS 3DES IPS SNMPx', 'x'), g), []);
  assert.deepStrictEqual(keys(mcq("The CA's key, CRL/OCSP, WPA3-Enterprise", 'x'), { CA: 'Certificate Authority', CRL: 'Certificate Revocation List', OCSP: 'Online Certificate Status Protocol', WPA3: 'Wi-Fi Protected Access 3' }), ['CA', 'CRL', 'OCSP', 'WPA3']);
});
t('acronymsIn: regex-special keys', () => {
  const g = { 'S/MIME': 'Secure/Multipurpose Internet Mail Extensions', 'ATT&CK': 'Adversarial Tactics, Techniques, and Common Knowledge',
    'TCP/IP': 'Transmission Control Protocol/Internet Protocol', 'PCI DSS': 'Payment Card Industry Data Security Standard', '802.1X': 'Port-based NAC', 'A.B': 'dot test' };
  assert.deepStrictEqual(keys(mcq('S/MIME, MITRE ATT&CK, TCP/IP, PCI DSS and 802.1X.', 'x'), g), ['S/MIME', 'ATT&CK', 'TCP/IP', 'PCI DSS', '802.1X']);
  assert.deepStrictEqual(keys(mcq('AxB and 802a1X', 'x'), g), []);
});
t('acronymsIn: shorter key inside a longer one is dropped only when the longer expansion covers it', () => {
  const g = { AES: 'Advanced Encryption Standard', 'AES-256': 'Advanced Encryption Standard 256-bit', USB: 'Universal Serial Bus', 'USB OTG': 'USB On-The-Go' };
  assert.deepStrictEqual(keys(mcq('Use AES-256', 'x'), g), ['AES-256']);
  assert.deepStrictEqual(keys(mcq('Use AES-256', 'AES is symmetric'), g), ['AES-256', 'AES']);
  assert.deepStrictEqual(keys(mcq('A USB OTG cable', 'x'), g), ['USB OTG', 'USB']);
});
t('acronymsIn: suppression uses alternates, ignores hyphen/space, skips single-word expansions', () => {
  const g = { SAN: 'Storage Area Network (also Subject Alternative Name)', MFA: 'Multifactor Authentication', IaC: 'Infrastructure as Code',
    TXT: 'Text (DNS record)', TAP: 'Test Access Point (network tap)', DB: 'Database' };
  assert.deepStrictEqual(keys(mcq('Subject alternative name (SAN) entries', 'x'), g), []);
  assert.deepStrictEqual(keys(mcq('Enable MFA', 'multi-factor authentication helps'), g), []);
  assert.deepStrictEqual(keys(mcq('Drift in IaC', 'infrastructure-as-code templates'), g), []);
  assert.deepStrictEqual(keys(mcq('Many TXT queries', 'the text of a DNS record'), g), ['TXT']);
  assert.deepStrictEqual(keys(mcq('Network TAP', 'a network tap copies'), g), ['TAP']);
  assert.deepStrictEqual(keys(mcq('The DB server', 'database'), g), ['DB']);
});
t('acronymsIn: in-place glossary mutation invalidates the cache', () => {
  const g = { CA: 'Certificate Authority' };
  assert.deepStrictEqual(keys(mcq('CA and CRL', 'x'), g), ['CA']);
  g.CRL = 'Certificate Revocation List';
  assert.deepStrictEqual(keys(mcq('CA and CRL', 'x'), g), ['CA', 'CRL']);
  g.CA = 'Changed';
  assert.strictEqual(E.acronymsIn(mcq('CA', 'x'), g)[0].expansion, 'Changed');
  delete g.CA;
  assert.deepStrictEqual(keys(mcq('CA and CRL', 'x'), g), ['CRL']);
});
t('UI.acronyms escapes keys and expansions', () => {
  const vm = require('vm'), fs = require('fs'), path = require('path');
  const ctx = { window: {} };
  const UI = vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../js/ui.js'), 'utf8') + '\n;UI', ctx);
  assert.strictEqual(UI.acronyms([]), '');
  assert.strictEqual(UI.acronyms(null), '');
  const h = UI.acronyms([{ key: 'X<b>&', expansion: '<img src=x onerror=alert(1)> "q" \'s' }]);
  assert(!/<img|<b>/.test(h), h);
  assert(h.includes('X&lt;b&gt;&amp;') && h.includes('&lt;img src=x onerror=alert(1)&gt; &quot;q&quot; &#39;s'), h);
});
console.log(process.exitCode ? 'FAILED' : `all ${n} tests passed`);
