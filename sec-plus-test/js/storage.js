/* localStorage wrapper with in-memory fallback, versioning, export/import. */
var Store = (function () {
  'use strict';
  var P = 'secplus.', VERSION = 1, mem = {}, ok = true;
  try { localStorage.setItem(P + 'probe', '1'); localStorage.removeItem(P + 'probe'); } catch (e) { ok = false; }

  function get(key, def) {
    var raw = null;
    try { raw = ok ? localStorage.getItem(P + key) : (key in mem ? mem[key] : null); } catch (e) { raw = mem[key] || null; }
    if (raw == null) return def;
    try { return JSON.parse(raw); } catch (e) { return def; }
  }
  function set(key, val) {
    var s = JSON.stringify(val);
    mem[key] = s;
    if (ok) { try { localStorage.setItem(P + key, s); } catch (e) { /* quota: memory copy still works */ } }
  }
  function del(key) { delete mem[key]; if (ok) try { localStorage.removeItem(P + key); } catch (e) {} }

  var DEFAULTS = { strictTimer: false, theme: 'auto', showAcronyms: true };
  var api = {
    available: function () { return ok; },
    getSession: function () { return get('session', null); },
    setSession: function (s) { if (s) set('session', s); else set('session', null); },
    getAttempts: function () { return get('attempts', []); },
    addAttempt: function (a) { var l = api.getAttempts(); l.push(a); set('attempts', l); },
    getQstats: function () { return get('qstats', {}); },
    setQstats: function (q) { set('qstats', q); },
    getSettings: function () { var s = get('settings', {}); var o = {}; for (var k in DEFAULTS) o[k] = DEFAULTS[k]; for (k in s) o[k] = s[k]; return o; },
    setSettings: function (s) { set('settings', s); },
    migrate: function () { if (get('version', 0) !== VERSION) set('version', VERSION); },

    exportData: function () {
      return { app: 'secplus-practice', version: VERSION, exportedAt: Date.now(),
        attempts: api.getAttempts(), qstats: api.getQstats(), settings: api.getSettings(), session: api.getSession() };
    },
    /* mode: 'merge' | 'replace'. Returns summary string; throws on bad file. */
    importData: function (data, mode) {
      if (!data || typeof data !== 'object' || data.app !== 'secplus-practice' || !Array.isArray(data.attempts) || !data.qstats || typeof data.qstats !== 'object' || Array.isArray(data.qstats))
        throw new Error('Not a valid export file.');
      if (mode === 'replace') {
        set('attempts', data.attempts); set('qstats', data.qstats);
        if (data.settings) set('settings', data.settings);
        return 'Replaced data: ' + data.attempts.length + ' attempts.';
      }
      var have = {}, atts = api.getAttempts(), added = 0;
      atts.forEach(function (a) { have[a.id] = 1; });
      data.attempts.forEach(function (a) { if (!have[a.id]) { atts.push(a); added++; } });
      set('attempts', atts);
      var qs = api.getQstats();
      Object.keys(data.qstats).forEach(function (id) {
        var n = data.qstats[id], o = qs[id];
        if (!o) { qs[id] = n; return; }
        /* Element-wise max keeps merge idempotent: importing the same export twice changes nothing. */
        var newer = (n.lastAt || 0) > (o.lastAt || 0) ? n : o, mx = function (k) { return Math.max(o[k] || 0, n[k] || 0); };
        qs[id] = { seen: mx('seen'), correct: mx('correct'), wrong: mx('wrong'), lastCorrect: newer.lastCorrect, lastAt: newer.lastAt };
        if (o.lastSeenAt || n.lastSeenAt) qs[id].lastSeenAt = mx('lastSeenAt');
      });
      set('qstats', qs);
      return 'Merged: ' + added + ' new attempts.';
    },
    resetAll: function () { ['session', 'attempts', 'qstats', 'settings', 'version'].forEach(del); mem = {}; api.migrate(); }
  };
  return api;
})();
