/* Homepage intro splash — mounts the GridIntro particle animation.
 * External file (not inline) so the CSP can enforce script-src 'self'. */
(function () {
  var splash = document.getElementById('grid-splash');
  if (!splash) return;
  // Returning visitors (this session) and reduced-motion users go straight in.
  var seen; try { seen = sessionStorage.getItem('gridIntroSeen'); } catch (e) {}
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (seen || reduce) { splash.remove(); return; }

  var html = document.documentElement, body = document.body;
  html.style.overflow = 'hidden'; body.style.overflow = 'hidden';

  var PERIOD = 4600, HOLD = 1000, FADE = 600; // play once, hold, then fade out
  var ctrl = GridIntro.mount('#grid-splash-canvas', {
    text: 'THE GRID',
    subtitle: 'DIGITAL OUT-OF-HOME ADVERTISING',
    font: "'Jost', sans-serif",   // match the site's heading/brand font
    weight: 800,                   // match brand wordmark weight
    maxSize: 128,
    loop: false,
    period: PERIOD,
    subtitleColor: '#7189FF',      // accent blue, like the site's eyebrows
    grid: false,                   // dot texture comes from CSS instead
    background: 'transparent'
  });

  var done = false;
  function dismiss() {
    if (done) return; done = true;
    clearTimeout(timer);
    try { sessionStorage.setItem('gridIntroSeen', '1'); } catch (e) {}
    splash.classList.add('hide');
    setTimeout(function () {
      if (ctrl && ctrl.destroy) ctrl.destroy();
      splash.remove();
      html.style.overflow = ''; body.style.overflow = '';
    }, FADE);
  }
  var timer = setTimeout(dismiss, PERIOD + HOLD);
  var skip = document.getElementById('grid-splash-skip');
  if (skip) skip.addEventListener('click', dismiss);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') dismiss(); });
})();
