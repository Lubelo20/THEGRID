# The Grid Website Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fresh, single-page scroll-down website for The Grid Technologies that matches the brand CI guide (dark-metallic + silver bands, image-led) and uses the real content from the live site.

**Architecture:** One `index.html` with seven scroll sections behind a sticky icon section-selector, one shared `styles.css` (design tokens + section styles), one `script.js` (nav, scroll-reveal, counters, journey map, flip cards, form). No build step — opens directly in a browser. Existing prototype files are archived to `legacy/`.

**Tech Stack:** Vanilla HTML5 / CSS3 / ES6 JS. Google Fonts (Jost + Nunito Sans). Tabler Icons (CDN). Optional Formspree for the contact form.

**Verification model:** No test runner. Each task ends with explicit visual + structural checks performed by opening `index.html` in a browser and inspecting named elements/behaviors. Commit after each task (git optional — see Task 0).

**Content source of truth:** the live site `thegridtech.co.za` and the CI guide. Real values are embedded directly in this plan so the executor needs no external lookups.

---

## Reference data (embedded so no lookups are needed)

**Palette:** gunmetal `#30343F`, near-black base `#16181d`, flame `#CF5C36`, silver `#BDC2BF`, viridian `#417B5A`, cornflower `#7189FF`, ink (text on silver) `#16130f`.

**Stats:** 16+ digital screens · 500K+ daily impressions · 21M airport passengers/yr · 100% Black-owned.

**Positioning:** "We don't just find your brand a space — we craft strategic, data-driven brand journeys that live in the real world."

**Mission:** "To deliver impactful, data-informed, and highly targeted out-of-home media solutions that meet the evolving needs of our clients with precision and professionalism."

**Vision:** "To soon become South Africa's leading Black-owned OOH media company — driving innovation, access, and inclusivity in the advertising industry."

**Inventory:** Dainfern Square (10 DOOH + iconic 10m×70m static on Winnie Mandela Drive), Planet Fitness (5 screens nationally), Witkoppen Road (digital billboard), OR Tambo / King Shaka / Cape Town International (airport security trays, 21M pax/yr).

**Team:** Thando Mabuza (Director), Eddie Mabuza (Business Development), Zenele Biyela (Data Analyst), Natasha Dixon (Account Manager).

**Clients (25):** Nedbank, Coca-Cola, Vodacom, Nando's, DStv, Absa, FNB, Showmax, Multichoice, Telkom, AVBOB, Wimpy, Mugg & Bean, eBucks, Planet Fitness, Africa Padel, Moving Walls, NFM, Luminex, Auto & General, Automark, Mitchum, Moja Cafe, Gary Rom, High Performance.

**Contact:** +27 79 365 0188 · sales@thegridtech.co.za · Johannesburg, SA. Socials: Facebook `https://www.facebook.com/thegridaeonline`, X `https://x.com/thegridonline`, LinkedIn `https://www.linkedin.com/company/the-grid-online/`. WhatsApp `https://wa.me/27793650188`.

**Section accent colours:** Hero=flame, Way of Work=silver(neutral), Services=flame, POPs=silver, Clients=neutral, Team=viridian, Contact=cornflower.

---

## File Structure

- `legacy/` — archive of old prototype (moved, not deleted).
- `index.html` — new single-page site (nav + 7 sections + footer).
- `styles.css` — design tokens, base, nav, all section styles, responsive + reduced-motion.
- `script.js` — nav solidify-on-scroll, mobile menu, scroll-reveal, stat counters, journey map, service flip cards, FAQ/form handling.
- `assets/README.md` — documents every image/logo/font swap point for client-supplied assets.

---

## Task 0: (Optional) Initialise git

**Files:** none (repo init only)

- [ ] **Step 1: Decide & init**

If the user wants version control, run:

```bash
cd "/Users/ndumisomngomezulu/Documents/LTS/Clients/TheGird"
git init
printf '.superpowers/\n.DS_Store\n' > .gitignore
git add -A && git commit -m "chore: snapshot existing prototype before redesign"
```

If git is declined, skip all later "Commit" steps.

- [ ] **Step 2: Verify**

Run: `git status`
Expected: clean tree (or "not a git repository" if skipped — then proceed without commits).

---

## Task 1: Archive old prototype + create base files

**Files:**
- Move: `index.html, contact.html, pops.html, services.html, team.html, styles.css, the_grid_website.html, the_grid_website_mockup.html` → `legacy/`
- Create: `index.html`, `styles.css`, `script.js`, `assets/README.md`

- [ ] **Step 1: Archive existing prototype**

```bash
cd "/Users/ndumisomngomezulu/Documents/LTS/Clients/TheGird"
mkdir -p legacy assets
mv index.html contact.html pops.html services.html team.html styles.css the_grid_website.html the_grid_website_mockup.html legacy/ 2>/dev/null || true
```

- [ ] **Step 2: Create `assets/README.md`**

```markdown
# Asset swap points

Replace these placeholders with client-supplied assets. Each is referenced in index.html / styles.css with a `data-asset` attribute or a comment marker `<!-- ASSET: ... -->`.

| Placeholder | Where | Final asset |
|---|---|---|
| Metallic CSS "GT" mark | nav, hero, footer (`.mark`) | Brushed-aluminium GT logo SVG → `assets/logo.svg` |
| Jost / Nunito Sans (Google) | styles.css `@import` | Licensed Century Gothic / Avenir webfonts |
| picsum.photos hero/gallery images | hero `.hero-media`, POPs, services | Real in-situ photos (asset + in-situ + people) → `assets/img/*` |
| Text client names | Clients section | Real client logo SVG/PNG → `assets/clients/*` |
| Initials avatars | Team cards | Real team headshots → `assets/team/*` |
| Form (no action) | Contact form | Formspree endpoint or backend |
```

- [ ] **Step 3: Create `styles.css` with tokens, reset, base typography**

```css
/* ── THE GRID — design system ── */
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700;800;900&family=Nunito+Sans:wght@300;400;600;700&display=swap');

:root{
  --gunmetal:#30343F; --base:#16181d; --base2:#1c1f27;
  --flame:#CF5C36; --flame-h:#e06a42;
  --silver:#BDC2BF; --silver-l:#cdd1ce; --silver-d:#a9aeab;
  --viridian:#417B5A; --cornflower:#7189FF;
  --ink:#16130f;
  --t-on-dark:#ffffff; --t-on-dark-2:rgba(255,255,255,.62); --t-on-dark-3:rgba(255,255,255,.4);
  --t-on-silver:#16130f; --t-on-silver-2:#30343F;
  --ff-h:'Jost',sans-serif; --ff-b:'Nunito Sans',sans-serif;
  --r:14px; --r-sm:8px; --r-pill:50px;
  --ease:cubic-bezier(.4,0,.2,1);
  --wrap:1200px;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--ff-b);background:var(--base);color:var(--t-on-dark);-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:inherit;text-decoration:none}
