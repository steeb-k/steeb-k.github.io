#!/usr/bin/env node
'use strict';
const assert = require('assert');
const G = require('../guide/guide-core.js');
let n = 0;
function t(name, fn) { try { fn(); n++; console.log('ok   ' + name); } catch (e) { console.error('FAIL ' + name + '\n  ' + e.message); process.exitCode = 1; } }

const GLOSS = { CA: 'Certificate Authority', MAC: 'Mandatory Access Control', SNMP: 'Simple Network Management Protocol', 'TACACS+': 'Terminal Access Controller Access Control System Plus',
  'CI/CD': 'Continuous Integration/Continuous Delivery', TLS: 'Transport Layer Security', 'EAP-TLS': 'Extensible Authentication Protocol-Transport Layer Security', IP: 'Internet Protocol', VLAN: 'Virtual LAN', AES: 'Advanced Encryption Standard', 'AES-256': 'AES 256-bit' };
const OBJS = { 1: { objectives: { '1.1': 'a', '1.3': 'b', '1.4': 'c' } }, 4: { objectives: { '4.8': 'd' } }, 5: { objectives: { '5.2': 'e' } }, 3: { objectives: { '3.1': 'x' } } };
const keys = (text, g) => G.tokenizeForTips(text, g || GLOSS, { objectives: OBJS }).filter(s => s.type === 'acr').map(s => s.key);
const refs = text => G.tokenizeForTips(text, GLOSS, { objectives: OBJS }).filter(s => s.type === 'xref').map(s => s.obj);
const join = segs => segs.map(s => s.text).join('');

