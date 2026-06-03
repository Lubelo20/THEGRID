document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('solid', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const hbg = document.querySelector('.hbg'), mob = document.getElementById('mob');
  const toggle = (open) => { hbg.classList.toggle('open', open); hbg.setAttribute('aria-expanded', open); mob.hidden = !open; };
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
});
