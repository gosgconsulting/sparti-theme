# Design System Guideline (Cross-Theme)

This document is the **single source of truth** for design tokens, component usage, and styling rules across all Sparti themes. Every new theme and every new UI development **must** follow this guideline so that design stays consistent, maintainable, and reusable.

---

## 1. Purpose and scope

- **Purpose:** Unify look and feel across themes via a canonical token set, shared components, and clear rules.
- **Scope:** All themes under `src/themes/<slug>/`; design system components in `src/libraries/`; global styles in `src/index.css` and theme-level `theme.css`.
- **Outcome:** New development uses the same tokens and components; no one-off colors or duplicate UI patterns.

---

## 2. Canonical CSS variable token set

The following tokens **must** be available in every theme (in `:root` and `.dark`). Themes may add extra variables for brand-specific needs, but must not remove or rename these.

### 2.1 Token list (semantic names)

Use these variable **names** in theme CSS and in components. Values can be hex or HSL; see [Value format](#23-value-format).

| Token | Role |
|-------|------|
| `--background` | Page/surface background |
| `--foreground` | Default text on background |
| `--card` | Card/surface background |
| `--card-foreground` | Text on card |
| `--popover` | Popover/dropdown background |
| `--popover-foreground` | Text on popover |
| `--primary` | Primary brand / CTA |
| `--primary-foreground` | Text on primary |
| `--secondary` | Secondary surface |
| `--secondary-foreground` | Text on secondary |
| `--muted` | Muted surface |
| `--muted-foreground` | Muted text |
| `--accent` | Accent surface/highlight |
| `--accent-foreground` | Text on accent |
| `--destructive` | Error/danger |
| `--destructive-foreground` | Text on destructive |
| `--border` | Default border |
| `--input` | Input field background/border |
| `--ring` | Focus ring |
| `--radius` | Default border radius (e.g. `1.4rem`) |
| `--sidebar` | Sidebar background |
| `--sidebar-foreground` | Sidebar text |
| `--sidebar-primary` | Sidebar primary accent |
| `--sidebar-primary-foreground` | Text on sidebar primary |
| `--sidebar-accent` | Sidebar accent surface |
| `--sidebar-accent-foreground` | Text on sidebar accent |
| `--sidebar-border` | Sidebar border |
| `--sidebar-ring` | Sidebar focus ring |
| `--chart-1` … `--chart-5` | Chart/data viz palette |
| `--spacing` | Base spacing unit (e.g. `0.27rem`) |
| `--letter-spacing` | Default letter-spacing (e.g. `-0.025em`) |
| `--font-sans` | Sans-serif stack |
| `--font-serif` | Serif stack |
| `--font-mono` | Monospace stack |
| `--shadow-offset-x`, `--shadow-offset-y` | Shadow offset |
| `--shadow-blur`, `--shadow-spread` | Shadow blur/spread |
| `--shadow-color`, `--shadow-opacity` | Shadow color and opacity |

Every `*-foreground` token pairs with its parent; both must be defined for light and dark.

### 2.2 Example: light and dark blocks

This format is the **reference** for what each theme should provide (values are examples; themes may override with brand colors):

```css
:root {
  --card: #fdfdfd;
  --ring: #000000;
  --input: #ebebeb;
  --muted: #f5f5f5;
  --accent: #e2ebff;
  --border: #e7e7ee;
  --radius: 1.4rem;
  --chart-1: #4ac885;
  --chart-2: #7033ff;
  --chart-3: #fd822b;
  --chart-4: #3276e4;
  --chart-5: #747474;
  --popover: #fcfcfc;
  --primary: #7033ff;
  --sidebar: #f5f8fb;
  --spacing: 0.27rem;
  --font-mono: IBM Plex Mono, monospace;
  --font-sans: Plus Jakarta Sans, sans-serif;
  --secondary: #edf0f4;
  --background: #fdfdfd;
  --font-serif: Lora, serif;
  --foreground: #000000;
  --destructive: #e54b4f;
  --shadow-blur: 3px;
  --shadow-color: hsl(0 0% 0%);
  --sidebar-ring: #000000;
  --shadow-spread: 0px;
  --letter-spacing: -0.025em;
  --shadow-opacity: 0.16;
  --sidebar-accent: #ebebeb;
  --sidebar-border: #ebebeb;
  --card-foreground: #000000;
  --shadow-offset-x: 0px;
  --shadow-offset-y: 2px;
  --sidebar-primary: #000000;
  --muted-foreground: #525252;
  --accent-foreground: #1e69dc;
  --popover-foreground: #000000;
  --primary-foreground: #ffffff;
  --sidebar-foreground: #000000;
  --secondary-foreground: #080808;
  --destructive-foreground: #ffffff;
  --sidebar-accent-foreground: #000000;
  --sidebar-primary-foreground: #ffffff;
}

.dark {
  --card: #222327;
  --ring: #8c5cff;
  --input: #33353a;
  --muted: #2a2c33;
  --accent: #1e293b;
  --border: #33353a;
  --radius: 1.4rem;
  --chart-1: #4ade80;
  --chart-2: #8c5cff;
  --chart-3: #fca5a5;
  --chart-4: #5993f4;
  --chart-5: #a0a0a0;
  --popover: #222327;
  --primary: #8c5cff;
  --sidebar: #161618;
  --spacing: 0.27rem;
  --font-mono: IBM Plex Mono, monospace;
  --font-sans: Plus Jakarta Sans, sans-serif;
  --secondary: #2a2c33;
  --background: #1a1b1e;
  --font-serif: Lora, serif;
  --foreground: #f0f0f0;
  --destructive: #f87171;
  --shadow-blur: 3px;
  --shadow-color: hsl(0 0% 0%);
  --sidebar-ring: #8c5cff;
  --shadow-spread: 0px;
  --letter-spacing: -0.025em;
  --shadow-opacity: 0.16;
  --sidebar-accent: #2a2c33;
  --sidebar-border: #33353a;
  --card-foreground: #f0f0f0;
  --shadow-offset-x: 0px;
  --shadow-offset-y: 2px;
  --sidebar-primary: #8c5cff;
  --muted-foreground: #a0a0a0;
  --accent-foreground: #79c0ff;
  --popover-foreground: #f0f0f0;
  --primary-foreground: #ffffff;
  --sidebar-foreground: #f0f0f0;
  --secondary-foreground: #f0f0f0;
  --destructive-foreground: #ffffff;
  --sidebar-accent-foreground: #8c5cff;
  --sidebar-primary-foreground: #ffffff;
}
```

### 2.3 Value format

- **Hex (`#rrggbb`):** Allowed in theme CSS. Use for clarity and consistency with design tools.
- **HSL for Tailwind:** The current Tailwind theme uses `hsl(var(--primary))` etc. If your theme only sets hex, either:
  - Define tokens in HSL form (e.g. `--primary: 263 70% 60%;`) in `theme.css`, or
  - Ensure a build step or global CSS converts hex to HSL for those variables, or
  - Extend Tailwind so it can consume hex (e.g. use `var(--primary)` directly where the variable holds a full color value).
- **Recommendation:** Prefer the canonical token **names** in every theme; use hex or HSL per theme preference, and keep Tailwind and any `@theme inline` in sync with that choice.

---

## 3. Where tokens live

- **Canonical defaults:** `src/themes/tokens.css` defines the full canonical token set (`:root` and `.dark`) in HSL for Tailwind compatibility. This file is imported by `src/index.css` and provides fallbacks for all themes.
- **Global layer:** `src/index.css` imports `tokens.css` and adds legacy/brand variables (e.g. `--brand-primary`, `--font-heading`) and base/component styles. Do not duplicate canonical token definitions in `index.css`.
- **Per-theme overrides:** Each theme’s `src/themes/<slug>/theme.css` should define (or override) the canonical set for that theme’s light and dark mode. Themes that only use `--sidebar-background` should also set `--sidebar: var(--sidebar-background)` so Tailwind’s `sidebar` color works.
- **CMS-driven overrides:** `applyThemeStyles()` (from CMS branding) writes to `#theme-styles-dynamic` and overrides a subset of tokens (e.g. `--primary`, `--background`, `--sidebar`, `--radius`). Theme CSS and `tokens.css` still define the full set so that any token not coming from CMS has a sensible default.

---

## 4. Design system components (reuse)

- **Prefer components from the active design system** for the theme (Flowbite, shadcn, or custom). See `theme.json` → `designSystem` and `designSystemTheme`.
- **Flowbite:** `src/libraries/` (see `src/libraries/README.md`). Use these for shared UI (buttons, cards, forms, nav, etc.) so themes don’t reimplement the same patterns.
- **Theme-specific UI:** Only add custom components when the design system doesn’t provide the pattern. When you do, use the canonical tokens (e.g. `var(--primary)`, `var(--card)`, `var(--border)`).
- **Reference:** [Theme AI context](../src/themes/AI_CONTEXT.md) and [Master theme STYLE_RULES](../src/themes/master/STYLE_RULES.md) for button variants, badges, spacing, and typography.

---

## 5. Typography, spacing, and shadows

- **Typography:** Use `--font-sans`, `--font-serif`, `--font-mono` and `--letter-spacing` from the token set. Avoid hard-coded font names in theme components; reference these variables.
- **Spacing:** Use `--spacing` as the base unit where a single scale is needed; align with Tailwind’s spacing scale where possible (e.g. `--spacing` for a “step”).
- **Radius:** Use `--radius` for cards, inputs, buttons; avoid arbitrary border-radius values unless the guideline explicitly allows.
- **Shadows:** Use `--shadow-offset-x`, `--shadow-offset-y`, `--shadow-blur`, `--shadow-spread`, `--shadow-color`, `--shadow-opacity` to build a single shadow system so themes can tune depth consistently.

---

## 6. Rules for new development

1. **Use the canonical tokens** for color, radius, spacing, typography, and shadows. Do not introduce new one-off CSS variables for the same concepts.
2. **Use design system components** from `src/libraries/` (or the theme’s designated system) before building custom UI.
3. **No hard-coded colors** for semantic roles (primary, background, card, border, etc.). Use `var(--primary)`, `var(--card)`, etc.
4. **Light and dark:** Every theme must define both `:root` and `.dark` for the full token set so dark mode is consistent.
5. **Charts and data viz:** Use `--chart-1` … `--chart-5` so charts stay on-brand and accessible across themes.
6. **New themes:** Start from the Master theme; in `theme.css`, replace the example token values with the new theme’s palette while keeping the same token names.

---

## 7. Reference

- **Token set (this doc):** §2.
- **Theme structure:** [src/themes/README.md](../src/themes/README.md).
- **Master theme (duplicate for new themes):** [src/themes/master/README.md](../src/themes/master/README.md).
- **Detailed UI patterns (buttons, badges, dark mode):** [src/themes/master/STYLE_RULES.md](../src/themes/master/STYLE_RULES.md).
- **Design system components and Flowbite:** [src/libraries/README.md](../src/libraries/README.md).
- **TODO and verification:** [todo.md](todo.md).

---

## 8. Tailwind and `@theme inline` (optional)

If the project uses Tailwind v4 `@theme inline`, map the canonical tokens into Tailwind’s theme the same way (e.g. `--color-primary: var(--primary);`). Keep one place that defines the semantic names (`--primary`, etc.) and reference them from Tailwind so all themes and the design system stay aligned.