img{max-width:100%;display:block}
h1,h2,h3,h4{font-family:var(--ff-h);font-weight:800;line-height:1.04;letter-spacing:-.01em}
.wrap{max-width:var(--wrap);margin:0 auto;padding:0 24px}
.section{padding:96px 0;position:relative}
:target{scroll-margin-top:84px}

/* bands */
.band-dark{background:var(--base);color:var(--t-on-dark)}
.band-dark::before{content:'';position:absolute;inset:0;background:radial-gradient(rgba(255,255,255,.045) 1px,transparent 1px);background-size:6px 6px;pointer-events:none}
.band-dark > .wrap{position:relative;z-index:1}
.band-silver{background:var(--silver);color:var(--ink)}

/* shared headings */
.eyebrow{font-family:var(--ff-h);font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--flame);display:block;margin-bottom:14px}
.s-title{font-size:clamp(30px,4vw,52px);margin-bottom:16px}
.band-dark .s-title{background:linear-gradient(160deg,#fff,var(--silver));-webkit-background-clip:text;background-clip:text;color:transparent}
.s-sub{font-size:16px;line-height:1.7;max-width:560px}
.band-dark .s-sub{color:var(--t-on-dark-2)}
.band-silver .s-sub{color:var(--t-on-silver-2)}

/* buttons */
.btn-p{display:inline-block;font-family:var(--ff-h);font-size:13px;font-weight:700;letter-spacing:.03em;background:var(--flame);color:#fff;padding:14px 28px;border-radius:var(--r-pill);border:none;cursor:pointer;transition:background .25s,transform .2s,box-shadow .25s}
.btn-p:hover{background:var(--flame-h);transform:translateY(-2px);box-shadow:0 8px 24px rgba(207,92,54,.32)}
.btn-s{display:inline-block;font-family:var(--ff-h);font-size:13px;font-weight:700;padding:14px 24px;border-radius:var(--r-pill);border:1px solid;cursor:pointer;transition:transform .2s,border-color .25s}
.band-dark .btn-s{color:#fff;border-color:rgba(255,255,255,.22)}
.band-silver .btn-s{color:var(--ink);border-color:rgba(22,19,15,.25)}
.btn-s:hover{transform:translateY(-2px)}

/* reveal */
.rv{opacity:0;transform:translateY(26px);transition:opacity .6s var(--ease),transform .6s var(--ease)}
.rv.on{opacity:1;transform:none}
.rv.d1{transition-delay:.08s}.rv.d2{transition-delay:.16s}.rv.d3{transition-delay:.24s}

@media (prefers-reduced-motion: reduce){
  *{animation:none !important;scroll-behavior:auto !important}
  .rv{opacity:1;transform:none;transition:none}
}
```

- [ ] **Step 4: Create `script.js` stub**

```js
// THE GRID — interactions
document.addEventListener('DOMContentLoaded', () => {
  // scroll reveal
  const ro = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); }), { threshold: .12 });
  document.querySelectorAll('.rv').forEach(el => ro.observe(el));
});
```

- [ ] **Step 5: Create `index.html` skeleton**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="The Grid Technologies — 100% Black-owned digital Out-of-Home advertising. Strategic, data-driven brand journeys across premium points of presence in South Africa.">
<title>The Grid Technologies — Digital Out-of-Home Advertising</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.14.0/dist/tabler-icons.min.css">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<!-- NAV (Task 2) -->
<main>
  <!-- Hero (Task 3) -->
  <!-- Way of Work (Task 4) -->
  <!-- Services (Task 5) -->
  <!-- POPs (Task 6) -->
  <!-- Clients (Task 7) -->
  <!-- Team (Task 8) -->
  <!-- Contact (Task 9) -->
</main>
<!-- Footer (Task 9) -->
<script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 6: Verify**

Open `index.html` in a browser.
Expected: blank dark page, no console errors, Jost/Nunito Sans load (check Network tab), no leftover references to old files.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "chore: archive prototype, scaffold redesign base files"
```

---

## Task 2: Sticky nav with icon section-selector + mobile menu

**Files:** Modify `index.html` (nav block), `styles.css` (append nav styles), `script.js` (nav + mobile logic)

- [ ] **Step 1: Add nav markup** (replace `<!-- NAV (Task 2) -->` in `index.html`)

```html
<nav id="nav" aria-label="Primary">
  <a class="brand" href="#hero" aria-label="The Grid — home">
    <span class="mark" aria-hidden="true">GT</span><!-- ASSET: brushed-aluminium logo -->
    <span class="brand-word">THE GRID</span>
  </a>
  <ul class="nav-links">
    <li><a href="#work"><i class="ti ti-route" aria-hidden="true"></i><span>Way of Work</span></a></li>
    <li><a href="#services"><i class="ti ti-device-tv" aria-hidden="true"></i><span>Services</span></a></li>
    <li><a href="#pops"><i class="ti ti-map-pin" aria-hidden="true"></i><span>POPs</span></a></li>
    <li><a href="#clients"><i class="ti ti-building-store" aria-hidden="true"></i><span>Clients</span></a></li>
    <li><a href="#team"><i class="ti ti-users" aria-hidden="true"></i><span>Team</span></a></li>
    <li><a href="#contact"><i class="ti ti-mail" aria-hidden="true"></i><span>Contact</span></a></li>
  </ul>
  <a href="#contact" class="nav-cta">Plug In</a>
  <button class="hbg" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
</nav>
<div id="mob" hidden>
  <a href="#work">Way of Work</a><a href="#services">Services</a><a href="#pops">POPs</a>
  <a href="#clients">Clients</a><a href="#team">Team</a><a href="#contact">Contact</a>
  <a href="#contact" class="nav-cta">Plug In</a>
</div>
```

- [ ] **Step 2: Append nav styles to `styles.css`**

