/* Router, session lifecycle, timer, event wiring. */
(function () {
  'use strict';
  var bank = window.SEC_BANK || [], pbqBank = window.SEC_PBQ || [], EXAM = window.SEC_EXAM;
  var qmap = {};
  bank.concat(pbqBank).forEach(function (q) { qmap[q.id] = q; });
  var appEl = document.getElementById('app');
  var S = { session: null, qstats: {}, settings: {}, showReview: false, filter: 'all', filterFor: null, msg: '', routeKey: '', focusId: null, notice: null };

  /* ---------- boot status / error counter ---------- */
  function setBoot() {
    var el = document.getElementById('boot-status');
    if (el) el.textContent = 'mcq=' + bank.length + ' pbq=' + pbqBank.length + ' errors=' + (window.__errs || 0);
  }
  window.addEventListener('error', function () { window.__errs = (window.__errs || 0) + 1; setBoot(); }, true);
  window.addEventListener('unhandledrejection', function () { window.__errs = (window.__errs || 0) + 1; setBoot(); });

  function now() { return Date.now(); }
  function uid() { return 'a' + now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function saveSession() { Store.setSession(S.session); }
  function questionsOf(s) { return s.qids.map(function (id) { return qmap[id]; }).filter(Boolean); }

  /* ---------- theme ---------- */
  function applyTheme() {
    var t = S.settings.theme, r = document.documentElement;
    if (t === 'light' || t === 'dark') r.setAttribute('data-theme', t); else r.removeAttribute('data-theme');
  }

  /* ---------- timer ---------- */
  function wantRunning() {
    var s = S.session;
    if (!s || s.timer.paused) return false;
    if (S.settings.strictTimer) return true;
    return currentRoute().name === 'quiz' && document.visibilityState !== 'hidden';
  }
  /* Storage is the source of truth (every change is saved immediately); re-read before timer bookkeeping so a
     stale in-memory copy (other tab, unload) never overwrites a newer stored session. */
  function refresh() { S.session = Store.getSession(); return S.session; }
  function syncTimer() {
    var s = refresh(); if (!s) return;
    var run = wantRunning(), t = s.timer, changed = false;
    if (run && !t.runningSince) { Engine.Timer.start(t, now()); changed = true; }
    else if (!run && t.runningSince) { Engine.Timer.fold(t, now()); changed = true; }
    if (changed) saveSession();
  }
  function timerText() {
    var t = S.session.timer, n = now();
    return Engine.fmtClock(t.limitMs != null ? Math.ceil(Engine.Timer.remaining(t, n) / 1000) * 1000 : Math.floor(Engine.Timer.elapsed(t, n) / 1000) * 1000);
  }
  function tick() {
    var s = refresh(); if (!s) return;
    if (Engine.Timer.expired(s.timer, now())) { finish(true); return; }
    /* heartbeat: lets a crashed/killed tab be folded up to the last moment it was alive */
    if (s.timer.runningSince && now() - (s.timer.lastBeat || 0) > 2000) { s.timer.lastBeat = now(); saveSession(); }
    var el = document.getElementById('timer');
    if (el) {
      el.textContent = timerText();
      var t = s.timer;
      el.classList.toggle('low', t.limitMs != null && Engine.Timer.remaining(t, now()) < 5 * 60000);
    }
  }
  setInterval(tick, 500);
  document.addEventListener('visibilitychange', function () { syncTimer(); tick(); });
  /* Leaving/reloading the page: fold the running clock so no time is lost or over-counted (strict mode keeps running). */
  window.addEventListener('pagehide', function () {
    /* fold the stored copy (another tab may have finished or replaced this session; never resurrect a stale one) */
    var st = Store.getSession();
    if (st && st.timer && st.timer.runningSince && !S.settings.strictTimer) { Engine.Timer.fold(st.timer, now()); Store.setSession(st); }
  });

  /* ---------- routing ---------- */
  function currentRoute() {
    var h = (location.hash || '#/').replace(/^#\/?/, '');
    var p = h.split('/');
    return { name: p[0] || 'home', arg: p[1] };
  }
  function go(hash) { if (location.hash === hash) route(); else location.hash = hash; }

  function route() {
    var r = currentRoute(), html = '', key = r.name + '/' + (r.arg || '');
    S.session = Store.getSession();
    var all = bank.concat(pbqBank);
    switch (r.name) {
      case 'home': html = UI.home(homeCtx()); break;
      case 'module':
        var d = +r.arg;
        if (!window.SEC_OBJECTIVES[d]) { html = UI.notFound(); break; }
        html = UI.moduleSetup(d, bank.filter(function (q) { return q.domain === d; }).length, pbqBank.filter(function (q) { return q.domain === d; }).length); break;
      case 'final': html = UI.finalSetup(bank.length > 0, EXAM); break;
      case 'drill':
        var miss = Engine.missedIds(all, S.qstats), by = {};
        miss.forEach(function (id) { by[qmap[id].domain] = (by[qmap[id].domain] || 0) + 1; });
        html = UI.drillSetup(by, miss.length); break;
      case 'quiz':
        if (!S.session || !questionsOf(S.session).length) { go('#/'); return; }
        html = quizHtml(); break;
      case 'results': html = resultsHtml(r.arg); break;
      case 'history': html = historyHtml(); break;
      case 'settings': html = UI.settings({ settings: S.settings, msg: S.msg }); break;
      default: html = UI.notFound();
    }
    syncTimer();
    paint(html, key);
  }

  function paint(html, key) {
    var active = document.activeElement, focusId = S.focusId || (active && active.id) || null, sameRoute = key === S.routeKey;
    S.focusId = null; S.routeKey = key;
    appEl.innerHTML = html;
    if (!sameRoute) {
      window.scrollTo(0, 0);
      var h1 = appEl.querySelector('h1'); if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
    } else if (focusId) {
      var el = document.getElementById(focusId);
      if (el && !el.disabled) el.focus({ preventScroll: true });
    }
  }
  function rerender() { route(); }

  /* ---------- contexts ---------- */
  function homeCtx() {
    var atts = Store.getAttempts(), doms = {};
    [1, 2, 3, 4, 5].forEach(function (d) {
      var mods = atts.filter(function (a) { return a.type === 'module' && a.domain === d; }).sort(function (a, b) { return a.finishedAt - b.finishedAt; });
      doms[d] = { count: bank.filter(function (q) { return q.domain === d; }).length, last: mods.length ? mods[mods.length - 1].pct : null, ready: Engine.readiness(atts, d) };
    });
    var fin = atts.filter(function (a) { return a.type === 'final'; });
    return { session: S.session, domains: doms, missed: Engine.missedIds(bank.concat(pbqBank), S.qstats).length,
      finalBest: fin.length ? Math.max.apply(null, fin.map(function (a) { return a.scaled; })) : null };
  }

  function quizCtx() {
    var s = S.session;
    s.idx = Math.max(0, Math.min(s.idx, s.qids.length - 1));
    var q = qmap[s.qids[s.idx]], practice = s.mode === 'practice', ans = s.answers[q.id];
    /* count the presentation once per session (s.seen survives reloads, so no double counting) */
    if (!s.timer.paused) {
      s.seen = s.seen || {};
      if (!s.seen[q.id]) { Engine.markSeen(S.qstats, q.id, now()); Store.setQstats(S.qstats); s.seen[q.id] = 1; saveSession(); }
    }
    var cells = s.qids.map(function (id) { return { answered: Engine.isAnswered(qmap[id], s.answers[id]), flagged: !!s.flags[id] }; });
    return { session: s, q: q, idx: s.idx, practice: practice, answer: ans, locked: practice && !!s.checked[q.id],
      order: (q.type === 'single' || q.type === 'multi') ? Engine.optionOrder(q, s.id) : null,
      flagged: !!s.flags[q.id], hasAnswer: Engine.isAnswered(q, ans) || q.type === 'order', result: Engine.scoreQuestion(q, ans, s.id),
      cells: cells, showReview: S.showReview, timerText: timerText(), notice: S.notice && S.notice.id === q.id ? S.notice.text : '' };
  }
  function quizHtml() { return UI.quiz(quizCtx()); }

  function resultsHtml(id) {
    var a = Store.getAttempts().filter(function (x) { return x.id === id; })[0];
    if (!a) return UI.notFound();
    if (S.filterFor !== id) { S.filter = 'all'; S.filterFor = id; }
    var items = [];
    a.items.forEach(function (it, i) {
      var q = qmap[it.id]; if (!q) return;
      var o = { n: i + 1, q: q, answer: it.answer, flagged: it.flagged, points: it.points, correct: it.correct, answered: it.answered };
      if (S.filter === 'missed' && it.correct) return;
      if (S.filter === 'flagged' && !it.flagged) return;
      items.push(o);
    });
    return UI.results({ attempt: a, items: items, filter: S.filter, weak: Engine.weakestObjectives(a.perObjective, 5),
      missedCount: a.items.filter(function (i) { return !i.correct && qmap[i.id]; }).length });
  }

  function historyHtml() {
    var atts = Store.getAttempts(), dom = {};
    [1, 2, 3, 4, 5].forEach(function (d) {
      var m = atts.filter(function (a) { return a.type === 'module' && a.domain === d; }).sort(function (a, b) { return a.finishedAt - b.finishedAt; });
      var l3 = m.slice(-3);
      dom[d] = { n: m.length, best: m.length ? Math.max.apply(null, m.map(function (a) { return a.pct; })) : 0,
        avg3: l3.length ? l3.reduce(function (t, a) { return t + a.pct; }, 0) / l3.length : 0, ready: Engine.readiness(atts, d) };
    });
    var fin = atts.filter(function (a) { return a.type === 'final'; });
    return UI.history({ attempts: atts.slice().sort(function (a, b) { return b.finishedAt - a.finishedAt; }), dom: dom,
      final: { n: fin.length, best: fin.length ? Math.max.apply(null, fin.map(function (a) { return a.scaled; })) : 0, passes: fin.filter(function (a) { return a.pass; }).length } });
  }

  /* ---------- session lifecycle ---------- */
  function startSession(type, o) {
    var id = uid();
    var qids = Engine.buildSession({ type: type === 'retry' ? 'ids' : type, domain: o.domain, count: o.count, includePBQs: o.includePBQs, ids: o.ids,
      bank: bank, pbq: pbqBank, qstats: S.qstats, exam: EXAM, rng: Engine.makeRng(id + ':select:' + Math.random()) });
    if (!qids.length) { alert('No questions available for that selection.'); return; }
    S.session = { id: id, type: type === 'retry' ? 'drill' : type, domain: o.domain || null, mode: o.mode, startedAt: now(), qids: qids,
      answers: {}, flags: {}, checked: {}, idx: 0, timer: Engine.Timer.create(type === 'final' ? EXAM.minutes * 60000 : null) };
    S.showReview = false;
    Engine.Timer.start(S.session.timer, now());
    saveSession();
    go('#/quiz');
  }

  function finish(auto) {
    var s = S.session; if (!s) return;
    var t = now();
    Engine.Timer.fold(s.timer, t);
    var qs = questionsOf(s), sc = Engine.scoreSession(qs, s.answers, EXAM.passScaled, s.id);
    var attempt = { id: s.id, type: s.type, domain: s.domain, mode: s.mode, startedAt: s.startedAt, finishedAt: t, durationMs: s.timer.elapsedMs, auto: !!auto,
      points: sc.points, total: sc.total, pct: sc.pct, scaled: sc.scaled, pass: sc.pass, perDomain: sc.perDomain, perObjective: sc.perObjective,
      items: sc.items.map(function (it) { return { id: it.id, answer: s.answers[it.id] === undefined ? null : s.answers[it.id], flagged: !!s.flags[it.id], points: it.points, correct: it.correct, answered: it.answered }; }) };
    Engine.applyStats(S.qstats, sc.items, t, s.seen || {});
    Store.setQstats(S.qstats);
    Store.addAttempt(attempt);
    S.session = null; Store.setSession(null);
    S.showReview = false;
    go('#/results/' + attempt.id);
  }

  function submitClick() {
    var s = S.session, un = s.qids.filter(function (id) { return !Engine.isAnswered(qmap[id], s.answers[id]); }).length;
    var msg = un ? 'You have ' + un + ' unanswered question' + (un === 1 ? '' : 's') + '. Submit anyway?' : 'Submit your answers now?';
    if (window.confirm(msg)) finish(false);
  }

  /* ---------- quiz actions ---------- */
  function curQ() { return qmap[S.session.qids[S.session.idx]]; }
  function isLocked() { var s = S.session, q = curQ(); return s.mode === 'practice' && s.checked[q.id]; }
  function selectOption(orig) {
    var s = S.session, q = curQ();
    if (!q.options || isLocked() || s.timer.paused) return;
    var cur = (s.answers[q.id] || []).slice();
    S.notice = null;
    if (q.type === 'multi') {
      var i = cur.indexOf(orig);
      if (i >= 0) cur.splice(i, 1);
      else if (cur.length >= q.answer.length) {
        S.notice = { id: q.id, text: 'You can choose only ' + q.answer.length + '. Clear one of your choices first.' };
        S.focusId = 'o' + orig; rerender(); return;
      } else cur.push(orig);
      cur.sort(function (a, b) { return a - b; });
    }
    else cur = [orig];
    s.answers[q.id] = cur;
    S.focusId = 'o' + orig;
    saveSession(); rerender();
  }
  function setIdx(i) {
    var s = S.session; if (i < 0 || i >= s.qids.length) return;
    s.idx = i; S.notice = null; saveSession(); rerender(); window.scrollTo(0, 0);
  }
  function toggleFlag() { var s = S.session, id = curQ().id; if (s.flags[id]) delete s.flags[id]; else s.flags[id] = true; saveSession(); rerender(); }
  function check() {
    var s = S.session, q = curQ();
    if (s.mode !== 'practice') return;
    /* an untouched order PBQ: the displayed order is the answer being checked */
    if (q.type === 'order' && !Engine.isAnswered(q, s.answers[q.id])) s.answers[q.id] = PBQ.currentOrder(q, null, s.id).slice();
    if (!Engine.isAnswered(q, s.answers[q.id])) return;
    s.checked[q.id] = true; saveSession(); rerender();
  }
  function togglePause() {
    var s = S.session, t = s.timer;
    if (t.paused) Engine.Timer.unpause(t, now()); else Engine.Timer.pause(t, now());
    saveSession(); syncTimer(); rerender();
  }

  /* ---------- events ---------- */
  function formVal(form, name) { var el = form.querySelector('[name="' + name + '"]:checked'); return el ? el.value : null; }
  function countVal(v) { return v === 'all' ? 'all' : +v; }

  appEl.addEventListener('click', function (e) {
    var t = e.target;
    var pb = t.closest && t.closest('button[data-pbq]');
    if (pb && S.session) {
      if (isLocked()) return;
      var q = curQ(), na = PBQ.handle(q, S.session.answers[q.id], pb, S.session.id);
      if (na) {
        S.session.answers[q.id] = na;
        var np = +pb.getAttribute('data-pos') + (+pb.getAttribute('data-dir'));
        S.focusId = 'po' + np + (pb.getAttribute('data-dir') === '-1' ? 'u' : 'd');
        saveSession(); rerender();
      }
      return;
    }
    var el = t.closest && t.closest('[data-act]');
    if (!el || el.tagName === 'INPUT') return;
    var act = el.getAttribute('data-act');
    switch (act) {
      case 'start-module': e.preventDefault(); var f = el.closest('form');
        startSession('module', { domain: +f.getAttribute('data-domain'), count: countVal(formVal(f, 'count')), mode: formVal(f, 'mode'), includePBQs: f.querySelector('[name=pbq]').checked }); break;
      case 'start-final': startSession('final', { mode: 'exam' }); break;
      case 'start-drill': e.preventDefault(); var g = el.closest('form'); var dd = +formVal(g, 'domain');
        startSession('drill', { domain: dd || null, count: countVal(formVal(g, 'count')), mode: 'practice' }); break;
      case 'resume': go('#/quiz'); break;
      case 'discard': if (window.confirm('Discard the in-progress session? Its answers will be lost.')) { S.session = null; Store.setSession(null); rerender(); } break;
      case 'prev': setIdx(S.session.idx - 1); break;
      case 'next': setIdx(S.session.idx + 1); break;
      case 'goto': setIdx(+el.getAttribute('data-i')); break;
      case 'flag': toggleFlag(); break;
      case 'check': check(); break;
      case 'review': S.showReview = !S.showReview; rerender(); break;
      case 'submit': submitClick(); break;
      case 'pause': togglePause(); break;
      case 'filter': S.filter = el.getAttribute('data-f'); rerender(); break;
      case 'retry-missed':
        var a = Store.getAttempts().filter(function (x) { return x.id === el.getAttribute('data-id'); })[0];
        if (a) startSession('retry', { ids: a.items.filter(function (i) { return !i.correct; }).map(function (i) { return i.id; }), mode: 'practice' });
        break;
      case 'export': doExport(); break;
      case 'import': doImport(); break;
      case 'reset':
        if (window.confirm('Delete ALL attempts, statistics, settings and any in-progress session? This cannot be undone.')) {
          Store.resetAll(); S.qstats = {}; S.settings = Store.getSettings(); S.session = null; S.msg = 'All data cleared.'; applyTheme(); rerender();
        }
        break;
    }
  });

  appEl.addEventListener('change', function (e) {
    var t = e.target;
    if (t.getAttribute('data-act') === 'opt' && S.session) { selectOption(+t.value); return; }
    if (t.hasAttribute('data-pbq') && t.tagName === 'SELECT' && S.session) {
      if (isLocked()) return;
      var q = curQ(), na = PBQ.handle(q, S.session.answers[q.id], t, S.session.id);
      if (na) { S.session.answers[q.id] = na; S.focusId = t.id; saveSession(); rerender(); }
      return;
    }
    if (t.hasAttribute('data-set')) { S.settings[t.getAttribute('data-set')] = t.checked; Store.setSettings(S.settings); syncTimer(); return; }
    if (t.name === 'theme') { S.settings.theme = t.value; Store.setSettings(S.settings); applyTheme(); }
  });

  appEl.addEventListener('submit', function (e) { e.preventDefault(); });

  document.addEventListener('keydown', function (e) {
    if (currentRoute().name !== 'quiz' || !S.session || e.ctrlKey || e.metaKey || e.altKey) return;
    var t = e.target, tag = t.tagName;
    if (tag === 'SELECT' || tag === 'TEXTAREA' || (tag === 'INPUT' && t.type !== 'radio' && t.type !== 'checkbox')) return;
    var k = e.key, s = S.session;
    if (s.timer.paused) return;
    if (/^[1-6]$/.test(k)) {
      var q = curQ();
      if (q.options) { var ord = Engine.optionOrder(q, s.id), o = ord[+k - 1]; if (o !== undefined) { e.preventDefault(); selectOption(o); } }
    } else if (k === 'f' || k === 'F') { e.preventDefault(); toggleFlag(); }
    else if (k === 'ArrowRight') { e.preventDefault(); setIdx(s.idx + 1); }
    else if (k === 'ArrowLeft') { e.preventDefault(); setIdx(s.idx - 1); }
    else if (k === 'Enter') {
      if (tag === 'BUTTON' || tag === 'A') return;
      e.preventDefault();
      var cq = curQ();
      if (s.mode === 'practice' && !s.checked[cq.id] && (Engine.isAnswered(cq, s.answers[cq.id]) || cq.type === 'order')) check();
      else if (s.idx < s.qids.length - 1) setIdx(s.idx + 1);
      else submitClick();
    }
  });

  /* ---------- settings: export / import ---------- */
  function doExport() {
    var blob = new Blob([JSON.stringify(Store.exportData(), null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    var d = new Date(), p2 = function (n) { return (n < 10 ? '0' : '') + n; };
    a.download = 'secplus-practice-' + d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate()) + '.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }
  function doImport() {
    var f = document.getElementById('impfile').files[0], mode = formVal(appEl, 'impmode') || 'merge';
    if (!f) { S.msg = 'Choose a file first.'; rerender(); return; }
    if (mode === 'replace' && !window.confirm('Replace all existing history and statistics with the imported file?')) return;
    var rd = new FileReader();
    rd.onload = function () {
      try { S.msg = Store.importData(JSON.parse(rd.result), mode); S.qstats = Store.getQstats(); S.settings = Store.getSettings(); applyTheme(); }
      catch (err) { S.msg = 'Import failed: ' + err.message; }
      rerender();
    };
    rd.readAsText(f);
  }

  /* ---------- init ---------- */
  window.addEventListener('hashchange', function () { S.showReview = false; route(); });
  function init() {
    Store.migrate();
    S.qstats = Store.getQstats(); S.settings = Store.getSettings(); S.session = Store.getSession();
    applyTheme();
    if (S.session && S.session.timer && !S.settings.strictTimer && S.session.timer.runningSince) {
      /* not folded on exit (crash/kill): count up to the last heartbeat only; time away is not counted */
      var tm = S.session.timer, upto = Math.min(now(), Math.max(tm.runningSince, tm.lastBeat || tm.runningSince));
      Engine.Timer.fold(tm, upto); saveSession();
    }
    /* reloading on the quiz screen lands on home, which shows the Resume banner */
    if (S.session && currentRoute().name === 'quiz') { try { history.replaceState(null, '', '#/'); } catch (e) { location.hash = '#/'; } }
    route();
    if (S.session && Engine.Timer.expired(S.session.timer, now())) { finish(true); }
    document.documentElement.dataset.ready = '1';
    setBoot();
  }
  init();
})();
