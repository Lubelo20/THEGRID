# The Grid — Final Launch Content Checklist

**Prepared by:** Lubelo Tech Solutions · **Date:** 2026-07-03
**For:** The Grid Technologies (Pty) Ltd
**Purpose:** Everything still needed — page by page — to take the approved mock-up to a **launch-ready website**. Copy, images, video and functional items are listed for each page, with a spec and a priority.

**Priority key:** 🔴 Required to launch · 🟡 Strongly recommended · ⚪ Optional / phase 2

**Photography rule (from your CI guide — applies to every photo):** each image must show **at least 2 of 3** — (1) the asset hero-positioned (billboard / screen / tray), (2) real in-situ context, (3) people in the shot.

> **Status note:** The site is fully demonstrable today — every gap below is filled with a tasteful placeholder or an interim asset. This document lists only what should be **swapped for final, verified content** before go-live.

---

## 0. Site-wide (appears on every page)

These live in the header, footer and `<head>` of all 8 pages, so supplying them fixes the whole site at once.

| Item | What's needed | Current state | Priority |
|---|---|---|---|
| **Logo** | Final brushed-aluminium "GT" mark — vector **SVG** + transparent **PNG** ≥512px | Interim `logo-plugged.png` in nav + footer — **confirm this is the final mark** | 🔴 |
| **Favicon** | 32×32, 180×180 (Apple touch), 512×512, `.ico` | `favicon.svg` in place — confirm / supply PNG set | 🟡 |
| **Social share (OG) image** | 1200×630 — logo + tagline on brand background | Not set — link previews show no image | 🟡 |
| **Contact details** | Confirm phone **+27 79 365 0188** & email **sales@thegridtech.co.za** | In footer + contact page | 🔴 |
| **Social links** | Confirm Facebook `/thegridaeonline`, LinkedIn `/company/the-grid-online`, **Instagram `/thegridonline` — confirm it exists** | Live in footer + contact | 🔴 |
| **Licensed webfonts** | Century Gothic + Avenir `.woff2` **+ web-embedding licence** | Free stand-ins (Jost + Nunito Sans) — keep unless licences are owned | ⚪ |
| **Legal pages** | POPIA + Privacy policy text; decide if footer links are needed | None | 🟡 |

---

## 1. Home — `index.html`

The most-visited page. Hero, ecosystem pillars, journey video, brand marquee, CTA.

**Copy to confirm**
- 🔴 Hero stats: **16+ Digital Screens Live · 500K+ Daily Impressions · 21M Airport Passengers/yr · 100% Black-Owned** (an older brief said "35+ screens" — confirm the correct figure).
- 🟡 Hero headline & sub-copy — approve as-is or tweak.

**Images / video**
- 🔴 **Hero background video** — currently an interim clip (`hero.mp4`). Supply a **branded 8–12s hero loop** (billboard/screen in-situ with people), muted, MP4, ≤6MB, + a still poster frame. *Or* approve a single strong hero photo instead.
- 🟡 **Journey explainer video** (`journey.mp4`) — a real 12MB clip is wired in. **Confirm it's the final branded "Home → Airport → Mall → Home" edit**, and let us compress it (≤8MB) for faster load.
- 🔴 **Client logos** for the scrolling marquee — see Clients page (D-list below).

---

## 2. Services — `services.html`

Five format cards + Data and Closed-Loop Strategy features.

**Copy to confirm**
- 🔴 The 5 formats are correct: **Digital Billboards (DOOH) · Airport Security Trays · Static Large-Format (10m×70m) · Mobile Billboards · Brand Activations**. (Confirm "Mobile Billboards" is a live offering.)

**Images**
- 🟡 **Format photos ×5** (one per card) — a real LED screen, an airport tray, the 10m×70m static, a mobile billboard, a brand activation. Landscape, ≥1200px. *Cards are icon-only today; photos would lift this page most.*
  - ✅ Airport tray and the static can already use your two supplied photos.

---

## 3. Points of Presence — `pops.html`

Six location cards + animated South Africa provinces map with pins.

