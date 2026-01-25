# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static company website for Sparkbyte Solutions Ltd, hosted on GitHub Pages with a custom domain (sparkbyte.eu). The site is a single-page application with three main sections: Home (hero), Services, and Contact.

## Architecture

**Technology Stack:**
- Pure HTML/CSS/JavaScript (no build process or frameworks)
- Leaflet.js for interactive maps (OpenStreetMap tiles)
- GitHub Pages for hosting

**Structure:**
- `index.html` - Single page containing all sections (home, services, contact)
- `css/styles.css` - All styling with CSS custom properties for theming
- `js/app.js` - Client-side JavaScript for map initialization and smooth scrolling
- `img/logo.png` - Company logo
- `CNAME` - Custom domain configuration for GitHub Pages

**Key Design Patterns:**
- Sticky header navigation with smooth scroll anchors
- CSS Grid for responsive service cards and contact layout
- CSS custom properties (variables) for theming: `--primary` (gold #FFD700), `--secondary` (dark blue #2C3E50), `--accent`, `--text`
- Mobile-first responsive design with media queries at 768px and 992px breakpoints

**Map Implementation:**
The site uses Leaflet.js (not Google Maps despite commented code in app.js:29-31) for the interactive map showing the business location in Nicosia, Cyprus (coordinates: 35.1739, 33.3647). The map is initialized on page load with OpenStreetMap tiles.

## Development Commands

Since this is a static site with no build process, there are no build or test commands. To develop:

1. **Local Development**: Open `index.html` directly in a browser, or use any static file server:
   ```bash
   python3 -m http.server 8000
   # or
   npx serve .
   ```

2. **Deploy**: Push to the `main` branch. GitHub Pages automatically serves the site.

## Important Notes

- The contact form uses a `mailto:` link (office@sparkbyte.eu) instead of server-side processing
- Service card backgrounds use inline styles with Unsplash/Pexels image URLs
- No package.json or dependencies to manage (external libraries loaded via CDN)
- The site has no client-side routing - all sections are on a single page with anchor navigation
