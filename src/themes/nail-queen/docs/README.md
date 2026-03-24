# Nail Queen Theme Documentation

## Overview

Nail salon theme with gallery, pricing, and booking functionality.

---

## Design System

### Tokens

Uses the canonical design token set with theme-specific overrides. See `theme.css` for the full token set.

### Components

Registry entries in `src/config/designSystemRegistry.ts`:
- Layout
- Contact Panel

---

## Pages and Routing

- `/theme/nail-queen/` → Homepage
- `/theme/nail-queen/pricing` → Pricing page
- `/theme/nail-queen/gallery` → Gallery page
- Custom NotFoundPage with blog slug check + redirect

See `pages.json` for registered pages.

---

## Asset Conventions

### Static (git) assets

- Location: `src/themes/nail-queen/assets/`
- Served at: `/theme/nail-queen/assets/<file>`
- Extensive gallery assets organized by nail art category

---

## Links

- **Root README:** `../../../README.md` — Project architecture, conventions, systems.
- **Design System:** `/design-system` — Live catalog of all components.
- **Tokens:** `src/themes/tokens.css` — Canonical token defaults.