```css
#nav{position:fixed;top:0;left:0;right:0;z-index:1000;height:68px;padding:0 28px;display:flex;align-items:center;justify-content:space-between;transition:background .35s var(--ease),box-shadow .35s}
#nav.solid{background:rgba(22,24,29,.92);backdrop-filter:blur(16px);box-shadow:0 1px 0 rgba(255,255,255,.07)}
.brand{display:flex;align-items:center;gap:11px}
.mark{width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:var(--ff-h);font-weight:900;font-size:14px;color:var(--gunmetal);background:linear-gradient(145deg,#e9ebea,#9aa09c);box-shadow:inset 0 1px 2px rgba(255,255,255,.6),0 2px 6px rgba(0,0,0,.5)}
.brand-word{font-family:var(--ff-h);font-weight:800;font-size:13px;letter-spacing:.2em}
.nav-links{display:flex;gap:6px;list-style:none}
.nav-links a{display:flex;align-items:center;gap:7px;font-size:13px;font-weight:600;color:var(--t-on-dark-2);padding:8px 12px;border-radius:var(--r-sm);transition:color .2s,background .2s}
.nav-links a:hover,.nav-links a.active{color:#fff;background:rgba(255,255,255,.06)}
.nav-links i{font-size:16px}
.nav-links a span{display:none}
.nav-links a:hover span,.nav-links a.active span{display:inline}
.nav-cta{font-family:var(--ff-h);font-size:12px;font-weight:700;letter-spacing:.04em;background:var(--flame);color:#fff;padding:9px 20px;border-radius:var(--r-pill);transition:background .25s,transform .2s}
.nav-cta:hover{background:var(--flame-h);transform:translateY(-1px)}
.hbg{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:6px}
.hbg span{width:22px;height:2px;background:#fff;border-radius:2px;transition:transform .3s,opacity .3s}
.hbg.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}
.hbg.open span:nth-child(2){opacity:0}
.hbg.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
#mob{position:fixed;inset:0;z-index:999;background:rgba(22,24,29,.98);backdrop-filter:blur(18px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px}
#mob a{font-family:var(--ff-h);font-size:22px;font-weight:700;color:#fff}
@media(max-width:900px){.nav-links{display:none}.hbg{display:flex}}
```

- [ ] **Step 3: Replace `script.js` contents with nav logic added**

```js
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
```

- [ ] **Step 4: Verify**

Open in browser.
Expected: nav fixed at top; becomes solid/blurred after scrolling 20px; nav-link labels appear on hover; at ≤900px width the links hide and hamburger appears; clicking hamburger opens full-screen menu and toggles the X animation; clicking a menu item closes it. No console errors.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: sticky nav with icon section-selector and mobile menu"
```

---

## Task 3: Hero / Landing section (dark) + animated stat counters

**Files:** Modify `index.html` (hero), `styles.css` (append), `script.js` (append counter logic)

- [ ] **Step 1: Add hero markup** (replace `<!-- Hero (Task 3) -->`)

```html
<section id="hero" class="band-dark hero">
  <div class="hero-grid" aria-hidden="true"></div>
  <div class="wrap hero-inner">
    <div class="hero-copy">
      <div class="hero-badge rv"><span class="dot"></span>Innovative Digital OOH · 100% Black-Owned · Johannesburg</div>
      <h1 class="hero-h1 rv d1">We don't just find your brand <em>a space.</em></h1>
      <p class="hero-sub rv d2">We craft strategic, data-driven brand journeys that live in the real world — a closed-loop ecosystem of premium points of presence. <strong>Plug into The Grid.</strong></p>
      <div class="hero-btns rv d3">
        <a href="#contact" class="btn-p">Book a Campaign</a>
        <a href="#services" class="btn-s">Explore Services →</a>
      </div>
    </div>
    <div class="hero-media rv d2" role="img" aria-label="The Grid digital billboard in-situ at Dainfern Square with people passing">
      <span class="hero-media-tag">IN-SITU · PEOPLE · DAINFERN SQUARE</span><!-- ASSET: real in-situ hero photo -->
    </div>
  </div>
  <div class="wrap">
    <div class="stats rv">
      <div class="stat"><b data-target="16" data-suffix="+">0</b><small>Digital Screens Live</small></div>
      <div class="stat"><b data-target="500" data-suffix="K+">0</b><small>Daily Impressions</small></div>
      <div class="stat"><b data-target="21" data-suffix="M">0</b><small>Airport Passengers / yr</small></div>
      <div class="stat"><b data-target="100" data-suffix="%">0</b><small>Black-Owned</small></div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append hero styles to `styles.css`**

```css
.hero{padding:120px 0 80px;overflow:hidden}
.hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(207,92,54,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(207,92,54,.04) 1px,transparent 1px);background-size:72px 72px}
.hero-inner{display:grid;grid-template-columns:1.05fr 1fr;gap:44px;align-items:center}
.hero-badge{display:inline-flex;align-items:center;gap:9px;background:rgba(207,92,54,.1);border:1px solid rgba(207,92,54,.26);border-radius:var(--r-pill);padding:7px 16px;font-family:var(--ff-h);font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--flame);margin-bottom:26px}
.hero-badge .dot{width:6px;height:6px;border-radius:50%;background:var(--flame);animation:blink 2s ease-in-out infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}
.hero-h1{font-size:clamp(40px,5.4vw,76px);margin-bottom:22px}
.hero-h1 em{font-style:normal;color:var(--flame)}
.hero-sub{font-size:17px;line-height:1.7;color:var(--t-on-dark-2);max-width:480px;margin-bottom:34px}
.hero-sub strong{color:#fff;font-weight:700}
.hero-btns{display:flex;gap:13px;flex-wrap:wrap}
.hero-media{aspect-ratio:4/5;border-radius:18px;background:linear-gradient(0deg,rgba(0,0,0,.5),transparent 55%),url('https://picsum.photos/seed/gridhero/1000/1250');background-size:cover;background-position:center;position:relative}
.hero-media-tag{position:absolute;bottom:18px;left:18px;font-family:var(--ff-h);font-size:10px;font-weight:700;letter-spacing:.14em;color:#fff;background:rgba(0,0,0,.45);padding:7px 12px;border-radius:var(--r-pill);backdrop-filter:blur(6px)}
.stats{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid rgba(255,255,255,.09);border-radius:var(--r);overflow:hidden;background:rgba(255,255,255,.02);margin-top:56px}
.stat{padding:26px 14px;text-align:center;border-right:1px solid rgba(255,255,255,.09)}
.stat:last-child{border-right:none}
.stat b{font-family:var(--ff-h);font-size:clamp(28px,3.4vw,40px);font-weight:900;color:var(--flame);display:block;line-height:1}
.stat small{font-size:11px;color:var(--t-on-dark-3);letter-spacing:.05em;margin-top:6px;display:block}
@media(max-width:860px){.hero-inner{grid-template-columns:1fr}.hero-media{aspect-ratio:16/10;order:-1}.stats{grid-template-columns:repeat(2,1fr)}.stat:nth-child(2){border-right:none}}
```

- [ ] **Step 3: Append counter logic to `script.js`** (inside the `DOMContentLoaded` callback, before its closing `});`)

```js
  // stat counters
  const run = b => {
    const t = +b.dataset.target, suf = b.dataset.suffix || '', step = Math.max(1, Math.ceil(t / 50));
    let n = 0; const iv = setInterval(() => { n = Math.min(n + step, t); b.textContent = n + suf; if (n >= t) clearInterval(iv); }, 34);
  };
  const co = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.querySelectorAll('[data-target]').forEach(run); co.unobserve(e.target); } }), { threshold: .4 });
  document.querySelectorAll('.stats').forEach(el => co.observe(el));
```

- [ ] **Step 4: Verify**

