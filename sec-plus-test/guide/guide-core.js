/* Pure helpers for the study guide (no DOM). Loaded in the browser before guide.js and by tests/guide-core.test.js. */
var GuideCore = (function () {
  'use strict';

  function escHtml(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function escRe(s) { return String(s).replace(/[.*+?^${}()|[\]\\\/-]/g, '\\$&'); }

  /* ---------- ids (mirrors meta/build-site.py) ---------- */
  function slugify(text) {
    var t = String(text);
    if (t.normalize) t = t.normalize('NFKD').replace(/[̀-ͯ]/g, '');
    return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
  /* used: a plain object {id:true} that is updated; objective H2s ("4.8 Title") become obj-4-8, others slug, de-duplicated with -2, -3 */
  function headingId(text, used) {
    used = used || {};
    var m = /^(\d)\.(\d+) /.exec(text);
    var base = m ? 'obj-' + m[1] + '-' + m[2] : (slugify(text) || 'section'), id = base, n = 2;
    while (used[id]) id = base + '-' + (n++);
    used[id] = true;
    return id;
  }
  function acronymRowId(key, used) {
    used = used || {};
    var base = 'acr-' + (String(key).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'x'), id = base, n = 2;
    while (used[id]) id = base + '-' + (n++);
    used[id] = true;
    return id;
  }

  /* ---------- tooltip tokenizer ---------- */
  var glossCache = typeof WeakMap === 'function' ? new WeakMap() : null;
  function compileGlossary(g) {
    var keys = Object.keys(g), sig = keys.length + ':' + keys[0] + ':' + keys[keys.length - 1];
    var hit = glossCache && glossCache.get(g);
    if (hit && hit.sig === sig) return hit;
    var sorted = keys.slice().sort(function (a, b) { return b.length - a.length || (a < b ? -1 : 1); });
    /* boundary: not glued to another letter/digit; allows a plural "s" (CAs) and a version suffix "v3" (SNMPv3, IPv6) */
    var re = sorted.length ? new RegExp('(^|[^A-Za-z0-9])(' + sorted.map(escRe).join('|') + ')(?:s|v\\d+)?(?![A-Za-z0-9])', 'g') : null;
    var c = { sig: sig, re: re };
    if (glossCache) glossCache.set(g, c);
    return c;
  }
  var OBJ_KW_RE = /\b(?:objective|objectives|see|per)\s+(\d)\.(\d+)\b/gi;
  var OBJ_PAREN_RE = /\((\d)\.(\d+)\)/g;
  /* [{start,end,domain,obj}] for the d.n part of each objective reference. opts.objectives (SEC_OBJECTIVES) limits to real objectives. */
  function findObjectiveRefs(text, opts) {
    var out = [], objs = opts && opts.objectives, m;
    function ok(d, n) { return +d >= 1 && +d <= 5 && (!objs || (objs[d] && objs[d].objectives && objs[d].objectives[d + '.' + n])); }
    OBJ_KW_RE.lastIndex = 0;
    while ((m = OBJ_KW_RE.exec(text))) {
      if (!ok(m[1], m[2])) continue;
      var end = m.index + m[0].length, st = end - (m[1].length + 1 + m[2].length);
      out.push({ start: st, end: end, domain: +m[1], obj: m[1] + '.' + m[2] });
    }
    OBJ_PAREN_RE.lastIndex = 0;
    while ((m = OBJ_PAREN_RE.exec(text))) {
      if (!ok(m[1], m[2])) continue;
      out.push({ start: m.index + 1, end: m.index + m[0].length - 1, domain: +m[1], obj: m[1] + '.' + m[2] });
    }
    return out.sort(function (a, b) { return a.start - b.start; });
  }
  /* text -> [{type:'text',text} | {type:'acr',text,key,expansion} | {type:'xref',text,domain,obj}] */
  function tokenizeForTips(text, glossary, opts) {
    text = String(text);
    var hits = findObjectiveRefs(text, opts).map(function (r) { return { start: r.start, end: r.end, seg: { type: 'xref', text: text.slice(r.start, r.end), domain: r.domain, obj: r.obj } }; });
    if (glossary) {
      var c = compileGlossary(glossary), m;
      if (c.re) {
        c.re.lastIndex = 0;
        while ((m = c.re.exec(text))) {
          /* the wrapped text includes an allowed suffix (CAs, SNMPv3) so the whole word is underlined; key stays the glossary key */
          var st = m.index + m[1].length, en = m.index + m[0].length;
          if (!hits.some(function (h) { return st < h.end && en > h.start; }))
            hits.push({ start: st, end: en, seg: { type: 'acr', text: text.slice(st, en), key: m[2], expansion: glossary[m[2]] } });
          if (c.re.lastIndex === m.index) c.re.lastIndex++;
        }
      }
    }
    hits.sort(function (a, b) { return a.start - b.start; });
    var segs = [], pos = 0;
    hits.forEach(function (h) {
      if (h.start < pos) return;
      if (h.start > pos) segs.push({ type: 'text', text: text.slice(pos, h.start) });
      segs.push(h.seg);
      pos = h.end;
    });
    if (pos < text.length) segs.push({ type: 'text', text: text.slice(pos) });
    return segs;
  }

  /* ---------- search ---------- */
  function tokens(q) { return String(q || '').toLowerCase().split(/\s+/).filter(Boolean); }
  /* tokens match at the START of a word ("rpo" finds RPO, not "purpose"); a token that itself starts with punctuation matches anywhere */
  function atWord(hay, i) { return i === 0 || !/[a-z0-9]/.test(hay[i - 1]); }
  function wordIndex(hay, tok, from) { var i = from || 0; while ((i = hay.indexOf(tok, i)) >= 0) { if (atWord(hay, i) || !/[a-z0-9]/.test(tok[0])) return i; i++; } return -1; }
  function wordStart(hay, tok) { return wordIndex(hay, tok) >= 0; }
  function countOcc(hay, tok) { var n = 0, i = 0; while ((i = wordIndex(hay, tok, i)) >= 0) { n++; i += tok.length; } return n; }
  function buildSearchIndex(sections, acronyms) {
    return {
      sections: (sections || []).map(function (s) { return { s: s, lt: s.title.toLowerCase(), lx: s.text.toLowerCase() }; }),
      acronyms: Object.keys(acronyms || {}).map(function (k) { return { key: k, expansion: acronyms[k], lk: k.toLowerCase(), le: String(acronyms[k]).toLowerCase() }; })
    };
  }
  function markAll(raw, toks) {
    /* escape first, then wrap token hits; tokens are escaped the same way so entities are never split */
    var low = raw.toLowerCase(), marks = [];
    toks.forEach(function (t) { var i = 0; while ((i = wordIndex(low, t, i)) >= 0) { marks.push([i, i + t.length]); i += t.length; } });
    marks.sort(function (a, b) { return a[0] - b[0] || b[1] - a[1]; });
    var out = '', pos = 0;
    marks.forEach(function (r) {
      if (r[0] < pos) return;
      out += escHtml(raw.slice(pos, r[0])) + '<mark>' + escHtml(raw.slice(r[0], r[1])) + '</mark>';
      pos = r[1];
    });
    return out + escHtml(raw.slice(pos));
  }
  function snippet(text, toks, width) {
    width = width || 150;
    var low = text.toLowerCase(), first = -1;
    toks.forEach(function (t) { var i = wordIndex(low, t); if (i >= 0 && (first < 0 || i < first)) first = i; });
    var from = first < 0 ? 0 : Math.max(0, first - 40), to = Math.min(text.length, from + width);
    if (from > 0) { var sp = text.indexOf(' ', from); if (sp >= 0 && sp < first) from = sp + 1; }
    return (from > 0 ? '…' : '') + markAll(text.slice(from, to), toks) + (to < text.length ? '…' : '');
  }
  /* opts: {maxSections:20, maxAcronyms:5}. AND semantics over title+text. Returns {acronyms:[{key,expansion}], sections:[{section,titleHit,bodyHit,token,titleHtml,snippet}]} (titleHtml/snippet are escaped HTML with <mark>) */
  function search(index, query, opts) {
    opts = opts || {};
    var toks = tokens(query), res = { acronyms: [], sections: [] };
    if (!toks.length || !index) return res;
    var q = toks.join(' ');
    index.acronyms.forEach(function (a) {
      /* expansion words must START with each token: "ip" finds Internet Protocol, not "Cipher Block Chaining" */
      var rank = a.lk === q ? 0 : (a.lk.indexOf(q) === 0 ? 1 : (toks.every(function (t) { return wordStart(a.le, t); }) ? 2 : -1));
      if (rank >= 0) res.acronyms.push({ key: a.key, expansion: a.expansion, rank: rank });
    });
    res.acronyms.sort(function (a, b) { return a.rank - b.rank || a.key.length - b.key.length || (a.key < b.key ? -1 : 1); });
    res.acronyms = res.acronyms.slice(0, opts.maxAcronyms || 5).map(function (a) { return { key: a.key, expansion: a.expansion }; });
    var hits = [];
    index.sections.forEach(function (e) {
      var hay = e.lt + ' ' + e.lx;
      if (!toks.every(function (t) { return wordStart(hay, t); })) return;
      var titleHit = toks.every(function (t) { return wordStart(e.lt, t); });
      var cnt = 0, bodyHit = false;
      toks.forEach(function (t) { var c = countOcc(e.lx, t); cnt += c; if (c) bodyHit = true; });
      hits.push({ section: e.s, titleHit: titleHit, bodyHit: bodyHit, count: cnt, len: e.lx.length, entry: e });
    });
    hits.sort(function (a, b) { return (b.titleHit - a.titleHit) || (b.count - a.count) || (a.len - b.len); });
    res.sections = hits.slice(0, opts.maxSections || 20).map(function (h, i) {
      var firstTok = toks.filter(function (t) { return wordStart(h.entry.lx, t); })[0] || toks[0];
      return { section: h.section, titleHit: h.titleHit, bodyHit: h.bodyHit, token: firstTok, titleHtml: markAll(h.section.title, toks), snippet: snippet(h.section.text, toks) };
    });
    return res;
  }

  /* ---------- readiness ---------- */
  /* attempts: Store attempts ({finishedAt, perObjective:{ "4.8": {count, points} }}). Last `window` (5) attempts that include each objective.
     Returns { "4.8": { pct: 0..1, count: questions, attempts: n } } (objectives without data are absent). */
  function readinessByObjective(attempts, opts) {
    var win = (opts && opts.window) || 5, byObj = {};
    /* skip junk entries (null, numbers) instead of throwing: one bad record must not hide every other attempt */
    (Array.isArray(attempts) ? attempts : []).filter(function (a) { return a && typeof a === 'object'; })
      .sort(function (a, b) { return (+a.finishedAt || 0) - (+b.finishedAt || 0); }).forEach(function (a) {
      var po = a && a.perObjective;
      if (!po || typeof po !== 'object') return;
      Object.keys(po).forEach(function (k) {
        var o = po[k];
        if (!o || !(o.count > 0)) return;
        (byObj[k] = byObj[k] || []).push({ count: o.count, points: +o.points || 0 });
      });
    });
    var out = {};
    Object.keys(byObj).forEach(function (k) {
      var last = byObj[k].slice(-win), c = 0, p = 0;
      last.forEach(function (x) { c += x.count; p += x.points; });
      out[k] = { pct: p / c, count: c, attempts: last.length };
    });
    return out;
  }
  function readinessLevel(pct) { return pct >= 0.83 ? 'ok' : (pct >= 0.70 ? 'warn' : 'bad'); }
  /* bottom n objectives with data, lowest pct first (ties by objective number) */
  function weakSpots(ready, n) {
    return Object.keys(ready).map(function (k) { return { obj: k, pct: ready[k].pct, count: ready[k].count }; })
      .sort(function (a, b) { return a.pct - b.pct || a.obj.localeCompare(b.obj, undefined, { numeric: true }); }).slice(0, n || 5);
  }

  /* ---------- highlights ---------- */
  function normHl(text) { return String(text == null ? '' : text).toLowerCase().replace(/\s+/g, ' ').trim().slice(0, 240); }
  function fnv1a(str) {
    var h = 0x811c9dc5;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
    return ('00000000' + h.toString(16)).slice(-8);
  }
  /* stable block key: file ':' sectionId ':' FNV-1a of the lower-cased, whitespace-collapsed first 240 chars */
  function hlKey(file, sectionId, text) { return file + ':' + sectionId + ':' + fnv1a(normHl(text)); }
  function validHl(e) { return !!e && typeof e === 'object' && typeof e.file === 'string' && typeof e.text === 'string'; }
  /* {total, byId}: per-chapter count; an H3 counts its own highlights, an H2 its own plus those of its H3s. Blocks above the first H2 only count in total. */
  function sectionCounts(store, file) {
    var own = {}, total = 0, byId = {};
    Object.keys(store && typeof store === 'object' ? store : {}).forEach(function (k) {
      var e = store[k];
      if (!validHl(e) || e.file !== file.slug) return;
      total++; own[e.section] = (own[e.section] || 0) + 1;
    });
    var h2 = null;
    (file.toc || []).forEach(function (t) {
      if (t.level === 2) { h2 = t.id; byId[t.id] = (byId[t.id] || 0) + (own[t.id] || 0); }
      else if (t.level === 3) { byId[t.id] = own[t.id] || 0; if (h2) byId[h2] = (byId[h2] || 0) + (own[t.id] || 0); }
    });
    Object.keys(byId).forEach(function (k) { if (!byId[k]) delete byId[k]; });
    return { total: total, byId: byId };
  }
  /* store: {key: {file, section, heading, text, at}}; data: SEC_GUIDE; live (optional): {key: documentOrderIndex} of blocks present in the current build.
     Returns {total, groups:[{file, title, sections:[{id, heading, items:[{key,text,at}]}]}], orphans:[{key,file,section,heading,text,at,canView}]}.
     An item is an orphan when its chapter or section is gone, or (with `live`) its key matches no block. canView = the section still exists. */
  function groupHighlights(store, data, live) {
    var files = (data && data.files) || [], fIdx = {}, secIdx = {}, tocIds = {};
    files.forEach(function (f, i) { fIdx[f.slug] = i; tocIds[f.slug] = {}; (f.toc || []).forEach(function (t) { tocIds[f.slug][t.id] = true; }); });
    ((data && data.sections) || []).forEach(function (s, i) { secIdx[s.file + '/' + s.id] = { i: i, title: s.title }; });
    var byFile = {}, orphans = [], total = 0;
    Object.keys(store && typeof store === 'object' ? store : {}).forEach(function (k) {
      var e = store[k];
      if (!validHl(e)) return;
      total++;
      var sec = secIdx[e.file + '/' + e.section], fi = fIdx.hasOwnProperty(e.file) ? fIdx[e.file] : -1;
      var it = { key: k, file: e.file, section: String(e.section || ''), heading: String(e.heading || ''), text: e.text, at: String(e.at || '') };
      if (fi < 0 || !sec || (live && !Object.prototype.hasOwnProperty.call(live, k))) { it.canView = fi >= 0 && !!sec; orphans.push(it); return; }
      var g = byFile[e.file] = byFile[e.file] || { file: e.file, title: files[fi].title, fi: fi, secs: {} };
      var sg = g.secs[e.section] = g.secs[e.section] || { id: e.section, i: sec.i, heading: tocIds[e.file][e.section] ? sec.title : 'Introduction', items: [] };
      sg.items.push(it);
    });
    function ord(a, b) { return live ? (live[a.key] - live[b.key]) : (a.at < b.at ? -1 : a.at > b.at ? 1 : 0); }
    var groups = Object.keys(byFile).map(function (k) { return byFile[k]; }).sort(function (a, b) { return a.fi - b.fi; }).map(function (g) {
      return { file: g.file, title: g.title, sections: Object.keys(g.secs).map(function (k) { return g.secs[k]; }).sort(function (a, b) { return a.i - b.i; }).map(function (sg) {
        sg.items.sort(ord); return { id: sg.id, heading: sg.heading, items: sg.items.map(function (x) { return { key: x.key, text: x.text, at: x.at }; }) };
      }) };
    });
    orphans.sort(function (a, b) { return (fIdx[a.file] === undefined ? 99 : fIdx[a.file]) - (fIdx[b.file] === undefined ? 99 : fIdx[b.file]) || (a.at < b.at ? -1 : a.at > b.at ? 1 : 0); });
    return { total: total, groups: groups, orphans: orphans };
  }
  /* plain text -> Markdown that renders as the same literal text: backslash-escape what would become HTML, emphasis, code or a link
     ("<script>", "****-1234", "*.example.com"), and a leading marker that would turn the line into a heading, list or nested quote.
     An underscore inside a word (snake_case) is literal in CommonMark and stays as is. */
  function mdText(t) {
    return String(t).replace(/\s+/g, ' ').trim()
      .replace(/[\\`*<\[\]]/g, '\\$&')
      .replace(/_/g, function (m, i, str) { return /[A-Za-z0-9]/.test(str[i - 1] || '') && /[A-Za-z0-9]/.test(str[i + 1] || '') ? m : '\\_'; })
      .replace(/&(?=#?[A-Za-z0-9]+;)/g, '\\&').replace(/^(\d+)([.)])(?= |$)/, '$1\\$2').replace(/^([-+#>])/, '\\$1');
  }
  /* Markdown export: "# Highlights", "## <chapter>", "### <section>", then each text as a "> " block. Orphans go under "## No longer found". */
  function highlightsMarkdown(res) {
    var out = ['# Highlights', ''], q = function (t) { return '> ' + mdText(t); };
    if (!res || (!(res.groups || []).length && !(res.orphans || []).length)) return out.concat(['Nothing highlighted yet.', '']).join('\n');
    (res.groups || []).forEach(function (g) {
      out.push('## ' + mdText(g.title), '');
      g.sections.forEach(function (s) { out.push('### ' + mdText(s.heading), ''); s.items.forEach(function (it) { out.push(q(it.text), ''); }); });
    });
    if ((res.orphans || []).length) { out.push('## No longer found', ''); res.orphans.forEach(function (it) { out.push(q(it.text), ''); }); }
    return out.join('\n');
  }

  return { hlKey: hlKey, mdText: mdText, sectionCounts: sectionCounts, groupHighlights: groupHighlights, highlightsMarkdown: highlightsMarkdown, escHtml: escHtml, slugify: slugify, headingId: headingId, acronymRowId: acronymRowId, findObjectiveRefs: findObjectiveRefs,
    tokenizeForTips: tokenizeForTips, buildSearchIndex: buildSearchIndex, search: search, snippet: snippet,
    wordIndex: wordIndex, readinessByObjective: readinessByObjective, readinessLevel: readinessLevel, weakSpots: weakSpots };
})();
if (typeof module !== 'undefined') module.exports = GuideCore;
