document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('solid', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const hbg = document.querySelector('.hbg'), mob = document.getElementById('mob');
  const toggle = (open) => { hbg.classList.toggle('open', open); hbg.setAttribute('aria-expanded', open); hbg.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); mob.hidden = !open; };
  toggle(false);
  hbg.addEventListener('click', () => toggle(mob.hidden));
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));

  // active section highlight
  const links = [...document.querySelectorAll('.nav-links a')];
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

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
    steps.forEach((s, n) => { s.classList.toggle('on', n === i); s.setAttribute('aria-selected', n === i); });
    lines.forEach((l, n) => l.classList.toggle('on', n < i));
    if (jText) jText.textContent = jTexts[i];
  };
  steps.forEach((s, i) => s.addEventListener('click', () => setStep(i)));
});
