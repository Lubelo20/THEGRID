/* =============================================================================
 * The Grid Technologies — particle sphere → "THE GRID" intro animation
 * Dependency-free vanilla JS. ~7kb. Drop in and mount onto any container.
 *
 * USAGE
 *   <div id="grid-intro" style="width:100%;aspect-ratio:16/9"></div>
 *   <script src="grid-intro.js"></script>
 *   <script>
 *     GridIntro.mount('#grid-intro', {
 *       // all options are optional — defaults match the brand
 *       text: 'THE GRID',
 *       subtitle: 'Digital Out-of-Home Advertising',
 *       loop: true,            // false = play once and hold the wordmark
 *       accent: null,          // e.g. '#3fb6e0' to tint particles as they land
 *       background: 'transparent' // inherits the section bg (e.g. charcoal hero)
 *     });
 *   </script>
 *
 * NOTES
 *   - The container MUST have a width and height (set aspect-ratio or a height).
 *   - The wordmark uses the container's computed font-family, so it matches
 *     whatever your styles.css applies. Override with the `font` option.
 *   - Respects prefers-reduced-motion: shows the final wordmark, no animation.
 *   - mount() returns a controller: { replay(), destroy() }.
 * ========================================================================== */
(function (global) {
  'use strict';

  var DEFAULTS = {
    text: 'THE GRID',
    subtitle: 'Digital Out-of-Home Advertising',
    font: null,                 // null = inherit container font-family
    weight: 500,                // font-weight used for the wordmark glyphs
    maxSize: 96,                // px cap on the wordmark size
    loop: true,
    period: 7400,               // ms for one full cycle
    speed: 1,                   // rotation speed multiplier
    density: null,              // px step when sampling text (lower = more dots)
    accent: null,               // hex string to tint particles on settle
    background: 'transparent',
    grid: true,                 // faint backdrop grid (on-brand)
    sphereColor: [150, 154, 160],   // base silver (darkest depth)
    sphereHi:    [215, 219, 226],   // silver at front of sphere
    wordColor:   [242, 244, 247],   // settled wordmark
    subtitleColor: '#9aa0aa'
  };

  function hexToRgb(hex) {
    if (!hex) return null;
    var h = hex.replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
  function lerp(a, b, t) { return a + (b - a) * t; }

  function mount(target, options) {
    var el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) throw new Error('GridIntro: container not found: ' + target);

    var o = {};
    for (var key in DEFAULTS) o[key] = DEFAULTS[key];
    if (options) for (var k in options) o[k] = options[k];

    var accentRgb = hexToRgb(o.accent);
    var reduce = global.matchMedia &&
      global.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var canvas = document.createElement('canvas');
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', o.text + ' — ' + o.subtitle);
    canvas.style.cssText = 'display:block;width:100%;height:100%;background:' + o.background;
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    el.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    var W = 0, H = 0, cx = 0, cy = 0, R = 0, G = 0, dpr = 1;
    var parts = [], fam = '', rafId = null, t0 = 0, visible = true, paused = false, killed = false;

    function setLS(c, v) { try { c.letterSpacing = v; } catch (e) {} }

    function setup() {
      dpr = Math.min(global.devicePixelRatio || 1, 2);
      W = el.clientWidth || 1;
      H = el.clientHeight || 1;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = W * 0.5; cy = H * 0.46;
      R = Math.min(W, H) * 0.27;
      fam = o.font || getComputedStyle(el).fontFamily || 'sans-serif';
      G = fitWordmarkSize();
    }

    function fitWordmarkSize() {
      var size = Math.min(W * 0.135, o.maxSize);
      setLS(ctx, '6px');
      ctx.font = o.weight + ' ' + size + 'px ' + fam;
      // measureText already reflects whatever letter-spacing the canvas applies
      // (6px where supported, none where not), so don't add it again.
      var w = ctx.measureText(o.text).width;
      var maxW = W * 0.86;
      if (w > maxW) size *= maxW / w;
      return size;
    }

    function sampleTargets() {
      var off = document.createElement('canvas');
      off.width = W; off.height = H;
      var c = off.getContext('2d');
      c.clearRect(0, 0, W, H);
      c.fillStyle = '#fff';
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      setLS(c, '6px');
      c.font = o.weight + ' ' + G + 'px ' + fam;
      c.fillText(o.text, W * 0.5, H * 0.46);
      var data = c.getImageData(0, 0, W, H).data;
      var step = o.density || Math.max(4, Math.round(W / 165));
      var pts = [];
      for (var y = 0; y < H; y += step)
        for (var x = 0; x < W; x += step)
          if (data[(y * W + x) * 4 + 3] > 128) pts.push([x, y]);
      return pts;
    }

    function build() {
      var t = sampleTargets(), N = t.length, gold = Math.PI * (3 - Math.sqrt(5));
      parts = new Array(N);
      for (var i = 0; i < N; i++) {
        var yy = 1 - (i / (N - 1)) * 2;
        var rr = Math.sqrt(Math.max(0, 1 - yy * yy));
        var th = gold * i;
        parts[i] = {
          ux: Math.cos(th) * rr, uy: yy, uz: Math.sin(th) * rr,
          tx: t[i][0], ty: t[i][1],
          delay: Math.random() * 0.20,
          size: 1.7 + Math.random() * 1.5,
          spread: (Math.random() - 0.5) * 55
        };
      }
    }

    function drawGrid() {
      if (!o.grid) return;
      ctx.strokeStyle = 'rgba(255,255,255,0.035)';
      ctx.lineWidth = 1;
      for (var x = 0; x < W; x += 36) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (var y = 0; y < H; y += 36) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    }

    var M0 = 0.32, M1 = 0.66, SUB0 = 0.76, HOLD = 0.95;

    function render(p, now) {
      var A = now * 0.00055 * o.speed;
      var cosA = Math.cos(A), sinA = Math.sin(A);
      ctx.clearRect(0, 0, W, H);
      drawGrid();

      var sFade = p < 0.05 ? p / 0.05 : 1;
      var hi = o.sphereHi, lo = o.sphereColor, wc = o.wordColor;
      var settleTo = accentRgb || wc;

      for (var i = 0; i < parts.length; i++) {
        var pt = parts[i];
        var rx = pt.ux * cosA + pt.uz * sinA;
        var rz = -pt.ux * sinA + pt.uz * cosA;
        var sxp = cx + rx * R, syp = cy + pt.uy * R;
        var depth = (rz + 1) / 2;
        var x, y, size, alpha, r_, g_, b_;

        if (p < M0) {
          x = sxp; y = syp;
          size = pt.size * (0.55 + 0.45 * depth);
          alpha = (0.3 + 0.6 * depth) * sFade;
          r_ = Math.round(lerp(lo[0], hi[0], depth));
          g_ = Math.round(lerp(lo[1], hi[1], depth));
          b_ = Math.round(lerp(lo[2], hi[2], depth));
        } else {
          var lt = (p - M0 - pt.delay) / ((M1 - M0) - 0.20);
          lt = lt < 0 ? 0 : lt > 1 ? 1 : lt;
          var e = ease(lt);
          x = lerp(sxp, pt.tx, e) + Math.sin(e * Math.PI) * pt.spread * 0.3;
          y = lerp(syp, pt.ty, e) - Math.sin(e * Math.PI) * 24;
          size = pt.size;
          alpha = (o.loop && p > HOLD) ? Math.max(0, 1 - (p - HOLD) / 0.05) : 1;
          r_ = Math.round(lerp(215, settleTo[0], e));
          g_ = Math.round(lerp(219, settleTo[1], e));
          b_ = Math.round(lerp(226, settleTo[2], e));
        }
        ctx.fillStyle = 'rgba(' + r_ + ',' + g_ + ',' + b_ + ',' + alpha + ')';
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
      }

      if (o.subtitle) {
        var sub = (p - SUB0) / 0.10;
        if (sub > 0) {
          sub = Math.min(1, sub);
          var sa = ((o.loop && p > HOLD) ? Math.max(0, 1 - (p - HOLD) / 0.05) : 1) * sub;
          ctx.globalAlpha = sa;
          ctx.fillStyle = o.subtitleColor;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          setLS(ctx, '4px');
          ctx.font = '700 ' + (G * 0.17) + 'px ' + fam;
          ctx.fillText(o.subtitle, W * 0.5, H * 0.46 + G * 0.62);
          ctx.strokeStyle = 'rgba(154,160,170,' + (sa * 0.5) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(W * 0.5 - 34, H * 0.46 + G * 0.40);
          ctx.lineTo(W * 0.5 + 34, H * 0.46 + G * 0.40);
          ctx.stroke();
          ctx.globalAlpha = 1;
          setLS(ctx, '0px');
        }
      }
    }

    function loop(now) {
      if (paused || !visible) { rafId = null; return; }
      var elapsed = now - t0;
      var p;
      if (o.loop) {
        p = (elapsed % o.period) / o.period;
      } else {
        p = Math.min(1, elapsed / o.period);
      }
      render(p, now);
      if (!o.loop && p >= 1) { rafId = null; return; }  // hold final frame
      rafId = global.requestAnimationFrame(loop);
    }

    // The held/static frame. When looping, the settled wordmark lives at HOLD
    // (0.95) — rendering at p=1 would trigger the loop's fade-out and blank the
    // canvas. Play-once holds correctly at p=1 (alpha stays 1 when !o.loop).
    function renderHeld() { render(o.loop ? HOLD : 1, performance.now()); }

    function start() {
      if (reduce) { renderHeld(); return; }
      t0 = performance.now();
      if (!rafId) rafId = global.requestAnimationFrame(loop);
    }

    // Responsive
    var ro = ('ResizeObserver' in global) ? new ResizeObserver(function () {
      setup(); build();
      if (reduce || (!o.loop && (performance.now() - t0) >= o.period)) {
        renderHeld();
      }
    }) : null;
    if (ro) ro.observe(el);

    // Pause off-screen and on tab blur (performance)
    var io = ('IntersectionObserver' in global) ? new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting;
      if (visible && !reduce && !rafId) rafId = global.requestAnimationFrame(loop);
    }, { threshold: 0.01 }) : null;
    if (io) io.observe(el);

    function onVis() {
      paused = document.hidden;
      if (!paused && !reduce && !rafId) rafId = global.requestAnimationFrame(loop);
    }
    document.addEventListener('visibilitychange', onVis);

    setup();
    build();
    start();

    // Webfonts load async — if the wordmark font isn't ready yet, the first
    // sample uses a fallback. Re-sample once fonts settle so glyph shapes match.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        if (killed) return;
        setup(); build();
        if (reduce || (!o.loop && (performance.now() - t0) >= o.period)) renderHeld();
      });
    }

    return {
      replay: function () {
        if (reduce) { renderHeld(); return; }
        t0 = performance.now();
        if (!rafId) rafId = global.requestAnimationFrame(loop);
      },
      destroy: function () {
        killed = true;
        if (rafId) global.cancelAnimationFrame(rafId);
        if (ro) ro.disconnect();
        if (io) io.disconnect();
        document.removeEventListener('visibilitychange', onVis);
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      }
    };
  }

  /* --- Auto-init: mount any element with [data-grid-intro] ----------------
   * Lets you avoid an inline GridIntro.mount() call entirely, which removes
   * any script-ordering pitfalls. Options come from data-* attributes:
   *   <div data-grid-intro
   *        data-background="#16181d"
   *        data-subtitle="Digital Out-of-Home Advertising"
   *        data-loop="false"
   *        data-accent="#3fb6e0"
   *        style="width:100%;aspect-ratio:16/9"></div>
   */
  function parseOpts(el) {
    var d = el.dataset, opts = {};
    if (d.text != null)       opts.text = d.text;
    if (d.subtitle != null)   opts.subtitle = d.subtitle;
    if (d.font != null)       opts.font = d.font;
    if (d.accent != null)     opts.accent = d.accent;
    if (d.background != null) opts.background = d.background;
    if (d.loop != null)       opts.loop = d.loop !== 'false';
    if (d.grid != null)       opts.grid = d.grid !== 'false';
    if (d.speed != null)      opts.speed = parseFloat(d.speed);
    if (d.period != null)     opts.period = parseFloat(d.period);
    if (d.density != null)    opts.density = parseFloat(d.density);
    return opts;
  }

  function autoInit() {
    var nodes = document.querySelectorAll('[data-grid-intro]');
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i]._gridIntro) continue;          // already mounted
      nodes[i]._gridIntro = mount(nodes[i], parseOpts(nodes[i]));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();   // script loaded after DOM was ready — mount now
  }

  global.GridIntro = { mount: mount, autoInit: autoInit };
})(window);
