# Sparti Theme

## Overview

Frontend theme system for **Sparti CMS**: a React-based multi-tenant theme runtime that builds and deploys tenant websites. Themes are discovered from `src/themes/<slug>/`, rendered by route/`pageSlug`, and can be deployed per theme (e.g. Vercel) or run in dev with a theme picker.

- **Core purpose:** Provide a theme layer that consumes CMS data (pages, branding, settings, media) and renders tenant sites; support many themes and single-theme static deploys.
- **Target users:** Developers adding or customizing themes; tenants whose sites are powered by Sparti CMS.
- **Key outcomes:** One codebase for all themes; per-theme static builds; CMS-driven content and branding; consistent structure (theme.json, pages.json, assets).

**Documentation:** This README is the single source of truth for project architecture, conventions, and systems. Per-theme documentation lives in `src/themes/<slug>/docs/README.md` and `src/themes/<slug>/docs/TODO.md`.

---

## Architecture

### High-Level Structure

- **Type:** Fullstack SPA (React frontend; API/data from external Sparti CMS backend).
- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, React Router 6.
- **Backend:** None in-repo; `VITE_API_BASE_URL` points to Sparti CMS API for pages, branding, form submissions, etc.
- **Database:** None local; data comes from CMS API.
- **External integrations:** Sparti CMS (content, branding, forms), Vercel (deploy), optional analytics.

### System Flow

- **User** → **URL** (e.g. `/`, `/theme/gosgconsulting/services`, `/blog/my-post`) → **Router** → **TenantLandingPage** (resolves tenant/theme slug, `pageSlug`) → **Theme registry** (lazy-loads theme component) → **Theme** (uses `pageSlug` + CMS hooks) → **useThemeSettings / useThemeBranding / usePageLayout** → **api** → **CMS API** → **Response** → **UI**.

---

## Module Responsibilities

### Routes

- `/` → Dev: PublicDashboard (theme picker). Deploy: TenantLandingPage with `DEPLOY_THEME_SLUG`.
- `/theme/:tenantSlug/*` → TenantLandingPage; theme slug = `tenantSlug`; `pageSlug` from path.
- `/design-system`, `/design-system/:componentId` → Design system page: sidebar of all theme + Flowbite components; select a component to see preview and path. Use as reference when building new themes or adding components.
- `/:pageSlug`, `/:pageSlug/*` → TenantLandingPage; theme from first path segment or `DEPLOY_THEME_SLUG`; supports short URLs (e.g. `/gosgconsulting`, `/blog`, `/booking/classes`).
- `*` → NotFound.

### Components (UI)

- **TenantLandingPage** → Resolves theme slug and `pageSlug`, wraps theme in ThemeBasePathContext, Suspense, ErrorBoundary.
- **PublicDashboard** → Dev-only theme list and preview links.
- **ErrorBoundary** → Catches render errors and shows fallback.
- **ProtectedRoute** → Auth guard for admin routes (e.g. `/admin`).
- **Theme components** → Per-theme under `src/themes/<slug>/` (layout, pages, modals, UI). Master theme at `src/themes/master/` is the reference.

### Hooks (Logic Layer)

- **useSEO** → Page meta, Open Graph, etc. (skipped when `DEPLOY_THEME_SLUG` set). Global fallback SEO for router-level pages.
- **useThemeSettings** → Fetches theme settings from CMS for a theme (and optional tenant).
- **useThemeBranding** → Fetches branding (logo, colors, site name, tagline, etc.) from CMS and applies CSS variables. **Primary source for page titles.**
- **useThemeStyles** → Fetches and applies theme-level CSS from CMS.
- **usePageLayout** → Resolves page data (components, SEO) from CMS by theme + page slug.
- **useSchemaEditor / useJSONEditor** → CMS/admin schema editing.
- **useDatabase (useBranding, useComponentByName, etc.)** → CMS data queries/mutations.
- **useAuth** → Auth state (AuthProvider).
- **useCMSSettings** → CMS settings context.
- Theme-specific: **useCustomCode**, **useContactModal**, **useCart**, **useRoomContext**, **usePopup**, **useThemeBasePath**, etc.

