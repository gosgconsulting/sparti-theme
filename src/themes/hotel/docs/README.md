# Hotel Theme Documentation

## Overview

Hotel Adina theme with room booking, search, and reservation functionality.

---

## Design System

### Tokens

Uses the canonical design token set with theme-specific overrides. See `theme.css` for the full token set.

Custom fonts:
- Gilda Display (serif)

---

## Pages and Routing

- `/theme/hotel/` → Homepage
- `/theme/hotel/rooms` → Rooms listing
- `/theme/hotel/search` → Search results
- `/theme/hotel/blog` → Blog listing
- `/theme/hotel/privacy-policy` → Privacy policy
- `/theme/hotel/thank-you` → Thank you page

See `pages.json` for registered pages.

---

## Asset Conventions

### Static (git) assets

- Location: `src/themes/hotel/assets/`
- Served at: `/theme/hotel/assets/<file>`

---

## Links

- **Root README:** `../../../README.md` — Project architecture, conventions, systems.
- **Design System:** `/design-system` — Live catalog of all components.
- **Tokens:** `src/themes/tokens.css` — Canonical token defaults.