Open in browser.
Expected: two-column hero (copy left, image-tagged media right); badge pulses; on scroll into view the four stats count up to 16+, 500K+, 21M, 100%; at ≤860px the layout stacks with the image on top and stats in 2 columns. No console errors.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: hero section with animated stat counters"
```

---

## Task 4: Way of Work section (silver)

**Files:** Modify `index.html`, `styles.css` (append)

- [ ] **Step 1: Add markup** (replace `<!-- Way of Work (Task 4) -->`)

```html
<section id="work" class="band-silver section">
  <div class="wrap work-wrap">
    <div class="rv">
      <span class="eyebrow">The Way We Work</span>
      <h2 class="s-title" style="color:var(--ink)">Closed-loop.<br>End-to-end.<br>Strategically aligned.</h2>
      <p class="s-sub">The Grid is an ecosystem-style advertising agency. We present a closed-loop, journey-style value proposition — end-to-end points of presence along a strategically defined consumer journey, maximising impact and delivering measurable ROI. From the morning commute to the airport, the mall, and home again, your brand stays top of mind at every waypoint.</p>
      <div class="mv">
        <div class="mv-item"><div class="mv-k">Mission</div><p>To deliver impactful, data-informed and highly targeted out-of-home media solutions — with precision and professionalism.</p></div>
        <div class="mv-item"><div class="mv-k">Vision</div><p>To become South Africa's leading Black-owned OOH media company — driving innovation, access and inclusivity.</p></div>
      </div>
    </div>
    <div class="pillars rv d2">
      <div class="pillar"><i class="ti ti-route" aria-hidden="true"></i><div><h3>Strategic Journey Mapping</h3><p>We place your brand at every waypoint of your audience's day — home, commute, airport, mall.</p></div></div>
      <div class="pillar"><i class="ti ti-chart-dots" aria-hidden="true"></i><div><h3>Data-Driven Intelligence</h3><p>Location data, footfall and impression modelling — attribution, not estimates.</p></div></div>
      <div class="pillar"><i class="ti ti-building-skyscraper" aria-hidden="true"></i><div><h3>Premium Presence Network</h3><p>High-LSM commercial zones and South Africa's three busiest international airports.</p></div></div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append styles**

```css
.work-wrap{display:grid;grid-template-columns:1.1fr 1fr;gap:60px;align-items:start}
.mv{display:flex;flex-direction:column;gap:18px;margin-top:30px}
.mv-item{border-left:3px solid var(--flame);padding-left:16px}
.mv-k{font-family:var(--ff-h);font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--flame);margin-bottom:5px}
.mv-item p{font-size:14px;line-height:1.65;color:var(--t-on-silver-2)}
.pillars{display:flex;flex-direction:column;gap:14px}
.pillar{display:flex;gap:16px;align-items:flex-start;background:rgba(48,52,63,.06);border:1px solid rgba(22,19,15,.1);border-radius:var(--r);padding:20px;transition:border-color .25s,transform .2s}
.pillar:hover{border-color:rgba(207,92,54,.4);transform:translateY(-2px)}
.pillar i{font-size:24px;color:var(--flame);flex-shrink:0;width:46px;height:46px;background:rgba(207,92,54,.1);border-radius:11px;display:flex;align-items:center;justify-content:center}
.pillar h3{font-size:15px;font-weight:700;color:var(--ink);margin-bottom:5px}
.pillar p{font-size:13px;line-height:1.6;color:var(--t-on-silver-2)}
@media(max-width:860px){.work-wrap{grid-template-columns:1fr;gap:36px}}
```

- [ ] **Step 3: Verify**

Open in browser. Expected: silver band; two-column layout (copy + mission/vision left, 3 pillar cards right); pillars lift and show flame border on hover; reveals on scroll; stacks at ≤860px. Text is dark and legible on silver.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: way-of-work section with mission, vision, pillars"
```

---

## Task 5: Services section (dark) with flip cards

**Files:** Modify `index.html`, `styles.css` (append)

- [ ] **Step 1: Add markup** (replace `<!-- Services (Task 5) -->`)

```html
<section id="services" class="band-dark section">
  <div class="wrap">
    <div class="rv" style="text-align:center">
      <span class="eyebrow">What We Offer</span>
      <h2 class="s-title">One ecosystem.<br>Multiple touchpoints.</h2>
      <p class="s-sub" style="margin:0 auto">Hover any format to see the strategy behind it.</p>
    </div>
    <div class="svc-grid rv">
      <div class="flip led"><div class="flip-in">
        <div class="ff"><i class="ti ti-device-tv" aria-hidden="true"></i><h3>Digital Billboards (DOOH)</h3><p>Premium screens in high-LSM zones.</p><span class="hint">Hover →</span></div>
        <div class="fb"><h4>Digital Out-of-Home</h4><p>16+ data-monitored screens across Dainfern Square, Planet Fitness and Witkoppen Road — dynamic, loop-ready campaigns to verified high-LSM audiences.</p><span class="loc">Dainfern · Planet Fitness · Witkoppen</span></div>
      </div></div>
      <div class="flip apt"><div class="flip-in">
        <div class="ff"><i class="ti ti-plane" aria-hidden="true"></i><h3>Airport Security Trays</h3><p>21M captive passengers a year.</p><span class="hint">Hover →</span></div>
        <div class="fb"><h4>Captive Dwell-Time Media</h4><p>Security-tray branding reaches 21M+ passengers annually at OR Tambo, King Shaka and Cape Town — peak dwell time, zero competition for attention.</p><span class="loc">OR Tambo · King Shaka · Cape Town</span></div>
      </div></div>
      <div class="flip prt"><div class="flip-in">
        <div class="ff"><i class="ti ti-billboard" aria-hidden="true"></i><h3>Static Large-Format</h3><p>The iconic 10m × 70m.</p><span class="hint">Hover →</span></div>
        <div class="fb"><h4>Static Out-of-Home</h4><p>The 10m × 70m on Winnie Mandela Drive is one of Johannesburg's most visible formats — dominant, unmissable, always on.</p><span class="loc">Winnie Mandela Dr · Dainfern · Fourways</span></div>
      </div></div>
      <div class="flip act"><div class="flip-in">
        <div class="ff"><i class="ti ti-confetti" aria-hidden="true"></i><h3>Brand Activations</h3><p>Marketing brought to the people.</p><span class="hint">Hover →</span></div>
        <div class="fb"><h4>Tailored Activations</h4><p>Immersive, geographically and demographically targeted activations that bring campaigns straight to the audiences who matter — experiences that convert.</p><span class="loc">Bespoke · National</span></div>
      </div></div>
    </div>
    <div class="svc-features rv">
      <div class="feat"><i class="ti ti-chart-dots" aria-hidden="true"></i><div><h3>Data &amp; Analytics</h3><p>Location and demographic data, footfall measurement and attribution modelling — real-world evidence of performance.</p></div></div>
      <div class="feat"><i class="ti ti-infinity" aria-hidden="true"></i><div><h3>Closed-Loop Journey Strategy</h3><p>We map your audience's daily movement and place strategic touchpoints at every waypoint — Home → Airport → Mall → Home.</p></div></div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append styles**

