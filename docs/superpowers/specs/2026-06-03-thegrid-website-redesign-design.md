# The Grid Technologies — Website Redesign Design Spec

**Date:** 2026-06-03
**Status:** Approved (pending spec review)

## Overview

A fresh redesign of the website for **The Grid Technologies (Pty) Ltd**, a Johannesburg-based, 100% Black-owned digital Out-of-Home (OOH) advertising agency. The redesign keeps the real content from the current live site (`thegridtech.co.za`) as the source of truth, but rethinks the design and structure from scratch to match the brand CI guide (`The Grid website proposal_260525_125730.pdf`).

The result is a **single-page, scroll-down site** with a sticky icon section-selector, built as a polished, content-complete, production-oriented prototype.

## Goals

- Present the brand exactly as the CI guide mandates: dark, sleek, metallic, image-led, "sleek minimalism + dynamic movement."
- Replace all placeholder content from the old repo prototype with the real content (real team, real clients, real inventory, real positioning).
- Foreground the **closed-loop journey** ecosystem proposition and the **100% Black-owned** positioning.
- Be graphically driven — images are the hero, text is punchy and minimal.
- Fast-loading, accessible, no build step.

## Non-Goals (out of scope for this iteration)

- A CMS or back-end. Content is hand-authored in HTML.
- Real photography, real client logo files, and the brushed-aluminium logo asset — these are **client-supplied dependencies**; the build uses clearly-marked placeholders with documented swap points.
- E-commerce, booking systems, or live analytics dashboards.
- Migrating/replacing the existing WordPress live site hosting.

## Audience & Tone

- **Audience:** brand marketers and decision-makers at premium South African brands (financial services, FMCG, automotive, travel, retail, luxury).
- **Tone:** bold, premium, intelligent, collaborative.
- **Key phrases to use:** Plug in · Closed loop journey · Ecosystem · Engagement · Presence · Visibility · Strategically aligned · Points of presence.
- **Positioning statement:** "We don't just find your brand a space — we craft strategic, data-driven brand journeys that live in the real world."

## Design System

### Colour (per CI palette)
| Token | Hex | Role |
|---|---|---|
| Gunmetal | `#30343F` | Dark surfaces, cards |
| Near-black | `#16181d` | Deepest background base |
| Flame | `#CF5C36` | Primary CTA, Services accent, active states |
| Silver | `#BDC2BF` | Silver section bands, text/accents on dark, POPs accent |
| Viridian | `#417B5A` | Team section accent |
| Cornflower | `#7189FF` | Contact section accent |

**Base decision:** Hybrid — dark base overall with **alternating full silver bands** for rhythm. Dark sections use a subtle perforated-dot texture and metallic silver-gradient headings. Text is white or silver on dark; near-black (`#16130f`) on silver. Drop shadows applied where contrast requires (per CI note).

### Typography
- **Headlines:** Century Gothic. Web proxy: **Jost** (geometric, multi-weight) via Google Fonts.
- **Body:** Avenir. Web proxy: **Nunito Sans** via Google Fonts.
- Swap to licensed Century Gothic / Avenir webfonts if the client provides them (single `@font-face` block, documented).

### Motion ("dynamic movement")
- Scroll-reveal on sections (IntersectionObserver).
- Animated journey line (Home → Airport → Mall → Home).
- Counting-up stat numbers.
- Marquee of client logos / locations.
- Flip/hover service cards.
- All motion respects `prefers-reduced-motion: reduce`.

### Logo
Brushed-aluminium/steel 3D "GT" monogram per CI. Placeholder = metallic CSS gradient mark until the real SVG/PNG asset is supplied.

### Photography rule
Every image must contain at least **2 of 3**: hero positioning of the asset, in-situ context, people in shot. Placeholders used now; swap points marked in markup with descriptive captions (e.g. "IN-SITU · PEOPLE · DAINFERN SQUARE").

## Structure

Single `index.html`, sticky top nav with a **locked icon section-selector** (hover labels, smooth-scroll jumps) + "Plug In" CTA. Sections in scroll order:

1. **Hero / Landing** — *dark, flame accent.* Brushed GT logo, "Plug into The Grid" tagline, positioning H1, in-situ hero image, primary CTAs ("Book a Campaign", "Explore Services"), animated stat bar: 16+ digital screens · 500K+ daily impressions · 21M airport passengers/yr · 100% Black-owned.
2. **Way of Work** — *silver.* Closed-loop ecosystem philosophy (≤200 words, punchy), 3 strategy pillars (Strategic Journey Mapping, Data-Driven Intelligence, Premium Presence Network), mission + vision incl. Black-owned leadership.
3. **Services** — *dark, flame accent.* Flip/hover cards: DOOH (Digital Billboards), Airport Security Trays, Static Large-Format, Brand Activations; plus Data & Analytics and Journey Strategy features.
4. **Points of Presence** — *silver, silver accent.* Animated Home→Airport→Mall→Home journey map + location pins: Dainfern Square (10 DOOH + 10m×70m static), Planet Fitness (5 screens), Witkoppen Road, OR Tambo, King Shaka, Cape Town International.
5. **Clients** — *dark.* Wall of 25+ real brand logos (Nedbank, Coca-Cola, Vodacom, Nando's, DStv, Absa, FNB, Showmax, Multichoice, Telkom, AVBOB, Wimpy, Mugg & Bean, eBucks, Planet Fitness, Africa Padel, Moving Walls, NFM, Luminex, Auto & General, Automark, Mitchum, Moja Cafe, Gary Rom, etc.) + a social-proof line.
6. **Team** — *silver, viridian accent.* Real team as headshot cards with hover-reveal capabilities: Thando Mabuza (Director), Eddie Mabuza (Business Development), Zenele Biyela (Data Analyst), Natasha Dixon (Account Manager).
7. **Contact** — *dark, cornflower accent.* Direct phone (+27 79 365 0188), email (sales@thegridtech.co.za), WhatsApp button, social links (Facebook `/thegridaeonline`, X `/thegridonline`, LinkedIn `/company/the-grid-online`), campaign brief form.
8. **Footer** — nav, contact, socials, legal placeholders.

## Technical Approach

- **Vanilla HTML/CSS/JS, no build step.** Single shared `styles.css`; vanilla JS for nav, scroll-reveal, journey map, counters, flip cards, form handling.
- Built as **fresh files**. The existing prototype files (`index.html`, `services.html`, etc. and the legacy single-file mockups) are **left in place untouched**; new build lives in a clean entry point (final filename confirmed during planning — likely a new `index.html` with the old ones archived into an `/legacy` folder so the new site is the default).
- **Contact form:** Formspree (no backend) recommended, with a `mailto:` fallback. Endpoint is a client-supplied dependency; until provided, the form validates client-side and shows a success state without submitting.
- Icons: Tabler Icons CDN (already used in the prototype).

## Accessibility

- Semantic landmarks (`<nav> <main> <section> <footer>`), logical heading order.
- Colour contrast: silver/white text on dark and near-black text on silver both meet WCAG AA (verify during build).
- Keyboard-navigable nav and interactive cards; visible focus states.
- `alt` text on all images; `prefers-reduced-motion` honored.

## Client-Supplied Asset Dependencies

1. Brushed-aluminium GT logo (SVG/PNG).
2. Licensed Century Gothic + Avenir webfonts (optional; Jost/Nunito Sans otherwise).
3. Real in-situ photography (boards + people).
4. Real client logo files.
5. Team headshots + confirmed bios/roles.
6. Contact form destination (Formspree endpoint or email).

## Success Criteria

- All seven sections present, content-complete with real content, no Lorem ipsum / fictional placeholders.
- Matches CI palette, type intent, dark-metallic + silver-band aesthetic, and photography rule (placeholders clearly swappable).
- Single-page scroll with working icon section-selector and smooth anchors.
- Responsive (mobile hamburger nav, stacked layouts) and accessible (AA contrast, reduced-motion, keyboard).
- No build step; opens directly in a browser; fast first paint.