### Services / API Layer

- **api** (`src/utils/api.ts`) → `getApiUrl`, `resolveBackendAssetUrl`, `api.get/post` with auth headers (Bearer, X-Access-Key, X-Tenant-API-Key, X-Tenant-Id).
- **analytics** (`src/utils/analytics.ts`) → `trackPageView`, `trackEvent`, `trackContactFormSubmit`, etc., and `initializeAnalytics`.

### State Management

- **ThemeBasePathContext** → Base path for theme links/assets (e.g. `` or `/theme/gosgconsulting`).
- **AuthProvider** → Auth state and session.
- **CMSSettingsContext** → CMS config/settings.
- Theme-level contexts (e.g. CartContext, ContactModalContext, PopupContext, RoomContext) where needed.

### Schemas / Types

- **schema.ts** (`src/types/schema.ts`) → `SchemaItem`, `SchemaItemType`, `ComponentSchema`, `PageSchema`, `HeaderSchema`, etc., for CMS-driven page/component structure.

### Utilities

- **themeAssets** → `getThemeAssetUrl` (theme base path + tenant slug).
- **tenantConfig** → `getTenantId`, `getTenantIdWithFallback`.
- **tokens.css** (`src/themes/tokens.css`) → Canonical design token defaults (`:root` / `.dark`); imported by `index.css`.
- **applyThemeStyles** → Apply CMS theme styles (CSS variables) to DOM.
- **designSystemStyleLoader / designSystemStyleManager** → Load/clear design system CSS.
- **validation, schema-validator, schemaHelpers** → Validate components, pages, JSON.
- **componentHelpers, componentSchemaAnalyzer, component-detector** → Component metadata and editor support.
- **flowbiteThemeManager** → Flowbite theme switching.
- **constants** → `MASTER_TENANT_ID`, `STORAGE_KEYS`, etc.
- **api** → See Services.

---

## Conventions

### Naming

- Components: PascalCase.
- Hooks: `useX`.
- Services / API: `api`, `analytics`; helpers in `utils` (e.g. `themeAssets`, `tenantConfig`).
- Themes: kebab-case slug folder (`gosgconsulting`, `nail-queen`, `sparti-seo-landing`).
- Theme entry: `index.tsx`; config: `theme.json`, `pages.json`.

### File Structure

- `src/` — App and shared code: `router.tsx`, `App.tsx`, `pages/`, `components/`, `hooks/`, `context/`, `utils/`, `types/`.
- `src/themes/` — One folder per theme: `<slug>/index.tsx`, `theme.json`, `pages.json`, `theme.css`, `components/`, `pages/`, `assets/`.
- `src/themes/themeRegistry.ts` — Auto-discovers themes via `import.meta.glob('./**/index.tsx')` (top-level only).
- `src/themes/pagesRegistry.ts` — Page registration for API (sitemap, etc.).
- `public/` — Static assets. `scripts/` — Build and tooling (e.g. build-theme-static, upload-theme-assets-to-blob, dev-theme).

### Data Flow

- **UI** → **Hook** (e.g. useThemeSettings, usePageLayout) → **api** (fetch) → **CMS API** → **Response** → **Hook** → **UI**.
- Theme receives `tenantSlug`, `themeSlug`, `pageSlug`, etc., from TenantLandingPage (via router params + path parsing).

### API Handling

- API calls live in `src/utils/api.ts` and in hooks that use `api.get/post`. Base URL from `VITE_API_BASE_URL` (default `https://cms.sparti.ai`).
- Auth: Bearer token and/or X-Access-Key, X-Tenant-API-Key, X-Tenant-Id from localStorage/context.
- Errors: Handled in hooks and components; ErrorBoundary for render failures.

---

## Key Decisions

