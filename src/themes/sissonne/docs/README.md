# Sissonne Theme Documentation

## Overview

Sissonne Dance Academy theme with layout, sliders, and custom UI components.

---

## Design System

### Tokens

Uses the canonical design token set with theme-specific overrides. See `theme.css` for the full token set.

### Components

Registry entries in `src/config/designSystemRegistry.ts`:
- Layout
- Hero Slider, Testimonial Slider, Faculty Slider, Gallery Slider
- Custom UI components (44 files in `components/ui/`) — theme overrides that depend on shared UI

---

## Pages and Routing

See `pages.json` for registered pages.

---

## Asset Conventions

### Static (git) assets

- Location: `src/themes/sissonne/assets/`
- Served at: `/theme/sissonne/assets/<file>`

---

## Notes

- Sissonne UI components are theme overrides (many import from `@/components/ui` internally but add local variants/styling)
- Not pure wrappers; documented as theme-specific customizations

---

## Links

- **Root README:** `../../../README.md` — Project architecture, conventions, systems.
- **Design System:** `/design-system` — Live catalog of all components.
- **Tokens:** `src/themes/tokens.css` — Canonical token defaults.
