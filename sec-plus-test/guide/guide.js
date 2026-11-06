/* Study guide app: routing, sidebar, scrollspy, search, tooltips, readiness marks. Data: window.SEC_GUIDE (generated). */
(function () {
  'use strict';
  var G = window.SEC_GUIDE, C = window.GuideCore, ACR = window.SEC_ACRONYMS || {}, OBJ = window.SEC_OBJECTIVES || {};
  var REPO = 'steeb-k/secplus-study-guide';
  var $ = function (id) { return document.getElementById(id); };
  var page = null;  /* 'highlights' | 'howto' | null (a chapter) */
  var elMain = $('g-main'), elTree = $('g-tree'), elWeak = $('g-weak'), elQ = $('g-q'), elRes = $('g-results'), elSide = $('g-side'),
    elTip = $('g-tooltip'), elMenu = $('g-menu'), elBack = $('g-backdrop'), elLive = $('g-live'), elHlink = $('g-hlink'), elHow = $('g-howlink'), elResTop = $('g-res-top');
  var bySlug = {}, byDomain = {};
  G.files.forEach(function (f) { bySlug[f.slug] = f; if (/^0[1-5]$/.test(f.id)) byDomain[+f.id.slice(1)] = f; });
  var cur = null, ready = {}, pendingHit = null, headings = [], spyRaf = 0, spyHold = null;
  /* acronym row ids: exact key, else case-insensitive (glossary "IPsec" vs table "IPSec") */
  var anchorLower = {};
  Object.keys(G.acronymAnchors).forEach(function (k) { anchorLower[k.toLowerCase()] = G.acronymAnchors[k]; });
  var META = G.acronymMeta || {}, metaLower = {};
  Object.keys(META).forEach(function (k) { metaLower[k.toLowerCase()] = META[k]; });
  function acrMeta(key) { return META[key] || metaLower[String(key).toLowerCase()] || null; }
  function acrAnchor(key) { return G.acronymAnchors[key] || anchorLower[String(key).toLowerCase()] || null; }
  var index = C.buildSearchIndex(G.sections.filter(function (s) { return s.file !== 'acronyms'; }), ACR);

  /* ---------- boot status ---------- */
  function setBoot() {
    var el = $('boot-status');
    if (el) el.textContent = 'files=' + G.files.length + ' sections=' + G.sections.length + ' acronyms=' + Object.keys(ACR).length + ' errors=' + (window.__errs || 0);
  }
  window.addEventListener('error', function () { window.__errs = (window.__errs || 0) + 1; setBoot(); }, true);
  window.addEventListener('unhandledrejection', function () { window.__errs = (window.__errs || 0) + 1; setBoot(); });

  /* ---------- readiness (same origin localStorage as the quiz) ---------- */
  function loadReadiness() {
    try { ready = C.readinessByObjective(JSON.parse(localStorage.getItem('secplus.attempts') || '[]')); } catch (e) { ready = {}; }
  }
  function objFromId(id) { var m = /^obj-(\d)-(\d+)$/.exec(id || ''); return m ? m[1] + '.' + m[2] : null; }
  function dotFor(obj) {
    var r = obj && ready[obj];
    if (!r) return '<span class="dot none" aria-hidden="true"></span>';
    var p = Math.round(r.pct * 100);
    return '<span class="dot ' + C.readinessLevel(r.pct) + '" title="' + p + '% over ' + r.count + ' question' + (r.count === 1 ? '' : 's') + '" role="img" aria-label="' + p + '% over ' + r.count + ' questions"></span>';
  }

  /* ---------- routing ---------- */
  function parseRoute() {
    var h = location.hash || '', qi = h.indexOf('?'), hl = null;
    if (qi >= 0) { h.slice(qi + 1).split('&').forEach(function (kv) { var i = kv.indexOf('='); if (kv.slice(0, i) === 'hl') { try { hl = decodeURIComponent(kv.slice(i + 1)); } catch (e) { hl = null; } } }); h = h.slice(0, qi); }
    var parts = h.replace(/^#\/?/, '').split('/').filter(Boolean).map(function (x) { try { return decodeURIComponent(x); } catch (e) { return x; } });
    if (parts[0] === 'highlights') return { page: 'highlights' };
    if (parts[0] === 'how-to') return { page: 'howto' };
    var f = bySlug[parts[0]];
    return { file: f || G.files[0], id: f ? parts[1] || null : null, hl: f ? hl : null };
  }
  function fileIndex(f) { return G.files.indexOf(f); }
  function go(slug, id) { location.hash = '#/' + slug + (id ? '/' + id : ''); }

  /* Programmatic scrolls glide (smooth) once the guide is up; the first render, a change of chapter or page (new content
     under the reader) and reduced-motion settings scroll instantly. */
  var booted = false;
  function motion(newContent) {
    return booted && !newContent && !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) ? 'smooth' : 'instant';
  }
  /* where the window will rest after scrolling `el` to the top (scroll-margin-top keeps it below the header) */
  function restY(el) {
    var top = el.getBoundingClientRect().top + window.scrollY - (parseFloat(getComputedStyle(el).scrollMarginTop) || 0);
    return Math.max(0, Math.min(top, document.documentElement.scrollHeight - window.innerHeight));
  }
  function onRoute() {
    var r = parseRoute();
    closeDrawer(); hideTip();
    if (r.page) {
      cur = null; page = r.page; headings = []; spyHold = null; confirmClear = false;
      if (page === 'highlights') renderHighlights(); else renderHowto();
      buildTree(); window.scrollTo(0, 0); remember(page === 'highlights' ? '#/highlights' : '#/how-to');
      document.title = (page === 'highlights' ? 'Highlighted' : 'How to use this guide') + ' · Sec+ 701 Guide'; return;
    }
    var how = motion(page !== null || r.file !== cur);
    page = null;
    if (r.file !== cur) { cur = r.file; renderFile(r.file); }
    var target = r.id && document.getElementById(r.id), hb = r.hl && Object.prototype.hasOwnProperty.call(blockByKey, r.hl) ? blockByKey[r.hl] : null;
    spyHold = null;
    if (target && elMain.contains(target)) {
      var el = hb ? hb.el : target;
      el.scrollIntoView({ block: 'start', behavior: how });
      /* near the end of a chapter the block cannot reach the top, so scrollspy would pick an earlier heading: keep the
         section marked while the window glides there and until the reader scrolls away */
      if (hb) { flashHL(hb.el); markCur(r.id); spyHold = { id: r.id, from: window.scrollY, to: restY(el) }; }
      if (target.tagName === 'TR') flash(target);
      document.title = headingText(target) + ' · Sec+ 701 Guide';
    } else {
      window.scrollTo({ top: 0, behavior: how });
      document.title = (r.file === G.files[0] ? 'Exam Overview' : r.file.title) + ' · Sec+ 701 Guide';
    }
    if (pendingHit) { var t = pendingHit; pendingHit = null; highlightHit(target, t, how); }
    spy();
  }
  function headingText(el) {
    if (el.tagName === 'TR') return (el.cells[0] ? el.cells[0].textContent : '') + ' (acronyms)';
    var c = el.cloneNode(true); var a = c.querySelector('.hanchor'); if (a) a.remove();
    return c.textContent.trim();
  }
  function flashHL(el) { clearTimeout(el._hlT); el.classList.add('hl-flash'); el._hlT = setTimeout(function () { el.classList.remove('hl-flash'); }, 1500); }
  function markCur(id) { var prev = elTree.querySelector('a.cur'); if (prev) prev.classList.remove('cur'); var a = elTree.querySelector('.nt-h2s a[data-id="' + id + '"]'); if (a) a.classList.add('cur'); }
  function flash(el) { el.classList.add('flash'); setTimeout(function () { el.classList.remove('flash'); }, 2200); }
  function highlightHit(startEl, token, how) {
    if (!token) return;
    var root = elMain.querySelector('.g-doc'), w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), n, started = !startEl, low = token.toLowerCase();
    while ((n = w.nextNode())) {
      if (!started) { if (startEl.contains(n) || (startEl.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING)) started = true; else continue; }
      var i = C.wordIndex(n.nodeValue.toLowerCase(), low);
      if (i < 0 || n.parentNode.closest('.hanchor')) continue;
      var rng = document.createRange(); rng.setStart(n, i); rng.setEnd(n, i + token.length);
      var m = document.createElement('mark'); m.className = 'hit'; rng.surroundContents(m);
      m.scrollIntoView({ block: 'center', behavior: how || 'instant' });
      setTimeout(function () { var p = m.parentNode; if (p) { p.replaceChild(document.createTextNode(m.textContent), m); p.normalize(); } }, 3500);
      return;
    }
  }

  /* ---------- content ---------- */
  function renderFile(f) {
    var i = fileIndex(f), prev = G.files[i - 1], next = G.files[i + 1], date = String(G.builtAt || '').slice(0, 10);
    var h = '<article class="g-doc" data-file="' + f.slug + '">' + f.html + '</article><nav class="g-pn" aria-label="Chapters">' +
      (prev ? '<a class="prev" href="#/' + prev.slug + '" rel="prev"><small>Previous</small>' + C.escHtml(prev.title) + '</a>' : '') +
      (next ? '<a class="next" href="#/' + next.slug + '" rel="next"><small>Next</small>' + C.escHtml(next.title) + '</a>' : '') + '</nav>' +
      '<p class="g-foot">Built from ' + REPO + ' @ ' + C.escHtml(G.sourceCommit) + ' · ' + C.escHtml(date) + ' · <a href="https://github.com/' + REPO + '/blob/main/' + f.src +
      '" target="_blank" rel="noopener">Edit this file on GitHub</a></p>';
    elMain.innerHTML = h;
    var doc = elMain.querySelector('.g-doc');
    Array.prototype.forEach.call(doc.querySelectorAll('table'), function (t) {
      var w = document.createElement('div'); w.className = 'table-wrap'; t.parentNode.insertBefore(w, t); w.appendChild(t);
    });
    Array.prototype.forEach.call(doc.querySelectorAll('h1,h2,h3,h4,h5,h6'), function (hd) {
      var a = document.createElement('a'); a.className = 'hanchor'; a.href = '#/' + f.slug + '/' + hd.id; a.textContent = '#';
      a.setAttribute('aria-label', 'Copy link to this section'); hd.appendChild(a);
    });
    addTips(doc, f);
    decorateBlocks(doc, f);
    headings = Array.prototype.slice.call(doc.querySelectorAll('h2,h3'));
    updateMarks();
    buildTree();
  }

  /* ---------- tooltips: wrap acronyms and objective references ---------- */
  var SKIP = 'pre,code,a,abbr,h1,script,style';
  function addTips(root, f) {
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), nodes = [], n;
    while ((n = w.nextNode())) {
      var p = n.parentNode;
      if (!n.nodeValue.trim() || p.closest(SKIP)) continue;
      if (f.slug === 'acronyms' && p.closest('td:first-child')) continue;
      nodes.push(n);
    }
    var opts = { objectives: OBJ };
    nodes.forEach(function (node) {
      var segs = C.tokenizeForTips(node.nodeValue, ACR, opts);
      if (segs.length === 1 && segs[0].type === 'text') return;
      var frag = document.createDocumentFragment();
      segs.forEach(function (s) {
        if (s.type === 'text') frag.appendChild(document.createTextNode(s.text));
        else if (s.type === 'acr') {
          var ab = document.createElement('abbr'); ab.className = 'tip'; ab.tabIndex = 0; ab.setAttribute('data-tip', s.expansion); ab.setAttribute('data-acr', s.key); ab.textContent = s.text; frag.appendChild(ab);
        } else {
          var df = byDomain[s.domain];
          if (!df) { frag.appendChild(document.createTextNode(s.text)); return; }
          var a = document.createElement('a'); a.className = 'xref'; a.href = '#/' + df.slug + '/obj-' + s.obj.replace('.', '-'); a.textContent = s.text;
          a.title = OBJ[s.domain] && OBJ[s.domain].objectives[s.obj] ? s.obj + ' ' + OBJ[s.domain].objectives[s.obj] : s.obj; frag.appendChild(a);
        }
      });
      node.parentNode.replaceChild(frag, node);
    });
  }

  var tipFor = null, hideTimer = 0, lastPointer = 'mouse', lastDown = 0;
  function showTip(el) {
    clearTimeout(hideTimer);
    if (tipFor && tipFor !== el) tipFor.classList.remove('on');
    tipFor = el; el.classList.add('on');
    var key = el.getAttribute('data-acr'), anchor = acrAnchor(key);
    var meta = acrMeta(key);
    elTip.innerHTML = '<b>' + C.escHtml(key) + '</b>' + C.escHtml(meta && meta.expansion || el.getAttribute('data-tip')) +
      (meta && meta.meaning ? '<span class="t-mean">' + C.escHtml(meta.meaning) + '</span>' : '') +
      (anchor ? '<a class="t-more" href="#/acronyms/' + anchor + '">Acronyms list ↗</a>' : '');
    el.setAttribute('aria-describedby', 'g-tooltip');
    elTip.hidden = false; placeTip();
  }
  function placeTip() {
    if (!tipFor) return;
    var vw = document.documentElement.clientWidth, vh = window.innerHeight, rects = tipFor.getClientRects(), r = rects.length ? rects[0] : tipFor.getBoundingClientRect();
    var gap = 8, tw = elTip.offsetWidth, th = elTip.offsetHeight;
    var left = Math.max(8, Math.min(r.left + r.width / 2 - tw / 2, vw - tw - 8));
    var below = r.bottom + gap + th <= vh - 4, top = below ? r.bottom + gap : r.top - gap - th;
    if (!below && top < 4) { top = Math.max(4, Math.min(r.bottom + gap, vh - th - 4)); below = top >= r.bottom; }
    elTip.style.left = left + 'px'; elTip.style.top = top + 'px';
    elTip.style.setProperty('--caret', Math.max(12, Math.min(r.left + r.width / 2 - left, tw - 12)) + 'px');
    elTip.className = 'tooltip ' + (below ? 'below' : 'above');
  }
  function hideTip() {
    clearTimeout(hideTimer);
    if (tipFor) { tipFor.classList.remove('on'); tipFor.removeAttribute('aria-describedby'); tipFor = null; }
    elTip.hidden = true;
  }
  function hideSoon() { clearTimeout(hideTimer); hideTimer = setTimeout(hideTip, 160); }
  document.addEventListener('pointerdown', function (e) { lastPointer = e.pointerType || 'mouse'; lastDown = Date.now(); }, true);
  /* a tap focuses the (tabindex=0) tip before its click: leave touch to the click toggle, or the tap shows and then hides it */
  function touchFocus() { return lastPointer === 'touch' && Date.now() - lastDown < 1000; }
  document.addEventListener('mouseover', function (e) {
    if (lastPointer === 'touch') return;
    var t = e.target.closest && e.target.closest('.tip');
    if (t) showTip(t); else if (e.target.closest && e.target.closest('#g-tooltip')) clearTimeout(hideTimer);
  });
  document.addEventListener('mouseout', function (e) {
    if (lastPointer === 'touch') return;
    if (e.target.closest && (e.target.closest('.tip') || e.target.closest('#g-tooltip'))) hideSoon();
  });
  document.addEventListener('focusin', function (e) { var t = e.target.closest && e.target.closest('.tip'); if (t && !touchFocus()) showTip(t); });
  document.addEventListener('focusout', function (e) { if (e.target.closest && e.target.closest('.tip')) hideSoon(); });
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('.tip');
    if (t && lastPointer === 'touch') { e.preventDefault(); if (tipFor === t) hideTip(); else showTip(t); }
    else if (!t && !(e.target.closest && e.target.closest('#g-tooltip'))) hideTip();
    else if (e.target.closest && e.target.closest('#g-tooltip a')) hideTip();
  });
  document.addEventListener('keydown', function (e) {
    var t = e.target;
    if (e.key === 'Enter' && t.classList && t.classList.contains('tip') && acrAnchor(t.getAttribute('data-acr'))) go('acronyms', acrAnchor(t.getAttribute('data-acr')));
  });
  window.addEventListener('scroll', function () {
    if (tipFor && document.activeElement === tipFor) placeTip(); else hideTip();
    if (!spyRaf) spyRaf = requestAnimationFrame(function () { spyRaf = 0; spy(); });
  }, { passive: true, capture: true });
  window.addEventListener('resize', function () { if (tipFor) placeTip(); measureHeader(); });

  /* ---------- sidebar tree + scrollspy ---------- */
  function buildTree() {
    var h = '<ul>', ls = liveStore(), counts = {};
    G.files.forEach(function (f) {
      var open = f === cur;
      var cn = C.sectionCounts(ls, f);
      h += '<li class="nt-file' + (open ? ' open' : '') + '"><a href="#/' + f.slug + '"' + (open ? ' aria-current="page"' : '') + '><span>' + C.escHtml(f.title) + '</span>' + badge(cn.total) + '</a>';
      if (open) counts = cn.byId;
      if (open) {
        h += '<ul class="nt-h2s">';
        var inH2 = false;
        f.toc.forEach(function (t) {
          if (t.level === 2) {
            if (inH2) h += '</ul></li>';
            h += '<li class="nt-h2" data-id="' + t.id + '"><a href="#/' + f.slug + '/' + t.id + '" data-id="' + t.id + '">' + dotFor(objFromId(t.id)) + '<span>' + C.escHtml(t.text) + '</span>' + badge(counts[t.id]) + '</a><ul class="nt-h3s">';
            inH2 = true;
          } else if (inH2) h += '<li class="nt-h3"><a href="#/' + f.slug + '/' + t.id + '" data-id="' + t.id + '"><span>' + C.escHtml(t.text) + '</span>' + badge(counts[t.id]) + '</a></li>';
        });
        if (inH2) h += '</ul></li>';
        h += '</ul>';
      }
      h += '</li>';
    });
    elTree.innerHTML = h + '</ul>';
    [[elHlink, 'highlights'], [elHow, 'howto']].forEach(function (x) { var on = page === x[1]; x[0].classList.toggle('cur', on); if (on) x[0].setAttribute('aria-current', 'page'); else x[0].removeAttribute('aria-current'); });
    elHlink.querySelector('.n').textContent = '(' + groupedHL().total + ')';
    renderWeak();
  }
  var LASTK = 'secplus.guide.last', lastSaved = null;
  function remember(hash) { if (hash === lastSaved) return; lastSaved = hash; try { localStorage.setItem(LASTK, hash); } catch (e) {} }
  function spy() {
    if (!headings.length) return;
    var line = (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--g-hdr')) || 57) + 24, act = null;
    for (var i = 0; i < headings.length; i++) { if (headings[i].getBoundingClientRect().top <= line) act = headings[i]; else break; }
    var id = act ? act.id : null, h2id = null;
    if (spyHold) {
      var y = window.scrollY;
      if (Math.abs(y - spyHold.to) < 2) spyHold.from = spyHold.to;  /* arrived: from here on any scroll releases the hold */
      if (y >= Math.min(spyHold.from, spyHold.to) - 2 && y <= Math.max(spyHold.from, spyHold.to) + 2) { act = document.getElementById(spyHold.id) || act; id = act ? act.id : id; } else spyHold = null;
    }
    if (act) { var k = headings.indexOf(act); while (k >= 0 && headings[k].tagName !== 'H2') k--; h2id = k >= 0 ? headings[k].id : null; }
    if (cur) remember('#/' + cur.slug + (id ? '/' + id : ''));
    Array.prototype.forEach.call(elTree.querySelectorAll('.nt-h2'), function (li) { li.classList.toggle('active', li.getAttribute('data-id') === h2id); });
    var prev = elTree.querySelector('a.cur'); if (prev && prev.getAttribute('data-id') === id) return;
    if (prev) prev.classList.remove('cur');
    var a = id && elTree.querySelector('.nt-h2s a[data-id="' + id + '"]');
    if (a) { a.classList.add('cur'); revealCur(); }
  }
  /* Scroll the sidebar so the current outline entry is in view. Not while search results cover the outline: the hidden
     entry has no box, and the arithmetic would throw the results list back to the top. */
  function revealCur() {
    var a = elTree.querySelector('a.cur'); if (!a || elTree.hidden) return;
    var sb = sideView(), ab = a.getBoundingClientRect();
    if (ab.top < sb.top + 60 || ab.bottom > sb.bottom - 20) elSide.scrollTo({ top: elSide.scrollTop + ab.top - sb.top - sb.height / 3, behavior: motion() });
  }
  function renderWeak() {
    var weak = C.weakSpots(ready, 5), h = '<h2>Weak spots</h2>';
    if (!Object.keys(ready).length) h += '<p>Answer some practice questions and your weakest objectives show up here.</p>';
    else {
      h += '<ul>';
      weak.forEach(function (w) {
        var d = w.obj.split('.')[0], f = byDomain[d], title = OBJ[d] && OBJ[d].objectives[w.obj] || '';
        if (!f) return;
        h += '<li><a href="#/' + f.slug + '/obj-' + w.obj.replace('.', '-') + '" title="' + C.escHtml(title) + '">' + dotFor(w.obj) + '<span>' + w.obj + ' ' + C.escHtml(title.length > 34 ? title.slice(0, 33) + '…' : title) +
          '</span><span class="w-pct">' + Math.round(w.pct * 100) + '%</span></a></li>';
      });
      h += '</ul>';
    }
    elWeak.innerHTML = h;
  }
  function refreshReadiness() { loadReadiness(); syncHL(); return refreshReadiness2(); }
  function refreshReadiness2() { buildTree(); spy(); }
  window.addEventListener('focus', refreshReadiness);
  /* another tab changed the store: also redraw the Highlighted page if it is open (not on focus: that would drop keyboard focus) */
  window.addEventListener('storage', function (e) { refreshReadiness(); if (page === 'highlights' && (!e.key || e.key === HLK)) renderHighlights(); });

  /* ---------- search UI ---------- */
  var results = [], sel = -1, qTimer = 0;
  function runSearch() {
    var q = elQ.value;
    if (!q.trim()) { clearResults(); return; }
    var r = C.search(index, q), h = '';
    results = [];
    if (r.acronyms.length) {
      h += '<div class="g-res-group" role="presentation">Acronyms</div>';
      r.acronyms.forEach(function (a) {
        var i = results.push({ href: '#/acronyms/' + (acrAnchor(a.key) || ''), hit: null }) - 1;
        h += '<a class="g-res" role="option" id="g-r' + i + '" data-i="' + i + '" href="' + results[i].href + '"><span class="r-key">' + C.escHtml(a.key) + '</span><span class="r-exp">' + C.escHtml(a.expansion) + '</span></a>';
      });
    }
    if (r.sections.length) {
      h += '<div class="g-res-group" role="presentation">Sections</div>';
      r.sections.forEach(function (s) {
        var i = results.push({ href: '#/' + s.section.file + '/' + s.section.id, hit: s.bodyHit ? s.token : null }) - 1;
        h += '<a class="g-res" role="option" id="g-r' + i + '" data-i="' + i + '" href="' + results[i].href + '"><span class="r-path">' + C.escHtml(s.section.path) + '</span><span class="r-title">' + s.titleHtml +
          '</span><span class="r-snip">' + s.snippet + '</span></a>';
      });
    }
    if (!results.length) h = '<p class="g-empty">No matches.</p>';
    elRes.innerHTML = h; elRes.hidden = false; elTree.hidden = true; elWeak.hidden = true; elQ.setAttribute('aria-expanded', 'true');
    $('g-res-count').textContent = results.length ? results.length + (results.length === 1 ? ' result' : ' results') : 'No results'; elResTop.hidden = false;
    sel = results.length ? 0 : -1; markSel();
  }
  function markSel() {
    Array.prototype.forEach.call(elRes.querySelectorAll('.g-res'), function (a) { a.setAttribute('aria-selected', String(+a.getAttribute('data-i') === sel)); });
    var a = sel >= 0 && $('g-r' + sel);
    if (a) { elQ.setAttribute('aria-activedescendant', a.id); var sb = sideView(), ab = a.getBoundingClientRect(); if (ab.top < sb.top || ab.bottom > sb.bottom) a.scrollIntoView({ block: 'nearest', behavior: motion() }); }
    else elQ.removeAttribute('aria-activedescendant');
  }
  function clearResults() {
    results = []; sel = -1; elRes.hidden = true; elRes.innerHTML = ''; elResTop.hidden = true; elTree.hidden = false; elWeak.hidden = false; elQ.setAttribute('aria-expanded', 'false'); elQ.removeAttribute('aria-activedescendant');
    revealCur();
  }
  function openResult(i) {
    var r = results[i]; if (!r) return;
    pendingHit = r.hit;
    var same = location.hash === r.href;
    location.hash = r.href;
    if (same) onRoute();
    /* the query and its results stay in the sidebar so the reader can work through them; "Back to outline", Escape or an
       empty box return to the chapter list */
    sel = i; markSel(); elQ.blur();
  }
  elQ.addEventListener('input', function () { clearTimeout(qTimer); qTimer = setTimeout(runSearch, 80); });
  elQ.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (!results.length) return;
      e.preventDefault(); sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + results.length) % results.length; markSel();
    } else if (e.key === 'Enter') {
      clearTimeout(qTimer); if (!elRes.hidden || elQ.value.trim()) { if (elRes.hidden) runSearch(); e.preventDefault(); openResult(sel); }
    } else if (e.key === 'Escape') { backToOutline(); }
  });
  elRes.addEventListener('click', function (e) {
    var a = e.target.closest('.g-res'); if (!a) return;
    e.preventDefault(); openResult(+a.getAttribute('data-i'));
  });
  function backToOutline() { clearTimeout(qTimer); elQ.value = ''; clearResults(); }
  $('g-res-back').addEventListener('click', function () { backToOutline(); elQ.focus(); });


  /* ---------- paragraph highlights ---------- */
  var HLK = 'secplus.highlights', hl = Object.create(null), blockByKey = {}, liveCache = {};
  var MARKER = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false"><path d="M9.5 2.5l4 4-6 6H3.5v-4z M8 4l4 4 M2.5 14h11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function loadHL() {
    hl = Object.create(null);   /* no prototype: a stored key such as "__proto__" or "constructor" stays plain data */
    try {
      var o = JSON.parse(localStorage.getItem(HLK) || '{}');
      if (o && typeof o === 'object' && !Array.isArray(o)) Object.keys(o).forEach(function (k) { var e = o[k]; if (k !== '__proto__' && e && typeof e === 'object' && typeof e.file === 'string' && typeof e.text === 'string') hl[k] = e; });
    } catch (e) { hl = Object.create(null); }
  }
  /* false when the browser refuses (quota, private mode, storage disabled): the change still applies for this visit */
  function saveHL() { try { localStorage.setItem(HLK, JSON.stringify(hl)); return true; } catch (e) { return false; } }
  function plainText(s) { return String(s).replace(/\s+/g, ' ').trim(); }
  function headingPlain(el) { var c = el.cloneNode(true); Array.prototype.forEach.call(c.querySelectorAll('.hanchor,.hl-mark'), function (x) { x.remove(); }); return plainText(c.textContent); }
  function blockText(el) {
    if (el.tagName === 'TR') return plainText(Array.prototype.map.call(el.cells, function (c) { return plainText(c.textContent); }).join(' | '));
    /* concatenate without separators: the rendered page splits text nodes around tooltips (<abbr>), the detached parse does not,
       and both must give the same text (and key); a nested list is left out (its items are blocks of their own) */
    if (el.tagName === 'LI') { var t = ''; Array.prototype.forEach.call(el.childNodes, function (n) { if (n.nodeType === 3 || (n.nodeType === 1 && !/^(UL|OL)$/.test(n.tagName))) t += n.textContent; }); return plainText(t); }
    return plainText(el.textContent);
  }
  /* highlightable blocks of a chapter in document order (same walk for the rendered page and for a detached parse of the chapter) */
  function scanBlocks(root, slug) {
    var els = root.querySelectorAll('h1,h2,h3,p,li,blockquote,tr'), sec = { id: '', text: '' }, seen = {}, out = [];
    Array.prototype.forEach.call(els, function (el) {
      var tag = el.tagName;
      if (tag === 'H1' || tag === 'H2' || tag === 'H3') { sec = { id: el.id, text: headingPlain(el) }; return; }
      if (tag === 'TR') { if (!el.cells.length || (el.parentNode && el.parentNode.tagName === 'THEAD')) return; }
      else if (el.closest('tr')) return;
      if (tag === 'P' && el.parentNode.closest && el.parentNode.closest('blockquote,li')) return;
      var text = blockText(el); if (!text) return;
      var base = C.hlKey(slug, sec.id, text), n = seen[base] = (seen[base] || 0) + 1;
      /* saved text: first 300 chars, with an ellipsis when cut (the key always uses the full text) */
      out.push({ el: el, key: n > 1 ? base + '~' + n : base, text: text.length > 300 ? text.slice(0, 299).replace(/\s+$/, '') + '…' : text, section: sec.id, heading: sec.text });
    });
    return out;
  }
  function decorateBlocks(doc, f) {
    blockByKey = {};
    scanBlocks(doc, f.slug).forEach(function (b) {
      blockByKey[b.key] = b;
      var el = b.el, isRow = el.tagName === 'TR', host = isRow ? el.cells[0] : el, btn = document.createElement('button');
      el.setAttribute('data-hl', b.key); el.classList.add(isRow ? 'hl-row' : 'hl-block'); if (isRow) host.classList.add('hl-host');
      btn.type = 'button'; btn.className = 'hl-btn'; btn.innerHTML = MARKER; b.btn = btn;
      host.insertBefore(btn, host.firstChild);
      setPressed(b, !!hl[b.key]);
    });
  }
  function setPressed(b, on) {
    b.el.classList.toggle('hl-on', on);
    b.btn.setAttribute('aria-pressed', String(on));
    b.btn.setAttribute('aria-label', on ? 'Remove highlight' : 'Highlight this paragraph');
    b.btn.title = on ? 'Remove highlight' : 'Highlight this paragraph';
  }
  /* keys of every block in the current build, for the chapters that have saved highlights: {key: order} */
  function liveMap() {
    var need = {}, live = {};
    Object.keys(hl).forEach(function (k) { need[hl[k].file] = true; });
    G.files.forEach(function (f, fi) {
      if (!need[f.slug]) return;
      var keys = liveCache[f.slug];
      if (!keys) { var d = document.createElement('div'); d.innerHTML = f.html; keys = liveCache[f.slug] = scanBlocks(d, f.slug).map(function (b) { return b.key; }); }
      keys.forEach(function (k, i) { live[k] = fi * 100000 + i; });
    });
    return live;
  }
  function groupedHL() { return C.groupHighlights(hl, G, liveMap()); }
  function liveStore() { var live = liveMap(), o = {}; Object.keys(hl).forEach(function (k) { if (live.hasOwnProperty(k)) o[k] = hl[k]; }); return o; }
  function badge(n) { return n ? '<span class="hl-badge" title="' + n + ' highlighted">' + n + '</span>' : ''; }
  function updateMarks() {
    if (!cur) return;
    var cn = C.sectionCounts(liveStore(), cur).byId;
    headings.forEach(function (h) {
      var old = h.querySelector('.hl-mark'); if (old) old.remove();
      var n = cn[h.id]; if (!n) return;
      var m = document.createElement('span'); m.className = 'hl-mark'; m.title = n + ' highlighted'; m.setAttribute('role', 'img'); m.setAttribute('aria-label', n + ' highlighted'); m.innerHTML = MARKER;
      var a = h.querySelector('.hanchor'); h.insertBefore(m, a || null);
    });
  }
  function refreshHL() { updateMarks(); buildTree(); spy(); }
  function toggleHL(key) {
    var b = blockByKey[key]; if (!b || !cur) return;
    if (hl[key]) { delete hl[key]; elLive.textContent = 'Highlight removed'; }
    else { hl[key] = { file: cur.slug, section: b.section, heading: b.heading, text: b.text, at: new Date().toISOString() }; elLive.textContent = 'Highlighted'; }
    var saved = saveHL(); setPressed(b, !!hl[key]); refreshHL();
    if (!saved) elLive.textContent += ' (not saved: this browser blocks storage)';
  }
  function syncHL() {
    loadHL();
    Object.keys(blockByKey).forEach(function (k) { setPressed(blockByKey[k], !!hl[k]); });
    if (cur) updateMarks();
  }
  elMain.addEventListener('click', function (e) {
    var b = e.target.closest('.hl-btn'); if (!b) return;
    var host = b.closest('[data-hl]'); if (host) toggleHL(host.getAttribute('data-hl'));
  });

  /* ---------- Highlighted page ---------- */
  var confirmClear = false;
  function renderHighlights() {
    var res = groupedHL(), h = '<section class="g-hlpage"><h1>Highlighted</h1>';
    h += '<div class="hl-toolbar"><button type="button" class="btn small" data-act="hl-export"' + (res.total ? '' : ' disabled') + '>Export as Markdown</button>';
    if (confirmClear && res.total) h += '<span class="hl-confirm">Remove all ' + res.total + ' highlights? <button type="button" class="btn small danger" data-act="hl-clear-yes">Yes, clear all</button> <button type="button" class="btn small" data-act="hl-clear-no">Cancel</button></span>';
    else h += '<button type="button" class="btn small danger" data-act="hl-clear"' + (res.total ? '' : ' disabled') + '>Clear all</button>';
    h += '</div>';
    function item(it, file, sec, canView, flashIt) {
      return '<li class="hl-item" data-key="' + C.escHtml(it.key) + '"><p class="hl-text">' + C.escHtml(it.text) + '</p><div class="hl-actions">' +
        (canView ? '<a class="hl-go" href="#/' + file + '/' + encodeURIComponent(sec) + (flashIt ? '?hl=' + encodeURIComponent(it.key) : '') + '">View in context</a>' : '') +
        '<button type="button" class="btn small" data-act="hl-remove" data-key="' + C.escHtml(it.key) + '">Remove</button></div></li>';
    }
    if (!res.total) h += '<p class="hl-empty">Nothing highlighted yet. Hover a paragraph, list item, callout or table row in any chapter and press the marker button in the left margin (always visible on touch screens). Highlights are saved in this browser only.</p>';
    res.groups.forEach(function (g) {
      h += '<h2 class="hl-chap">' + C.escHtml(g.title) + '</h2>';
      g.sections.forEach(function (s) {
        h += '<h3 class="hl-sec">' + C.escHtml(s.heading) + '</h3><ul class="hl-items">';
        s.items.forEach(function (it) { h += item(it, g.file, s.id, true, true); });
        h += '</ul>';
      });
    });
    if (res.orphans.length) {
      h += '<h2 class="hl-chap">No longer found</h2><p class="hl-note">The text of these paragraphs changed in a newer version of the guide.</p><ul class="hl-items">';
      res.orphans.forEach(function (it) { h += item(it, it.file, it.section, it.canView, false); });
      h += '</ul>';
    }
    elMain.innerHTML = h + '</section>';
  }
  function renderHowto() { elMain.innerHTML = '<section class="g-howto">' + $('g-howto').innerHTML + '</section>'; }
  function exportMd() {
    var md = C.highlightsMarkdown(groupedHL()), blob = new Blob([md], { type: 'text/markdown' }), url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = 'secplus-highlights.md'; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { try { URL.revokeObjectURL(url); } catch (e) {} }, 1500);
  }
  elMain.addEventListener('click', function (e) {
    var b = e.target.closest('[data-act]'); if (!b || cur) return;
    var act = b.getAttribute('data-act');
    if (act === 'hl-remove') { delete hl[b.getAttribute('data-key')]; saveHL(); }
    else if (act === 'hl-export') { exportMd(); return; }
    else if (act === 'hl-clear') { confirmClear = true; renderHighlights(); var y = elMain.querySelector('[data-act=hl-clear-yes]'); if (y) y.focus(); return; }
    else if (act === 'hl-clear-no') { confirmClear = false; renderHighlights(); return; }
    else if (act === 'hl-clear-yes') { hl = Object.create(null); saveHL(); confirmClear = false; }
    else return;
    renderHighlights(); buildTree();
  });

  /* ---------- drawer, keys, copy-link ---------- */
  function openDrawer() { elSide.classList.add('open'); elBack.hidden = false; elMenu.setAttribute('aria-expanded', 'true'); elMenu.setAttribute('aria-label', 'Back to the page'); }
  function closeDrawer() { elSide.classList.remove('open'); elBack.hidden = true; elMenu.setAttribute('aria-expanded', 'false'); elMenu.setAttribute('aria-label', 'Contents'); }
  elMenu.addEventListener('click', function () { if (elSide.classList.contains('open')) closeDrawer(); else openDrawer(); });
  elBack.addEventListener('click', closeDrawer);
  elSide.addEventListener('click', function (e) { if (e.target.closest('.nt-h2s a, .nt-file > a, .g-weak a, .g-hlink')) closeDrawer(); });
  function typing(t) { return t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable); }
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'Escape') {
      hideTip();
      if (elSide.classList.contains('open') && elRes.hidden) { closeDrawer(); elMenu.focus(); }
      if (!elRes.hidden || elQ.value) backToOutline();
      return;
    }
    if (typing(e.target)) return;
    if (e.key === '/') { e.preventDefault(); if (window.innerWidth < 900) openDrawer(); elQ.focus(); elQ.select(); }
    else if (e.key === '[' || e.key === ']') {
      if (!cur) return;
      var f = G.files[fileIndex(cur) + (e.key === ']' ? 1 : -1)]; if (f) go(f.slug);
    }
  });
  elMain.addEventListener('click', function (e) {
    var a = e.target.closest('.hanchor'); if (!a) return;
    e.preventDefault();
    var url = location.href.split('#')[0] + a.getAttribute('href');
    location.hash = a.getAttribute('href');
    try { navigator.clipboard.writeText(url).then(function () { elLive.textContent = 'Link copied'; }, function () {}); } catch (err) { /* file:// or no clipboard: the address bar has it */ }
  });

  /* ---------- init ---------- */
  /* Visible part of the sidebar: on desktop its scroll box runs under the sticky header, so the top edge is the header's bottom. */
  function sideView() {
    var sb = elSide.getBoundingClientRect(), h = document.querySelector('.site-header'), hb = h ? h.getBoundingClientRect().bottom : 0;
    var top = Math.max(sb.top, hb); return { top: top, bottom: sb.bottom, height: sb.bottom - top };
  }
  function measureHeader() { var h = document.querySelector('.site-header'); if (h) document.documentElement.style.setProperty('--g-hdr', h.offsetHeight + 'px'); }
  measureHeader(); loadReadiness(); loadHL();
  if (!location.hash || location.hash === '#') {
    var last = null; try { last = localStorage.getItem(LASTK); } catch (e) {}
    if (last && /^#\/[\w-]+(\/[\w-]+)?$/.test(last)) history.replaceState(null, '', last);  /* no hashchange event: onRoute below renders it */
  }
  window.addEventListener('hashchange', onRoute);
  onRoute();
  booted = true;
  document.documentElement.dataset.ready = '1';
  setBoot();
})();
