/* ============================================================
   Diskoria showcase — full-bleed scrubbed slideshow engine

   The .deck is a tall scroll track; .stage pins to the viewport.
   We map scroll position to a continuous value `s` in viewport-
   heights (0 .. N*SLIDE) and, per slide:
     - crossfade the full-bleed image with its neighbours
     - ramp a darkening scrim (scroll "darkens" the screenshot)
     - drop the header in from the top, then fade the body up
     - light the matching nav dot
   ============================================================ */

(function () {
  "use strict";

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const deck = document.getElementById("deck");
  const slidesEl = document.getElementById("slides");
  const slides = slidesEl ? Array.prototype.slice.call(slidesEl.children) : [];
  const N = slides.length;

  // Only fall back to a stacked page if the slideshow truly can't run.
  if (!deck || N === 0 || !("requestAnimationFrame" in window)) {
    document.body.classList.add("no-scrollytell");
    initSimpleReveals();
    initProgressBarOnly();
    return;
  }

  /* ---- tunables ---- */
  const SLIDE = 1.4;      // viewport-heights of scroll devoted to each slide
  const CROSS = 0.17;     // half-width (fraction of a slide) of the crossfade
  const SCRIM_MAX = 0.72; // peak darkening of the screenshot
  const HEAD_DROP = reduceMotion ? 0 : 70; // px the header drops from above
  const BODY_RISE = reduceMotion ? 0 : 22;  // px the body rises into place

  // reveal timeline, in local slide progress u (0 = slide start, 1 = end)
  const SCRIM_IN  = [0.18, 0.44];
  const HEAD_IN   = [0.28, 0.52];
  const BODY_IN   = [0.40, 0.64];

  /* ---- cache per-slide elements ---- */
  const parts = slides.map(function (slide) {
    return {
      el: slide,
      bg: slide.querySelector(".slide-bg"),
      scrim: slide.querySelector(".slide-scrim"),
      head: slide.querySelector(".copy-head"),
      body: slide.querySelector(".copy-body"),
    };
  });

  /* ---- build dot nav ---- */
  const dotsWrap = document.getElementById("dots");
  const dots = [];
  if (dotsWrap) {
    slides.forEach(function (slide, i) {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Go to slide " + (i + 1));
      b.addEventListener("click", function () {
        // land mid-slide, where the copy is fully revealed
        const target = deckTop + (i * SLIDE + 0.55) * window.innerHeight;
        window.scrollTo({ top: target, behavior: reduceMotion ? "auto" : "smooth" });
      });
      dotsWrap.appendChild(b);
      dots.push(b);
    });
  }

  /* ---- geometry (recomputed on resize) ---- */
  let deckTop = 0;
  function layout() {
    deck.style.height = (N * SLIDE + 1) * 100 + "vh";
    deckTop = deck.offsetTop;
  }

  /* ---- helpers ---- */
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function smooth(t) { return t * t * (3 - 2 * t); }
  function ramp(x, a, b) { return smooth(clamp((x - a) / (b - a), 0, 1)); }

  const progress = document.getElementById("scrollProgress");
  const orbs = document.querySelectorAll(".orb");
  let activeDot = -1;

  function render() {
    const vh = window.innerHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    // page-wide progress bar
    const docH = document.documentElement.scrollHeight - vh;
    if (progress) progress.style.width = (docH > 0 ? (scrollTop / docH) * 100 : 0) + "%";

    // ambient orb drift (orbs are hidden under reduced-motion via CSS)
    if (!reduceMotion) {
      orbs.forEach(function (orb, i) {
        orb.style.transform = "translateY(" + scrollTop * (i + 1) * 0.04 + "px)";
      });
    }

    // s = how far we are through the deck, in viewport-heights
    const s = clamp((scrollTop - deckTop) / vh, 0, N * SLIDE);
    const h = CROSS * SLIDE; // crossfade half-width in viewport-heights

    let maxO = 0, active = 0;

    for (let i = 0; i < N; i++) {
      const p = parts[i];
      const segStart = i * SLIDE;
      const segEnd = (i + 1) * SLIDE;

      // ---- image crossfade opacity (trapezoid, blends with neighbours) ----
      let o;
      if (s <= segStart - h) o = 0;
      else if (s < segStart + h) o = (s - (segStart - h)) / (2 * h);   // fade in
      else if (s <= segEnd - h) o = 1;                                  // hold
      else if (i === N - 1) o = 1;                                      // last: don't fade out
      else if (s < segEnd + h) o = 1 - (s - (segEnd - h)) / (2 * h);    // fade out
      else o = 0;
      o = smooth(clamp(o, 0, 1));

      p.el.style.opacity = o;
      p.el.style.zIndex = Math.round(o * 100);
      p.el.style.pointerEvents = o > 0.6 ? "auto" : "none";
      if (o > maxO) { maxO = o; active = i; }

      if (o <= 0.002) continue; // hidden slide — skip the reveal math

      // ---- local slide progress + reveal timeline ----
      const u = (s - segStart) / SLIDE;

      if (p.scrim) p.scrim.style.opacity = ramp(u, SCRIM_IN[0], SCRIM_IN[1]) * SCRIM_MAX;

      if (p.head) {
        const hp = ramp(u, HEAD_IN[0], HEAD_IN[1]);
        p.head.style.opacity = hp;
        p.head.style.transform = "translateY(" + ((1 - hp) * -HEAD_DROP).toFixed(1) + "px)";
      }
      if (p.body) {
        const bp = ramp(u, BODY_IN[0], BODY_IN[1]);
        p.body.style.opacity = bp;
        p.body.style.transform = "translateY(" + ((1 - bp) * BODY_RISE).toFixed(1) + "px)";
      }
      // slow ken-burns zoom-out on the backdrop (skipped under reduced-motion)
      if (p.bg && !reduceMotion) {
        p.bg.style.transform = "scale(" + (1.18 - 0.10 * clamp(u, 0, 1)).toFixed(3) + ")";
      }
    }

    // active dot = most-visible slide
    if (active !== activeDot && dots.length) {
      if (dots[activeDot]) dots[activeDot].classList.remove("active");
      if (dots[active]) dots[active].classList.add("active");
      activeDot = active;
    }
  }

  /* ---- rAF-throttled scroll/resize ---- */
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () { render(); ticking = false; });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () { layout(); onScroll(); }, { passive: true });
  window.addEventListener("load", function () { layout(); render(); });

  initSimpleReveals();
  layout();
  render();

  /* ============================================================
     shared helpers (also used by the stacked fallback)
     ============================================================ */
  function initSimpleReveals() {
    const revealEls = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  function initProgressBarOnly() {
    const bar = document.getElementById("scrollProgress");
    if (!bar) return;
    window.addEventListener("scroll", function () {
      const st = window.scrollY || document.documentElement.scrollTop;
      const dh = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (dh > 0 ? (st / dh) * 100 : 0) + "%";
    }, { passive: true });
  }
})();
