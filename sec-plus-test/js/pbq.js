/* PBQ renderers and answer capture. Types: match, order, config.
   Answer shapes: match -> array (right idx or null per left); order -> array of item idx in current order;
   config -> {rowIdx: {colKey: value}} */
var PBQ = (function () {
  'use strict';
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  function currentOrder(q, answer, seed) { return Array.isArray(answer) && answer.length === q.items.length ? answer : Engine.orderStart(q, seed); }

  function render(q, answer, opt) {
    opt = opt || {};
    var dis = opt.locked ? ' disabled' : '';
    var h = '<div class="pbq pbq-type-' + q.type + '"><h3 class="pbq-title">' + esc(q.title) + '</h3><p class="pbq-instr">' + esc(q.instructions) + '</p>';
    var i;
    if (q.type === 'match') {
      if (q.unique) h += '<p class="hint">Each option can be used only once.</p>';
      h += '<ol class="pbq-match">';
      for (i = 0; i < q.left.length; i++) {
        var v = answer && answer[i] != null ? answer[i] : '';
        h += '<li><label for="pm' + i + '" class="pbq-left">' + esc(q.left[i]) + '</label><select id="pm' + i + '" data-pbq="match" data-i="' + i + '"' + dis + '>' +
          '<option value="">Select...</option>';
        Engine.choiceOrder(q.right.length, opt.seed, q.id, 'right').forEach(function (j) {
          h += '<option value="' + j + '"' + (String(v) === String(j) ? ' selected' : '') + '>' + esc(q.right[j]) + '</option>';
        });
        h += '</select></li>';
      }
      h += '</ol>';
    } else if (q.type === 'order') {
      var ord = currentOrder(q, answer, opt.seed);
      h += '<ol class="pbq-order">';
      ord.forEach(function (it, p) {
        h += '<li><span class="pbq-item">' + esc(q.items[it]) + '</span><span class="pbq-btns">' +
          '<button type="button" id="po' + p + 'u" class="btn small" data-pbq="order" data-pos="' + p + '" data-dir="-1" aria-label="Move up: ' + esc(q.items[it]) + '"' + (p === 0 || opt.locked ? ' disabled' : '') + '>Up</button>' +
          '<button type="button" id="po' + p + 'd" class="btn small" data-pbq="order" data-pos="' + p + '" data-dir="1" aria-label="Move down: ' + esc(q.items[it]) + '"' + (p === ord.length - 1 || opt.locked ? ' disabled' : '') + '>Down</button></span></li>';
      });
      h += '</ol>';
    } else if (q.type === 'config') {
      /* Stacked rows: every dropdown stays on screen at any width (no horizontal table scroll). */
      h += '<div class="pbq-rows">';
      q.rows.forEach(function (row, r) {
        h += '<div class="pbq-row"><div class="pbq-row-label">' + esc(row.label) + '</div><div class="pbq-fields">';
        q.columns.forEach(function (c) {
          if (row.answer && Object.prototype.hasOwnProperty.call(row.answer, c.key)) {
            var cur = answer && answer[r] ? answer[r][c.key] : '', id = 'pc' + r + '-' + esc(c.key);
            h += '<div class="pbq-field"><label for="' + id + '">' + esc(c.label) + '</label><select id="' + id + '" data-pbq="config" data-row="' + r + '" data-key="' + esc(c.key) + '"' + dis + '><option value="">Select...</option>';
            Engine.choiceOrder(c.choices.length, opt.seed, q.id, 'col:' + c.key).forEach(function (k) {
              var ch = c.choices[k];
              h += '<option value="' + esc(ch) + '"' + (cur === ch ? ' selected' : '') + '>' + esc(ch) + '</option>';
            });
            h += '</select></div>';
          } else {
            var f = row.fixed && row.fixed[c.key];
            if (f != null && f !== '') h += '<div class="pbq-field fixed"><span class="pbq-field-label">' + esc(c.label) + '</span><span class="pbq-field-val">' + esc(f) + '</span></div>';
          }
        });
        h += '</div></div>';
      });
      h += '</div>';
    }
    return h + '</div>';
  }

  /* Apply a DOM event target to the answer; returns the new answer or undefined if not a PBQ control. */
  function handle(q, answer, el, seed) {
    var kind = el.getAttribute && el.getAttribute('data-pbq');
    if (!kind) return undefined;
    var a;
    if (kind === 'match') {
      a = Array.isArray(answer) ? answer.slice() : q.left.map(function () { return null; });
      var mi = +el.getAttribute('data-i'), mv = el.value === '' ? null : +el.value;
      /* unique: each right-hand option may be used once; picking it again moves it here */
      if (q.unique && mv !== null) a = a.map(function (v, k) { return k !== mi && v === mv ? null : v; });
      a[mi] = mv;
      return a;
    }
    if (kind === 'order') {
      a = currentOrder(q, answer, seed).slice();
      var p = +el.getAttribute('data-pos'), n = p + (+el.getAttribute('data-dir'));
      if (n < 0 || n >= a.length) return a;
      var t = a[p]; a[p] = a[n]; a[n] = t;
      return a;
    }
    if (kind === 'config') {
      a = {};
      if (answer) Object.keys(answer).forEach(function (r) { a[r] = Object.assign({}, answer[r]); });
      var r = el.getAttribute('data-row');
      a[r] = a[r] || {};
      a[r][el.getAttribute('data-key')] = el.value;
      return a;
    }
    return undefined;
  }

  /* Correct/incorrect mark as inline SVG (no font glyph fallback, no emoji); colour comes from .mark.ok / .mark.bad. */
  function mark(good) {
    return '<span class="mark ' + (good ? 'ok' : 'bad') + '" role="img" aria-label="' + (good ? 'correct' : 'incorrect') + '"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">' +
      '<path d="' + (good ? 'M3 8.5l3.2 3.2L13 4.5' : 'M4.5 4.5l7 7M11.5 4.5l-7 7') + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
  }

  /* Read-only graded view: your answer vs correct, per cell. */
  function review(q, answer, seed) {
    var h = '<div class="pbq-review">', ok = mark(true), bad = mark(false);
    if (q.type === 'match') {
      h += '<ul>';
      q.left.forEach(function (l, i) {
        var mine = answer && answer[i] != null ? q.right[answer[i]] : '(no answer)', good = answer && answer[i] === q.answer[i];
        h += '<li>' + (good ? ok : bad) + ' ' + esc(l) + '<br><span class="yours">You: ' + esc(mine) + '</span>' + (good ? '' : ' <span class="right">Correct: ' + esc(q.right[q.answer[i]]) + '</span>') + '</li>';
      });
      h += '</ul>';
    } else if (q.type === 'order') {
      var ord = currentOrder(q, answer, seed);
      h += '<div class="cols"><div><strong>Your order</strong><ol>';
      ord.forEach(function (it, p) { h += '<li>' + (it === q.answer[p] ? ok : bad) + ' ' + esc(q.items[it]) + '</li>'; });
      h += '</ol></div><div><strong>Correct order</strong><ol>';
      q.answer.forEach(function (it) { h += '<li>' + esc(q.items[it]) + '</li>'; });
      h += '</ol></div></div>';
    } else {
      h += '<div class="pbq-rows">';
      q.rows.forEach(function (row, r) {
        h += '<div class="pbq-row"><div class="pbq-row-label">' + esc(row.label) + '</div><div class="pbq-fields">';
        q.columns.forEach(function (c) {
          if (row.answer && Object.prototype.hasOwnProperty.call(row.answer, c.key)) {
            var mine = answer && answer[r] ? answer[r][c.key] : '', good = mine === row.answer[c.key];
            h += '<div class="pbq-field"><span class="pbq-field-label">' + esc(c.label) + '</span><span class="pbq-field-val">' + (good ? ok : bad) + ' ' + esc(mine || '(none)') + (good ? '' : '<br><span class="right">Correct: ' + esc(row.answer[c.key]) + '</span>') + '</span></div>';
          } else {
            var f = row.fixed && row.fixed[c.key];
            if (f != null && f !== '') h += '<div class="pbq-field fixed"><span class="pbq-field-label">' + esc(c.label) + '</span><span class="pbq-field-val">' + esc(f) + '</span></div>';
          }
        });
        h += '</div></div>';
      });
      h += '</div>';
    }
    return h + '</div>';
  }

  return { render: render, handle: handle, review: review, currentOrder: currentOrder, mark: mark };
})();
