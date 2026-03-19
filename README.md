# Sparti Theme

## Overview

Frontend theme system for **Sparti CMS**: a React-based multi-tenant theme runtime that builds and deploys tenant websites. Themes are discovered from `src/themes/<slug>/`, rendered by route/`pageSlug`, and can be deployed per theme (e.g. Vercel) or run in dev with a theme picker.

- **Core purpose:** Provide a theme layer that consumes CMS data (pages, branding, settings, media) and renders tenant sites; support many themes and single-theme static deploys.
- **Target users:** Developers adding or customizing themes; tenants whose sites are powered by Sparti CMS.
- **Key outcomes:** One codebase for all themes; per-theme static builds; CMS-driven content and branding; consistent structure (theme.json, pages.json, assets).

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

- **useSEO** → Page meta, Open Graph, etc. (skipped when `DEPLOY_THEME_SLUG` set).
- **useThemeSettings** → Fetches theme settings from CMS for a theme (and optional tenant).
- **useThemeBranding** → Fetches branding (logo, colors, etc.) and applies CSS variables.
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
- **tokens.css** (`src/themes/tokens.css`) → Canonical design token defaults (`:root` / `.dark`); imported by `index.css`. See `docs/DESIGN_SYSTEM_GUIDELINE.md`.
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
- **Root README vs theme docs:** Deeper theme system docs live in `src/themes/README.md` and `src/themes/master/README.md`; root README is high-level; consider a single `docs/` index.
- **Tests:** `test:unit` runs Vitest (includes `src/**/*.test.ts` and `server/tests/**`); shared utils (`schemaHelpers`, `themeSettings`) have unit tests (39 total). No in-repo E2E; manual theme preview and deploy verification documented in `docs/todo.md`.

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

Output: `dist/`. For theme-only static build: `npm run build:theme`. Deploy to Vercel with Framework Preset: Vite, Build: `npm run build`, Output: `dist`. Set `DEPLOY_THEME_SLUG` to serve a single theme at root.

### Docs

- **Design system (cross-theme):** `docs/DESIGN_SYSTEM_GUIDELINE.md` — tokens, components, styling rules for all themes.
- **Design system page:** `/design-system` (dev and deploy) — live catalog of Header, Footer, Hero, Sections from every theme and Flowbite; register new components in `src/config/designSystemRegistry.ts` and add previews in `src/pages/design-system/` so new themes can reuse them as templates.
- Theme system and structure: `src/themes/README.md`
- Master theme (duplicate this for new themes): `src/themes/master/README.md`
- Project TODO and verification: `docs/todo.md`