- **Single router, single landing component:** All tenant routes go through `TenantLandingPage`; theme selection by `DEPLOY_THEME_SLUG`, path segment, or `tenantSlug`/`themeSlug` params. Keeps router simple and theme registry the single source of themes.
- **Theme discovery via glob:** Themes in `src/themes/<slug>/index.tsx` are auto-registered; no manual router or registry edits to add a theme.
- **Master theme as copy source:** New themes are created by duplicating `src/themes/master/` (not the minimal `sparti-cms/template/`) for production-ready structure and CMS patterns.
- **SPA rewrites on Vercel:** `vercel.json` rewrites all routes to `/index.html` so client-side routing works for both dev and deploy.
- **Lazy-loaded themes:** Theme components are lazy-loaded from the registry to limit bundle size per route.

---

## Known Tech Debt

- **Package name:** Resolved — `package.json` name is `sparti-theme`.
- **Duplicate theme logic:** Resolved for core helpers — `useThemeBasePath`, `useCustomCode`, shared `ThemeLink`, `schemaHelpers`, and `themeSettings` live in `src/hooks/`, `src/components/`, and `src/utils/`; themes import from there.
- **Tests:** `test:unit` runs Vitest (includes `src/**/*.test.ts` and `server/tests/**`); shared utils (`schemaHelpers`, `themeSettings`) have unit tests (39 total). No in-repo E2E; manual theme preview and deploy verification documented in `TODO.md`.
- **Hardcoded brand references:** gosgconsulting theme has 50+ hardcoded "GO SG Consulting" references in components. These should use generic fallbacks or be removed. Other themes may have similar issues. See per-theme `docs/TODO.md` for cleanup plans.

---

## Theme System

### Overview

Themes are **auto-discovered**: any folder under `src/themes/<slug>/` with a top-level `index.tsx` is registered. No manual router or registry edits.

### Theme vs Template

- **Template** (`sparti-cms/template/`): Basic starting templates for new themes; simple, minimal components.
- **Theme** (`src/themes/`): Full-featured, production-ready themes; complete component ecosystem with assets, styling, and configuration.
- **Master Theme** (`src/themes/master/`): Deliberately generic theme meant to be duplicated 1:1. Demonstrates best-practice folder structure, page routing via `pageSlug`, CMS integration patterns, assets conventions.

### Mandatory Files (Every Theme)

Every theme MUST have these files to function properly:

1. `index.tsx` - Main theme component (MANDATORY)
2. `theme.json` - Theme metadata and configuration (MANDATORY)
3. `pages.json` - Page definitions and SEO settings (MANDATORY)

### Theme Structure

```
src/themes/{theme-slug}/
├── index.tsx                 # Main theme component (REQUIRED)
├── theme.json               # Theme metadata (REQUIRED)
├── pages.json               # Page definitions (REQUIRED)
├── theme.css                # Theme-specific styles (RECOMMENDED)
├── docs/                    # Theme documentation
│   ├── README.md            # Theme design system, conventions
│   └── TODO.md              # Theme-specific backlog
├── components/              # Theme components directory
│   ├── layout/              # Header/Footer, layout primitives
│   ├── modals/              # Theme-level modals
│   └── ui/                  # Reusable UI components (optional)
├── pages/                   # Route-level pages (recommended)
├── assets/                  # Theme assets directory
└── verify-assets.js         # Asset verification script (OPTIONAL)
```

### Creating a New Theme

1. **Duplicate** `src/themes/master/` → `src/themes/<your-slug>/`.
2. **Slug rules:** Use a **kebab-case** slug (e.g. `my-company`, `landing-v2`). This becomes the theme ID and URL segment (`/theme/<slug>/`).
3. **Update mandatory files:**
   - `theme.json`: Set `name`, `description`, `tags`, `demo_url` (e.g. `/theme/<your-slug>`), `documentation_url` if needed.
   - `pages.json`: Adjust `meta_title`, `meta_description`, `keywords` per page; keep or edit `sections` for the homepage.
4. **Display name (optional):** In `src/themes/themeRegistry.ts`, add your slug to `THEME_DISPLAY_NAMES` so the dev theme picker shows a friendly name.
5. **Design system (recommended):** Follow design tokens (`--background`, `--foreground`, `--primary`, etc.) in `theme.css` and shared components so the theme stays consistent and maintainable.

### Asset Conventions

#### Static (git) assets

- Put static assets in: `src/themes/<themeSlug>/assets/`
- They are served at: `/theme/<themeSlug>/assets/<file>`

