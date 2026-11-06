/* Shared site header. The brand pill reads "Security+ | SY0-701" and steps down only as far as needed to fit beside the
   nav: "Sec+ | SY0-701", then "Sec+ | 701" (narrow phones). "Fits" means the nav neither runs into the pill nor past the
   header's right edge. Measured on load, on resize and once the web fonts are in; the guide and the practice page load
   this same file so their pills always agree. */
(function () {
  var hdr = document.querySelector('.site-header'), wrap = hdr && hdr.querySelector('.hwrap'),
    brand = wrap && wrap.querySelector('.brand'), nav = wrap && wrap.querySelector('nav');
  if (!brand || !nav) return;
  var raf = 0;
  function fits() {
    var w = wrap.getBoundingClientRect(), pr = parseFloat(getComputedStyle(wrap).paddingRight) || 0,
      b = brand.getBoundingClientRect(), n = nav.getBoundingClientRect();
    return n.right <= w.right - pr + 0.5 && n.left >= b.right + 8;
  }
  var STEPS = ['', 'short', 'tiny'];
  function fit() {
    raf = 0;
    for (var i = 0; i < STEPS.length; i++) {
      if (STEPS[i]) hdr.setAttribute('data-brand', STEPS[i]); else hdr.removeAttribute('data-brand');
      if (fits()) return;
    }
  }
  function queue() { if (!raf) raf = requestAnimationFrame(fit); }
  fit();
  window.addEventListener('resize', queue);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(queue, function () {});
})();
