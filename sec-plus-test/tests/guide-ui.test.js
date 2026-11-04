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
  const proc = spawn(CHROME, ['--headless=new', '--no-sandbox', '--disable-gpu', '--blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4', '--remote-debugging-port=' + port, '--user-data-dir=' + dir, 'about:blank'], { stdio: 'ignore' });
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
      async key(key, text) { const kc = { Escape: 27, Enter: 13, ' ': 32 }[key] || 0; await s('Input.dispatchKeyEvent', { type: 'keyDown', key, windowsVirtualKeyCode: kc, text }); await s('Input.dispatchKeyEvent', { type: 'keyUp', key, windowsVirtualKeyCode: kc }); await sleep(80); },
      async tap(x, y) { await s('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] }); await s('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); },
    };
    await P.goto(url);
    return P;
  }
  return { page, close() { try { ws.close(); } catch (e) {} proc.kill('SIGKILL'); } };
}
const srt = o => JSON.stringify(Object.keys(o).sort().map(k => [k, o[k]]));
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
    /* sidebar scroll box runs under the frosted header (top 0), its content starts below the header; when scrolled, its
       first rows pass beneath the header, and the auto-scroll keeps the current heading inside the visible part */
    const sv = await p.eval(`(()=>{const s=document.getElementById('g-side'), hb=document.querySelector('.site-header').getBoundingClientRect().bottom;
      const cur=document.querySelector('#g-tree a.cur').getBoundingClientRect(), t0=s.getBoundingClientRect().top;
      s.scrollTop=0; const q0=document.getElementById('g-q').getBoundingClientRect().top; s.scrollTop=200; const q1=document.getElementById('g-q').getBoundingClientRect().top;
      return {t0, q0, hb, q1, curTop:cur.top, curBot:cur.bottom, vh:innerHeight}})()`);
    ok(sv.t0 === 0 && sv.q0 >= sv.hb + 8 && sv.q1 < sv.hb && sv.curTop >= sv.hb && sv.curBot <= sv.vh, 'sidebar: scrolls under the header, content starts below it, current heading stays visible', JSON.stringify(sv));
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
    /* tooltip: expansion + meaning + link to the acronym list */
    for (const [acr, exp, meanRe] of [['SIEM', 'Security Information and Event Management', /correlates logs/], ['GCMP', 'Galois/Counter Mode Protocol', /AES-GCM based encryption/]]) {
      let found = false;
      for (const slug of ['domain-4-security-operations', 'domain-3-security-architecture', 'domain-2-threats-vulnerabilities-mitigations', 'domain-1-general-security-concepts', 'ports-protocols', 'exam-overview']) {
        p = await B.page(G + '#/' + slug);
        const pt = await p.eval(`(()=>{const t=[...document.querySelectorAll('.g-doc p .tip[data-acr="${acr}"], .g-doc li .tip[data-acr="${acr}"], .g-doc td .tip[data-acr="${acr}"]')][0]; if(!t) return null; t.scrollIntoView({block:'center'}); const r=t.getClientRects()[0]; return {x:r.left+2,y:r.top+r.height/2}})()`);
        if (!pt) continue;
        found = true; await p.move(1, 1); await sleep(200); await p.move(pt.x, pt.y); await sleep(150);
        const tip = await p.eval(`(()=>{const e=document.getElementById('g-tooltip'); return e.hidden?null:{html:e.innerHTML, text:e.textContent, a:(e.querySelector('a.t-more')||{}).getAttribute&&e.querySelector('a.t-more').getAttribute('href')}})()`);
        ok(tip && tip.text.includes(exp) && meanRe.test(tip.text) && tip.a === '#/acronyms/acr-' + acr.toLowerCase() && /class="t-mean"/.test(tip.html), `tooltip ${acr}: expansion + meaning + acronym-list link`, JSON.stringify(tip));
        break;
      }
      ok(found, `tooltip ${acr}: found in a chapter`);
    }

    /* highlights: paragraph, list item, blockquote, table row */
    const D4 = G + '#/domain-4-security-operations';
    p = await B.page(D4);
    await p.eval(`localStorage.removeItem('secplus.highlights'); location.reload()`); await sleep(900);
    const picks = await p.eval(`(()=>{const q=(s,n)=>{const l=[...document.querySelectorAll('.g-doc '+s+'[data-hl]')]; return l.length? l[Math.min(n,l.length-1)].getAttribute('data-hl'):null}; return [q('p',12),q('li',20),q('blockquote',1),q('tr',3)]})()`);
    ok(picks.every(Boolean), 'highlights: domain 4 has a paragraph, list item, blockquote and table row', JSON.stringify(picks));
    const tags = await p.eval(`${JSON.stringify(picks)}.map(k=>[...document.querySelectorAll('[data-hl]')].find(e=>e.getAttribute('data-hl')===k).tagName)`);
    ok(JSON.stringify(tags) === '["P","LI","BLOCKQUOTE","TR"]', 'highlights: block kinds', JSON.stringify(tags));
    const el = k => `[...document.querySelectorAll('[data-hl]')].find(e=>e.getAttribute('data-hl')===${JSON.stringify(k)})`;
    /* hover reveals the gutter button (real mouse), and the button sits left of the text without overflowing */
    const hp = await p.eval(`(()=>{const e=${el(picks[0])}; e.scrollIntoView({block:'center'}); const r=e.getBoundingClientRect(); return {x:r.left+30,y:r.top+6, left:r.left}})()`);
    await p.move(1, 1); await sleep(150);
    const op0 = await p.eval(`getComputedStyle(${el(picks[0])}.querySelector('.hl-btn')).opacity`);
    await p.move(hp.x, hp.y); await sleep(150);
    const op1 = await p.eval(`getComputedStyle(${el(picks[0])}.querySelector('.hl-btn')).opacity`);
    ok(op0 === '0' && op1 === '1', 'highlights: gutter button appears on hover', op0 + '/' + op1);
    const btnBox = await p.eval(`(()=>{const b=${el(picks[0])}.querySelector('.hl-btn').getBoundingClientRect(), r=${el(picks[0])}.getBoundingClientRect(); return {l:b.left, right:b.right, pr:r.left}})()`);
    ok(btnBox.l >= 0 && btnBox.right <= btnBox.pr, 'highlights: button is left of the paragraph, inside the viewport', JSON.stringify(btnBox));
    for (const k of picks) await p.eval(`${el(k)}.querySelector('.hl-btn').click()`);
    await sleep(100);
    const st = await p.eval(`JSON.parse(localStorage.getItem('secplus.highlights'))`);
    ok(Object.keys(st).length === 4 && picks.every(k => st[k] && st[k].file === 'domain-4-security-operations' && st[k].text && st[k].section && st[k].at), 'highlights: stored with file, section, text, time', JSON.stringify(Object.keys(st)));
    const expectCounts = `(()=>{const f=SEC_GUIDE.files.find(x=>x.slug==='domain-4-security-operations'), st=JSON.parse(localStorage.getItem('secplus.highlights')), by={}, par={}; let h2=null;
      f.toc.forEach(t=>{ if(t.level===2) h2=t.id; par[t.id]=t.level===2?t.id:h2; });
      Object.values(st).forEach(e=>{ if(par[e.section]) by[par[e.section]]=(by[par[e.section]]||0)+1; if(e.section!==par[e.section]) by[e.section]=(by[e.section]||0)+1; });
      const badges={}; document.querySelectorAll('.nt-h2s a[data-id]').forEach(a=>{const b=a.querySelector('.hl-badge'); if(b) badges[a.getAttribute('data-id')]=+b.textContent});
      const marks={}; document.querySelectorAll('.g-doc h2 .hl-mark, .g-doc h3 .hl-mark').forEach(m=>{marks[m.parentNode.id]=parseInt(m.title)});
      const fb=document.querySelector('.nt-file.open > a .hl-badge');
      return {by, badges, marks, file: fb && +fb.textContent, on: document.querySelectorAll('.g-doc .hl-on').length, pressed: document.querySelectorAll('.hl-btn[aria-pressed=true]').length, link: document.querySelector('#g-hlink .n').textContent}})()`;
    let c = await p.eval(expectCounts);
    ok(c.on === 4 && c.pressed === 4, 'highlights: four blocks styled and aria-pressed', JSON.stringify(c));
    ok(c.file === 4 && c.link === '(4)', 'highlights: chapter badge and "Highlighted (4)"', JSON.stringify(c));
    ok(Object.keys(c.by).length > 0 && srt(c.by) === srt(c.badges) && srt(c.by) === srt(c.marks), 'highlights: section marks and sidebar badges count correctly', JSON.stringify(c));
    await p.eval(`location.reload()`); await sleep(900);
    const c2 = await p.eval(expectCounts);
    ok(c2.on === 4 && c2.file === 4 && srt(c2.by) === srt(c2.badges), 'highlights: survive a reload', JSON.stringify(c2));
    /* Highlighted page: grouping, View in context, remove, export, clear all */
    await p.eval(`location.hash='#/highlights'`); await sleep(400);
    const pg = await p.eval(`({items:document.querySelectorAll('.hl-item').length, chap:[...document.querySelectorAll('.hl-chap')].map(e=>e.textContent), secs:document.querySelectorAll('.hl-sec').length, go:[...document.querySelectorAll('.hl-go')].map(a=>a.textContent), cur:document.getElementById('g-hlink').getAttribute('aria-current')})`);
    ok(pg.items === 4 && pg.chap.length === 1 && /Security Operations/.test(pg.chap[0]) && pg.secs >= 1 && pg.go.length === 4 && pg.go.every(t => t === 'View in context') && pg.cur === 'page', 'Highlighted page: grouped by chapter and section, "View in context" links', JSON.stringify(pg));
    ok(await p.eval(`document.documentElement.scrollWidth<=document.documentElement.clientWidth`), 'Highlighted page: no horizontal overflow');
    for (const k of picks) {
      await p.eval(`location.hash='#/highlights'`); await sleep(250);
      await p.eval(`document.querySelector('.hl-item[data-key=${JSON.stringify(k)}] .hl-go').click()`); await sleep(500);
      const lm = await p.eval(`(()=>{const e=${el(k)}; const r=e.getBoundingClientRect(), h=document.querySelector('.site-header').getBoundingClientRect().bottom; const cur=document.querySelector('#g-tree a.cur'); return {d:r.top-h, flash:e.classList.contains('hl-flash'), hash:location.hash.includes('?hl='), side: cur && cur.getAttribute('data-id'), sec: JSON.parse(localStorage.getItem('secplus.highlights'))[${JSON.stringify(k)}].section}})()`);
      ok(lm.d >= 8 && lm.d <= 24 && lm.flash && lm.hash && lm.side === lm.sec, 'View in context lands 8-24px below the header, flashes, marks the sidebar section (' + k.split(':')[2] + ')', JSON.stringify(lm));
    }
    await sleep(1600);
    ok(await p.eval(`!document.querySelector('.hl-flash')`), 'View in context: flash ends after ~1.5s');
    await p.eval(`location.hash='#/highlights'`); await sleep(300);
    await p.eval(`document.querySelector('.hl-item [data-act=hl-remove]').click()`); await sleep(150);
    ok(await p.eval(`document.querySelectorAll('.hl-item').length===3 && Object.keys(JSON.parse(localStorage.getItem('secplus.highlights'))).length===3 && document.querySelector('#g-hlink .n').textContent==='(3)'`), 'Highlighted page: remove deletes one item everywhere');
    await p.eval(`window.__blobs=[]; const o=URL.createObjectURL.bind(URL); URL.createObjectURL=b=>{window.__blobs.push(b); return o(b)}; document.querySelector('[data-act=hl-export]').click()`); await sleep(300);
    const md = await p.eval(`window.__blobs[0].text()`);
    const want = await p.eval(`(()=>{const st=JSON.parse(localStorage.getItem('secplus.highlights')); return Object.values(st).map(e=>e.text.replace(/\\s+/g,' '))})()`);
    ok(/^# Highlights\n\n## [^\n]*Security Operations[^\n]*\n\n### [^\n]+\n\n> /.test(md) && want.every(t => md.includes('> ' + t + '\n')) && !/No longer found/.test(md) && md.endsWith('\n'), 'export: Markdown with chapter, section and blockquoted text', md.slice(0, 300));
    await p.eval(`document.querySelector('[data-act=hl-clear]').click()`); await sleep(100);
    ok(await p.eval(`!!document.querySelector('[data-act=hl-clear-yes]') && document.querySelectorAll('.hl-item').length===3`), 'clear all asks for confirmation first');
    await p.eval(`document.querySelector('[data-act=hl-clear-yes]').click()`); await sleep(150);
    ok(await p.eval(`document.querySelectorAll('.hl-item').length===0 && /Nothing highlighted/.test(document.querySelector('.hl-empty').textContent) && localStorage.getItem('secplus.highlights')==='{}' && document.querySelector('#g-hlink .n').textContent==='(0)'`), 'clear all empties the list, storage and counter');
    /* orphans: stored text no longer matches any block; section still exists -> link, no flash target */
    const hsave = `localStorage.setItem('secplus.highlights', JSON.stringify({
      'domain-4-security-operations:obj-4-8:deadbeef': {file:'domain-4-security-operations', section:'obj-4-8', heading:'4.8', text:'Text that was edited away', at:'2026-01-01T00:00:00Z'},
      'gone:nowhere:00000000': {file:'gone-chapter', section:'nowhere', heading:'x', text:'Lost chapter text', at:'2026-01-02T00:00:00Z'}, junk: 5, junk2: null, junk3: {file: 3}})); location.reload()`;
    await p.eval(hsave); await sleep(900);
    await p.eval(`location.hash='#/highlights'`); await sleep(300);
    const orp = await p.eval(`(()=>{const h=[...document.querySelectorAll('.hl-chap')].map(e=>e.textContent); const items=[...document.querySelectorAll('.hl-item')].map(li=>({t:li.querySelector('.hl-text').textContent, href:li.querySelector('.hl-go')?li.querySelector('.hl-go').getAttribute('href'):null})); return {h, items, n:document.querySelector('#g-hlink .n').textContent, errs:document.getElementById('boot-status').textContent}})()`);
    ok(JSON.stringify(orp.h) === '["No longer found"]' && orp.items.length === 2 && orp.items[0].href === '#/domain-4-security-operations/obj-4-8' && orp.items[1].href === null && orp.n === '(2)', 'orphans: listed under "No longer found"; "View in context" only while the section exists', JSON.stringify(orp));
    ok(/errors=0/.test(orp.errs), 'orphans: no errors');
    await p.eval(`document.querySelector('.hl-go').click()`); await sleep(400);
    ok(await p.eval(`!document.querySelector('.hl-flash') && location.hash==='#/domain-4-security-operations/obj-4-8'`), 'orphan View in context opens the section without a flash');
    /* corrupt storage never throws */
    for (const bad of ['{oops', '[1,2,3]', '"str"', '{"a":5,"b":null,"c":{"file":1}}', 'null']) {
      await p.eval(`localStorage.setItem('secplus.highlights', ${JSON.stringify(bad)}); location.hash='#/domain-4-security-operations'; location.reload()`); await sleep(900);
      await p.eval(`document.querySelector('.g-doc p[data-hl] .hl-btn, .g-doc p .hl-btn').click()`); await sleep(100);
      await p.eval(`location.hash='#/highlights'`); await sleep(250);
      ok(/errors=0/.test(await p.eval(`document.getElementById('boot-status').textContent`)) && await p.eval(`document.querySelectorAll('.hl-item').length`) === 1, 'corrupt highlights storage (' + bad.slice(0, 12) + ') is ignored, page still works');
    }
    await p.eval(`localStorage.removeItem('secplus.highlights')`);
    /* phone: gutter buttons stay inside the viewport, no horizontal overflow (touch: buttons always visible) */
    for (const slug of ['domain-4-security-operations', 'acronyms', 'ports-protocols']) {
      p = await B.page(G + '#/' + slug, { w: 390, h: 844, mobile: true, touch: true });
      if (slug === 'acronyms') {
        const dr = await p.eval(`(()=>{document.getElementById('g-menu').click(); const s=document.getElementById('g-side').getBoundingClientRect(), hb=document.querySelector('.site-header').getBoundingClientRect().bottom,
          q=document.getElementById('g-q').getBoundingClientRect().top, m=document.getElementById('g-menu'), vis=sel=>getComputedStyle(m.querySelector(sel)).display!=='none';
          const openIcons={back:vis('.i-back'), burger:vis('.i-open'), label:m.getAttribute('aria-label')}; m.click(); const closedIcons={back:vis('.i-back'), burger:vis('.i-open'), label:m.getAttribute('aria-label')};
          return {top:s.top, hb, q, openIcons, closedIcons}})()`);
        ok(Math.abs(dr.top - dr.hb) <= 1 && dr.q >= dr.hb + 8, 'phone drawer: opens flush under the header, search box not hidden', JSON.stringify(dr));
        ok(dr.openIcons.back && !dr.openIcons.burger && /back/i.test(dr.openIcons.label) && dr.closedIcons.burger && !dr.closedIcons.back && dr.closedIcons.label === 'Contents',
          'phone menu button: hamburger when closed, back arrow when open', JSON.stringify([dr.openIcons, dr.closedIcons]));
        /* floating button: fixed bottom-left over the content, outside the header, on top of the open drawer; pill at the header's left edge */
        const fab = await p.eval(`(()=>{const m=document.getElementById('g-menu'), r=m.getBoundingClientRect(), hit=()=>{const e=document.elementFromPoint(r.left+r.width/2, r.top+r.height/2); return e===m||m.contains(e)};
          const closedHit=hit(); m.click(); const openHit=hit(); const sideW=parseFloat(getComputedStyle(document.getElementById('g-side')).width); m.click();
          window.scrollTo(0, 400); const r2=m.getBoundingClientRect(); window.scrollTo(0, 0);
          return {inHeader:!!m.closest('.site-header'), left:r.left, bottomGap:innerHeight-r.bottom, w:r.width, closedHit, openHit, overDrawer:r.left<sideW, stays:r2.top===r.top, pillLeft:document.querySelector('.brand-pill').getBoundingClientRect().left}})()`);
        ok(!fab.inHeader && fab.left >= 8 && fab.left <= 24 && fab.bottomGap >= 8 && fab.bottomGap <= 24 && fab.w >= 44 && fab.closedHit && fab.openHit && fab.overDrawer && fab.stays && fab.pillLeft <= 24,
          'phone menu button: floats fixed at bottom-left, clickable over the content and over the open drawer, pill flush left', JSON.stringify(fab));
      }
      const ph = await p.eval(`(()=>{let minL=1e9, n=0; document.querySelectorAll('.g-doc .hl-btn').forEach(b=>{const r=b.getBoundingClientRect(); if(r.width&&r.right>0){n++; minL=Math.min(minL, r.left)}}); const vw=document.documentElement.clientWidth; return {minL, n, over:document.documentElement.scrollWidth-vw, op:getComputedStyle(document.querySelector('.hl-btn')).opacity}})()`);
      ok(ph.n > 0 && ph.minL >= 0 && ph.over <= 0 && ph.op === '0.45', `phone 390: ${slug} gutter buttons fit, no horizontal overflow, visible at 45%`, JSON.stringify(ph));
    }
    /* key parity: the rendered page and the detached parse used for orphan detection give every block the same key
       (list items split by tooltip <abbr>s used to get extra spaces, so every such highlight showed as "No longer found") */
    p = await B.page(G + '#/domain-1-general-security-concepts');
    await p.eval(`localStorage.setItem('secplus.highlights', JSON.stringify(Object.fromEntries([...document.querySelectorAll('.g-doc [data-hl]')].map(e=>[e.getAttribute('data-hl'), {file:'domain-1-general-security-concepts', section:e.getAttribute('data-hl').split(':')[1], heading:'', text:e.textContent.slice(0,80), at:'1'}])))); location.hash='#/highlights'; location.reload()`); await sleep(900);
    const par = await p.eval(`({items:document.querySelectorAll('.hl-item').length, li:Object.keys(JSON.parse(localStorage.getItem('secplus.highlights'))).length, orphan:[...document.querySelectorAll('.hl-chap')].some(h=>h.textContent==='No longer found')})`);
    ok(par.items === par.li && par.items > 150 && !par.orphan, 'highlights: every block of a chapter keeps its key on reload (no false "No longer found")', JSON.stringify(par));
    /* identical paragraphs get distinct keys; editing an unrelated paragraph keeps the other keys */
    p = await B.page(G + '#/exam-overview');
    await p.eval(`localStorage.removeItem('secplus.highlights'); location.reload()`); await sleep(900);
    await p.eval(`(()=>{const f=SEC_GUIDE.files.find(x=>x.slug==='formulas-numbers'); f.html += '<p>Twin paragraph text.</p><p>Twin   paragraph TEXT.</p>'; location.hash='#/formulas-numbers'; return 1})()`); await sleep(300);
    const d1 = await p.eval(`(()=>{const keys=[...document.querySelectorAll('.g-doc p[data-hl]')].slice(-2).map(e=>e.getAttribute('data-hl')); const other=document.querySelectorAll('.g-doc [data-hl]')[3].getAttribute('data-hl'); document.querySelectorAll('.g-doc p[data-hl]')[[...document.querySelectorAll('.g-doc p[data-hl]')].length-1].querySelector('.hl-btn').click(); return {keys, other, on:[...document.querySelectorAll('.g-doc p[data-hl]')].slice(-2).map(e=>e.classList.contains('hl-on'))}})()`);
    ok(d1.keys[0] !== d1.keys[1] && d1.keys[1] === d1.keys[0] + '~2' && JSON.stringify(d1.on) === '[false,true]', 'highlights: two identical paragraphs get distinct keys and toggle independently', JSON.stringify(d1));
    await p.eval(`(()=>{const f=SEC_GUIDE.files.find(x=>x.slug==='formulas-numbers'); f.html=f.html.replace(/(<p>)([^<]{20})/, '$1Edited: $2'); location.hash='#/exam-overview'})()`); await sleep(200);
    await p.eval(`location.hash='#/formulas-numbers'`); await sleep(300);
    const d2 = await p.eval(`({other:document.querySelectorAll('.g-doc [data-hl]')[3].getAttribute('data-hl'), twinOn:[...document.querySelectorAll('.g-doc p[data-hl]')].slice(-1)[0].classList.contains('hl-on')})`);
    ok(d2.other === d1.other && d2.twinOn, 'highlights: editing an unrelated paragraph does not change other keys', JSON.stringify([d1.other, d2]));
    await p.eval(`localStorage.removeItem('secplus.highlights')`);
    /* nested list item: hovering it shows only its own button */
    p = await B.page(G + '#/domain-1-general-security-concepts');
    const nest = await p.eval(`(()=>{const c=[...document.querySelectorAll('.g-doc li.hl-block li.hl-block')][0]; if(!c) return null; c.scrollIntoView({block:'center'}); const r=c.getBoundingClientRect(); window.__c=c; return {x:r.left+40,y:r.top+6}})()`);
    if (nest) {
      await p.move(1, 1); await sleep(150); await p.move(nest.x, nest.y); await sleep(150);
      const nv = await p.eval(`({own:getComputedStyle(__c.querySelector(':scope > .hl-btn')).opacity, parent:getComputedStyle(__c.parentNode.closest('li.hl-block').querySelector(':scope > .hl-btn')).opacity})`);
      ok(nv.own === '1' && nv.parent === '0', 'highlights: a nested list item shows only its own button on hover', JSON.stringify(nv));
    } else ok(true, 'highlights: (no nested list items in domain 1)');
    /* acronym table: the row button never covers the key text, the column label stays aligned */
    p = await B.page(G + '#/acronyms');
    const ak = await p.eval(`(()=>{const tr=document.getElementById('acr-vlan'), td=tr.cells[0], b=td.querySelector('.hl-btn').getBoundingClientRect(); const tn=[...td.childNodes].find(n=>n.nodeType===3&&n.nodeValue.trim()); const rg=document.createRange(); rg.selectNodeContents(tn); const t=rg.getBoundingClientRect(); const th=tr.closest('table').querySelector('thead th'); const rh=document.createRange(); rh.selectNodeContents(th); return {btnR:b.right, textL:t.left, headL:rh.getBoundingClientRect().left}})()`);
    ok(ak.btnR <= ak.textL - 2 && Math.abs(ak.headL - ak.textL) <= 1, 'acronyms: row button left of the key text; header label aligned', JSON.stringify(ak));
    /* acronym-list arrival flash shows on a highlighted row */
    await p.eval(`localStorage.removeItem('secplus.highlights'); document.getElementById('acr-vlan').querySelector('.hl-btn').click(); location.hash='#/exam-overview'`); await sleep(250);
    await p.eval(`location.hash='#/acronyms/acr-vlan'`); await sleep(200);
    const fl = await p.eval(`(()=>{const tr=document.getElementById('acr-vlan'); return {on:tr.classList.contains('hl-on'), flash:tr.classList.contains('flash'), bg:getComputedStyle(tr.cells[1]).backgroundColor, tint:getComputedStyle(document.documentElement).getPropertyValue('--accent-tint').trim()}})()`);
    ok(fl.on && fl.flash && /156, 195, 230|47, 111, 159/.test(fl.bg), 'acronyms: arrival flash is visible on a highlighted row', JSON.stringify(fl));
    /* tooltip: alternate spellings resolve to the 91 row; Escape and blur hide it */
    const alt = await p.eval(`(()=>{const out={}; for (const k of ['IMAP4','IOC','IPsec','TOCTOU','TOC/TOU']) { const a=document.createElement('abbr'); a.className='tip'; a.tabIndex=0; a.setAttribute('data-acr',k); a.setAttribute('data-tip','x'); a.textContent=k; document.querySelector('.g-doc p').appendChild(a); a.focus(); const e=document.getElementById('g-tooltip'); out[k]=!e.hidden && !!e.querySelector('.t-mean') && e.querySelector('.t-more').getAttribute('href'); a.blur(); a.remove(); } return out})()`);
    ok(alt.IMAP4 === '#/acronyms/acr-imap-imap4' && alt.IOC === '#/acronyms/acr-ioc' && alt.IPsec === '#/acronyms/acr-ipsec' && alt.TOCTOU === '#/acronyms/acr-toc-tou-toctou' && alt['TOC/TOU'] === alt.TOCTOU, 'tooltip: alternate spellings (IMAP4, IOC, IPsec, TOCTOU) show the 91 row meaning and link', JSON.stringify(alt));
    p = await B.page(G + '#/domain-3-security-architecture');
    await p.eval(`document.querySelectorAll('.g-doc p .tip')[5].focus()`); await sleep(50);
    const tv = await p.eval(`!document.getElementById('g-tooltip').hidden`);
    await p.key('Escape'); await sleep(50);
    const te = await p.eval(`document.getElementById('g-tooltip').hidden`);
    await p.eval(`document.querySelectorAll('.g-doc p .tip')[6].focus()`); await sleep(50); await p.eval(`document.activeElement.blur()`); await sleep(250);
    ok(tv && te && await p.eval(`document.getElementById('g-tooltip').hidden`), 'tooltip: Escape and blur hide it');
    /* keyboard: Space and Enter on a focused gutter button toggle; the focus ring is visible */
    await p.eval(`localStorage.removeItem('secplus.highlights'); document.querySelectorAll('.g-doc p[data-hl] > .hl-btn')[3].focus()`);
    const kb = await p.eval(`(()=>{const b=document.activeElement, cs=getComputedStyle(b); return {op:cs.opacity, ring:cs.outlineStyle+' '+cs.outlineWidth}})()`);
    await p.key(' ', ' '); const k1 = await p.eval(`document.activeElement.getAttribute('aria-pressed')`);
    await p.key('Enter', '\r'); const k2 = await p.eval(`document.activeElement.getAttribute('aria-pressed')`);
    ok(kb.op === '1' && kb.ring === 'solid 2px' && k1 === 'true' && k2 === 'false', 'highlights: keyboard focus shows the button with a ring; Space/Enter toggle', JSON.stringify([kb, k1, k2]));
    /* storage refusing writes: the toggle still works for this visit and says it was not saved */
    await p.eval(`window.__set=Storage.prototype.setItem; Storage.prototype.setItem=function(){ throw new DOMException('full','QuotaExceededError') }; document.querySelectorAll('.g-doc p[data-hl] > .hl-btn')[4].click()`); await sleep(100);
    const q = await p.eval(`({on:document.querySelectorAll('.g-doc p[data-hl]')[4].classList.contains('hl-on'), live:document.getElementById('g-live').textContent, errs:document.getElementById('boot-status').textContent})`);
    await p.eval(`Storage.prototype.setItem=window.__set`);
    ok(q.on && /not saved/.test(q.live) && /errors=0/.test(q.errs), 'highlights: a storage quota error is caught and announced', JSON.stringify(q));
    /* crafted ?hl= values do not throw */
    for (const h of ['__proto__', 'constructor', 'toString', '%E0%A4%A']) { await p.eval(`location.hash='#/domain-3-security-architecture/obj-3-1?hl=${h}'`); await sleep(150); }
    ok(/errors=0/.test(await p.eval(`document.getElementById('boot-status').textContent`)), 'View in context: crafted ?hl= values (__proto__, constructor, bad escapes) do not throw');
    /* light theme: links and badges on the highlight tint keep >= 4.5:1 */
    await p.eval(`localStorage.setItem('secplus.settings', JSON.stringify({theme:'light'})); localStorage.removeItem('secplus.highlights'); location.hash='#/domain-4-security-operations'; location.reload()`); await sleep(900);
    await p.eval(`[...document.querySelectorAll('.g-doc [data-hl]')].filter(e=>e.querySelector('a')).slice(0,6).forEach(e=>e.querySelector('.hl-btn').click()); document.querySelector('.g-doc .hl-on').scrollIntoView({block:'center'})`); await sleep(300);
    const cr = await p.eval(`(()=>{const P=c=>{const m=c.match(/[\\d.]+/g).map(Number); return [m[0],m[1],m[2],m.length>3?m[3]:1]}, O=(f,b)=>[0,1,2].map(i=>f[i]*f[3]+b[i]*(1-f[3])), L=c=>{const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}; return .2126*f(c[0])+.7152*f(c[1])+.0722*f(c[2])}, R=(a,b)=>{const x=L(a),y=L(b); return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
      const bg=el=>{const ch=[]; for(let e=el;e;e=e.parentElement) ch.push(P(getComputedStyle(e).backgroundColor)); let c=P(getComputedStyle(document.body).backgroundColor); if(!c[3]) c=[255,255,255,1]; for(let i=ch.length-1;i>=0;i--) if(ch[i][3]) c=O(ch[i],c).concat(1); return c};
      const m=(el)=>R(P(getComputedStyle(el).color), bg(el)); const links=[...document.querySelectorAll('.g-doc .hl-on a')].map(m); document.querySelector('#g-tree a.cur')||document.querySelector('#g-tree .nt-h2s a .hl-badge').closest('a').classList.add('cur');
      const badges=[...document.querySelectorAll('#g-tree .hl-badge')].map(m); return {link:Math.min(...links), badge:Math.min(...badges), n:links.length}})()`);
    ok(cr.n > 0 && cr.link >= 4.5 && cr.badge >= 4.5, 'light theme: links and count badges on the highlight tint >= 4.5:1', JSON.stringify(cr));
    await p.eval(`localStorage.removeItem('secplus.settings'); localStorage.removeItem('secplus.highlights')`);
    /* View in context near the end of a chapter (the block cannot reach the top): the sidebar still marks its section; Back returns */
    p = await B.page(G + '#/ports-protocols');
    await p.eval(`localStorage.removeItem('secplus.highlights'); location.reload()`); await sleep(900);
    const nb = await p.eval(`(()=>{const h=document.getElementById('email-authentication'); let e=h.nextElementSibling; while(e && !e.matches('[data-hl]') && !e.querySelector('[data-hl]')) e=e.nextElementSibling; const b=e.matches('[data-hl]')?e:e.querySelector('[data-hl]'); b.querySelector('.hl-btn').click(); return b.getAttribute('data-hl')})()`);
    await p.eval(`location.hash='#/highlights'`); await sleep(300);
    await p.eval(`document.querySelector('.hl-item[data-key="${nb}"] .hl-go').click()`); await sleep(500);
    const nbr = await p.eval(`({cur:(document.querySelector('#g-tree a.cur')||{getAttribute:()=>null}).getAttribute('data-id'), bottom:Math.abs(scrollY+innerHeight-document.documentElement.scrollHeight)<2})`);
    ok(nbr.cur === 'email-authentication', 'View in context near the chapter end: sidebar marks the section', JSON.stringify(nbr));
    await p.eval(`history.back()`); await sleep(400);
    ok(await p.eval(`location.hash==='#/highlights' && document.querySelectorAll('.hl-item').length===1`), 'View in context: Back returns to the Highlighted page');
    /* clear-all confirmation does not survive leaving the page */
    await p.eval(`document.querySelector('[data-act=hl-clear]').click()`); await sleep(100);
    await p.eval(`location.hash='#/ports-protocols'`); await sleep(250); await p.eval(`location.hash='#/highlights'`); await sleep(250);
    ok(await p.eval(`!document.querySelector('[data-act=hl-clear-yes]') && !!document.querySelector('[data-act=hl-clear]')`), 'clear all: an unanswered confirmation is reset when the page is left');
    /* export: a block with "<script>" stays literal text (no raw HTML in the Markdown) */
    await p.eval(`localStorage.removeItem('secplus.highlights'); location.hash='#/domain-2-threats-vulnerabilities-mitigations'`); await sleep(300);
    const xk = await p.eval(`(()=>{const e=[...document.querySelectorAll('.g-doc [data-hl]')].find(e=>e.textContent.includes('<script>')); e.querySelector('.hl-btn').click(); return !!e})()`);
    await p.eval(`location.hash='#/highlights'`); await sleep(250);
    await p.eval(`window.__blobs=[]; const o=URL.createObjectURL.bind(URL); URL.createObjectURL=b=>{window.__blobs.push(b); return o(b)}; document.querySelector('[data-act=hl-export]').click()`); await sleep(300);
    const md2 = await p.eval(`window.__blobs[0].text()`);
    ok(xk && /\n> [^\n]*\\<script>/.test(md2) && !/(^|[^\\])<script>/.test(md2) && await p.eval(`document.querySelector('.hl-text').textContent.includes('<script>') && !document.querySelector('.hl-text script')`), 'export and page: "<script>" in a highlight stays literal text', md2.slice(0, 300));
    await p.eval(`localStorage.removeItem('secplus.highlights'); location.hash='#/domain-2-threats-vulnerabilities-mitigations'`); await sleep(300);
    const lt = await p.eval(`(()=>{const e=[...document.querySelectorAll('.g-doc [data-hl]')].sort((a,b)=>b.textContent.length-a.textContent.length)[0]; e.querySelector('.hl-btn').click(); const t=JSON.parse(localStorage.getItem('secplus.highlights'))[e.getAttribute('data-hl')].text; return {len:t.length, end:t.slice(-3), full:e.textContent.length}})()`);
    ok(lt.full > 300 && lt.len <= 300 && lt.end.endsWith('…'), 'highlights: a long block is saved as its first 300 chars with an ellipsis', JSON.stringify(lt));
    await p.eval(`localStorage.removeItem('secplus.highlights')`);
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
