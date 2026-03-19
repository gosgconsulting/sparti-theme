# Sparti Theme — Tech Stack Audit & Refactor Plan

**Date:** 2025-03-19  
**Status:** Phase 1 & 2 executed; Phases 3–5 pending  
**Related:** `README.md`, `docs/todo.md`, `TODO.md`

---

## 1. Tech Stack Summary

| Layer | Technology | Notes |
|-------|-------------|--------|
| **Runtime** | React 18, React Router 6 | SPA; no Next.js in this repo |
| **Build** | Vite 5, TypeScript 5.2 | SWC via `@vitejs/plugin-react-swc` |
| **Styling** | Tailwind 4, Tailwind Animate, design tokens | `src/themes/tokens.css`, `index.css` |
| **UI primitives** | Radix UI, Ark UI, Flowbite, Flowbite React | Shared `src/components/ui/` (shadcn-style) |
| **State** | React Query (TanStack), React Context | AuthProvider, ThemeBasePathContext, CMSSettingsContext |
| **Forms** | React Hook Form, Zod, @hookform/resolvers | Contact forms, checkout |
| **Backend** | None in-repo | `VITE_API_BASE_URL` → Sparti CMS API |
| **Deploy** | Vercel | `vercel.json` rewrites; optional `DEPLOY_THEME_SLUG` |
| **Optional / legacy** | Astro, Stripe, GSAP, TipTap, Recharts, etc. | In `package.json`; Astro not imported in `src/` — confirm if used elsewhere or removable |

**Entry points:** `src/main.tsx` → `App.tsx` → `RouterProvider` (router from `router.tsx`). All tenant routes go through `TenantLandingPage`; themes are lazy-loaded via `themeRegistry.ts` (`import.meta.glob('./**/index.tsx')`).

---

## 2. System Audit (High Level)

- **Routes:** `/` (PublicDashboard or TenantLandingPage), `/theme/:tenantSlug/*`, `/:pageSlug`, `/:pageSlug/*`, `*` (NotFound). Single landing component; no duplicate route definitions.
- **Themes:** 15+ theme slugs (master, gosgconsulting, sissonne, str, nail-queen, hotel, hotel1, hotel2, e-shop, moondk, landingpage, optimalconsulting, sparti-seo-landing, storefront, custom). Each has `src/themes/<slug>/index.tsx`; theme registry discovers only top-level `index.tsx`.
- **Shared vs theme-specific:** API, auth, theme base path, and design system live in `src/`. Themes duplicate a lot of helpers and UI (see below).
- **Registries:** Two different concepts:
  - **`src/registry/`** — Schema/component definitions (JSON + sync stub); used by `component-detector`, `componentSchemaAnalyzer`, and CMS tooling. Not used by theme runtime.
  - **`themes/gosgconsulting/components/registry.ts`** — Runtime map of component type → React component for DynamicPageRenderer. Theme-specific; not a duplicate of `src/registry`.

---

## 3. Unused Files (Candidates for Removal or Integration)

| File | Evidence | Recommendation |
|------|----------|----------------|
| **`src/pages/TenantPage.tsx`** | Never imported. Router uses `TenantLandingPage` only. | **Remove** after confirming no external references (e.g. docs, scripts). |
| **`src/utils/debugLogger.js`** | No imports found in codebase. | Remove or wire into a single debug module and use where needed. |
| **Astro and Astro-related deps** | No `import 'astro'` or `@astrojs/*` in `src/`. | Confirm if an Astro app/site exists outside `src/`; if not, consider dropping Astro deps to reduce bundle/ship surface. |

**Note:** `src/registry/sync.ts` is used by `src/registry/index.ts` (demo sync); keep unless registry is simplified.

---

## 4. Duplicate Files & Patterns

### 4.1 Schema helpers (high duplication)

Multiple themes ship their own `utils/schemaHelpers.ts` with overlapping types and helpers (`SchemaItem`, `getTextByKey`, `getHeading`, `getImage`, `getArrayItems`, `getButton`, etc.):

| Location | Used by |
|----------|---------|
| `themes/gosgconsulting/utils/schemaHelpers.ts` | gosgconsulting components (Content, HeroSection, PageTitle, etc.) |
| `themes/landingpage/utils/schemaHelpers.ts` | landingpage (HeroSection, FAQSection, CTASection, TestimonialsSection, etc.) |
| `themes/str/utils/schemaHelpers.ts` | str (index, group-class, personal-training, physiotherapy, HeroSection) |

