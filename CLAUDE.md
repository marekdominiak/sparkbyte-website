# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static company website for Sparkbyte Solutions Ltd — a B2B software consultancy with 10 engineers across the EU (mainly Poland), serving clients in Norway and Scotland. Hosted on GitHub Pages at sparkbyte.eu.

## Tech Stack

- Pure HTML/CSS/JavaScript — no build process, no frontend frameworks
- Leaflet.js + OpenStreetMap tiles for interactive map (CDN via unpkg)
- Inter + JetBrains Mono fonts via Google Fonts CDN
- Lucide Icons via CDN
- Deployed automatically by pushing to `main` branch (GitHub Pages)

## Development

```bash
# Local dev — open index.html directly or:
python3 -m http.server 8000
# or
npx serve . -l 3000
```

## Testing

```bash
npm install                    # first time only
npx playwright install         # install browsers (first time only)
npm test                       # run Playwright E2E tests
npm run test:lighthouse        # run Lighthouse CI audits
```

Tests run against a local static server (auto-started by Playwright config). CI runs both Playwright and Lighthouse on every push/PR via GitHub Actions.

## Architecture

**Single-page layout** with 8 sections: Hero, Stats Bar, Expertise (5 cards), Approach (4 methodology cards), About/Team, Contact (info + Leaflet map), Footer. All in `index.html`, styled by `css/styles.css`, with behavior in `js/app.js`.

**Design system** uses CSS custom properties in `:root`:
- Backgrounds: `--bg-primary` (#09090B), `--bg-secondary` (#18181B), `--bg-tertiary` (#27272A)
- Text: `--text-primary` (#FAFAFA), `--text-secondary` (#A1A1AA), `--text-muted` (#71717A)
- Accent: `--accent` (#F59E0B amber), `--accent-light` (#FCD34D)
- Secondary: `--accent-blue` (#3B82F6)

**Responsive breakpoints**: 768px (mobile — hamburger nav, stacked grids), 992px (tablet — single-column contact/about)

**JS modules** in `app.js`:
- `initMap()` — Leaflet map centered on Paphos, Cyprus (34.7757, 32.4244)
- `initMobileMenu()` — hamburger toggle with aria-expanded
- `initScrollReveal()` — Intersection Observer for `.reveal` elements
- `initActiveNav()` — highlights current section in nav
- Lucide icon initialization via `lucide.createIcons()`

**Contact**: `mailto:` link to office@sparkbyte.eu — no server-side processing.

**Expertise cards**: Bento grid layout (3 top + 2 centered bottom on desktop). Tech tags styled as pills in JetBrains Mono.
