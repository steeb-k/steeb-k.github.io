/* Pure logic: no window/document. Loadable in Node for tests. */
var Engine = (function () {
  'use strict';

  /* ---------- seeded PRNG ---------- */
  function hashStr(s) {
    s = String(s);
    var h = 1779033703 ^ s.length;
    for (var i = 0; i < s.length; i++) {
      h = Math.imul(h ^ s.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^ (h >>> 16)) >>> 0;
  }
  function mulberry32(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function makeRng(seedStr) { return mulberry32(hashStr(seedStr)); }

  function shuffle(arr, rng) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rng() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function range(n) { var r = []; for (var i = 0; i < n; i++) r.push(i); return r; }

  /* Stable per attemptId+questionId permutation of option indexes. */
  function optionOrder(q, attemptId) {
    return shuffle(range(q.options.length), makeRng(attemptId + ':' + q.id));
  }
  /* Stable starting arrangement for an "order" PBQ; never equals the solution. */
  function orderStart(q, attemptId) {
    var o = shuffle(range(q.items.length), makeRng(attemptId + ':' + q.id + ':order'));
    if (o.length > 1 && o.every(function (v, i) { return v === q.answer[i]; })) o.push(o.shift());
    return o;
  }

  /* ---------- selection ---------- */
  function seenOf(qstats, id) { var s = qstats && qstats[id]; return s ? (s.seen || 0) : 0; }

  /* Least-seen first, random tie-break. Returns up to n items (objects with .id). */
  function pickLeastSeen(pool, n, qstats, rng) {
    var dec = pool.map(function (q) { return { q: q, s: seenOf(qstats, q.id), r: rng() }; });
    dec.sort(function (a, b) { return a.s - b.s || a.r - b.r; });
    return dec.slice(0, n).map(function (d) { return d.q; });
  }

  /* Choose k PBQs spread over domains, avoiding repeated objectives where possible. */
  function pickSpreadPbqs(pool, k, qstats, rng) {
    var left = pickLeastSeen(pool, pool.length, qstats, rng);
    var out = [], doms = {}, objs = {};
    while (out.length < k && left.length) {
      var idx = -1, i;
      for (i = 0; i < left.length; i++) if (!doms[left[i].domain] && !objs[left[i].objective]) { idx = i; break; }
      if (idx < 0) for (i = 0; i < left.length; i++) if (!objs[left[i].objective]) { idx = i; break; }
      if (idx < 0) idx = 0;
      var p = left.splice(idx, 1)[0];
      out.push(p); doms[p.domain] = true; objs[p.objective] = true;
      if (Object.keys(doms).length >= 5) doms = {};
    }
    return out;
  }

  function ids(list) { return list.map(function (q) { return q.id; }); }

  /* opts: {type, domain, count ('all'|n), includePBQs, bank, pbq, qstats, exam, rng}
     returns array of question ids in presentation order */
  function buildSession(o) {
    var rng = o.rng, qs = o.qstats || {};
    var bank = o.bank || [], pbq = o.pbq || [], picked, extra, i;
    if (o.type === 'module') {
      var pool = bank.filter(function (q) { return q.domain === o.domain; });
      var n = (o.count === 'all' || !o.count) ? pool.length : Math.min(o.count, pool.length);
      picked = pickLeastSeen(pool, n, qs, rng);
      extra = o.includePBQs ? pickLeastSeen(pbq.filter(function (q) { return q.domain === o.domain; }), 2, qs, rng) : [];
      return ids(shuffle(picked.concat(extra), rng));
    }
    if (o.type === 'final') {
      var exam = o.exam, k = exam.pbqCount;
      var pq = pickSpreadPbqs(pbq, k, qs, rng);
      var mc = [];
      Object.keys(exam.mcqPerDomain).forEach(function (d) {
        var dp = bank.filter(function (q) { return String(q.domain) === d; });
        mc = mc.concat(pickLeastSeen(dp, exam.mcqPerDomain[d], qs, rng));
      });
      return ids(pq).concat(ids(shuffle(mc, rng)));
    }
    if (o.type === 'drill') {
      var missed = missedIds(bank.concat(pbq), qs);
      var set = {}; missed.forEach(function (id) { set[id] = 1; });
      var all = bank.concat(pbq).filter(function (q) { return set[q.id] && (!o.domain || q.domain === o.domain); });
      var m = (o.count === 'all' || !o.count) ? all.length : Math.min(o.count, all.length);
      // drill prefers most recently wrong? keep simple: random order, cap at m
      return ids(shuffle(all, rng).slice(0, m));
    }
    if (o.type === 'ids') return ids(shuffle((o.bank.concat(o.pbq || [])).filter(function (q) { return o.ids.indexOf(q.id) >= 0; }), rng));
    throw new Error('unknown session type ' + o.type);
  }

  function missedIds(all, qstats) {
    return all.filter(function (q) { var s = qstats && qstats[q.id]; return s && s.lastCorrect === false; })
      .map(function (q) { return q.id; });
  }

  /* ---------- scoring ---------- */
  function sameSet(a, b) {
    if (a.length !== b.length) return false;
    var s = a.slice().sort(), t = b.slice().sort();
    return s.every(function (v, i) { return v === t[i]; });
  }
  function isAnswered(q, a) {
    if (a === undefined || a === null) return false;
    if (Array.isArray(a)) {
      if (q.type === 'match') return a.some(function (v) { return v !== null && v !== undefined && v !== ''; });
      return a.length > 0;
    }
    if (typeof a === 'object') return Object.keys(a).some(function (r) {
      return Object.keys(a[r] || {}).some(function (k) { return a[r][k] !== '' && a[r][k] != null; });
    });
    return true;
  }
  function pbqCells(q, a) {
    var correct = 0, total = 0;
    if (q.type === 'match') {
      total = q.left.length;
      for (var i = 0; i < total; i++) if (a && a[i] === q.answer[i]) correct++;
    } else if (q.type === 'order') {
      total = q.items.length;
      for (var p = 0; p < total; p++) if (a && a[p] === q.answer[p]) correct++;
    } else if (q.type === 'config') {
      q.rows.forEach(function (row, r) {
        Object.keys(row.answer).forEach(function (k) {
          total++;
          if (a && a[r] && a[r][k] === row.answer[k]) correct++;
        });
      });
    }
    return { correct: correct, total: total };
  }
  /* returns {points (0..1), max:1, correct (full marks), answered, cells?}
     seed (attempt id) is used for an untouched "order" PBQ: the displayed starting order is the answer that gets scored,
     but the question still counts as unanswered for navigation/stats purposes. */
  function effectiveAnswer(q, a, seed) {
    if (q.type === 'order' && seed != null && !(Array.isArray(a) && a.length === q.items.length)) return orderStart(q, seed);
    return a;
  }
  function scoreQuestion(q, a, seed) {
    var answered = isAnswered(q, a), pts = 0, cells = null;
    a = effectiveAnswer(q, a, seed);
    if (q.type === 'single' || q.type === 'multi') {
      pts = (answered && sameSet(a, q.answer)) ? 1 : 0;
    } else {
      cells = pbqCells(q, a);
      pts = cells.total ? cells.correct / cells.total : 0;
    }
    return { points: pts, max: 1, correct: pts === 1, answered: answered, cells: cells };
  }

  function scaled(pct) { return 100 + Math.round(pct * 800); }
  function passed(sc, passScaled) { return sc >= (passScaled || 750); }

  /* questions: array of question objects; answers: {qid: answer} */
  function scoreSession(questions, answers, passScaled, seed) {
    var points = 0, perDomain = {}, perObjective = {}, items = [];
    questions.forEach(function (q) {
      var r = scoreQuestion(q, answers[q.id], seed);
      points += r.points;
      var d = perDomain[q.domain] || (perDomain[q.domain] = { count: 0, points: 0 });
      d.count++; d.points += r.points;
      var o = perObjective[q.objective] || (perObjective[q.objective] = { count: 0, points: 0 });
      o.count++; o.points += r.points;
      items.push({ id: q.id, points: r.points, correct: r.correct, answered: r.answered });
    });
    var total = questions.length, pct = total ? points / total : 0;
    Object.keys(perDomain).forEach(function (k) { perDomain[k].pct = perDomain[k].points / perDomain[k].count; });
    Object.keys(perObjective).forEach(function (k) { perObjective[k].pct = perObjective[k].points / perObjective[k].count; });
    var sc = scaled(pct);
    return { points: points, total: total, pct: pct, scaled: sc, pass: passed(sc, passScaled),
             perDomain: perDomain, perObjective: perObjective, items: items };
  }

  function weakestObjectives(perObjective, n) {
    return Object.keys(perObjective).map(function (k) { return { objective: k, count: perObjective[k].count, pct: perObjective[k].pct }; })
      .sort(function (a, b) { return a.pct - b.pct || String(a.objective).localeCompare(String(b.objective), undefined, { numeric: true }); })
      .slice(0, n || 5);
  }

  function blankStat() { return { seen: 0, correct: 0, wrong: 0, lastCorrect: null, lastAt: 0 }; }
  /* Count a presentation of a question (called when it is first shown in a session). lastCorrect stays null
     for never-answered questions so they are not treated as "missed". */
  function markSeen(qstats, id, now) {
    var s = qstats[id] || (qstats[id] = blankStat());
    s.seen = (s.seen || 0) + 1;
    if (now) s.lastSeenAt = now;
    return qstats;
  }
  /* Update qstats (returns the same object, mutated) from scored items. Unanswered are skipped.
     seenAlready: {qid: truthy} for questions whose presentation was already counted by markSeen. */
  function applyStats(qstats, items, now, seenAlready) {
    items.forEach(function (it) {
      if (!it.answered) return;
      var s = qstats[it.id] || (qstats[it.id] = blankStat());
      if (!(seenAlready && seenAlready[it.id])) s.seen = (s.seen || 0) + 1;
      if (it.correct) s.correct++; else s.wrong++;
      s.lastCorrect = !!it.correct; s.lastAt = now;
    });
    return qstats;
  }

  /* ---------- readiness ---------- */
  var READY = 0.83;
  function readiness(attempts, domain) {
    var mods = attempts.filter(function (a) { return a.type === 'module' && a.domain === domain; })
      .sort(function (a, b) { return a.finishedAt - b.finishedAt; });
    if (!mods.length) return 'none';
    var last3 = mods.slice(-3);
    if (mods.length >= 3 && last3.every(function (a) { return a.pct >= READY; })) return 'green';
    if (mods[mods.length - 1].pct >= READY) return 'yellow';
    return 'red';
  }

  /* ---------- timer (accumulated elapsed + runningSince) ---------- */
  var Timer = {
    create: function (limitMs) { return { limitMs: limitMs || null, elapsedMs: 0, runningSince: null, paused: false }; },
    elapsed: function (t, now) { return t.elapsedMs + (t.runningSince ? Math.max(0, now - t.runningSince) : 0); },
    remaining: function (t, now) { return t.limitMs == null ? null : Math.max(0, t.limitMs - Timer.elapsed(t, now)); },
    fold: function (t, now) { if (t.runningSince) { t.elapsedMs += Math.max(0, now - t.runningSince); t.runningSince = null; } return t; },
    start: function (t, now) { if (!t.runningSince && !t.paused) t.runningSince = now; return t; },
    pause: function (t, now) { Timer.fold(t, now); t.paused = true; return t; },
    unpause: function (t, now) { t.paused = false; return Timer.start(t, now); },
    expired: function (t, now) { return t.limitMs != null && Timer.elapsed(t, now) >= t.limitMs; }
  };

  function fmtClock(ms) {
    var s = Math.max(0, Math.round(ms / 1000)), m = Math.floor(s / 60), h = Math.floor(m / 60);
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    return h ? h + ':' + pad(m % 60) + ':' + pad(s % 60) : pad(m) + ':' + pad(s % 60);
  }

  return {
    hashStr: hashStr, mulberry32: mulberry32, makeRng: makeRng, shuffle: shuffle,
    optionOrder: optionOrder, orderStart: orderStart,
    pickLeastSeen: pickLeastSeen, pickSpreadPbqs: pickSpreadPbqs, buildSession: buildSession, missedIds: missedIds,
    isAnswered: isAnswered, effectiveAnswer: effectiveAnswer, scoreQuestion: scoreQuestion, scoreSession: scoreSession, scaled: scaled, passed: passed,
    weakestObjectives: weakestObjectives, applyStats: applyStats, markSeen: markSeen, readiness: readiness, READY: READY,
    Timer: Timer, fmtClock: fmtClock
  };
})();
if (typeof module !== 'undefined') module.exports = Engine;
