# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a website design project for **The Grid Technologies** — a Johannesburg-based OOH (Out-Of-Home) advertising and marketing agency. Their value proposition is a "closed-loop, journey-style" advertising ecosystem: end-to-end points of presence (POPs) along a strategically defined consumer journey (Home → Gym → Mall → Airport → Home) to maximise brand impact and ROI.

The repository contains:
- `the_grid_website_mockup.html` — Interactive single-file HTML/CSS/JS prototype of the full website
- `The Grid website proposal_260525_125730.pdf` — Brand CI guide with fonts, colours, logo guidelines, and website flowchart
- `GridTech_Website_Audit_Redesign_Brief.docx` — Website audit and redesign brief

## HTML Mockup Architecture

The mockup is a **single-page scroll-down site** with five sections, navigable via a sticky section-pill nav bar and smooth-scroll anchors:

| Section ID | Purpose |
|---|---|
| `#s-hero` | Landing — logo, tagline, hero stats, CTAs |
| `#s-services` | Services — 4 flip-cards (LED Billboards, Airport Trays, Print Billboards, Data & Analytics) |
| `#s-pops` | Points of Presence — animated journey map (Home→Gym→Mall→Airport→Home) + location pins |
| `#s-team` | Team — hover-reveal capability cards |
| `#s-contact` | Contact — direct contact details, WhatsApp CTA, social links, campaign brief form |

All interactivity is vanilla JS at the bottom of the file: `flipCard()`, `setJourney()`, `showTeam()`, `hideTeam()`, `setActive()`. No build step, no dependencies — open directly in a browser.

Icons are from [Tabler Icons](https://tabler-icons.io/) CDN (`ti ti-*` classes). The file has no external CSS or JS bundle dependencies beyond that.

## Design System

### Color Palette (CSS custom properties defined in `:root`)

| Token | Hex | Name | Usage |
|---|---|---|---|
| `--flame` | `#CF5C36` | Flame (orange) | Primary CTA, accents, active states, numbers |
| `--gunmetal` | `#30343F` | Gunmetal | Cards, logo mark background |
| `--silver` | `#BDC2BF` | Silver | Secondary text, borders |
| `--viridian` | `#417B5A` | Viridian | WhatsApp button, mall journey node |
| `--cornflower` | `#7189FF` | Cornflower Blue | Airport journey node, data accent |
| `--dark` | `#1a1c22` | Dark background | Page/nav/hero/contact background |
| `--darkb` | `#22262f` | Dark secondary | Section alternate backgrounds |

Text is always white or silver (`#BDC2BF`) on dark backgrounds. Drop shadows may be applied where contrast is needed.

### Typography (per CI guide)
- **Headlines:** Century Gothic — bold, modern, legible; used for section titles and hero H1
- **Body:** Avenir — harmonious proportions, wide weight range; used for descriptors and UI labels
- Font sizes in the mockup scale from 10px (labels) to 32px (hero H1); weight 500 for most UI elements

### Logo
The "GT" monogram mark. The refreshed logo uses a brushed aluminium/steel texture with 3D finish and lightly bevelled edges. In the mockup this is represented as a flat `#30343F` square with "GT" text.

## Brand & Content Rules

- **Tone:** Bold, premium, intelligent, collaborative
- **Positioning statement:** *"We don't just find your brand a space — we craft strategic, data-driven brand journeys that live in the real world."*
- **Key phrases to use:** Plug in, Closed loop journey, Ecosystem, Engagement, Presence, Visibility, Strategically aligned, Points of presence
- **Primary CTA:** "Plug In" (nav button), "Book a campaign"
- **Photography rule:** Every image must contain at least 2 of: (1) hero positioning of the asset, (2) in-situ visual context, (3) people in the image
- **Copy style:** Minimalistic, punchy — 150–200 words max for philosophy/way-of-work descriptors. Images are the hero; text is secondary.
- **Website is graphically driven** — visuals lead, text supports

## Key Stats (used in hero)
- 35+ screens live
- 500K+ daily impressions
- 21M airport passengers/year
- 6+ premium locations

## Points of Presence (location data)
- **DOOH:** Dainfern Square, Planet Fitness (5 screens), Witkoppen Road
- **Airport trays:** OR Tambo, King Shaka, Cape Town International
- **Static billboard:** Dainfern Square (10m × 70m, one of Johannesburg's most visible formats on Winnie Mandela Drive)

## Contact Details
- Phone: +27 79 365 0188
- Email: sales@thegridtech.co.za
- Socials: Instagram, LinkedIn, Facebook
- Location: Johannesburg, SA