**Refactor:** Introduce a shared `src/utils/schemaHelpers.ts` (or `src/themes/shared/schemaHelpers.ts`) with a single `SchemaItem` type and common helpers; have themes import from there. Migrate one theme at a time and fix type/API differences.

### 4.2 Theme-level `settings.ts` (four copies)

| Location |
|----------|
| `themes/gosgconsulting/utils/settings.ts` |
| `themes/landingpage/utils/settings.ts` |
| `themes/nail-queen/utils/settings.ts` |
| `themes/str/utils/settings.ts` |

Often provide `getSiteName`, `getLogoSrc`, `getFaviconSrc`, `applyFavicon`, etc., backed by CMS/settings. **Refactor:** Shared base in `src/utils/` or `src/themes/shared/` with theme-specific overrides only where necessary.

### 4.3 `useCustomCode` hook (two implementations)

- `themes/nail-queen/hooks/useCustomCode.ts`
- `themes/str/hooks/useCustomCode.ts`

Same purpose (inject custom script/style by tenant). **Refactor:** Single implementation in `src/hooks/useCustomCode.ts`, used by both themes (and any future theme that needs it).

### 4.4 `useThemeBasePath` / ThemeBasePath (duplicate pattern)

- **Shared:** `src/context/ThemeBasePathContext.tsx` — used by master, gosgconsulting, storefront, hotel1, etc.
- **Theme-local:**  
  - `themes/e-shop/components/ThemeLink.tsx` — defines its own `ThemeBasePathContext` and `useThemeBasePath`.  
  - `themes/moondk/components/ThemeLink.tsx` — same pattern.

TenantLandingPage already provides `ThemeBasePathContext`. **Refactor:** e-shop and moondk should use `ThemeBasePathContext` from `@/context/ThemeBasePathContext` and a shared `useThemeBasePath` in `src/hooks/` (or consume context directly). Remove duplicate context/hook from those two themes.

### 4.5 ThankYouPage / ContactModal / PrivacyPolicy / NotFound (per-theme copies)

Many themes implement their own:

- **ThankYouPage:** master, sissonne, gosgconsulting, nail-queen, landingpage, hotel, str (thank-you.tsx), optimalconsulting (uses master’s).
- **ContactModal:** gosgconsulting, sissonne, str, master (modals/ContactFormModal), hotel (modals/ContactFormModal), etc.
- **PrivacyPolicy:** master, hotel, nail-queen, e-shop, moondk.
- **NotFound:** Root `src/pages/NotFound.tsx` plus gosgconsulting, sissonne, nail-queen, e-shop, moondk theme-level versions.

**Refactor:** Prefer a shared “generic” ThankYouPage/ContactModal/PrivacyPolicy/NotFound in `src/components/` or `src/pages/`, and/or a single implementation in the master theme that others import (like optimalconsulting does for ThankYouPage/PrivacyPolicy). Then gradually replace theme copies with the shared or master version where behavior matches.

### 4.6 Sissonne theme UI folder (~44 components under `themes/sissonne/components/ui/`)

Sissonne ships a full set of UI components (button, card, dialog, etc.). Many of them re-import from `@/components/ui/` (e.g. button, toast, label, dialog). So the theme holds local overrides that depend on shared UI.

**Refactor:** Audit each file under `themes/sissonne/components/ui/`: if it only re-exports or wraps `@/components/ui/*`, consider removing the local file and importing from `@/components/ui` in the theme. If it adds theme-specific styling/behavior, keep but document; optionally move truly shared variants to `src/components/ui/`.

### 4.7 Theme-level `lib/utils.ts`

- `src/lib/utils.ts`
- `themes/sissonne/lib/utils.ts`
- `themes/gosgconsulting/lib/utils.ts`

**Refactor:** Clarify which are `cn()`/classname helpers vs theme-specific helpers. If they only differ by theme, consider one shared `cn` in `src/lib/utils.ts` and theme-specific helpers in theme folders with distinct names.

---

## 5. Refactor Plan (Phased)

### Phase 1 — Low risk, clear wins ✅ DONE

1. **Remove unused `TenantPage.tsx`** — Deleted `src/pages/TenantPage.tsx`.
2. **Remove or adopt `debugLogger.js`** — Deleted `src/utils/debugLogger.js` (unused).
3. **Rename package** — `package.json` name set to `sparti-theme`.
4. **Add root `TODO.md`** — Created; links to `docs/todo.md` and `docs/REFACTOR_PLAN.md`.