**Copy to confirm**
- 🔴 **Inventory sign-off** per location: Dainfern Square (10 DOOH + 10m×70m static), Planet Fitness (5 screens), Witkoppen Rd billboard, airport trays at OR Tambo / King Shaka / Cape Town. Confirm screen counts and any new/removed sites.

**Images**
- 🟡 **Location photos ×6** (one per point of presence), landscape ~16:10, ≥1200px — upgrades the text-only cards. Dainfern already covered by your FNB billboard photo.

---

## 4. Data & Analytics — `data.html`

Hero, measured-stats band, 4-step process (Capture → Measure → Attribute → Optimise), 4 metrics.

**Copy to confirm**
- 🔴 The stats band claims **21M passengers measured/yr · 500K+ impressions tracked · 16+ screens monitored live · 100% campaigns with attribution**. **Confirm these are truthful** — this page's whole promise is "proof, not promises," so the numbers must be defensible.

**Data — full screen inventory**
- 🔴 **A complete list of every screen and its location** — for each screen: site name, area/suburb, address or GPS, format (DOOH / static / airport tray), screen size & resolution, and any per-site audience or footfall figures. This is the source data behind the Data page numbers, the POPs map, and every inventory claim across the site.

**Images (optional)**
- ⚪ A real **dashboard / report screenshot** (footfall or attribution) would make "we measure" tangible. Currently icon-driven only.

---

## 5. Clients — `clients.html`

