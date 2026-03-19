# Vercel deployment and build rules

Canonical reference for deploying Sparti Theme on Vercel: configuration, environment variables, and build behavior.

---

## Configuration: `vercel.json`

| Key | Value | Purpose |
|-----|--------|---------|
| `buildCommand` | `npm run build` | Runs Vite build; output goes to `dist/`. |
| `installCommand` | `npm install` | Default install; use if you need custom install flags. |
| `outputDirectory` | `dist` | Vite writes static assets here; Vercel serves this as the static app. |
| `functions` | `api/**` with `includeFiles` | Serverless functions in `api/` get theme `pages.json` files so sitemap can read page lists. |
| `rewrites` | See below | SPA fallback and API routes for `robots.txt` / `sitemap.xml`. |

### Rewrites

- `/robots.txt` → `/api/robots` (dynamic robots.txt; references `SITE_URL` and sitemap URL).
- `/sitemap.xml` → `/api/sitemap` (dynamic sitemap from theme `pages.json`; uses `DEPLOY_THEME_SLUG` and `SITE_URL`).
- `/theme/(.*)` → `/index.html` (theme preview routes; client-side routing).
- `/(.*)` → `/index.html` (catch-all SPA fallback).

Order matters: more specific routes first, then catch-all.

---

## Build rules

- **Node:** ≥ 20.19.0 (`package.json` `engines.node`).
- **Package manager:** npm ≥ 10.0.0 (`engines.npm`).
- **Build command:** `npm run build` (runs `vite build`).
- **Output:** Static files in `dist/`. No server-side rendering; React Router handles routing in the browser.
- **Theme filtering:** If `DEPLOY_THEME_SLUG` is set at build time, Vite copies only that theme’s assets to `dist/theme/<slug>/` and injects `import.meta.env.DEPLOY_THEME_SLUG` so the app serves that theme at root.

---

## Environment variables

### Build-time (Vercel project / build env)

| Variable | Required | Description |
|----------|----------|-------------|
| `DEPLOY_THEME_SLUG` | Optional | Theme slug (e.g. `landingpage`, `gosgconsulting`) for single-theme deploy. When set, root `/` serves that theme and only that theme’s assets are copied to `dist/`. Injected into the client bundle via Vite `define`. |
| `VITE_API_BASE_URL` | Recommended | CMS API base URL (e.g. `https://cms.sparti.ai`). Default in code: `https://cms.sparti.ai`. Set in Vercel for the correct backend. |
| `VITE_DEPLOY_THEME_SLUG` | Alternative | Same as `DEPLOY_THEME_SLUG`; Vite config uses either. Prefer `DEPLOY_THEME_SLUG` for consistency with API routes. |
| `SITE_URL` | For SEO | Canonical site URL (no trailing slash). Used by `api/robots.ts` and `api/sitemap.ts`. Set for production so sitemap and robots point to the correct domain. |
| `CMS_TENANT` / `VITE_DEPLOY_TENANT_ID` | Optional | Tenant ID for theme dev or single-tenant builds; used by theme dev plugin and some themes. |
| `VITE_SKIP_THEMES` / `VERCEL_CMS_ONLY` | Optional | Set to `1` to use theme stubs (CMS-only builds without full theme source). |

**Note:** Vite only exposes env vars that are either prefixed with `VITE_` or explicitly replaced via `define` in `vite.config.ts`. `DEPLOY_THEME_SLUG` is injected via `define`, not from `import.meta.env` by default.

### Runtime (API routes only)

`api/robots.ts` and `api/sitemap.ts` run on Vercel serverless and read:

- `SITE_URL` — used for `<loc>` and sitemap reference in robots.txt.
- `DEPLOY_THEME_SLUG` — used by sitemap to resolve `src/themes/<slug>/pages.json` (via `vercel.json` `includeFiles`).

---

## What gets deployed

- **Included:** `dist/` (Vite output), `api/*.ts` (serverless functions), and per `vercel.json` `functions.includeFiles`: `src/themes/**/pages.json` so sitemap can read page lists.
- **Excluded (`.vercelignore`):** `docs/`, `server/tests/`, `**/*.test.js`, `**/*.spec.js`, `**/*.test.ts`, `**/*.spec.ts`, `public/uploads/`. This keeps build context smaller and avoids shipping tests or docs.

---

## Single-theme vs multi-tenant

- **Single-theme (typical production):** Set `DEPLOY_THEME_SLUG` (and `SITE_URL`, `VITE_API_BASE_URL`) in Vercel. Root `/` and all paths are handled by that theme; only that theme’s assets are in `dist/theme/<slug>/`.
- **Multi-tenant / dev-style:** Omit `DEPLOY_THEME_SLUG`. Build includes all themes; users reach a theme via `/theme/<slug>/...`. Use for staging or a single deploy that serves multiple themes.

---

## API routes

- **`api/robots.ts`:** Returns `robots.txt` with `SITE_URL` and `Sitemap: ${SITE_URL}/sitemap.xml`. Cache headers: `s-maxage=86400, stale-while-revalidate`.
- **`api/sitemap.ts`:** Reads `DEPLOY_THEME_SLUG` and `src/themes/<slug>/pages.json` (included by `vercel.json`), filters indexable pages, returns XML sitemap. Requires `DEPLOY_THEME_SLUG` and existing `pages.json`; otherwise returns 404.

---

## Local build parity

To mimic Vercel build locally:

```bash
export DEPLOY_THEME_SLUG=landingpage   # or your theme
export SITE_URL=https://your-site.vercel.app
export VITE_API_BASE_URL=https://cms.sparti.ai
npm run build
```

For theme-only static build (e.g. export to another host): `npm run build:theme` (see `scripts/build-theme-static.js`; respects `DEPLOY_THEME_SLUG` and can use `VERCEL_URL` for `VITE_API_BASE_URL` when run on Vercel).

---

## Summary

| Concern | Rule |
|--------|------|
| Framework | Vite (no Next.js); preset “Vite” on Vercel. |
| Build | `npm run build` → `dist/`. |
| Env for single-theme | Set `DEPLOY_THEME_SLUG`, `SITE_URL`, and `VITE_API_BASE_URL`. |
| SPA routing | All non-API routes rewrite to `/index.html` via `vercel.json`. |
| SEO | `/robots.txt` and `/sitemap.xml` served by `api/`; need `SITE_URL` and `DEPLOY_THEME_SLUG` for sitemap. |
| Ignore | `.vercelignore` excludes docs, tests, and `public/uploads/`. |
