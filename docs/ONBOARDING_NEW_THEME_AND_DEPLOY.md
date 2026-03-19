# Onboarding & New Theme / Project Guide

**Single reference** for onboarding and for creating a new theme or project so it is **immediately available** in the app and **deployable on Vercel**. Use this with the **project-doc-planner** workflow (read main docs → inspect code → plan → implement → update docs → verify): read main docs, inspect existing code, then follow this checklist.

---

## 1. Quick start (first time on the repo)

| Step | Action |
|------|--------|
| 1 | Clone repo, ensure **Node.js ≥ 20.19.0** and **npm ≥ 10.0.0**. |
| 2 | `npm install` then `npm run dev`. |
| 3 | Open [http://localhost:8080](http://localhost:8080). Root `/` shows the theme picker; use `/theme/<slug>/` to preview a theme. |
| 4 | Read [README.md](../README.md) (architecture, routes, hooks, conventions) and [docs/README.md](README.md) (doc index). |

**Source of truth:** [README.md](../README.md), [TODO.md](../TODO.md).

---

## 2. Creating a new theme (so it’s immediately available)

Themes are **auto-discovered**: any folder under `src/themes/<slug>/` with a top-level `index.tsx` is registered. No manual router or registry edits.

### 2.1 Start from the master theme (recommended)

1. **Duplicate** `src/themes/master/` → `src/themes/<your-slug>/`.
2. **Slug rules:** Use a **kebab-case** slug (e.g. `my-company`, `landing-v2`). This becomes the theme ID and URL segment (`/theme/<slug>/`).

### 2.2 Mandatory files (every theme)

| File | Purpose |
|------|--------|
| `index.tsx` | Theme entry: default export of the main React component. Receives `tenantSlug`, `themeSlug`, `pageSlug`, etc. |
| `theme.json` | Theme metadata: `name`, `description`, `version`, `tags`, `designSystem`, `demo_url`, etc. |
| `pages.json` | Page definitions: list of pages with `slug`, `meta_title`, `meta_description`, `seo_index`, `status`, `sections` (for homepage). |

### 2.3 Right after duplicating master, update

1. **`theme.json`**  
   Set `name`, `description`, `tags`, `demo_url` (e.g. `/theme/<your-slug>`), `documentation_url` if needed.

2. **`pages.json`**  
   Adjust `meta_title`, `meta_description`, `keywords` per page; keep or edit `sections` for the homepage.

3. **Display name (optional)**  
   In `src/themes/themeRegistry.ts`, add your slug to `THEME_DISPLAY_NAMES` so the dev theme picker shows a friendly name.

4. **Design system (recommended)**  
   Follow [docs/DESIGN_SYSTEM_GUIDELINE.md](DESIGN_SYSTEM_GUIDELINE.md): use canonical tokens (`--background`, `--foreground`, `--primary`, etc.) in `theme.css` and shared components so the theme stays consistent and maintainable.

### 2.4 What you get for free

- **Discovery:** Theme appears in the registry and on the dev theme picker.
- **Routing:** `/theme/<your-slug>/` and short URLs work if the first segment matches your slug (when not using single-theme deploy).
- **CMS:** Same hooks as master: `useThemeSettings`, `useThemeBranding`, `usePageLayout`, etc. Data flow: UI → hooks → `api` → CMS API.

### 2.5 Theme structure (reference)

```
src/themes/<your-slug>/
├── index.tsx          # Required
├── theme.json         # Required
├── pages.json         # Required
├── theme.css          # Recommended (use design tokens)
├── components/        # Layout, modals, UI
├── pages/             # Route-level pages
└── assets/            # Static assets → /theme/<slug>/assets/*
```

See [src/themes/README.md](../src/themes/README.md) and [src/themes/master/README.md](../src/themes/master/README.md).

---

## 3. Systems to be aware of (no extra “creation” needed)

| System | Where | What you do |
|--------|--------|-------------|
| **Theme registry** | `src/themes/themeRegistry.ts` | Nothing. Add a folder with `index.tsx` under `src/themes/<slug>/`. |
| **Router / TenantLandingPage** | `src/router.tsx`, app components | Nothing. All tenant routes go through TenantLandingPage; theme from path or `DEPLOY_THEME_SLUG`. |
| **CMS API** | `src/utils/api.ts`, hooks | Use `useThemeSettings`, `useThemeBranding`, `usePageLayout`; base URL from `VITE_API_BASE_URL`. |
| **Design system** | `docs/DESIGN_SYSTEM_GUIDELINE.md`, `src/themes/tokens.css` | Use tokens and shared patterns in your theme; optional: register components in `src/config/designSystemRegistry.ts` for `/design-system`. |
| **Vercel build** | `vercel.json`, `api/` | Already configured. Set env vars for your project (see below). |

You do **not** create a new “project” in code: a new theme *is* the new project. One codebase; deploy one theme per Vercel project (or multi-tenant with one deploy).

---

## 4. Deploy on Vercel (immediately deployable)

The repo is already set up for Vercel. For a **single-theme** production deploy:

### 4.1 Vercel project settings

- **Framework preset:** Vite  
- **Build command:** `npm run build`  
- **Output directory:** `dist`  
- **Node:** ≥ 20.19.0 (see `package.json` `engines`)

### 4.2 Environment variables (build-time)

| Variable | Required | Description |
|----------|----------|-------------|
| `DEPLOY_THEME_SLUG` | Yes (single-theme) | Your theme slug (e.g. `my-company`). Root `/` serves this theme; only this theme’s assets are in the build. |
| `VITE_API_BASE_URL` | Recommended | CMS API base (e.g. `https://cms.sparti.ai`). |
| `SITE_URL` | For SEO | Canonical site URL without trailing slash (e.g. `https://my-site.vercel.app`). Used for sitemap and robots. |

Full reference: [docs/VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md).

### 4.3 After first deploy

- **SPA routing:** Already handled by `vercel.json` rewrites (all non-API routes → `/index.html`).
- **SEO:** `/robots.txt` and `/sitemap.xml` are served by API routes; they need `SITE_URL` and `DEPLOY_THEME_SLUG` (and your theme’s `pages.json` for sitemap).

### 4.4 Local build parity

```bash
export DEPLOY_THEME_SLUG=my-company
export SITE_URL=https://my-site.vercel.app
export VITE_API_BASE_URL=https://cms.sparti.ai
npm run build
```

---

## 5. Checklist: new theme → available + deployable

- [ ] Duplicated `src/themes/master/` to `src/themes/<slug>/`.
- [ ] Updated `theme.json` (name, description, demo_url).
- [ ] Updated `pages.json` (meta, SEO, sections as needed).
- [ ] (Optional) Added display name in `src/themes/themeRegistry.ts`.
- [ ] (Recommended) Applied design tokens in `theme.css` per [DESIGN_SYSTEM_GUIDELINE.md](DESIGN_SYSTEM_GUIDELINE.md).
- [ ] `npm run build` passes.
- [ ] Preview in dev: `/theme/<slug>/` and key pages.
- [ ] For Vercel: new project, set `DEPLOY_THEME_SLUG`, `VITE_API_BASE_URL`, `SITE_URL`; deploy.

---

## 6. Doc map

| Need | Doc |
|------|-----|
| Architecture, routes, hooks | [README.md](../README.md) |
| Theme structure, master copy | [src/themes/README.md](../src/themes/README.md), [src/themes/master/README.md](../src/themes/master/README.md) |
| Design tokens & components | [DESIGN_SYSTEM_GUIDELINE.md](DESIGN_SYSTEM_GUIDELINE.md) |
| Vercel config & env | [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) |
| Task list & verification | [TODO.md](../TODO.md), [docs/todo.md](todo.md) |
| Doc index | [docs/README.md](README.md) |

Using this doc plus the project-doc-planner workflow (read docs → inspect code → plan → implement → update docs → verify) keeps new themes and deploys consistent and deployable.