### Phase 2 — Shared hooks and context ✅ DONE

5. **Shared theme base path** — TenantLandingPage now provides resolved `resolvedBasePath` (string). Added `src/hooks/useThemeBasePath.ts` and `src/components/ThemeLink.tsx` (ThemeLink, ThemeNavLink, themeHref). e-shop and moondk use shared ThemeLink/useThemeBasePath; local ThemeLink.tsx and ThemeBasePathProvider removed.
6. **Shared `useCustomCode`** — Added `src/hooks/useCustomCode.ts`. nail-queen and str import from `@/hooks/useCustomCode`; theme-level `hooks/useCustomCode.ts` removed from both.

### Phase 3 — Shared schema and settings

7. **Shared `schemaHelpers`**  
   Add `src/utils/schemaHelpers.ts` (or `src/themes/shared/schemaHelpers.ts`) with unified types and helpers. Migrate gosgconsulting, landingpage, and str one by one, fixing API differences.

8. **Shared theme settings helper**  
   Extract common “site name, logo, favicon” logic to `src/utils/` or shared theme util; keep theme-specific overrides in theme folders.

### Phase 4 — Shared pages and components

9. **Consolidate ThankYouPage / ContactModal / PrivacyPolicy / NotFound**  
   Prefer shared or master-theme implementations; replace theme-level copies where behavior is equivalent.

10. **Sissonne UI audit**  
    List sissonne `components/ui` files that are pure wrappers of `@/components/ui`; remove or replace with shared imports.

### Phase 5 — Dependencies and docs

11. **Astro and unused deps**  
    Confirm whether Astro (and related packages) are used anywhere; if not, remove and document.

12. **Docs index**  
    Ensure one place (e.g. `docs/README.md`) links root README, theme README, master README, design system guideline, `docs/todo.md`, and this refactor plan.

---

## 6. Reuse Targets (Do Not Duplicate)

- **API:** `src/utils/api.ts` — single place for `getApiUrl`, `api.get/post`, auth headers.
- **Theme base path:** `src/context/ThemeBasePathContext.tsx` — provided by TenantLandingPage; themes should consume it (or a thin hook in `src/hooks/`).
- **Theme assets:** `src/utils/themeAssets.ts` — `getThemeAssetUrl`; themes should use it instead of reimplementing.
- **Tenant config:** `src/utils/tenantConfig.ts` — `getTenantId`, `getTenantIdWithFallback`.
- **Design tokens:** `src/themes/tokens.css` and `docs/DESIGN_SYSTEM_GUIDELINE.md` — canonical tokens; new themes should follow.
- **Registry (schema):** `src/registry/` — for CMS/schema tooling; theme runtime uses theme-specific registries (e.g. gosgconsulting’s) where needed.

---

## 7. Verification After Refactors

- Run `npm run build` and fix any type errors.
- Run `npm run lint`.
- Run `test:unit` (and any theme-related tests); add minimal tests for new shared hooks if needed.
- Manually: dev server, theme picker, and at least one theme per “family” (e.g. gosgconsulting, str, sissonne, master) to confirm routing and base path.
- Update `docs/todo.md` and root `TODO.md` with completed items and any new duplicate risks.

---

## 8. Summary Table

| Category | Finding | Action |
|----------|--------|--------|
| Unused | `TenantPage.tsx` | Remove |
| Unused | `debugLogger.js` | Remove or wire once |
| Unused | Astro in package.json | Confirm usage; remove if unused |
| Duplicate | schemaHelpers (3 themes) | Shared `src/utils` or `themes/shared` |
| Duplicate | settings.ts (4 themes) | Shared util + theme overrides |
| Duplicate | useCustomCode (2 themes) | Single hook in `src/hooks` |
| Duplicate | useThemeBasePath/ThemeLink (e-shop, moondk) | Use shared context + optional hook |
| Duplicate | ThankYouPage, ContactModal, PrivacyPolicy, NotFound | Prefer shared or master; migrate themes |
| Duplicate | Sissonne UI (44 files) | Audit; remove pure wrappers |
| Duplicate | lib/utils (3 places) | Clarify; centralize `cn`, keep theme-specific separate |
| Naming | package.json name | Rename to `sparti-theme` |
| Docs | TODO location | Root `TODO.md` + link to docs |