Brand marquee + Success Stories (Nando's footfall chart, FNB trend over the Dainfern billboard photo).

**Copy / data — most important item on this page**
- 🔴 **The two case studies use ILLUSTRATIVE sample data, not real figures** (flagged in the code). Before launch, either: **(a)** replace with real, verified campaign numbers, **(b)** keep them but label clearly as illustrative, or **(c)** remove the charts. Recommend (a) if any real results exist.

**Client logos (marquee)**
- 🔴 **Confirm the brand list + display rights** — 25 names currently shown as text: *Nedbank, Coca-Cola, Vodacom, Nando's, DStv, Absa, FNB, Showmax, Multichoice, Telkom, AVBOB, Wimpy, Mugg & Bean, eBucks, Planet Fitness, Africa Padel, Moving Walls, NFM, Luminex, Auto & General, Automark, Mitchum, Moja Cafe, Gary Rom, High Performance.* Trim to brands you may show publicly.
- 🔴 **Supply logo files** — SVG or transparent PNG, white/single-colour (they sit on a dark band).

---

## 6. Way of Work — `work.html`

Hero, 3 pillars, "Our Story", positioning quote, and a 3-stage journey (Home → Airport → Mall).

**Copy to confirm**
- 🟡 "Our Story" paragraph and the core positioning quote — approve wording.

**Images**
- 🔴 **Three journey-stage photos** — the Home/commute, Airport and Mall panels are **grey "Image placeholder" tiles**. These are the biggest visible gaps on the site:
  - `01 · Home` — a commuter / home-life shot with a Grid touchpoint
  - `02 · Airport` — airport tray in use ✅ (your supplied tray photo works)
  - `03 · Mall` — a mall screen in-situ with people
- 🟡 The "Our Story" in-site image (`hero-billboard.png`) and quote background (your airport-tray photo) — confirm final choices.

---

## 7. Team — `team.html`

Four people, six "Why The Grid" pillars, one testimonial.

**Copy / photos**
- 🔴 **Team headshots ×4** — square 1:1, ≥800px, consistent lighting. Currently coloured initials tiles (TM / EM / ZB / ND).
- 🔴 **Confirm names, roles & approve bios/skills** — currently on the site (drafted by us, need sign-off):
  - **Thando Mabuza** — Director · **Eddie Mabuza** — Business Development · **Zenele Biyela** — Data Analyst · **Natasha Dixon** — Account Manager.
- ⚪ **Testimonial** — one placeholder client quote is in place. Supply a **real, attributed quote** (name/role/company, or "Brand Director, FMCG") or we'll remove it.

---

## 8. Contact — `contact.html`

Contact details, WhatsApp, campaign-brief form, map, socials.

**Functional — required for a working page**
- 🔴 **Form destination** — the "Start a Campaign Brief" form validates but doesn't send yet. Supply a **Formspree endpoint** (free, no backend), *or* the email to receive briefs, *or* approval to use a `mailto:` link.
- 🔴 **Exact address to pin** — the map currently shows generic Johannesburg. Give the physical/office address (or confirm you want it left city-level).
- 🟡 **WhatsApp** — confirm `wa.me/27793650188` is the correct line.

---

## SEO & discoverability

The technical SEO foundations are **already built** into every page — a few client-supplied items complete it.

**Already in place:** unique page titles + meta descriptions (all 8 pages) · canonical URLs · XML sitemap + robots.txt (pointing to the final domain) · Open Graph share tags · semantic/accessible markup (headings, alt text, ARIA) · fast, mobile-first, dependency-free build.

**SEO titles & headlines — approve the wording** (these appear as your Google result + social previews; drafted by us):

| Page | Search title | Meta description |
|---|---|---|
| Home | The Grid Technologies — Digital Out-of-Home Advertising | 100% Black-owned digital OOH; strategic, data-driven brand journeys across premium points of presence in SA. |
| Services | Services — The Grid Technologies | Digital billboards (DOOH), airport trays, static large-format, activations, data & analytics, closed-loop strategy. |
| Points of Presence | Points of Presence — The Grid Technologies | Premium digital & static OOH across Johannesburg and SA's three busiest international airports. |
| Data & Analytics | Data & Analytics — The Grid Technologies | Location/demographic data, footfall, dwell time & attribution modelling — real-world proof of OOH performance. |
| Clients | Clients — The Grid Technologies | Brands that move with The Grid — SA's leading brands trust our premium digital OOH network. |
| Way of Work | Way of Work — The Grid Technologies | A closed-loop, end-to-end, strategically aligned approach to digital OOH in South Africa. |
| Team | Team — The Grid Technologies | Meet the strategists, data analysts & account managers behind every closed-loop OOH campaign. |
| Contact | Contact — The Grid Technologies | +27 79 365 0188 · sales@thegridtech.co.za. Book a campaign or start a brief; we respond within 24 hours. |

**Needed from you to complete SEO:**
- 🔴 **Google account access** — to set up **Analytics 4** + **Search Console** in The Grid's name (analytics tag added at launch; not live yet).
- 🔴 **Confirm final domain** — the whole site is wired to **www.thegridtech.co.za**; confirm this, with non-www redirecting to it.
- 🟡 **Social share (OG) image** — 1200×630 (currently falls back to a video still).
- 🟡 **Google Business Profile** — access to the Maps listing for local "OOH advertising Johannesburg" searches.
- ⚪ **Target keywords** — any specific terms you want to rank for.

---

## Hosting, domain & go-live

The site deploys to **The Grid's own company hosting**. It's a static, dependency-free site, so it runs on any standard web host. We need access to that hosting and to the domain's DNS to publish.

| Area | What it covers / what we need | Owner |
|---|---|---|
| **Web hosting access** | Site deploys to your existing company hosting. Need **control-panel access (cPanel or equivalent)** + **FTP / SFTP credentials** + the correct **web root** for the domain. | 🔴 The Grid supplies |
| **Domain & DNS** | Confirm The Grid owns **thegridtech.co.za**; provide registrar / DNS access (or add us as technical contact). | 🔴 The Grid supplies |
| **SSL certificate (HTTPS)** | The padlock/https browsers and Google require. Most panels include free auto-renewing SSL (Let's Encrypt) — we enable it, or confirm an existing cert. | The Grid host · Lubelo sets up |
| **Email — do not disrupt** | Existing **@thegridtech.co.za** mail must keep working. DNS cutover changes only website records; **MX untouched.** Confirm your email provider. | 🔴 The Grid confirms |
| **Backups & monitoring** | Automated backups + restore cover + uptime monitoring on your host, kept current under the monthly plan. Confirm if your host also runs its own backups. | Lubelo (monthly) |

**Go-live sequence:** (1) final content + QA + cross-device test → (2) form/Analytics/WhatsApp wired & tested → (3) deploy to The Grid's company hosting (cPanel / FTP) + enable SSL → (4) point `thegridtech.co.za` DNS (email untouched) → (5) flip site from hidden to **publicly indexable** → (6) submit sitemap to Search Console + confirm Analytics data → (7) live smoke-test → go-live.

> The current preview is deliberately set to **no-index** so it isn't listed before launch — flipping it public is the final go-live step.

---

## Master asset checklist (quick tick-list)

| # | Item | Page(s) | Priority | Supplied? |
|---|------|---------|----------|:---:|
| 1 | Final logo (SVG + PNG) | all | 🔴 | ☐ |
| 2 | Favicon set | all | 🟡 | ☐ |
| 3 | OG share image | all | 🟡 | ☐ |
| 4 | Confirm contact details | all | 🔴 | ☐ |
| 5 | Confirm social links (esp. Instagram) | all | 🔴 | ☐ |
| 6 | Confirm hero stats (screens count) | Home / Data | 🔴 | ☐ |
| 7 | Branded hero video or hero photo | Home | 🔴 | ☐ |
| 8 | Final journey explainer video | Home | 🟡 | ☐ |
| 9 | Client logo files + confirmed list & rights | Home / Clients | 🔴 | ☐ |
| 10 | Real case-study data (or relabel/remove) | Clients | 🔴 | ☐ |
| 11 | 3 journey-stage photos (Home / Airport / Mall) | Way of Work | 🔴 | ☐ |
| 12 | Team headshots ×4 | Team | 🔴 | ☐ |
| 13 | Confirm team names/roles/bios | Team | 🔴 | ☐ |
| 14 | Full screen-location schedule — every screen, site, format & specs | Data / POPs | 🔴 | ☐ |
| 15 | Contact form endpoint (Formspree) | Contact | 🔴 | ☐ |
| 16 | Exact map address | Contact | 🔴 | ☐ |
| 17 | Hosting access (cPanel / FTP) + domain / DNS access | Hosting | 🔴 | ☐ |
| 18 | Confirm final domain (www.thegridtech.co.za) | Hosting / SEO | 🔴 | ☐ |
| 19 | Confirm email provider (protect MX during cutover) | Hosting | 🔴 | ☐ |
| 20 | Google account (Analytics 4 + Search Console) | SEO | 🔴 | ☐ |
| 21 | Approve SEO titles & meta descriptions | all | 🟡 | ☐ |
| 22 | Google Business Profile access | SEO / Local | 🟡 | ☐ |
| 23 | Format photos ×5 | Services | 🟡 | ☐ |
| 24 | Location photos ×6 | POPs | 🟡 | ☐ |
| 25 | Real testimonial(s) | Team / Clients | ⚪ | ☐ |
| 26 | Legal pages (POPIA / Privacy) | footer | 🟡 | ☐ |
| 27 | Licensed fonts (Century Gothic / Avenir) | all | ⚪ | ☐ |

---

## Suggested order of delivery

1. **Wave 1 — unblocks launch (🔴):** final logo · confirm all stats, inventory, contact & social details · team headshots + approved bios · client logos + confirmed list · real case-study data (or relabel) · 3 journey-stage photos · contact form endpoint · exact map address · **domain / DNS access · confirm final domain & email provider · Google account for Analytics + Search Console**.
2. **Wave 2 — polish (🟡):** branded hero + final journey video · format & location photos · OG image · favicon set · legal pages · approve SEO titles/meta · Google Business Profile.
3. **Phase 2 — nice-to-have (⚪):** licensed fonts · real testimonials · data dashboard screenshot · media kit.

> **If only a few things can come first:** hero visual, team headshots + bios, client logos, and the contact form endpoint remove the most obvious "unfinished" signals and make the site launch-ready.

---

*Placeholders in the code are marked with `<!-- ASSET: … -->` / `<!-- MOCKUP: … -->` comments. Your two supplied photos (airport tray + FNB Dainfern billboard) are already wired into the Way of Work and Clients pages.*
