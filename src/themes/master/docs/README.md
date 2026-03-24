# Master Theme Documentation

## Overview

This theme is the **master reference** you can **duplicate 1:1** to create new themes. It is structured to work cleanly with the **Sparti CMS** (pages, settings, uploads), stay **deployable** as a normal front-end theme, and be easy to duplicate without hunting for internal wiring.

---

## What This Theme Demonstrates

- A **single entry** `index.tsx` that routes between pages using the `pageSlug` prop.
- A **standard folder structure**:
  - `components/` = reusable UI/layout pieces
  - `pages/` = route-level pages
  - `data/` = local seed / sample data
  - `assets/` = static theme assets (checked into git)
- **Branding from DB** via `useThemeBranding(themeSlug)` → applied as CSS variables.
- A **contact modal** that submits to `/api/form-submissions` and supports WhatsApp redirect.

---

## Design System

### Tokens

Master theme uses the canonical design token set defined in `src/themes/tokens.css`. The `theme.css` file overrides these tokens with the master theme's brand palette:

- **Primary:** `#7033ff` (purple)
- **Background:** `#fdfdfd` (light) / `#1a1b1e` (dark)
- **Foreground:** `#000000` (light) / `#f0f0f0` (dark)
- **Card:** `#fdfdfd` (light) / `#222327` (dark)
- **Border:** `#e7e7ee` (light) / `#33353a` (dark)
- **Radius:** `1.4rem`

See `theme.css` for the full token set (`:root` and `.dark`).

### Typography

- **Sans:** Plus Jakarta Sans, sans-serif
- **Serif:** Lora, serif
- **Mono:** IBM Plex Mono, monospace
- **Letter spacing:** `-0.025em`

### Components

Master theme uses:
- **Flowbite components** from `src/libraries/flowbite/` (Header, Footer, Hero, CTA, FAQ, etc.)
- **Shared UI** from `src/components/ui/` (buttons, cards, forms)
- **Theme-specific components** in `components/` (layout, modals)

---

## Pages and Routing

The theme routes based on `pageSlug`:

- `/theme/master/` → Homepage
- `/theme/master/blog` → Blog list
- `/theme/master/blog/:slug` → Blog post
- `/theme/master/privacy-policy` → Legal page
- `/theme/master/terms-and-conditions` → Legal page
- `/theme/master/thank-you` → Thank you page

> Source of truth for registered pages is `pages.json`.

---

## Asset Conventions

### Static (git) assets

- Put static assets in: `src/themes/master/assets/`
- They are served at: `/theme/master/assets/<file>`

Example:
```tsx
<img src="/theme/master/assets/placeholder.svg" alt="Placeholder" />
```

### Uploaded (DB) assets

Uploaded media comes from the Media Library and typically returns URLs like:
- `/uploads/<tenant-storage>/<filename>`

---

## How to Duplicate This Theme (1:1)

When you duplicate this folder into a new theme slug, you should update these files:

1. **`theme.json`**
   - `name`, `description`, `tags`, `demo_url`, `documentation_url`

2. **`pages.json`**
   - SEO metadata (`meta_title`, `meta_description`, keywords)

3. **`theme.css`**
   - Replace token values with your brand palette while keeping the same token names

4. **`assets/`**
   - Replace placeholder assets with your brand assets

5. **`docs/README.md`** (this file)
   - Update with theme-specific design system, conventions, and notes

### Important Note About Slugs

This theme avoids hardcoding the string `master` in its runtime logic. It uses the `tenantSlug` prop as the effective theme slug for:

- branding fetches
- asset URL building
- form submission names

So after duplication, most of the time you only need to adjust **metadata** + **copy/content**.

---

## Styling Conventions

### Button Variants

```tsx
// Primary button
<button className="btn-primary">
  Primary Action
</button>

// Secondary button
<button className="btn-secondary">
  Secondary Action
</button>
```

### Dark Mode

Master theme supports dark mode via the `.dark` class on the root element. All tokens have both `:root` (light) and `.dark` (dark) definitions.

---

## Notes

- Keep page-level components in `pages/`.
- Keep reusable pieces in `components/`.
- Prefer CSS variables + Tailwind over hardcoded colors.
- Follow the canonical design token set for consistency across themes.

---

## Links

- **Root README:** `../../../README.md` — Project architecture, conventions, systems.
- **Design System:** `/design-system` — Live catalog of all components.
- **Tokens:** `src/themes/tokens.css` — Canonical token defaults.
