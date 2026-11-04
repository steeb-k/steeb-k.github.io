#!/usr/bin/env node
/* Headless-Chromium checks for the study guide UI (behaviour the unit tests cannot see).
   Usage: node tests/guide-ui.test.js   (CHROMIUM=/path/to/chromium; skips with a note if Chromium is missing). Node 22+ (global WebSocket/fetch). */
'use strict';
const { spawn } = require('child_process'), fs = require('fs'), os = require('os'), path = require('path');
const ROOT = path.resolve(__dirname, '..'), SITE_DIR = path.resolve(ROOT, '..'), G = 'file://' + ROOT + '/guide/index.html';
const CHROME = process.env.CHROMIUM || '/usr/bin/chromium';
if (!fs.existsSync(CHROME) || typeof WebSocket === 'undefined') { console.log('SKIP: Chromium or global WebSocket not available'); process.exit(0); }
const sleep = ms => new Promise(r => setTimeout(r, ms));
let n = 0, failed = 0;
function ok(c, name, info) { if (c) { n++; console.log('ok   ' + name); } else { failed++; console.error('FAIL ' + name + (info ? '\n  ' + info : '')); } }

async function launch() {
  const port = 9300 + Math.floor(Math.random() * 600), dir = fs.mkdtempSync(path.join(os.tmpdir(), 'guide-ui-'));
  const proc = spawn(CHROME, ['--headless=new', '--no-sandbox', '--disable-gpu', '--remote-debugging-port=' + port, '--user-data-dir=' + dir, 'about:blank'], { stdio: 'ignore' });
  let info; for (let i = 0; i < 100 && !info; i++) { try { info = await (await fetch('http://127.0.0.1:' + port + '/json/version')).json(); } catch (e) { await sleep(100); } }
  const ws = new WebSocket(info.webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
  let id = 0; const pend = {}, subs = [];
  ws.onmessage = ev => { const m = JSON.parse(ev.data); if (m.id && pend[m.id]) { pend[m.id](m); delete pend[m.id]; } else subs.forEach(f => f(m)); };
  const send = (method, params, sessionId) => new Promise((res, rej) => { const i = ++id; pend[i] = m => m.error ? rej(new Error(method + ' ' + m.error.message)) : res(m.result); ws.send(JSON.stringify({ id: i, method, params: params || {}, sessionId })); });
  async function page(url, o) {
    o = o || {};
    const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
    const s = (m, p) => send(m, p, sessionId), reqs = [];
    subs.push(m => { if (m.sessionId === sessionId && m.method === 'Network.requestWillBeSent') reqs.push(m.params.request.url); });
    await s('Page.enable'); await s('Network.enable');
    await s('Emulation.setDeviceMetricsOverride', { width: o.w || 1280, height: o.h || 800, deviceScaleFactor: 1, mobile: !!o.mobile });
    if (o.touch) await s('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
    const P = {
      reqs,
      async eval(e) { const r = await s('Runtime.evaluate', { expression: e, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails).slice(0, 400)); return r.result.value; },
      async goto(u) { await s('Page.navigate', { url: u }); for (let i = 0; i < 100; i++) { try { if (await P.eval('document.documentElement.dataset.ready==="1"')) break; } catch (e) {} await sleep(50); } await sleep(400); },
      async move(x, y) { await s('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y }); },
      async tap(x, y) { await s('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] }); await s('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); },
    };
    await P.goto(url);
    return P;
  }
  return { page, close() { try { ws.close(); } catch (e) {} proc.kill('SIGKILL'); } };
}
const below = id => `(()=>{const h=document.getElementById('${id}'); return h.getBoundingClientRect().top-document.querySelector('.site-header').getBoundingClientRect().bottom})()`;

(async () => {
  const B = await launch();
  try {
    /* deep link lands below the sticky header; sidebar marks it */
    let p = await B.page(G + '#/domain-4-security-operations/obj-4-8');
    const d = await p.eval(below('obj-4-8'));
    ok(d >= 8 && d <= 24, 'deep link: heading 8-24px below the header', d);
    ok(await p.eval(`!!document.querySelector('#g-tree a.cur[data-id="obj-4-8"]')`), 'deep link: sidebar highlights the heading');
    /* sidebar tree: H2 list indented with its rule, H3s indented further than H2 text */
    const tree = await p.eval(`(()=>{const f=document.querySelector('.nt-file.open > a').getBoundingClientRect().left, h2=document.querySelector('.nt-h2s').getBoundingClientRect().left,
      h2a=document.querySelector('.nt-h2.active > a').getBoundingClientRect().left, h3=document.querySelector('.nt-h2.active .nt-h3s a').getBoundingClientRect().left; return {f,h2,h2a,h3}})()`);
    ok(tree.h2 > tree.f + 4 && tree.h3 > tree.h2a + 8, 'sidebar: H2 and H3 lists are indented', JSON.stringify(tree));
    /* tooltip stays inside the viewport, near the right edge and the bottom */
    for (const [w, h] of [[1280, 800], [390, 844]]) {
      p = await B.page(G + '#/ports-protocols', { w, h, mobile: w < 900 });
      const bad = [];
      const count = await p.eval(`(window.__t=[...document.querySelectorAll('.g-doc p .tip, .g-doc li .tip, .g-doc td .tip')].filter(t=>{const r=t.getBoundingClientRect(); return r.right<=document.documentElement.clientWidth && r.width>0})).length`);
      for (let k = 0; k < 12; k++) {
        const i = Math.floor(k * count / 12), where = [0.15, 0.5, 0.97][k % 3];
        const pt = await p.eval(`(()=>{const t=__t[${i}]; window.scrollBy(0, t.getBoundingClientRect().top - innerHeight*${where}); const r=t.getClientRects()[0]; const e=document.elementFromPoint(r.left+2, r.top+r.height/2); return (e===t||t.contains(e)) && {x:r.left+2,y:r.top+r.height/2}})()`);
        if (!pt) continue;
        await p.move(1, 1); await sleep(220); await p.move(pt.x, pt.y); await sleep(80);
        const b = await p.eval(`(()=>{const e=document.getElementById('g-tooltip'); if(e.hidden) return null; const r=e.getBoundingClientRect(); return {l:r.left,t:r.top,r:r.right,b:r.bottom,vw:document.documentElement.clientWidth,vh:innerHeight}})()`);
        if (!b || b.l < 0 || b.t < 0 || b.r > b.vw || b.b > b.vh) bad.push(JSON.stringify(b));
      }
      ok(!bad.length, `tooltip inside the viewport at ${w}x${h}`, bad.join(' '));
      ok(await p.eval('document.documentElement.scrollWidth<=document.documentElement.clientWidth'), `no horizontal page scroll at ${w}`);
    }
    /* touch: a tap shows the tooltip, a second tap hides it (focus from the tap must not cancel the toggle) */
    p = await B.page(G + '#/domain-1-general-security-concepts', { w: 390, h: 844, mobile: true, touch: true });
    const pt = await p.eval(`(()=>{const t=document.querySelectorAll('.g-doc p .tip')[3]; t.scrollIntoView({block:'center'}); const r=t.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2}})()`);
    await sleep(150); await p.tap(pt.x, pt.y); await sleep(250);
    ok(await p.eval(`!document.getElementById('g-tooltip').hidden`), 'touch: tap shows the tooltip');
    await p.tap(pt.x, pt.y); await sleep(250);
    ok(await p.eval(`document.getElementById('g-tooltip').hidden`), 'touch: second tap hides it');
    /* readiness: a junk entry does not hide valid attempts; corrupt JSON does not throw */
    await p.eval(`localStorage.setItem('secplus.attempts', JSON.stringify([null, 5, {finishedAt: 1, perObjective: {'4.8': {count: 4, points: 1, pct: .25}}}])); location.reload()`); await sleep(900);
    ok(/4\.8/.test(await p.eval(`document.getElementById('g-weak').textContent`)), 'readiness: junk entries skipped, valid attempt listed');
    await p.eval(`localStorage.setItem('secplus.attempts', '{oops'); location.reload()`); await sleep(900);
    ok(/errors=0/.test(await p.eval(`document.getElementById('boot-status').textContent`)), 'readiness: corrupt JSON does not throw');
    await p.eval(`localStorage.removeItem('secplus.attempts')`);
    /* quiz feedback link opens the guide page itself (not a file:// directory listing) */
    p = await B.page('file://' + ROOT + '/index.html#/module/4');
    await p.eval(`(()=>{const f=document.querySelector('form[data-form="module"]'); f.querySelector('input[name=pbq]').checked=false; f.querySelector('[data-act="start-module"]').click()})()`); await sleep(400);
    await p.eval(`document.querySelector('input[data-act="opt"]').click()`); await sleep(150);
    await p.eval(`document.querySelector('[data-act="check"]').click()`); await sleep(250);
    const href = await p.eval(`(()=>{const a=[...document.querySelectorAll('a[target=_blank]')].find(a=>/Objective/.test(a.textContent)); return a && a.href})()`);
    ok(/\/guide\/index\.html#\/domain-4-security-operations\/obj-4-\d+$/.test(href || ''), 'quiz feedback links to guide/index.html#/<slug>/obj-d-n', href);
    if (href) {
      p = await B.page(href);
      const id = href.split('/').pop(), dd = await p.eval(below(id));
      ok(dd >= 8 && dd <= 24, 'quiz link opens the guide at the objective heading', dd);
      /* every request stays inside the site folder */
      const ext = p.reqs.filter(u => !u.startsWith('file://' + SITE_DIR + '/') && !u.startsWith('data:'));
      ok(!ext.length, 'no requests outside ' + SITE_DIR, ext.join(' '));
    }
  } finally { B.close(); }
  console.log(failed ? 'FAILED (' + failed + ')' : 'all ' + n + ' guide UI checks passed');
  process.exitCode = failed ? 1 : 0;
})().catch(e => { console.error(e); process.exit(1); });
