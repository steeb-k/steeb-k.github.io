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
        for (var j = 0; j < q.right.length; j++) h += '<option value="' + j + '"' + (String(v) === String(j) ? ' selected' : '') + '>' + esc(q.right[j]) + '</option>';
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
      h += '<div class="table-wrap"><table class="pbq-table"><thead><tr><th></th>';
      q.columns.forEach(function (c) { h += '<th scope="col">' + esc(c.label) + '</th>'; });
      h += '</tr></thead><tbody>';
      q.rows.forEach(function (row, r) {
        h += '<tr><th scope="row">' + esc(row.label) + '</th>';
        q.columns.forEach(function (c) {
          if (row.answer && Object.prototype.hasOwnProperty.call(row.answer, c.key)) {
            var cur = answer && answer[r] ? answer[r][c.key] : '';
            h += '<td><select id="pc' + r + '-' + esc(c.key) + '" data-pbq="config" data-row="' + r + '" data-key="' + esc(c.key) + '" aria-label="' + esc(row.label + ' ' + c.label) + '"' + dis + '><option value="">Select...</option>';
            c.choices.forEach(function (ch) { h += '<option value="' + esc(ch) + '"' + (cur === ch ? ' selected' : '') + '>' + esc(ch) + '</option>'; });
            h += '</select></td>';
          } else {
            var f = row.fixed && row.fixed[c.key];
            h += '<td class="fixed">' + (f != null ? esc(f) : '') + '</td>';
          }
        });
        h += '</tr>';
      });
      h += '</tbody></table></div>';
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

  /* Read-only graded view: your answer vs correct, per cell. */
  function review(q, answer, seed) {
    var h = '<div class="pbq-review">', ok = '<span class="mark ok" aria-label="correct">&#10003;</span>', bad = '<span class="mark bad" aria-label="incorrect">&#10007;</span>';
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
      h += '<div class="table-wrap"><table class="pbq-table"><thead><tr><th></th>';
      q.columns.forEach(function (c) { h += '<th scope="col">' + esc(c.label) + '</th>'; });
      h += '</tr></thead><tbody>';
      q.rows.forEach(function (row, r) {
        h += '<tr><th scope="row">' + esc(row.label) + '</th>';
        q.columns.forEach(function (c) {
          if (row.answer && Object.prototype.hasOwnProperty.call(row.answer, c.key)) {
            var mine = answer && answer[r] ? answer[r][c.key] : '', good = mine === row.answer[c.key];
            h += '<td>' + (good ? ok : bad) + ' ' + esc(mine || '(none)') + (good ? '' : '<br><span class="right">Correct: ' + esc(row.answer[c.key]) + '</span>') + '</td>';
          } else h += '<td class="fixed">' + esc((row.fixed && row.fixed[c.key]) || '') + '</td>';
        });
        h += '</tr>';
      });
      h += '</tbody></table></div>';
    }
    return h + '</div>';
  }

  return { render: render, handle: handle, review: review, currentOrder: currentOrder };
})();