Example:
```tsx
<img src="/theme/master/assets/placeholder.svg" alt="Placeholder" />
```

#### Uploaded (DB) assets

Uploaded media comes from the Media Library and typically returns URLs like:
- `/uploads/<tenant-storage>/<filename>`

Those URLs can be used anywhere an image URL is expected.

---

## Design System

### Canonical CSS Variable Token Set

The following tokens **must** be available in every theme (in `:root` and `.dark`). Themes may add extra variables for brand-specific needs, but must not remove or rename these.

#### Token List (Semantic Names)

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

### Where Tokens Live

- **Canonical defaults:** `src/themes/tokens.css` defines the full canonical token set (`:root` and `.dark`) in HSL for Tailwind compatibility. This file is imported by `src/index.css` and provides fallbacks for all themes.
- **Global layer:** `src/index.css` imports `tokens.css` and adds legacy/brand variables (e.g. `--brand-primary`, `--font-heading`) and base/component styles. Do not duplicate canonical token definitions in `index.css`.
- **Per-theme overrides:** Each theme's `src/themes/<slug>/theme.css` should define (or override) the canonical set for that theme's light and dark mode. Themes that only use `--sidebar-background` should also set `--sidebar: var(--sidebar-background)` so Tailwind's `sidebar` color works.
- **CMS-driven overrides:** `applyThemeStyles()` (from CMS branding) writes to `#theme-styles-dynamic` and overrides a subset of tokens (e.g. `--primary`, `--background`, `--sidebar`, `--radius`). Theme CSS and `tokens.css` still define the full set so that any token not coming from CMS has a sensible default.

### Design System Components (Reuse)

- **Prefer components from the active design system** for the theme (Flowbite, shadcn, or custom). See `theme.json` → `designSystem` and `designSystemTheme`.
- **Flowbite:** `src/libraries/` (see `src/libraries/README.md`). Use these for shared UI (buttons, cards, forms, nav, etc.) so themes don't reimplement the same patterns.
- **Theme-specific UI:** Only add custom components when the design system doesn't provide the pattern. When you do, use the canonical tokens (e.g. `var(--primary)`, `var(--card)`, `var(--border)`).

### Design System Page (`/design-system`)

- **URL:** `/design-system` (and `/design-system/:componentId` for deep links). Available in dev and on deploy.
- **Purpose:** Single catalog of all layout, hero, and section components from every theme and from the Flowbite library. Use it to browse components and copy patterns when building new themes.
- **Registry:** `src/config/designSystemRegistry.ts` — add an entry for every new Header, Footer, Hero, Section, or modal you create so it appears in the sidebar.
- **Previews:** Components with a live preview are wired in `src/pages/design-system/DesignSystemPreview.tsx` and `src/pages/design-system/previews/`. Add a preview wrapper when you want the component to render with demo data on the design system page.
- **Convention:** When you create a new theme, reuse components from this list (and from `src/libraries/flowbite/`). When you create a new component, register it in `designSystemRegistry.ts` (and optionally add a preview) so it becomes a reusable template for future sites.

### Theme CSS Guidelines

#### Critical Rules

**❌ DO NOT Import Tailwind CSS**

Tailwind CSS is already imported globally in `src/index.css`. Re-importing it in themes causes build errors in Tailwind v4, CSS conflicts, slower build times, and potential styling bugs.

**✅ DO Use CSS Variables for Theme Colors**

```css
.btn-primary {
  background-color: var(--brand-accent, #a37d4c);
}
```

**✅ DO Import Custom Fonts**

```css
@import url('https://fonts.googleapis.com/css2?family=Gilda+Display&display=swap');
```

**⚠️ CONSIDER Scoping Your Styles**

```css
.theme-name {
  --background: 0 0% 12%;
  --primary: 0 100% 44%;
}

.theme-name .h2 {
  font-size: 45px;
}
```

### Rules for New Development

