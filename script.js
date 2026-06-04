document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const hero = document.querySelector('.hero'); // transparent nav only over the dark homepage hero
  const onScroll = () => nav.classList.toggle('solid', !hero || window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const hbg = document.querySelector('.hbg'), mob = document.getElementById('mob');
  const toggle = (open) => { hbg.classList.toggle('open', open); hbg.setAttribute('aria-expanded', open); hbg.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); mob.hidden = !open; if (open) mob.querySelector('a').focus(); };
  toggle(false);
  hbg.addEventListener('click', () => toggle(mob.hidden));
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !mob.hidden) { toggle(false); hbg.focus(); } });

  // scroll reveal
  const ro = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); }), { threshold: .12 });
  document.querySelectorAll('.rv').forEach(el => ro.observe(el));

  // stat counters
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const run = b => {
    const t = +b.dataset.target, suf = b.dataset.suffix || '', step = Math.max(1, Math.ceil(t / 50));
    if (reduceMotion) { b.textContent = t + suf; return; }
    let n = 0; const iv = setInterval(() => { n = Math.min(n + step, t); b.textContent = n + suf; if (n >= t) clearInterval(iv); }, 34);
  };
  const co = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.querySelectorAll('[data-target]').forEach(run); co.unobserve(e.target); } }), { threshold: .4 });
  document.querySelectorAll('.stats').forEach(el => co.observe(el));

  // journey map
  const jTexts = [
    'Home — top-of-mind recall on the morning commute via the Witkoppen Road digital billboard before your audience even leaves the neighbourhood.',
    'Airport — security-tray branding at OR Tambo, King Shaka & Cape Town. 21M passengers a year, peak dwell time, zero distractions.',
    'Mall — DOOH at Dainfern Square & Planet Fitness captures high-LSM shoppers in-venue, during high-intent purchase moments.',
    'Closed Loop Complete — repeated, sequenced touchpoints have built recall, reinforced messaging and driven measurable conversion.'
  ];
  const steps = [...document.querySelectorAll('.j-step')], lines = [...document.querySelectorAll('.j-line')], jText = document.getElementById('j-text');
  const setStep = i => {
    steps.forEach((s, n) => { s.classList.toggle('on', n === i); s.setAttribute('aria-pressed', n === i); });
    lines.forEach((l, n) => l.classList.toggle('on', n < i));
    if (jText) jText.textContent = jTexts[i];
  };
  steps.forEach((s, i) => s.addEventListener('click', () => setStep(i)));

  // ensure autoplay videos actually start; if the source can't load
  // (e.g. opened via file:// in Safari), reveal the poster background instead of a black box.
  document.querySelectorAll('video[autoplay]').forEach(v => {
    v.muted = true; // muted is required for programmatic autoplay
    const tryPlay = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    const fallback = () => { v.style.visibility = 'hidden'; };
    tryPlay();
    v.addEventListener('loadeddata', tryPlay, { once: true });
    v.addEventListener('playing', () => { v.style.visibility = ''; });
    v.addEventListener('error', fallback);
    setTimeout(() => { if (v.readyState < 2) fallback(); }, 3000);
  });

  // services — flip cards: hover flips on desktop; tap/Enter flips on touch & keyboard
  document.querySelectorAll('.flip').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-expanded', 'false');
    const toggle = () => card.setAttribute('aria-expanded', card.classList.toggle('flip-open'));
    card.addEventListener('click', toggle);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  });

  // contact form (no backend yet — validate + show success; swap to Formspree later)
  const form = document.querySelector('.cform');
  if (form) {
    const msg = form.querySelector('.f-msg');
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      msg.hidden = false;
      form.querySelectorAll('.f-in').forEach(i => i.value = '');
    });
    form.querySelectorAll('.f-in').forEach(i => i.addEventListener('input', () => { msg.hidden = true; }));
  }

  // pops — footprint map: clicking/hovering a pin shows its detail (pops.html only)
  const gmap = document.querySelector('.gmap');
  if (gmap) {
    const pop = document.querySelector('.gmap-pop');
    const pins = [...gmap.querySelectorAll('.pin')];
    const show = p => {
      pins.forEach(x => x.classList.toggle('active', x === p));
      if (pop) pop.innerHTML = '<span class="k">' + p.dataset.meta + '</span><h3>' + p.dataset.name + '</h3><p>' + p.dataset.desc + '</p>';
    };
    pins.forEach(p => {
      p.addEventListener('click', () => show(p));
      p.addEventListener('mouseenter', () => show(p));
      p.addEventListener('focus', () => show(p));
    });
  }

  // way of work — "type over" the positioning quote when it scrolls into view.
  // Guarded by .q-type, so this only runs on the page that has it (work.html).
  const tq = document.querySelector('.q-type');
  if (tq) {
    const cite = document.querySelector('.q-cite');
    // build segments from the existing markup (plain text vs <em> = flame)
    const segs = [];
    tq.childNodes.forEach(n => {
      if (n.nodeType === 3) segs.push({ t: n.textContent, f: false });
      else if (n.nodeType === 1) segs.push({ t: n.textContent, f: n.tagName === 'EM' });
    });
    const total = segs.reduce((a, s) => a + s.t.length, 0);
    const draw = n => {
      let html = '', count = 0;
      for (const s of segs) {
        if (count >= n) break;
        const piece = s.t.slice(0, Math.min(s.t.length, n - count));
        html += s.f ? '<em>' + piece + '</em>' : piece;
        count += piece.length;
      }
      return html;
    };
    if (cite) cite.style.opacity = 0;
    if (reduceMotion) {
      tq.innerHTML = draw(total);
      if (cite) cite.style.opacity = 1;
    } else {
      tq.innerHTML = '<span class="caret" aria-hidden="true"></span>'; // start blank with caret
      let started = false;
      const type = () => {
        let i = 0;
        const iv = setInterval(() => {
          i++;
          tq.innerHTML = draw(i) + '<span class="caret" aria-hidden="true"></span>';
          if (i >= total) {
            clearInterval(iv);
            setTimeout(() => { tq.innerHTML = draw(total); if (cite) cite.style.opacity = 1; }, 450);
          }
        }, 28);
      };
      new IntersectionObserver((es, o) => es.forEach(e => {
        if (e.isIntersecting && !started) { started = true; type(); o.disconnect(); }
      }), { threshold: .5 }).observe(tq);
    }
  }
});
