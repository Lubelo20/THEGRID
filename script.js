// THE GRID — interactions
document.addEventListener('DOMContentLoaded', () => {
  // scroll reveal
  const ro = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); }), { threshold: .12 });
  document.querySelectorAll('.rv').forEach(el => ro.observe(el));
});