1. **Use the canonical tokens** for color, radius, spacing, typography, and shadows. Do not introduce new one-off CSS variables for the same concepts.
2. **Use design system components** from `src/libraries/` (or the theme's designated system) before building custom UI.
3. **No hard-coded colors** for semantic roles (primary, background, card, border, etc.). Use `var(--primary)`, `var(--card)`, etc.
4. **Light and dark:** Every theme must define both `:root` and `.dark` for the full token set so dark mode is consistent.
5. **Charts and data viz:** Use `--chart-1` … `--chart-5` so charts stay on-brand and accessible across themes.
6. **New themes:** Start from the Master theme; in `theme.css`, replace the example token values with the new theme's palette while keeping the same token names.

---

## Vercel Deployment

### Configuration: `vercel.json`

| Key | Value | Purpose |
|-----|--------|---------|
| `buildCommand` | `npm run build` | Runs Vite build; output goes to `dist/`. |
| `installCommand` | `npm install` | Default install; use if you need custom install flags. |
| `outputDirectory` | `dist` | Vite writes static assets here; Vercel serves this as the static app. |
| `functions` | `api/**` with `includeFiles` | Serverless functions in `api/` get theme `pages.json` files so sitemap can read page lists. |
| `rewrites` | See below | SPA fallback and API routes for `robots.txt` / `sitemap.xml`. |

#### Rewrites

- `/robots.txt` → `/api/robots` (dynamic robots.txt; references `SITE_URL` and sitemap URL).
- `/sitemap.xml` → `/api/sitemap` (dynamic sitemap from theme `pages.json`; uses `DEPLOY_THEME_SLUG` and `SITE_URL`).
- `/theme/(.*)` → `/index.html` (theme preview routes; client-side routing).
- `/(.*)` → `/index.html` (catch-all SPA fallback).

### Build Rules

- **Node:** ≥ 20.19.0 (`package.json` `engines.node`).
- **Package manager:** npm ≥ 10.0.0 (`engines.npm`).
- **Build command:** `npm run build` (runs `vite build`).
- **Output:** Static files in `dist/`. No server-side rendering; React Router handles routing in the browser.
- **Theme filtering:** If `DEPLOY_THEME_SLUG` is set at build time, Vite copies only that theme's assets to `dist/theme/<slug>/` and injects `import.meta.env.DEPLOY_THEME_SLUG` so the app serves that theme at root.

### Environment Variables

#### Build-time (Vercel project / build env)

| Variable | Required | Description |
|----------|----------|-------------|
| `DEPLOY_THEME_SLUG` | Optional | Theme slug (e.g. `landingpage`, `gosgconsulting`) for single-theme deploy. When set, root `/` serves that theme and only that theme's assets are copied to `dist/`. Injected into the client bundle via Vite `define`. |
| `VITE_API_BASE_URL` | Recommended | CMS API base URL (e.g. `https://cms.sparti.ai`). Default in code: `https://cms.sparti.ai`. Set in Vercel for the correct backend. |
| `SITE_URL` | For SEO | Canonical site URL (no trailing slash). Used by `api/robots.ts` and `api/sitemap.ts`. Set for production so sitemap and robots point to the correct domain. |

#### Runtime (API routes only)

`api/robots.ts` and `api/sitemap.ts` run on Vercel serverless and read:

- `SITE_URL` — used for `<loc>` and sitemap reference in robots.txt.
- `DEPLOY_THEME_SLUG` — used by sitemap to resolve `src/themes/<slug>/pages.json` (via `vercel.json` `includeFiles`).

### Single-theme vs Multi-tenant

- **Single-theme (typical production):** Set `DEPLOY_THEME_SLUG` (and `SITE_URL`, `VITE_API_BASE_URL`) in Vercel. Root `/` and all paths are handled by that theme; only that theme's assets are in `dist/theme/<slug>/`.
- **Multi-tenant / dev-style:** Omit `DEPLOY_THEME_SLUG`. Build includes all themes; users reach a theme via `/theme/<slug>/...`. Use for staging or a single deploy that serves multiple themes.

### Local Build Parity

To mimic Vercel build locally:

```bash
export DEPLOY_THEME_SLUG=landingpage   # or your theme
export SITE_URL=https://your-site.vercel.app
export VITE_API_BASE_URL=https://cms.sparti.ai
npm run build
```

For theme-only static build (e.g. export to another host): `npm run build:theme` (see `scripts/build-theme-static.js`; respects `DEPLOY_THEME_SLUG` and can use `VERCEL_URL` for `VITE_API_BASE_URL` when run on Vercel).

---

## SEO Architecture

### How Page Titles Work

Page titles and meta descriptions are set from **multiple sources** in this priority order:

1. **CMS Branding API** (highest priority) — `useThemeBranding()` fetches `site_name`, `site_tagline`, `site_description` from the CMS database. Themes construct page titles like `${siteName} - ${siteTagline}`.
2. **Component-level fallbacks** — Hardcoded default values in theme components (e.g., `tenantName = 'GO SG Consulting'`).
3. **pages.json** — Static page metadata for sitemap generation and fallback SEO. **Not directly used for runtime page titles** in most themes.
4. **useSEO hook fallbacks** — Global fallback for router-level pages when CMS API fails.

### Why Page Titles May Show Old Branding

If you see "GO SG Consulting" or other client-specific branding in page titles:

1. **CMS database** contains that branding → Update via CMS admin panel or database migration
2. **Component hardcoded fallbacks** → Update theme component default props
3. **Theme-specific SEO components** (e.g., `SEOHead`) → Update meta object construction

### Updating Page Titles for a Theme

To change page titles for a deployed theme:

1. **Update CMS branding** — Set `site_name`, `site_tagline`, `site_description` in CMS for the tenant
2. **Update component fallbacks** — Change hardcoded `tenantName` props in theme components to generic values
3. **Update pages.json** — Update `meta_title` and `meta_description` for sitemap and fallback SEO
4. **Verify** — Check browser tab title, view source for meta tags, test with CMS API offline

### pages.json Role

`pages.json` files serve these purposes:

- **Sitemap generation** — `api/sitemap.ts` reads pages.json to build sitemap.xml
- **Page registry** — Lists all pages for the theme with slugs and status
- **Fallback SEO** — Provides static SEO metadata when CMS API is unavailable
- **Documentation** — Documents available pages and their intended SEO

They do **not** directly control runtime page titles in themes that use `useThemeBranding()` and custom SEO components.

---

## Getting Started

### Prerequisites

- Node.js ≥ 20.19.0, npm ≥ 10.0.0

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:8080](http://localhost:8080). In dev, `/` shows the theme picker; use `/theme/<slug>/` to preview a theme.

### Build

```bash
npm run build
```

Output: `dist/`. For theme-only static build: `npm run build:theme`.

### Deploy (Vercel)

Deploy with Framework Preset: **Vite**, Build: `npm run build`, Output: `dist`. Set **`DEPLOY_THEME_SLUG`** (e.g. `landingpage`, `gosgconsulting`) to serve a single theme at root; set **`SITE_URL`** and **`VITE_API_BASE_URL`** for SEO and CMS.

---

## Onboarding Checklist: New Theme → Available + Deployable

- [ ] Duplicated `src/themes/master/` to `src/themes/<slug>/`.
- [ ] Updated `theme.json` (name, description, demo_url).
- [ ] Updated `pages.json` (meta, SEO, sections as needed).
- [ ] Created `docs/README.md` and `docs/TODO.md` for the theme.
- [ ] (Optional) Added display name in `src/themes/themeRegistry.ts`.
- [ ] (Recommended) Applied design tokens in `theme.css`.
- [ ] `npm run build` passes.
- [ ] Preview in dev: `/theme/<slug>/` and key pages.
- [ ] For Vercel: new project, set `DEPLOY_THEME_SLUG`, `VITE_API_BASE_URL`, `SITE_URL`; deploy.

---

## Per-Theme Documentation

Each theme maintains its own documentation in `src/themes/<slug>/docs/`:

- **README.md** — Theme-specific design system, brand/design summary, which `theme.css` tokens are customized, typography/spacing conventions, key routes/pages, how it uses shared vs theme-local components, link to this README for CMS/Vercel/design-system baseline.
- **TODO.md** — Theme-specific follow-ups (token alignment, previews, tech debt).

See individual theme docs folders for details.
