/* View helpers: every function returns an HTML string. No state kept here. */
var UI = (function () {
  'use strict';
  var OBJ = function () { return window.SEC_OBJECTIVES; };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function pct(x) { return Math.round(x * 100) + '%'; }
  function num(x) { return Math.round(x * 10) / 10; }
  function date(ts) { var d = new Date(ts); return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }
  function dname(d) { return OBJ()[d].name; }
  function objTitle(o) { var d = o.split('.')[0]; return OBJ()[d] ? OBJ()[d].objectives[o] : ''; }
  var BADGE = { green: 'Ready', yellow: 'Almost', red: 'Needs work', none: 'No data' };
  function badge(r) { return '<span class="badge badge-' + r + '">' + BADGE[r] + '</span>'; }
  function typeLabel(a) {
    if (a.type === 'final') return 'Final exam';
    if (a.type === 'drill') return 'Missed drill';
    return 'Module';
  }

  /* list: [{key, expansion}] from Engine.acronymsIn; empty -> nothing */
  function acronyms(list) {
    if (!list || !list.length) return '';
    return '<div class="acronyms"><span class="acronyms-label">Acronyms</span> <dl>' + list.map(function (a) {
      return '<div><dt>' + esc(a.key) + '</dt><dd>' + esc(a.expansion) + '</dd></div>';
    }).join(' ') + '</dl></div>';
  }

  function home(c) {
    var h = '<h1>Security+ SY0-701 Practice</h1>';
    if (c.session) {
      var s = c.session;
      h += '<section class="banner" role="status"><div><strong>Resume in-progress ' + esc(sessionLabel(s)) + '</strong><br><span class="muted">Question ' +
        (s.idx + 1) + ' of ' + s.qids.length + '</span></div><div class="row"><button class="btn primary" data-act="resume">Resume</button>' +
        '<button class="btn" data-act="discard">Discard</button></div></section>';
    }
    h += '<div class="grid">';
    [1, 2, 3, 4, 5].forEach(function (d) {
      var info = c.domains[d];
      h += '<a class="card link" href="#/module/' + d + '"><div class="card-top"><span class="dnum">D' + d + '</span>' + badge(info.ready) + '</div>' +
        '<h2>' + esc(dname(d)) + '</h2><p class="muted">' + Math.round(OBJ()[d].weight * 100) + '% of exam &middot; ' + info.count + ' questions</p>' +
        '<p>' + (info.last == null ? 'No attempts yet' : 'Last score: <strong>' + pct(info.last) + '</strong>') + '</p></a>';
    });
    h += '<a class="card link accent" href="#/final"><h2>Final Exam</h2><p class="muted">5 PBQs + 85 questions, 90 minutes, exam conditions.</p>' +
      '<p>' + (c.finalBest ? 'Best: <strong>' + c.finalBest + '</strong> scaled' : 'Not attempted') + '</p></a>';
    h += '<a class="card link" href="#/drill"><h2>Missed Drill</h2><p class="muted">Practice only the questions you last got wrong.</p><p><strong>' + c.missed + '</strong> to review</p></a>';
    h += '</div><nav class="row footnav" aria-label="More"><a class="btn" href="#/history">History</a><a class="btn" href="#/settings">Settings</a>' +
      '<a class="btn" href="https://github.com/steeb-k/steeb-k.github.io/tree/main/sec-plus-test" rel="noopener">Source</a></nav>';
    return h;
  }
  function sessionLabel(s) {
    if (s.type === 'final') return 'final exam';
    if (s.type === 'drill') return 'missed drill';
    return 'module quiz: ' + dname(s.domain);
  }

  function back() { return '<p><a href="#/">&larr; Home</a></p>'; }
  function radio(name, val, label, checked) {
    return '<label class="choice"><input type="radio" name="' + name + '" value="' + val + '"' + (checked ? ' checked' : '') + '> <span>' + label + '</span></label>';
  }
  function modeChoice(def) {
    return '<fieldset><legend>Mode</legend>' + radio('mode', 'practice', 'Practice <span class="muted">(feedback after each answer)</span>', def === 'practice') +
      radio('mode', 'exam', 'Exam <span class="muted">(feedback at the end)</span>', def === 'exam') + '</fieldset>';
  }
  function moduleSetup(d, count, pbqCount) {
    var n = Math.max(count, 0);
    var h = back() + '<h1>' + esc(dname(d)) + '</h1><p class="muted">' + n + ' questions in bank &middot; ' + pbqCount + ' PBQs</p>' +
      '<form class="panel" data-form="module" data-domain="' + d + '"><fieldset><legend>Number of questions</legend>';
    [10, 25, 50, 'all'].forEach(function (x, i) { h += radio('count', x, x === 'all' ? 'All (' + n + ')' : x, i === 0); });
    h += '</fieldset>' + modeChoice('practice') +
      '<label class="choice"><input type="checkbox" name="pbq" checked> <span>Include PBQs for this domain (up to 2)</span></label>' +
      '<p><button class="btn primary big" type="submit" data-act="start-module"' + (n ? '' : ' disabled') + '>Start</button></p></form>';
    return h;
  }
  function finalSetup(avail, exam) {
    return back() + '<h1>Final Exam</h1><div class="panel"><ul><li>' + exam.pbqCount + ' performance-based questions first, then ' +
      Object.keys(exam.mcqPerDomain).reduce(function (a, k) { return a + exam.mcqPerDomain[k]; }, 0) + ' multiple-choice questions weighted by domain.</li>' +
      '<li>' + exam.minutes + ' minute countdown. It pauses only if you press Pause or leave the tab (unless Strict timer is on in Settings).</li>' +
      '<li>Exam mode: no feedback and no objective tags until you submit.</li>' +
      '<li>Pass line: scaled ' + exam.passScaled + ' of 900.</li></ul>' +
      (avail ? '' : '<p class="warn">The question bank is empty.</p>') +
      '<p><button class="btn primary big" data-act="start-final"' + (avail ? '' : ' disabled') + '>Begin exam</button></p></div>';
  }
  function drillSetup(missedByDomain, total) {
    var h = back() + '<h1>Missed Drill</h1><p class="muted">Questions whose most recent result was wrong. Answer one correctly and it leaves the list.</p>' +
      '<form class="panel" data-form="drill"><fieldset><legend>Domain</legend>' + radio('domain', '0', 'All domains (' + total + ')', true);
    [1, 2, 3, 4, 5].forEach(function (d) { h += radio('domain', d, esc(dname(d)) + ' (' + (missedByDomain[d] || 0) + ')', false); });
    h += '</fieldset><fieldset><legend>Number of questions</legend>' + radio('count', 10, '10', false) + radio('count', 25, '25', false) + radio('count', 'all', 'All', true) + '</fieldset>' +
      '<p><button class="btn primary big" type="submit" data-act="start-drill"' + (total ? '' : ' disabled') + '>Start</button></p>' + (total ? '' : '<p class="muted">Nothing missed yet.</p>') + '</form>';
    return h;
  }

  /* ---------- quiz ---------- */
  function grid(c) {
    var h = '<div class="grid-review" role="group" aria-label="Question navigator">';
    c.cells.forEach(function (x, i) {
      h += '<button type="button" class="cell ' + (x.answered ? 'answered' : 'unanswered') + (x.flagged ? ' flagged' : '') + (i === c.idx ? ' current' : '') +
        '" data-act="goto" data-i="' + i + '" aria-label="Question ' + (i + 1) + ': ' + (x.answered ? 'answered' : 'unanswered') + (x.flagged ? ', flagged' : '') + '">' + (i + 1) + '</button>';
    });
    var n = { a: 0, u: 0, f: 0 };
    c.cells.forEach(function (x) { if (x.answered) n.a++; else n.u++; if (x.flagged) n.f++; });
    return h + '</div><p class="legend"><span class="sw answered" aria-hidden="true"></span>Answered (' + n.a + ')<span class="sw unanswered" aria-hidden="true"></span>Unanswered (' + n.u + ')' +
      '<span class="sw flagged" aria-hidden="true"></span>Flagged (' + n.f + ')</p>';
  }

  function quiz(c) {
    var q = c.q, s = c.session, isPbq = q.type !== 'single' && q.type !== 'multi';
    var h = '<div class="quiz-head"><div><strong>Q ' + (c.idx + 1) + ' / ' + s.qids.length + '</strong> ' +
      (c.practice ? '<span class="tag">D' + q.domain + ' &middot; ' + esc(q.objective) + '</span>' : '') +
      (isPbq ? ' <span class="tag">PBQ</span>' : '') + '</div>' +
      '<div class="timer-box"><span id="timer" class="timer" role="timer" aria-label="Time ' + (s.timer.limitMs ? 'remaining' : 'elapsed') + '">' + esc(c.timerText) + '</span> ' +
      '<button class="btn small" id="pausebtn" data-act="pause">' + (s.timer.paused ? 'Resume' : 'Pause') + '</button></div></div>';
    if (s.timer.paused) {
      return h + '<div class="panel center"><h2>Paused</h2><p class="muted">The question is hidden while the timer is paused.</p><button class="btn primary big" data-act="pause">Resume</button></div>';
    }
    h += '<article class="panel qpanel" aria-live="off">';
    if (isPbq) {
      h += PBQ.render(q, c.answer, { locked: c.locked, seed: s.id });
    } else {
      var hint = q.type === 'multi' ? '<p class="hint">Choose ' + q.answer.length + '. <span class="muted">(' + (c.answer || []).length + ' of ' + q.answer.length + ' selected)</span></p>' : '';
      if (c.notice) hint += '<p class="notice" role="alert">' + esc(c.notice) + '</p>';
      h += '<p class="stem" id="stem">' + esc(q.question) + '</p>' + hint + '<div class="opts" role="' + (q.type === 'multi' ? 'group' : 'radiogroup') + '" aria-labelledby="stem">';
      var sel = c.answer || [];
      c.order.forEach(function (orig, pos) {
        var on = sel.indexOf(orig) >= 0, cls = 'opt';
        if (c.locked) { var isA = q.answer.indexOf(orig) >= 0; if (isA) cls += ' correct'; else if (on) cls += ' wrong'; }
        if (on) cls += ' selected';
        h += '<label class="' + cls + '" for="o' + orig + '"><input id="o' + orig + '" type="' + (q.type === 'multi' ? 'checkbox' : 'radio') + '" name="o" value="' + orig + '"' +
          (on ? ' checked' : '') + (c.locked ? ' disabled' : '') + ' data-act="opt"><span class="key">' + (pos + 1) + '</span><span class="otext">' + esc(q.options[orig]) + '</span></label>';
      });
      h += '</div>';
    }
    if (c.locked) {
      var r = c.result;
      h += '<div class="feedback ' + (r.correct ? 'ok' : (r.points > 0 ? 'part' : 'bad')) + '" role="status"><strong>' +
        (r.correct ? 'Correct' : (r.points > 0 ? 'Partially correct (' + pct(r.points) + ')' : 'Incorrect')) + '</strong>';
      if (isPbq) h += PBQ.review(q, c.answer, s.id);
      h += '<p>' + esc(q.explanation) + '</p>' + acronyms(c.acro) + '<p class="muted">Objective ' + esc(q.objective) + ': ' + esc(objTitle(q.objective)) + '</p></div>';
    }
    h += '</article><div class="row actions">';
    h += '<button class="btn" data-act="prev"' + (c.idx === 0 ? ' disabled' : '') + '>Prev</button>';
    h += '<button class="btn' + (c.flagged ? ' on' : '') + '" data-act="flag" aria-pressed="' + (c.flagged ? 'true' : 'false') + '">' + (c.flagged ? 'Flagged' : 'Flag') + '</button>';
    h += '<button class="btn" data-act="review" aria-expanded="' + (c.showReview ? 'true' : 'false') + '">Review</button><span class="grow"></span>';
    if (c.practice && !c.locked) h += '<button class="btn primary" data-act="check"' + (c.hasAnswer ? '' : ' disabled') + '>Check</button>';
    if (c.idx < s.qids.length - 1) h += '<button class="btn primary" id="nextbtn" data-act="next">Next</button>';
    h += '<button class="btn danger" data-act="submit">Submit</button></div>';
    if (c.showReview) h += '<section class="panel"><h2>Review</h2>' + grid(c) + '</section>';
    h += '<p class="muted kbd">Keys: 1-6 select, F flag, &larr; &rarr; navigate, Enter next.</p>';
    return h;
  }

  /* ---------- results ---------- */
  function fmtDur(ms) { return Engine.fmtClock(ms); }
  function results(c) {
    var a = c.attempt;
    var h = back() + '<h1>Results <span class="muted small-t">' + esc(typeLabel(a)) + (a.type === 'module' ? ': ' + esc(dname(a.domain)) : '') + '</span></h1>';
    h += '<section class="panel summary ' + (a.pass ? 'pass' : 'fail') + '"><div class="big-score">' + pct(a.pct) + '</div><div><p><span class="pill ' + (a.pass ? 'pass' : 'fail') + '">' + (a.pass ? 'Pass' : 'Fail') + '</span> ' +
      '<strong>Estimated scaled score: ' + a.scaled + '</strong> / 900 <span class="muted">(pass line 750)</span>' + (a.auto ? ' <span class="muted">&middot; auto-submitted when time ran out</span>' : '') + '</p><p class="muted">' + num(a.points) + ' of ' + a.total + ' points &middot; Time used ' + fmtDur(a.durationMs) +
      ' &middot; ' + esc(date(a.finishedAt)) + '</p></div></section>';
    h += '<h2>By domain</h2><div class="table-wrap"><table><thead><tr><th>Domain</th><th class="num">Questions</th><th class="num">Points</th><th class="num">%</th><th class="barcell"><span class="sr">Bar</span></th></tr></thead><tbody>';
    Object.keys(a.perDomain).sort().forEach(function (d) {
      var x = a.perDomain[d];
      h += '<tr><th scope="row">' + d + '. ' + esc(dname(d)) + '</th><td class="num">' + x.count + '</td><td class="num">' + num(x.points) + '</td><td class="num">' + pct(x.pct) + '</td><td class="barcell">' + bar(x.pct) + '</td></tr>';
    });
    h += '</tbody></table></div><h2>Weakest objectives</h2><div class="table-wrap"><table class="weak"><thead><tr><th>Objective</th><th class="num">Questions</th><th class="num">%</th></tr></thead><tbody>';
    c.weak.forEach(function (w) { h += '<tr><td><strong>' + esc(w.objective) + '</strong> ' + esc(objTitle(w.objective)) + '</td><td class="num">' + w.count + '</td><td class="num">' + pct(w.pct) + '</td></tr>'; });
    h += '</tbody></table></div><div class="row">';
    if (c.missedCount) h += '<button class="btn primary" data-act="retry-missed" data-id="' + esc(a.id) + '">Retry missed from this attempt (' + c.missedCount + ')</button>';
    h += '<a class="btn" href="#/">Back to home</a></div><h2>Review</h2><div class="row filters" role="group" aria-label="Filter">';
    ['all', 'missed', 'flagged'].forEach(function (f) {
      h += '<button class="btn small' + (c.filter === f ? ' on' : '') + '" data-act="filter" data-f="' + f + '" aria-pressed="' + (c.filter === f) + '">' + f[0].toUpperCase() + f.slice(1) + '</button>';
    });
    h += '</div>';
    if (!c.items.length) h += '<p class="muted">Nothing to show.</p>';
    c.items.forEach(function (it) {
      var q = it.q, isPbq = q.type !== 'single' && q.type !== 'multi';
      h += '<article class="panel rev ' + (it.correct ? 'ok' : (it.points > 0 ? 'part' : 'bad')) + '"><p class="muted">#' + (it.n) + ' &middot; ' + esc(q.id) + ' &middot; Obj ' + esc(q.objective) +
        (it.flagged ? ' &middot; <span class="flagtag">Flagged</span>' : '') + ' &middot; ' + (it.correct ? 'Correct' : (it.points > 0 ? 'Partial' : (it.answered ? 'Incorrect' : 'Unanswered'))) + '</p>';
      if (isPbq) h += '<h3 class="pbq-title">' + esc(q.title) + '</h3><p class="pbq-instr">' + esc(q.instructions) + '</p>' + PBQ.review(q, it.answer, a.id);
      else {
        h += '<p class="stem">' + esc(q.question) + '</p><ul class="rev-opts">';
        q.options.forEach(function (o, i) {
          var mine = (it.answer || []).indexOf(i) >= 0, right = q.answer.indexOf(i) >= 0;
          h += '<li class="' + (right ? 'is-right' : '') + (mine && !right ? ' is-wrong' : '') + '">' + (right ? '<span class="mark ok">&#10003;</span> ' : (mine ? '<span class="mark bad">&#10007;</span> ' : '')) + esc(o) +
            (mine ? ' <em class="muted">(your answer)</em>' : '') + '</li>';
        });
        h += '</ul>';
      }
      h += '<p>' + esc(q.explanation) + '</p>' + acronyms(it.acro) + '</article>';
    });
    return h;
  }
  function bar(p, cls) { return '<div class="bar ' + (cls || '') + '" role="img" aria-label="' + pct(p) + '"><span style="width:' + Math.max(0, Math.min(100, Math.round(p * 100))) + '%"></span></div>'; }

  /* ---------- history ---------- */
  function history(c) {
    var h = back() + '<h1>History</h1>';
    if (!c.attempts.length) return h + '<p class="muted">No attempts yet. Finish a quiz and it shows up here.</p>';
    h += '<h2>By domain</h2><div class="table-wrap"><table><thead><tr><th>Domain</th><th class="num">Attempts</th><th class="num">Best</th><th class="num">Last 3 avg</th><th class="barcell"><span class="sr">Bar</span></th><th>Readiness</th></tr></thead><tbody>';
    [1, 2, 3, 4, 5].forEach(function (d) {
      var x = c.dom[d];
      h += '<tr><th scope="row">' + d + '. ' + esc(dname(d)) + '</th><td class="num">' + x.n + '</td><td class="num">' + (x.n ? pct(x.best) : '&ndash;') + '</td><td class="num">' + (x.n ? pct(x.avg3) : '&ndash;') + '</td><td class="barcell">' +
        (x.n ? bar(x.avg3, x.avg3 >= Engine.READY ? 'good' : '') : '') + '</td><td>' + badge(x.ready) + '</td></tr>';
    });
    h += '</tbody></table></div><h2>Final exam</h2><p>' + (c.final.n ? 'Attempts: <strong>' + c.final.n + '</strong> &middot; Best scaled: <strong>' + c.final.best + '</strong> &middot; Passes: <strong>' + c.final.passes + '</strong>' : 'No final exam attempts yet.') + '</p>';
    h += '<h2>Attempts</h2><div class="table-wrap"><table><thead><tr><th>Date</th><th>Type</th><th>Domain</th><th class="num">Score</th><th class="barcell"><span class="sr">Bar</span></th><th class="num">Scaled</th><th>Result</th><th class="num">Time</th><th><span class="sr">Details</span></th></tr></thead><tbody>';
    c.attempts.forEach(function (a) {
      h += '<tr><td>' + esc(date(a.finishedAt)) + '</td><td>' + typeLabel(a) + (a.mode ? ' <span class="muted">(' + a.mode + ')</span>' : '') + '</td><td>' + (a.domain ? 'D' + a.domain : '&ndash;') + '</td><td class="num">' + pct(a.pct) + '</td><td class="barcell">' +
        bar(a.pct, a.pass ? 'good' : '') + '</td><td class="num">' + a.scaled + '</td><td>' + (a.pass ? '<span class="pill pass">Pass</span>' : '<span class="pill fail">Fail</span>') + '</td><td class="num">' + fmtDur(a.durationMs) + '</td><td><a href="#/results/' + esc(a.id) + '">View</a></td></tr>';
    });
    return h + '</tbody></table></div>';
  }

  function settings(c) {
    var s = c.settings;
    return back() + '<h1>Settings</h1><div class="panel"><h2>Timer</h2><label class="choice"><input type="checkbox" data-set="strictTimer"' + (s.strictTimer ? ' checked' : '') +
      '> <span>Strict timer (clock keeps running while the tab is hidden)</span></label></div>' +
      '<div class="panel"><h2>Reviews</h2><label class="choice"><input type="checkbox" data-set="showAcronyms"' + (s.showAcronyms !== false ? ' checked' : '') +
      '> <span>Show acronym expansions in reviews</span></label></div>' +
      '<div class="panel"><h2>Theme</h2><fieldset class="inline">' + ['auto', 'light', 'dark'].map(function (t) { return radio('theme', t, t[0].toUpperCase() + t.slice(1), s.theme === t); }).join('') + '</fieldset></div>' +
      '<div class="panel"><h2>Data</h2><p class="muted">Everything is stored in this browser only. Export to back up or move to another device.</p>' +
      '<div class="row"><button class="btn" data-act="export">Export JSON</button></div>' +
      '<p><label for="impfile">Import file</label> <input type="file" id="impfile" accept="application/json,.json"></p>' +
      '<fieldset class="inline">' + radio('impmode', 'merge', 'Merge', true) + radio('impmode', 'replace', 'Replace', false) + '</fieldset>' +
      '<div class="row"><button class="btn" data-act="import">Import</button></div><p id="setmsg" role="status" class="muted">' + esc(c.msg || '') + '</p>' +
      '<hr><button class="btn danger" data-act="reset">Reset everything</button></div>';
  }

  function notFound() { return back() + '<h1>Not found</h1>'; }
  return { esc: esc, home: home, moduleSetup: moduleSetup, finalSetup: finalSetup, drillSetup: drillSetup, quiz: quiz, acronyms: acronyms, results: results, history: history, settings: settings, notFound: notFound, sessionLabel: sessionLabel };
})();