```css
.svc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:44px}
.flip{perspective:1100px;height:280px}
.flip-in{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .6s var(--ease)}
.flip:hover .flip-in,.flip:focus-within .flip-in{transform:rotateY(180deg)}
.ff,.fb{position:absolute;inset:0;backface-visibility:hidden;border-radius:var(--r);padding:24px;display:flex;flex-direction:column}
.ff{background:var(--base2);border:1px solid rgba(255,255,255,.08);border-top:3px solid var(--flame)}
.ff i{font-size:26px;color:var(--flame);margin-bottom:14px}
.ff h3{font-size:15px;font-weight:700;color:#fff;margin-bottom:7px}
.ff p{font-size:12px;color:var(--t-on-dark-2);line-height:1.5}
.ff .hint{margin-top:auto;font-family:var(--ff-h);font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--flame)}
.fb{transform:rotateY(180deg);background:linear-gradient(145deg,#3a1208,#5c2010);color:#fff}
.fb h4{font-size:14px;font-weight:700;margin-bottom:10px}
.fb p{font-size:12px;line-height:1.6;opacity:.9;flex:1}
.fb .loc{font-family:var(--ff-h);font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.7;margin-top:10px}
.apt .ff{border-top-color:var(--cornflower)}.apt .ff i,.apt .ff .hint{color:var(--cornflower)}.apt .fb{background:linear-gradient(145deg,#0e1438,#1a2052)}
.prt .ff{border-top-color:var(--silver)}.prt .ff i,.prt .ff .hint{color:var(--silver)}.prt .fb{background:linear-gradient(145deg,#1c2028,#252e3a)}
.act .ff{border-top-color:var(--viridian)}.act .ff i,.act .ff .hint{color:var(--viridian)}.act .fb{background:linear-gradient(145deg,#0b2015,#163524)}
.svc-features{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px}
.feat{display:flex;gap:16px;align-items:flex-start;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:var(--r);padding:24px}
.feat i{font-size:24px;color:var(--flame);flex-shrink:0;width:46px;height:46px;background:rgba(207,92,54,.1);border-radius:11px;display:flex;align-items:center;justify-content:center}
.feat h3{font-size:15px;font-weight:700;color:#fff;margin-bottom:5px}
.feat p{font-size:13px;line-height:1.6;color:var(--t-on-dark-2)}
@media(max-width:1024px){.svc-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:680px){.svc-grid{grid-template-columns:1fr}.svc-features{grid-template-columns:1fr}}
```

- [ ] **Step 3: Verify**

Open in browser. Expected: four flip cards (LED/flame, Airport/cornflower, Static/silver, Activations/viridian) that rotate to the back face on hover or keyboard focus; two feature cards below; responsive 4→2→1 columns. No console errors.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: services section with flip cards and feature highlights"
```

---

## Task 6: Points of Presence section (silver) + animated journey map

**Files:** Modify `index.html`, `styles.css` (append), `script.js` (append journey logic)

- [ ] **Step 1: Add markup** (replace `<!-- POPs (Task 6) -->`)

```html
<section id="pops" class="band-silver section">
  <div class="wrap">
    <div class="rv" style="text-align:center">
      <span class="eyebrow">Points of Presence</span>
      <h2 class="s-title" style="color:var(--ink)">Intercept your audience<br>at every waypoint.</h2>
      <p class="s-sub" style="margin:0 auto">Select a stage to see how The Grid positions your brand across the day.</p>
    </div>
    <div class="journey rv">
      <div class="j-steps" role="tablist" aria-label="Consumer journey">
        <button class="j-step on" role="tab" aria-selected="true" data-i="0"><span class="j-dot"><i class="ti ti-home"></i></span><span class="j-lbl">Home</span></button>
        <span class="j-line" data-l="0"></span>
        <button class="j-step" role="tab" aria-selected="false" data-i="1"><span class="j-dot"><i class="ti ti-plane"></i></span><span class="j-lbl">Airport</span></button>
        <span class="j-line" data-l="1"></span>
        <button class="j-step" role="tab" aria-selected="false" data-i="2"><span class="j-dot"><i class="ti ti-building-store"></i></span><span class="j-lbl">Mall</span></button>
        <span class="j-line" data-l="2"></span>
        <button class="j-step" role="tab" aria-selected="false" data-i="3"><span class="j-dot"><i class="ti ti-infinity"></i></span><span class="j-lbl">Closed Loop</span></button>
      </div>
      <div class="j-detail"><p id="j-text">Home — top-of-mind recall on the morning commute via the Witkoppen Road digital billboard before your audience even leaves the neighbourhood.</p></div>
    </div>
    <div class="pops-grid rv d2">
      <div class="pop"><span class="pop-dot" style="background:var(--flame)"></span><div><h3>Dainfern Square</h3><span class="pop-k">DOOH · Static · Fourways</span><p>10 digital screens + the iconic 10m × 70m static on Winnie Mandela Drive in JHB's premier high-LSM retail precinct.</p></div></div>
      <div class="pop"><span class="pop-dot" style="background:var(--flame)"></span><div><h3>Planet Fitness</h3><span class="pop-k">DOOH · 5 Screens · National</span><p>Five premium screens reaching an active, health-conscious, high-spending demographic with 45–90 min dwell times.</p></div></div>
      <div class="pop"><span class="pop-dot" style="background:var(--flame)"></span><div><h3>Witkoppen Road</h3><span class="pop-k">Digital Billboard · Paulshof</span><p>High-traffic arterial route between Fourways and Sandton — thousands of AB-income commuters daily.</p></div></div>
      <div class="pop"><span class="pop-dot" style="background:var(--cornflower)"></span><div><h3>OR Tambo International</h3><span class="pop-k">Airport Trays · Gauteng</span><p>SA's busiest airport. Every departing passenger handles a branded security tray for 30–60s of undivided attention.</p></div></div>
      <div class="pop"><span class="pop-dot" style="background:var(--cornflower)"></span><div><h3>King Shaka International</h3><span class="pop-k">Airport Trays · KZN</span><p>Durban's gateway — a premium business and leisure traveller demographic, full checkpoint coverage.</p></div></div>
      <div class="pop"><span class="pop-dot" style="background:var(--viridian)"></span><div><h3>Cape Town International</h3><span class="pop-k">Airport Trays · W. Cape</span><p>Gateway to the Western Cape — domestic business travellers plus high-income international tourists.</p></div></div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append styles**

