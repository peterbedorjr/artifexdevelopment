# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Artifex Development landing page — a single-page static site built with Astro and Three.js. Features an animated starfield background using WebGL shaders with a twinkling/warp-speed effect rendered from real star position data (`public/stars.json`).

Deployed via Laravel Forge. Live at https://artifexdevelopment.co.

## Commands

```bash
npm run dev       # Start Astro dev server with hot reload
npm run build     # Production build (minified, outputs to ./new_dist/)
npm run preview   # Preview the production build locally
```

## Architecture

This is a minimal Astro 4 static site with a single page:

- `src/pages/index.astro` — The entire site: HTML structure, scoped CSS, and a Three.js starfield script
- `public/stars.json` — Large JSON dataset of star coordinates `[x, y, z, luminosity]` used to render the 3D starfield
- `public/star.png` — Texture sprite for individual star points
- `astro.config.mjs` — Astro config; output directory set to `./new_dist/`

### Starfield Rendering

The starfield is implemented entirely in the `<script>` block of `index.astro` using Three.js:

- Stars are rendered as `THREE.Points` with custom GLSL vertex/fragment shaders
- Vertex shader: controls per-star size via `size` attribute
- Fragment shader: applies star texture and twinkling effect using `uTime` uniform + position-based sine waves
- Animation loop moves stars toward the camera (warp-speed effect) and resets them when they pass behind
- Respects `prefers-reduced-motion` — disables star movement when enabled
- Star opacity is derived from Z-depth; size is derived from luminosity

### Styling

- CSS is scoped within the Astro component (no Tailwind)
- Color palette: `--purple: #481d52`, `--pink: #dd517e`, `--yellow: #e68e35`, `--off-white: #f3f3f3`
- Font: DM Sans (self-hosted woff2 in `src/fonts/`)
- CSS reset: normalize.css + HTML5 Boilerplate base styles in `src/css/`

## Key Details

- **Build output**: `./new_dist/` (not the default `dist/`)
- **Analytics**: Umami self-hosted analytics (analytics.bedor.me)
- **EditorConfig**: 2-space indent for JS files
- **TypeScript**: Extends `astro/tsconfigs/base`
