# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

LENY (Artesanías Leny) — a premium e-commerce/marketing site for handcrafted wooden kitchen products. Primary language is **Spanish**. Currently showing a "Coming Soon" landing page; full site components exist but are commented out in `page.tsx`.

## Commands

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Static export to /out
npm start        # Serve production build
npm run lint     # ESLint with Next.js core web vitals + TypeScript rules
```

## Architecture

- **Next.js 16** with `output: "export"` — purely static site, no SSR/API routes
- **React 19** with TypeScript (strict mode)
- **Path alias:** `@/*` → `./src/*`
- **Fonts:** Geist (body), Geist Mono (monospace), Playfair Display (serif headings) — loaded via `next/font` in `layout.tsx` and exposed as CSS variables

### Animation Stack

Two animation libraries coexist with distinct roles:
- **GSAP** + ScrollTrigger: scroll-pinned sections, parallax, scrub-based timeline animations (FeaturedCollection, Philosophy, BentoGrid, Story, Hero)
- **Framer Motion**: interaction-driven animations — mount transitions, hover states, mouse parallax (ComingSoon, UseCases)
- **Lenis**: smooth scroll wrapper applied globally via `SmoothScrolling.tsx` in the root layout

All animated components use `"use client"`.

### Styling

- **Tailwind CSS v4** via `@tailwindcss/postcss` plugin
- Custom color palette defined as CSS variables in `globals.css` and registered as Tailwind theme colors (`wood-bg`, `wood-text`, `wood-primary`, `wood-secondary`, `wood-details`, `wood-highlight`)
- Custom `.glass-panel` utility class for frosted glass effects
- Page uses `scroll-snap-type: y mandatory` on `<html>`

### Component Structure

All components live in `src/components/` as standalone page sections. Each is self-contained with its own animations and responsive breakpoints. Key sections: ComingSoon (active), Hero, Navbar, UseCases, BentoGrid, FeaturedCollection, Philosophy, Process, Story, Footer.

### Static Assets

Large product images in `public/images/` (some 10-50MB). Logos in `public/` root: SVG brand logo, PNG logo, white SVG variant.