```css
.journey{background:rgba(48,52,63,.06);border:1px solid rgba(22,19,15,.1);border-radius:var(--r);padding:32px;margin-top:44px}
.j-steps{display:flex;align-items:flex-start;justify-content:space-between}
.j-step{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:8px;background:none;border:none;cursor:pointer}
.j-dot{width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:19px;background:#fff;border:2px solid transparent;color:var(--gunmetal);transition:border-color .25s,transform .25s}
.j-step.on .j-dot{border-color:var(--flame);transform:scale(1.12);color:var(--flame)}
.j-lbl{font-family:var(--ff-h);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--t-on-silver-2)}
.j-line{flex:1;height:2px;margin-top:22px;background:rgba(22,19,15,.15);border-radius:2px;transition:background .35s}
.j-line.on{background:var(--flame)}
.j-detail{margin-top:24px;background:rgba(207,92,54,.07);border:1px solid rgba(207,92,54,.18);border-radius:var(--r-sm);padding:20px;text-align:center}
.j-detail p{font-size:14px;line-height:1.7;color:var(--ink);max-width:640px;margin:0 auto}
.pops-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:32px}
.pop{display:flex;gap:13px;background:rgba(48,52,63,.06);border:1px solid rgba(22,19,15,.1);border-radius:var(--r);padding:20px;transition:border-color .25s,transform .2s}
.pop:hover{border-color:rgba(207,92,54,.4);transform:translateY(-3px)}
.pop-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0;margin-top:5px}
.pop h3{font-size:14px;font-weight:700;color:var(--ink);margin-bottom:3px}
.pop-k{font-family:var(--ff-h);font-size:9px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--flame);display:block;margin-bottom:7px}
.pop p{font-size:12px;line-height:1.55;color:var(--t-on-silver-2)}
@media(max-width:860px){.pops-grid{grid-template-columns:1fr 1fr}}
@media(max-width:520px){.pops-grid{grid-template-columns:1fr}.j-lbl{font-size:8px}}
```

- [ ] **Step 3: Append journey logic to `script.js`** (inside `DOMContentLoaded`)

```js
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
```

- [ ] **Step 4: Verify**

Open in browser. Expected: silver band; clicking Home/Airport/Mall/Closed Loop updates the detail text and fills the connector lines + active-dot ring up to that step; 6 location cards in a 3-col grid that lift on hover; responsive 3→2→1. No console errors.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: points-of-presence with interactive journey map and location grid"
```

---

## Task 7: Clients section (dark) with logo marquee

**Files:** Modify `index.html`, `styles.css` (append)

- [ ] **Step 1: Add markup** (replace `<!-- Clients (Task 7) -->`)

```html
<section id="clients" class="band-dark section">
  <div class="wrap" style="text-align:center">
    <div class="rv">
      <span class="eyebrow">Trusted By</span>
      <h2 class="s-title">Brands that move<br>with The Grid.</h2>
      <p class="s-sub" style="margin:0 auto 8px">South Africa's leading brands plug into our network.</p>
    </div>
  </div>
  <div class="marquee rv" aria-label="Client brands">
    <div class="marquee-track">
      <!-- ASSET: replace text with real client logo SVGs -->
      <span>Nedbank</span><span>Coca-Cola</span><span>Vodacom</span><span>Nando's</span><span>DStv</span><span>Absa</span><span>FNB</span><span>Showmax</span><span>Multichoice</span><span>Telkom</span><span>AVBOB</span><span>Wimpy</span><span>Mugg &amp; Bean</span><span>eBucks</span><span>Planet Fitness</span><span>Africa Padel</span><span>Moving Walls</span><span>NFM</span><span>Luminex</span><span>Auto &amp; General</span><span>Automark</span><span>Mitchum</span><span>Moja Cafe</span><span>Gary Rom</span><span>High Performance</span>
      <span>Nedbank</span><span>Coca-Cola</span><span>Vodacom</span><span>Nando's</span><span>DStv</span><span>Absa</span><span>FNB</span><span>Showmax</span><span>Multichoice</span><span>Telkom</span><span>AVBOB</span><span>Wimpy</span><span>Mugg &amp; Bean</span><span>eBucks</span><span>Planet Fitness</span><span>Africa Padel</span><span>Moving Walls</span><span>NFM</span><span>Luminex</span><span>Auto &amp; General</span><span>Automark</span><span>Mitchum</span><span>Moja Cafe</span><span>Gary Rom</span><span>High Performance</span>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append styles**

```css
.marquee{margin-top:40px;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
.marquee-track{display:flex;gap:46px;align-items:center;width:max-content;animation:marquee 48s linear infinite}
.marquee:hover .marquee-track{animation-play-state:paused}
.marquee-track span{font-family:var(--ff-h);font-weight:800;font-size:20px;color:#fff;opacity:.34;white-space:nowrap;transition:opacity .25s}
.marquee-track span:hover{opacity:.85}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
```

- [ ] **Step 3: Verify**

