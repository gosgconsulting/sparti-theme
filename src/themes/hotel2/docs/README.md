# Hotel2 Theme Documentation

## Overview

Hotel theme variant 2 with search and results functionality.

---

## Design System

### Tokens

Uses the canonical design token set with theme-specific overrides. See `theme.css` for the full token set.

**Recent refactor (2025-03-19):** Refactored `theme.css` to use canonical design tokens; replaced all `--brand-*` and hard-coded colors with token-based values; added `.theme-hotel2.dark` block; updated hotel2 components to use design system utility classes.

---

## Pages and Routing

- `/theme/hotel2/` → Homepage
- `/theme/hotel2/search` → Search results

See `pages.json` for registered pages.

---

## Asset Conventions

### Static (git) assets

- Location: `src/themes/hotel2/assets/`
- Served at: `/theme/hotel2/assets/<file>`

---

## Links

- **Root README:** `../../../README.md` — Project architecture, conventions, systems.
- **Design System:** `/design-system` — Live catalog of all components.
- **Tokens:** `src/themes/tokens.css` — Canonical token defaults.