t('slugify', () => {
  assert.strictEqual(G.slugify('Public key infrastructure (PKI)'), 'public-key-infrastructure-pki');
  assert.strictEqual(G.slugify('  A / B & C -- D  '), 'a-b-c-d');
  assert.strictEqual(G.slugify('Café résumé'), 'cafe-resume');
  assert.strictEqual(G.slugify('Domain 4 — Security Operations (28%)'), 'domain-4-security-operations-28');
});
t('headingId: objective H2s get obj-d-n; others slug; duplicates -2, -3', () => {
  const used = {};
  assert.strictEqual(G.headingId('4.8 Explain appropriate incident response activities', used), 'obj-4-8');
  assert.strictEqual(G.headingId('1.10 Something', used), 'obj-1-10');
  assert.strictEqual(G.headingId('Testing', used), 'testing');
  assert.strictEqual(G.headingId('Testing', used), 'testing-2');
  assert.strictEqual(G.headingId('Testing', used), 'testing-3');
  assert.strictEqual(G.headingId('TLS 1.3 details', used), 'tls-1-3-details'); // not an objective: needs "d.n " at the start only
  assert.strictEqual(G.headingId('!!!', used), 'section');
  assert.strictEqual(G.acronymRowId('ATT&CK', {}), 'acr-att-ck');
  const u2 = {}; assert.strictEqual(G.acronymRowId('MAC', u2), 'acr-mac'); assert.strictEqual(G.acronymRowId('MAC', u2), 'acr-mac-2');
});
t('generated data: ids unique per file, objective headings present for every objective', () => {
  global.window = {}; require('../guide/data/guide.js');
  const D = global.window.SEC_GUIDE;
  assert.strictEqual(D.files.map(f => f.id).join(), '00,01,02,03,04,05,90,91,92');
  D.files.forEach(f => {
    const ids = (f.html.match(/<h[1-6] id="[^"]+"/g) || []).map(x => x.replace(/.*id="/, '').replace('"', ''));
    assert.strictEqual(new Set(ids).size, ids.length, 'duplicate heading ids in ' + f.slug);
    assert(!/AI-generated content, not yet vetted/.test(f.html), 'per-file disclaimer should be stripped: ' + f.slug);
  });
  const objs = require('vm').runInNewContext(require('fs').readFileSync(__dirname + '/../data/objectives.js', 'utf8') + ';window.SEC_OBJECTIVES', { window: {} });
  for (let d = 1; d <= 5; d++) Object.keys(objs[d].objectives).forEach(o => {
    const f = D.files.find(x => x.id === '0' + d);
    assert(f.toc.some(x => x.level === 2 && x.id === 'obj-' + o.replace('.', '-')), 'missing heading for objective ' + o);
  });
  assert(D.acronymAnchors.AAA === 'acr-aaa' && /<tr id="acr-aaa">/.test(D.files[7].html));
  // "IMAP (IMAP4)" rows answer to both spellings
  assert(D.acronymAnchors.IMAP4 && D.acronymAnchors.IMAP4 === D.acronymAnchors['IMAP (IMAP4)']);
  Object.values(D.acronymAnchors).forEach(id => assert(D.files[7].html.includes('<tr id="' + id + '">'), 'anchor without row: ' + id));
  assert(D.sections.every(s => s.id && s.title && s.path && typeof s.text === 'string'));
});
t('generated data: one blockquote per markdown callout (adjacent "> " callouts are not merged); builtAt is the source commit date', () => {
  const fs = require('fs'), path = require('path');
  const D = global.window.SEC_GUIDE, src = process.env.GUIDE_SRC || path.join(__dirname, '..', '..', '..', 'security+-study');
  assert(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d([+-]\d\d:\d\d|Z)$/.test(D.builtAt) || D.builtAt === '', 'builtAt should be an ISO commit date: ' + D.builtAt);
  if (!fs.existsSync(src)) { console.log('     (skip markdown comparison: ' + src + ' not found)'); return; }
  D.files.forEach(f => {
    const md = fs.readFileSync(path.join(src, f.src), 'utf8').replace(/^> \*\*Note:\*\* AI-generated[^\n]*\n/m, '');
    let n = 0, fence = false, prev = false;
    md.split('\n').forEach(l => { if (/^\s*```/.test(l)) fence = !fence; const q = !fence && l.startsWith('>'); if (q && !prev) n++; prev = q; });
    assert.strictEqual((f.html.match(/<blockquote>/g) || []).length, n, 'blockquotes in ' + f.src);
    assert(!/bq-split/.test(f.html), 'split marker leaked into ' + f.src);
  });
});
t('tokenizeForTips: boundary rules from the quiz acronym tests', () => {
  assert.deepStrictEqual(keys('The MAC address table'), ['MAC']);        // case-sensitive match on the uppercase key
  assert.deepStrictEqual(keys('the mac address and Mac OS'), []);         // lowercase / mixed case never match
  assert.deepStrictEqual(keys('Two CAs and VLANs'), ['CA', 'VLAN']);      // plural s
  assert.deepStrictEqual(keys('Use SNMPv3 over IPv6'), ['SNMP', 'IP']);   // version suffix
  assert.deepStrictEqual(keys('Use TACACS+ here'), ['TACACS+']);
  assert.deepStrictEqual(keys('Use TACACS+, not x'), ['TACACS+']);
  assert.deepStrictEqual(keys('A CI/CD pipeline'), ['CI/CD']);
  assert.deepStrictEqual(keys('MACHINE and CAT and ACA'), []);
  assert.deepStrictEqual(keys('CAst VLANS 3DES IPS SNMPx'), []);
  assert.deepStrictEqual(keys('EAP-TLS and TLS'), ['EAP-TLS', 'TLS']);   // longest key wins
  assert.deepStrictEqual(keys('AES-256 and AES'), ['AES-256', 'AES']);
  assert.deepStrictEqual(keys('(CA) CA/CA, CA.'), ['CA', 'CA', 'CA', 'CA']);
});
t('tokenizeForTips: the wrapped text includes the allowed suffix (whole word underlined), key stays the glossary key', () => {
  const acr = G.tokenizeForTips('Two CAs, SNMPv3 and IPv6.', GLOSS).filter(s => s.type === 'acr');
  assert.deepStrictEqual(acr.map(s => s.text), ['CAs', 'SNMPv3', 'IPv6']);
  assert.deepStrictEqual(acr.map(s => s.key), ['CA', 'SNMP', 'IP']);
  assert.strictEqual(join(G.tokenizeForTips('Two CAs, SNMPv3 and IPv6.', GLOSS)), 'Two CAs, SNMPv3 and IPv6.');
});
t('tokenizeForTips: segments reassemble the input exactly and carry the expansion', () => {
  const txt = 'Certificate Authority (CA) issues certs; see 4.8, (1.3) and TLS 1.3 over IPv6.';
  const segs = G.tokenizeForTips(txt, GLOSS, { objectives: OBJS });
  assert.strictEqual(join(segs), txt);
  assert.strictEqual(segs.find(s => s.key === 'CA').expansion, 'Certificate Authority');
  assert.deepStrictEqual(G.tokenizeForTips('plain words', GLOSS), [{ type: 'text', text: 'plain words' }]);
  assert.deepStrictEqual(G.tokenizeForTips('CA', null), [{ type: 'text', text: 'CA' }]);
  assert.deepStrictEqual(G.tokenizeForTips('', GLOSS), []);
});
t('objective references: match only objective/see/per d.n and (d.n)', () => {
  assert.deepStrictEqual(refs('as in objective 4.8 above'), ['4.8']);
  assert.deepStrictEqual(refs('See objectives 1.4 and later'), ['1.4']);
  assert.deepStrictEqual(refs('see 5.2'), ['5.2']);
  assert.deepStrictEqual(refs('listed per 3.1.'), ['3.1']);
  assert.deepStrictEqual(refs('crypto basics (1.4)'), ['1.4']);
  assert.deepStrictEqual(refs('TLS 1.3 and CVSS 3.1 and NIST 800-63B-4 and version (2.0)'), []);
  assert.deepStrictEqual(refs('see 9.9 and objective 4.9'), []);          // unknown objectives are not linked
  const segs = G.tokenizeForTips('see 5.2', GLOSS, { objectives: OBJS });
  assert.deepStrictEqual(segs.map(s => s.type + ':' + s.text), ['text:see ', 'xref:5.2']);
  assert.strictEqual(G.findObjectiveRefs('see 4.8', {})[0].obj, '4.8'); // without an objective table only d is range-checked
  assert.strictEqual(G.findObjectiveRefs('see 7.1', {}).length, 0);
});

const SECTIONS = [
  { file: 'f', id: 'a', title: 'Incident response', path: 'D4 › Incident response', text: 'Preparation, detection, containment; incident handling. Long text about other things '.repeat(5) },
  { file: 'f', id: 'b', title: 'Logging', path: 'D4 › Logging', text: 'Incident response needs good logs. Incident incident incident.' },
  { file: 'f', id: 'c', title: 'Digital forensics', path: 'D4 › Digital forensics', text: 'Chain of custody for an incident.' },
  { file: 'f', id: 'd', title: 'Containment', path: 'D4 › Containment', text: 'Isolate hosts <script>alert(1)</script> & segment.' }
];
const IDX = G.buildSearchIndex(SECTIONS, { IR: 'Incident Response', IRP: 'Incident Response Plan', DR: 'Disaster Recovery', CA: 'Certificate Authority' });
t('search: title match first, then token count, then shorter', () => {
  const r = G.search(IDX, 'incident');
  assert.deepStrictEqual(r.sections.map(s => s.section.id), ['a', 'b', 'c']);
  assert(r.sections.every(s => /<mark>/i.test(s.snippet)), 'snippets carry <mark>');
  assert.strictEqual(r.sections[0].titleHit, true);
  assert.strictEqual(r.sections[0].titleHtml, '<mark>Incident</mark> response');
  assert.strictEqual(r.sections[1].titleHit, false);
});
t('search: AND semantics across title and text, case-insensitive', () => {
  assert.deepStrictEqual(G.search(IDX, 'INCIDENT custody').sections.map(s => s.section.id), ['c']);
  assert.deepStrictEqual(G.search(IDX, 'incident zebra').sections, []);
  assert.deepStrictEqual(G.search(IDX, '   ').sections, []);
  assert.deepStrictEqual(G.search(IDX, 'logging logs').sections.map(s => s.section.id), ['b']);
});
t('search: acronym group (key exact > prefix > expansion), limited to 5; snippets are escaped', () => {
  assert.deepStrictEqual(G.search(IDX, 'ir').acronyms.map(a => a.key), ['IR', 'IRP']);
  assert.deepStrictEqual(G.search(IDX, 'disaster').acronyms.map(a => a.key), ['DR']);
  const big = {}; for (let i = 0; i < 12; i++) big['K' + i] = 'Thing ' + i;
  assert.strictEqual(G.search(G.buildSearchIndex([], big), 'thing').acronyms.length, 5);
  const s = G.search(IDX, 'script').sections[0].snippet;
  assert(!/<script/.test(s) && s.includes('&lt;') && s.includes('<mark>script</mark>'), s);
  const r = G.search(IDX, 'segment'); assert(r.sections[0].snippet.includes('&amp;'), r.sections[0].snippet);
  assert.strictEqual(G.search(IDX, 'incident').sections[0].token, 'incident');
});
t('search: acronym expansions match at word starts only', () => {
  const idx = G.buildSearchIndex([], { IP: 'Internet Protocol', CBC: 'Cipher Block Chaining', SOAR: 'Security Orchestration, Automation, and Response' });
  assert.deepStrictEqual(G.search(idx, 'ip').acronyms.map(a => a.key), ['IP']);
  assert.deepStrictEqual(G.search(idx, 'orchestration').acronyms.map(a => a.key), ['SOAR']);
  assert.deepStrictEqual(G.search(idx, 'chain').acronyms.map(a => a.key), ['CBC']);
  assert.deepStrictEqual(G.search(idx, 'hestration').acronyms, []);
});
t('search: section tokens match at word starts (no "purpose" for "rpo"); marks follow the same rule', () => {
  const idx = G.buildSearchIndex([{ file: 'f', id: 'a', title: 'RTO and RPO', path: 'p', text: 'RTO RPO targets' }, { file: 'f', id: 'b', title: 'Purpose', path: 'p', text: 'the purpose of a shortcut' }], {});
  assert.deepStrictEqual(G.search(idx, 'rto rpo').sections.map(s => s.section.id), ['a']);
  assert.deepStrictEqual(G.search(idx, 'purp').sections.map(s => s.section.id), ['b']);
  assert(!/<mark>/.test(G.snippet('the purpose here', ['rpo'])));
  assert.strictEqual(G.wordIndex('see 4.8 and x4.8', '4.8'), 4);
  assert.strictEqual(G.wordIndex('obj-4.8', '-4.8'), 3);
});
t('readinessByObjective: last-5 window, pct = points/count, no data -> absent', () => {
  const att = [];
  for (let i = 1; i <= 7; i++) att.push({ finishedAt: i, perObjective: { '4.8': { count: 10, points: i <= 2 ? 0 : 10 } } });
  att.push({ finishedAt: 8, perObjective: { '1.1': { count: 4, points: 3 }, '2.2': { count: 0, points: 0 } } });
  const r = G.readinessByObjective(att);
  assert.strictEqual(r['4.8'].pct, 1);               // the two 0% attempts fall outside the last five
  assert.strictEqual(r['4.8'].attempts, 5); assert.strictEqual(r['4.8'].count, 50);
  assert.strictEqual(r['1.1'].pct, 0.75);
  assert(!('2.2' in r) && !('3.1' in r));
  const mixed = G.readinessByObjective([{ finishedAt: 2, perObjective: { '5.1': { count: 10, points: 9 } } }, { finishedAt: 1, perObjective: { '5.1': { count: 10, points: 5 } } }]);
  assert.strictEqual(mixed['5.1'].pct, 0.7);          // order-independent input, summed over both
  assert.deepStrictEqual(G.readinessByObjective(null), {});
  assert.deepStrictEqual(G.readinessByObjective([{ finishedAt: 1 }, null, { perObjective: 5 }].filter(Boolean)), {});
  assert.strictEqual(G.readinessLevel(0.83), 'ok'); assert.strictEqual(G.readinessLevel(0.829), 'warn');
  assert.strictEqual(G.readinessLevel(0.70), 'warn'); assert.strictEqual(G.readinessLevel(0.699), 'bad');
});
t('readinessByObjective: junk entries are skipped, valid ones still count', () => {
  const r = G.readinessByObjective([null, 5, 'x', { perObjective: null }, { perObjective: { '4.8': { count: 'x' } } }, { finishedAt: 2, perObjective: { '4.8': { count: 2, points: 1 } } }]);
  assert.deepStrictEqual(Object.keys(r), ['4.8']);
  assert.strictEqual(r['4.8'].pct, 0.5);
  assert.deepStrictEqual(G.readinessByObjective('nope'), {});
});
t('weakSpots: lowest first, limited', () => {
  const w = G.weakSpots({ '1.1': { pct: .9, count: 1 }, '2.1': { pct: .3, count: 1 }, '2.2': { pct: .3, count: 1 }, '3.1': { pct: .5, count: 1 } }, 3);
  assert.deepStrictEqual(w.map(x => x.obj), ['2.1', '2.2', '3.1']);
});
t('quiz deep links: ui.js slug map agrees with the built guide data', () => {
  const vm = require('vm'), fs = require('fs');
  const ctx = { window: { SEC_OBJECTIVES: {} } };
  const UI = vm.runInNewContext(fs.readFileSync(__dirname + '/../js/ui.js', 'utf8') + '\n;UI', ctx);
  const D = global.window.SEC_GUIDE;
  for (let d = 1; d <= 5; d++) {
    const f = D.files.find(x => x.id === '0' + d), href = UI.guideHref(d + '.2');
    assert.strictEqual(href, 'guide/index.html#/' + f.slug + '/obj-' + d + '-2');
  }
  assert.strictEqual(UI.guideHref('9.1'), null); assert.strictEqual(UI.guideHref('bogus'), null);
});
t('links between the quiz and the guide name index.html (a bare "guide/" or "../" is a directory listing on file://)', () => {
  const fs = require('fs'), rd = f => fs.readFileSync(__dirname + '/../' + f, 'utf8');
  assert(/href="guide\/index\.html"/.test(rd('index.html')), 'index.html Guide link');
  assert(/href="\.\.\/guide\/index\.html"/.test(rd('tests/dev.html')), 'dev.html Guide link');
  /* one site, one header: Guide and Practice open in the same tab; only the GitHub link opens a new tab */
  assert(/href="\.\.\/index\.html"(?![^>]*target=)[^>]*>Practice/.test(rd('guide/index.html')), 'guide Practice link stays in the tab');
  assert(/href="guide\/index\.html"(?![^>]*target=)[^>]*>Guide/.test(rd('index.html')), 'index.html Guide link stays in the tab');
  ['index.html', 'tests/dev.html', 'guide/index.html'].forEach(f =>
    assert(/href="https:\/\/github\.com\/steeb-k\/secplus-study-guide"[^>]*target="_blank"[^>]*rel="noopener"[^>]*>GitHub/.test(rd(f)), 'GitHub link opens a new tab in ' + f));
  ['index.html', 'tests/dev.html', 'guide/index.html', 'js/ui.js', 'guide/guide.js'].forEach(f =>
    assert(!/href=(["'])(?:\.\.\/)*(?:guide\/)?\1|'(?:\.\.\/)?guide\/'/.test(rd(f)), 'directory-style link in ' + f));
});
t('acronymMeta: every 91 row has expansion, meaning and anchor; alternate spellings share a row', () => {
  const D = global.window.SEC_GUIDE, M = D.acronymMeta;
  assert(M && Object.keys(M).length > 300);
  assert.strictEqual(M.SIEM.expansion, 'Security Information and Event Management');
  assert(/correlates logs/.test(M.SIEM.meaning)); assert.strictEqual(M.SIEM.anchor, 'acr-siem');
  assert(M.GCMP.meaning.length > 10);
  assert.strictEqual(M.IMAP.anchor, M.IMAP4.anchor);
  Object.keys(M).forEach(k => { assert(M[k].expansion && M[k].meaning && /^acr-/.test(M[k].anchor), k); });
});
const HDATA = { files: [{ slug: 'a', title: 'Alpha', toc: [{ level: 2, id: 'a1' }, { level: 3, id: 'a1x' }, { level: 2, id: 'a2' }] }, { slug: 'b', title: 'Beta', toc: [{ level: 2, id: 'b1' }] }],
  sections: [{ file: 'a', id: 'a-top', title: 'Alpha' }, { file: 'a', id: 'a1', title: 'A one' }, { file: 'a', id: 'a1x', title: 'A one x' }, { file: 'a', id: 'a2', title: 'A two' }, { file: 'b', id: 'b1', title: 'B one' }] };
t('hlKey: stable, case/whitespace-insensitive, 240-char window, scoped by file and section', () => {
  const k = G.hlKey('a', 'a1', 'Hello   World');
  assert(/^a:a1:[0-9a-f]{8}$/.test(k));
  assert.strictEqual(k, G.hlKey('a', 'a1', ' hello world\n'));
  assert.notStrictEqual(k, G.hlKey('a', 'a2', 'Hello World')); assert.notStrictEqual(k, G.hlKey('b', 'a1', 'Hello World')); assert.notStrictEqual(k, G.hlKey('a', 'a1', 'Hello Worlds'));
  const long = 'x'.repeat(240);
  assert.strictEqual(G.hlKey('a', 'a1', long + 'tail'), G.hlKey('a', 'a1', long + 'other'));
});
t('sectionCounts: H3 own, H2 aggregates its H3s, intro only in total, junk ignored', () => {
  const st = { k1: { file: 'a', section: 'a1x', text: 't' }, k2: { file: 'a', section: 'a1', text: 't' }, k3: { file: 'a', section: 'a-top', text: 't' }, k4: { file: 'b', section: 'b1', text: 't' }, k5: null, k6: 7, k7: { file: 'a' } };
  const c = G.sectionCounts(st, HDATA.files[0]);
  assert.deepStrictEqual(c, { total: 3, byId: { a1: 2, a1x: 1 } });
  assert.deepStrictEqual(G.sectionCounts(null, HDATA.files[0]), { total: 0, byId: {} });
});
t('groupHighlights: chapter -> section order, items in document order, orphans, junk ignored', () => {
  const e = (file, section, text, at) => ({ file, section, heading: 'h', text, at });
  const st = { k1: e('b', 'b1', 'B text', '2026-01-01'), k2: e('a', 'a2', 'second', '2026-01-02'), k3: e('a', 'a1', 'later', '2026-01-04'), k4: e('a', 'a1', 'earlier', '2026-01-03'),
    k5: e('a', 'a-top', 'intro', '2026-01-05'), k6: e('a', 'gone', 'lost section', '2026-01-06'), k7: e('zzz', 'x', 'lost chapter', '2026-01-07'), bad: 5, bad2: null, bad3: { file: 1 } };
  const r = G.groupHighlights(st, HDATA);
  assert.strictEqual(r.total, 7);
  assert.deepStrictEqual(r.groups.map(g => g.title), ['Alpha', 'Beta']);
  assert.deepStrictEqual(r.groups[0].sections.map(s => s.heading), ['Introduction', 'A one', 'A two']);
  assert.deepStrictEqual(r.groups[0].sections[1].items.map(i => i.text), ['earlier', 'later']);   // no live map: by time
  assert.deepStrictEqual(r.orphans.map(o => [o.key, o.canView]), [['k6', false], ['k7', false]]);
  const live = { k1: 5, k2: 3, k3: 1, k4: 2, k5: 0 };
  const r2 = G.groupHighlights(st, HDATA, live);
  assert.deepStrictEqual(r2.groups[0].sections[1].items.map(i => i.key), ['k3', 'k4']);          // live map: document order
  const r3 = G.groupHighlights(st, HDATA, { k1: 1, k3: 2 });                                    // k2, k4, k5 text changed: orphans with a still-existing section
  assert.deepStrictEqual(r3.orphans.filter(o => o.canView).map(o => o.key).sort(), ['k2', 'k4', 'k5']);
  assert.deepStrictEqual(G.groupHighlights(null, HDATA), { total: 0, groups: [], orphans: [] });
});
t('highlightsMarkdown: # / ## chapter / ### section / > text, orphans last', () => {
  const st = { k1: { file: 'a', section: 'a1', heading: 'A one', text: 'First   point', at: '1' }, k2: { file: 'b', section: 'b1', heading: 'B one', text: 'Beta point', at: '2' }, k3: { file: 'a', section: 'gone', heading: 'x', text: 'Old text', at: '3' } };
  assert.strictEqual(G.highlightsMarkdown(G.groupHighlights(st, HDATA)),
    '# Highlights\n\n## Alpha\n\n### A one\n\n> First point\n\n## Beta\n\n### B one\n\n> Beta point\n\n## No longer found\n\n> Old text\n');
  assert.strictEqual(G.highlightsMarkdown(G.groupHighlights({}, HDATA)), '# Highlights\n\nNothing highlighted yet.\n');
});
t('mdText: literal text stays literal in Markdown (no raw HTML, emphasis, code, links or block markers)', () => {
  const cases = [['<script> in input field', '\\<script> in input field'], ['masked ****-1234', 'masked \\*\\*\\*\\*-1234'], ['*.example.com', '\\*.example.com'],
    ['snake_case and _emph_', 'snake_case and \\_emph\\_'], ['`code` [x](y)', '\\`code\\` \\[x\\](y)'], ['a\\b', 'a\\\\b'], ['&lt; vs AT&T', '\\&lt; vs AT&T'],
    ['1. first', '1\\. first'], ['2) second', '2\\) second'], ['- dash', '\\- dash'], ['# hash', '\\# hash'], ['> quote', '\\> quote'], ['+ plus', '\\+ plus'],
    ['RADIUS | UDP 1812 | AAA', 'RADIUS | UDP 1812 | AAA'], ['5 > 3, x-y, 4.8 (100%)', '5 > 3, x-y, 4.8 (100%)'], ['multi\n  line\ttext', 'multi line text']];
  cases.forEach(([i, o]) => assert.strictEqual(G.mdText(i), o, JSON.stringify(i)));
  const st = { k1: { file: 'a', section: 'a1', heading: 'A one', text: '<b>bold</b> *star*', at: '1' } };
  assert.strictEqual(G.highlightsMarkdown(G.groupHighlights(st, HDATA)), '# Highlights\n\n## Alpha\n\n### A one\n\n> \\<b>bold\\</b> \\*star\\*\n');
});
console.log(process.exitCode ? 'FAILED' : `all ${n} tests passed`);