Open in browser. Expected: dark band; client names scroll continuously right-to-left in a single seamless loop (list duplicated so there's no gap), fade at both edges, pause on hover, individual names brighten on hover. No console errors.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: clients marquee with real brand list"
```

---

## Task 8: Team section (silver) with hover-reveal cards

**Files:** Modify `index.html`, `styles.css` (append)

- [ ] **Step 1: Add markup** (replace `<!-- Team (Task 8) -->`)

```html
<section id="team" class="band-silver section">
  <div class="wrap">
    <div class="rv" style="text-align:center">
      <span class="eyebrow">The People</span>
      <h2 class="s-title" style="color:var(--ink)">Strategy behind<br>every screen.</h2>
    </div>
    <div class="team-grid rv">
      <article class="tcard">
        <div class="tav" style="background:linear-gradient(135deg,#30343F,#454b5c)"><span>TM</span></div><!-- ASSET: headshot -->
        <div class="tbody"><h3>Thando Mabuza</h3><span class="trole">Director</span><div class="tskills"><span>Strategy</span><span>B-BBEE</span><span>Client Relations</span></div></div>
        <div class="trev"><p>Drives The Grid's closed-loop ecosystem vision — campaign architecture, executive strategy and economic transformation.</p></div>
      </article>
      <article class="tcard">
        <div class="tav" style="background:linear-gradient(135deg,#3a1208,#7a3a22)"><span>EM</span></div>
        <div class="tbody"><h3>Eddie Mabuza</h3><span class="trole">Business Development</span><div class="tskills"><span>Partnerships</span><span>Media Buying</span><span>Growth</span></div></div>
        <div class="trev"><p>Connects ambitious brands to The Grid ecosystem through strategic partnerships and advertiser relationships.</p></div>
      </article>
      <article class="tcard">
        <div class="tav" style="background:linear-gradient(135deg,#0c2015,#2a5a3e)"><span>ZB</span></div>
        <div class="tbody"><h3>Zenele Biyela</h3><span class="trole">Data Analyst</span><div class="tskills"><span>Footfall</span><span>Attribution</span><span>Insights</span></div></div>
        <div class="trev"><p>Turns real-world advertising into measurable results — audience profiling, footfall insights and ROI attribution.</p></div>
      </article>
      <article class="tcard">
        <div class="tav" style="background:linear-gradient(135deg,#0e1438,#3a4690)"><span>ND</span></div>
        <div class="tbody"><h3>Natasha Dixon</h3><span class="trole">Account Manager</span><div class="tskills"><span>Campaigns</span><span>Client Success</span><span>Delivery</span></div></div>
        <div class="trev"><p>The dedicated point of contact ensuring every campaign is planned, delivered and reported with precision.</p></div>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append styles**

```css
.team-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:44px}
.tcard{background:#fff;border:1px solid rgba(22,19,15,.1);border-radius:var(--r);overflow:hidden;transition:border-color .25s,transform .2s}
.tcard:hover{border-color:var(--viridian);transform:translateY(-4px)}
.tav{height:150px;display:flex;align-items:center;justify-content:center}
.tav span{font-family:var(--ff-h);font-weight:900;font-size:34px;color:rgba(255,255,255,.25)}
.tbody{padding:16px}
.tbody h3{font-size:15px;font-weight:700;color:var(--ink)}
.trole{font-family:var(--ff-h);font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--viridian);display:block;margin:3px 0 11px}
.tskills{display:flex;flex-wrap:wrap;gap:5px}
.tskills span{font-size:10px;padding:3px 9px;border-radius:var(--r-pill);border:1px solid rgba(22,19,15,.15);color:var(--t-on-silver-2)}
.trev{max-height:0;overflow:hidden;background:rgba(65,123,90,.07);transition:max-height .35s var(--ease)}
.tcard:hover .trev,.tcard:focus-within .trev{max-height:140px}
.trev p{font-size:12px;line-height:1.6;color:var(--t-on-silver-2);padding:14px 16px}
@media(max-width:860px){.team-grid{grid-template-columns:1fr 1fr}}
```

- [ ] **Step 3: Verify**

Open in browser. Expected: silver band; four team cards (real names/roles); on hover the card lifts, border turns viridian, and the bio panel expands smoothly; responsive 4→2 columns.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: team section with real members and hover-reveal bios"
```

---

## Task 9: Contact section (dark) + form + footer

**Files:** Modify `index.html`, `styles.css` (append), `script.js` (append form logic)

- [ ] **Step 1: Add contact + footer markup** (replace `<!-- Contact (Task 9) -->` and `<!-- Footer (Task 9) -->`)

```html
<section id="contact" class="band-dark section">
  <div class="wrap contact-wrap">
    <div class="rv">
      <span class="eyebrow">Get in Touch</span>
      <h2 class="s-title">Ready to plug in?</h2>
      <p class="s-sub">Direct lines, no gatekeepers. We craft a strategic proposal within 24 hours.</p>
      <div class="c-items">
        <a class="c-item" href="tel:+27793650188"><i class="ti ti-phone" aria-hidden="true"></i><div><span class="c-lbl">Call</span><span class="c-val">+27 79 365 0188</span></div></a>
        <a class="c-item" href="mailto:sales@thegridtech.co.za"><i class="ti ti-mail" aria-hidden="true"></i><div><span class="c-lbl">Email</span><span class="c-val">sales@thegridtech.co.za</span></div></a>
        <div class="c-item"><i class="ti ti-map-pin" aria-hidden="true"></i><div><span class="c-lbl">Location</span><span class="c-val">Johannesburg, South Africa</span></div></div>
      </div>
      <a class="wa-btn" href="https://wa.me/27793650188" target="_blank" rel="noopener"><i class="ti ti-brand-whatsapp" aria-hidden="true"></i> Chat on WhatsApp</a>
      <div class="soc-row">
        <a class="soc-btn" href="https://www.facebook.com/thegridaeonline" target="_blank" rel="noopener"><i class="ti ti-brand-facebook"></i> Facebook</a>
        <a class="soc-btn" href="https://x.com/thegridonline" target="_blank" rel="noopener"><i class="ti ti-brand-x"></i> X</a>
        <a class="soc-btn" href="https://www.linkedin.com/company/the-grid-online/" target="_blank" rel="noopener"><i class="ti ti-brand-linkedin"></i> LinkedIn</a>
      </div>
    </div>
    <form class="cform rv d2" novalidate><!-- ASSET: set action to Formspree endpoint when available -->
      <h3>Start a Campaign Brief</h3>
      <p class="cform-sub">Tell us your goals — we'll respond within 24 hours.</p>
      <div class="f-row"><input class="f-in" name="name" type="text" placeholder="Your name" required><input class="f-in" name="company" type="text" placeholder="Company"></div>
      <input class="f-in" name="email" type="email" placeholder="Email address" required>
      <select class="f-in" name="service" required>
        <option value="">Campaign type…</option><option>Digital Billboards (DOOH)</option><option>Airport Security Trays</option><option>Static Large-Format</option><option>Brand Activations</option><option>Full Ecosystem Campaign</option>
      </select>
      <textarea class="f-in f-ta" name="goals" placeholder="Tell us about your brand, audience and objectives…"></textarea>
      <button class="btn-p" type="submit" style="width:100%">Send Brief →</button>
      <p class="f-msg" hidden>Thanks — your brief has been captured. We'll be in touch within 24 hours.</p>
    </form>
  </div>
</section>
```

```html
<!-- replace the Footer comment in index.html (outside <main>) -->
<footer class="band-dark">
  <div class="wrap foot">
    <div class="foot-brand">
      <a class="brand" href="#hero"><span class="mark" aria-hidden="true">GT</span><span class="brand-word">THE GRID</span></a>
      <p>Strategic, closed-loop ecosystem advertising. 100% Black-owned digital Out-of-Home delivering measurable ROI for ambitious brands.</p>
    </div>
    <nav class="foot-links" aria-label="Footer">
      <a href="#services">Services</a><a href="#pops">Points of Presence</a><a href="#clients">Clients</a><a href="#team">Team</a><a href="#contact">Contact</a>
    </nav>
  </div>
  <div class="wrap foot-btm"><span>© 2026 The Grid Technologies (Pty) Ltd. All rights reserved.</span><span>Johannesburg, SA</span></div>
</footer>
```

- [ ] **Step 2: Append styles**

```css
.contact-wrap{display:grid;grid-template-columns:1fr 1.1fr;gap:48px;align-items:start}
.c-items{display:flex;flex-direction:column;gap:11px;margin:26px 0 16px}
.c-item{display:flex;align-items:center;gap:14px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:var(--r);padding:14px;transition:border-color .25s}
.c-item:hover{border-color:rgba(113,137,255,.4)}
.c-item i{width:42px;height:42px;border-radius:10px;background:rgba(113,137,255,.12);color:var(--cornflower);display:flex;align-items:center;justify-content:center;font-size:19px;flex-shrink:0}
.c-lbl{font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--t-on-dark-3);display:block}
.c-val{font-size:14px;font-weight:600;color:#fff;display:block}
.wa-btn{display:flex;align-items:center;justify-content:center;gap:9px;background:#25D366;color:#fff;font-family:var(--ff-h);font-size:13px;font-weight:700;padding:13px;border-radius:var(--r);transition:opacity .25s,transform .2s}
.wa-btn:hover{opacity:.9;transform:translateY(-2px)}
.soc-row{display:flex;gap:8px;margin-top:9px}
.soc-btn{flex:1;display:flex;align-items:center;justify-content:center;gap:6px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:var(--r-sm);padding:10px;font-size:12px;color:var(--t-on-dark-2);transition:border-color .25s,color .25s}
.soc-btn:hover{border-color:var(--cornflower);color:#fff}
.cform{background:var(--base2);border:1px solid rgba(255,255,255,.08);border-radius:var(--r);padding:30px}
.cform h3{font-size:18px;font-weight:700;color:#fff;margin-bottom:4px}
.cform-sub{font-size:13px;color:var(--t-on-dark-2);margin-bottom:20px}
.f-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.f-in{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:var(--r-sm);padding:12px 14px;font-size:13px;color:#fff;font-family:var(--ff-b);outline:none;margin-bottom:10px;transition:border-color .25s}
.f-in::placeholder{color:rgba(255,255,255,.3)}
.f-in:focus{border-color:var(--flame)}
.f-ta{height:108px;resize:none}
select.f-in{color:rgba(255,255,255,.7)}
select.f-in option{background:var(--base2);color:#fff}
.f-msg{margin-top:14px;font-size:13px;color:var(--viridian);font-weight:600;text-align:center}
.foot{display:grid;grid-template-columns:2fr 1fr;gap:40px;padding-top:56px;padding-bottom:28px;border-top:1px solid rgba(255,255,255,.07);position:relative;z-index:1}
.foot-brand p{font-size:13px;line-height:1.7;color:var(--t-on-dark-2);max-width:340px;margin-top:14px}
.foot-links{display:flex;flex-direction:column;gap:11px}
.foot-links a{font-size:13px;color:var(--t-on-dark-2);transition:color .25s}
.foot-links a:hover{color:var(--flame)}
.foot-btm{display:flex;justify-content:space-between;padding-bottom:28px;font-size:11px;color:var(--t-on-dark-3);position:relative;z-index:1}
@media(max-width:860px){.contact-wrap{grid-template-columns:1fr}.foot{grid-template-columns:1fr}.foot-btm{flex-direction:column;gap:8px}}
```

- [ ] **Step 3: Append form logic to `script.js`** (inside `DOMContentLoaded`)

```js
  // contact form (no backend yet — validate + show success; swap to Formspree later)
  const form = document.querySelector('.cform');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    form.querySelector('.f-msg').hidden = false;
    form.querySelectorAll('.f-in').forEach(i => i.value = '');
  });
```

- [ ] **Step 4: Verify**

Open in browser. Expected: dark band; left column has tappable phone/email/location tiles, WhatsApp button (opens wa.me), three social buttons (Facebook, X, LinkedIn) with correct hrefs; right column form validates required fields (name/email/service) and, when valid, clears and shows the green success line without navigating away; footer renders with working anchor links; responsive single-column at ≤860px.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: contact section with form, socials, WhatsApp, and footer"
```

---

## Task 10: Responsive, accessibility & cross-section polish pass

**Files:** Modify `styles.css`, `index.html`, `script.js` as needed

- [ ] **Step 1: Add global reduced-motion + focus-visible + body offset checks**

Append to `styles.css`:

```css
:focus-visible{outline:2px solid var(--flame);outline-offset:3px;border-radius:3px}
.j-step:focus-visible,.flip:focus-within{outline-offset:5px}
.marquee-track{will-change:transform}
@media (prefers-reduced-motion: reduce){.marquee-track{animation:none}.hero-badge .dot{animation:none}}
```

- [ ] **Step 2: Verify responsive at three widths**

Open in browser and resize (or use devtools device toolbar) to **1280px, 768px, 375px**.
Expected at 375px: nav collapses to hamburger; hero stacks (image first) and stats show 2 columns; way-of-work, services (1 col), POPs (1 col), team (2 col), contact (1 col) all stack without horizontal overflow; no element exceeds viewport width (no horizontal scrollbar).

- [ ] **Step 3: Verify accessibility**

- Tab through the page: nav links, flip cards, journey buttons, form fields, and social links are all reachable and show a visible flame focus ring.
- Confirm each `<section>` has a unique `id` and the nav highlights the active section while scrolling.
- Confirm the hero media and team avatars have descriptive `aria-label`/text, and decorative `<i>` icons use `aria-hidden="true"`.
- Toggle OS "reduce motion" and reload: reveals show instantly, marquee and pulse stop, counters still display final values.

- [ ] **Step 4: Verify contrast**

Spot-check with devtools: white/silver text on dark base and ink text on silver band both meet WCAG AA (≥4.5:1 for body text). Flame `#CF5C36` is used for accents/large text only, not small body copy on dark.

- [ ] **Step 5: Final smoke test**

Reload `index.html` fresh. Click every nav icon and confirm smooth-scroll lands on the right section. Confirm zero console errors/warnings.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "polish: responsive, accessibility, reduced-motion and focus states"
```

---

## Self-Review (completed during authoring)

- **Spec coverage:** Hero/stats (T3) ✓, Way of Work + mission/vision/Black-owned (T4) ✓, Services flip cards + Data + Journey strategy (T5) ✓, POPs animated journey + locations (T6) ✓, Clients wall (T7) ✓, Team real members (T8) ✓, Contact + form + socials(X) + WhatsApp + footer (T9) ✓, dark/silver bands + perforated texture + metallic headings + section accents (T1/per-section) ✓, fonts Jost/Nunito Sans (T1) ✓, icon section-selector + scroll site (T2) ✓, responsive + a11y + reduced-motion (T10) ✓, asset swap points (T1 assets/README) ✓.
- **Placeholder scan:** no TBD/TODO; every code step contains complete code; image/logo/font placeholders are intentional client-asset swap points, documented in `assets/README.md`.
- **Type/identifier consistency:** class names (`.band-dark/.band-silver`, `.rv`, `.flip/.ff/.fb`, `.j-step/.j-line/#j-text`, `.stats [data-target]`, `.cform/.f-in/.f-msg`, `.marquee-track`) and JS selectors match across tasks; section IDs (`hero, work, services, pops, clients, team, contact`) match nav hrefs and the scroll-spy.
