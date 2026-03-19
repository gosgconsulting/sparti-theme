# TODO

## Current State

Sparti Theme is a production-ready multi-tenant theme runtime for Sparti CMS. Themes are auto-discovered from `src/themes/`, rendered via React Router and TenantLandingPage, with optional single-theme deploys (Vercel + DEPLOY_THEME_SLUG). Master theme is the reference for new themes; multiple business themes (gosgconsulting, nail-queen, hotel, etc.) exist. Build and lint pass; test coverage is partial.

---

## In Progress

- [ ] _(none)_

---

## Next

- [ ] **Align remaining themes with design system token set** — Master, sissonne, landingpage updated. Other themes (str, gosgconsulting, nail-queen, etc.) can adopt canonical tokens in `theme.css` gradually; new themes must follow from day one.
- [x] **Execute refactor plan (Phases 4–5)** — Done: shared NotFound (gosgconsulting, sissonne, e-shop, moondk use it; nail-queen keeps custom); Sissonne UI documented as theme overrides; Astro and @astrojs/@astrolib deps removed. See `docs/REFACTOR_PLAN.md`.

---

## Blocked

- [ ] _(none)_
  - Blocker:
  - Needed to unblock:

---

## Done

- [x] **Design system guideline** — Added `docs/DESIGN_SYSTEM_GUIDELINE.md`: canonical CSS variable token set (light/dark), value format (hex/HSL), where tokens live, design system component reuse, typography/spacing/shadows, and rules for new development. Linked from `docs/README.md`.
  - Files: `docs/DESIGN_SYSTEM_GUIDELINE.md`, `docs/README.md`, `docs/todo.md`.
- [x] **Refactor code structure to design system** — (1) Added `src/themes/tokens.css` with full canonical token set (HSL). (2) `index.css` imports `tokens.css` and only adds legacy/brand vars and component styles. (3) Tailwind: sidebar uses `--sidebar`, added `chart` 1–5. (4) `applyThemeStyles` extended for popover, sidebar, radius, spacing, letterSpacing. (5) Master theme `theme.css` overrides canonical tokens from brand palette. (6) Sissonne and landingpage set `--sidebar: var(--sidebar-background)`. (7) Guideline §3 and README updated.
  - Files: `src/themes/tokens.css`, `src/index.css`, `tailwind.config.ts`, `src/utils/applyThemeStyles.ts`, `src/themes/master/theme.css`, `src/themes/sissonne/theme.css`, `src/themes/landingpage/theme.css`, `docs/DESIGN_SYSTEM_GUIDELINE.md`, `README.md`, `docs/todo.md`.

---

## Duplicate Risks

### Routes

- Potential duplicates:
  - Root `/:pageSlug` vs `/theme/:tenantSlug/*` — same TenantLandingPage; logic lives in TenantLandingPage (slug resolution). Acceptable.
  - Theme-specific routes (e.g. STR `/booking`, `/packages`) vs generic pageSlug — handled by path parsing in TenantLandingPage.

### Logic

- Duplicate logic found in:
  - `useThemeBasePath` in multiple themes (moondk, e-shop) — consider moving to `src/hooks/`.
  - `useCustomCode` in str and nail-queen — could be shared in `src/hooks/` or a shared theme util.

### Components

- Similar components:
  - Theme-level layout/header/footer patterns repeat; master theme and STYLE_RULES.md establish conventions.

### Design tokens

- `src/themes/tokens.css` is the shared canonical default; Tailwind uses `--sidebar` (not `--sidebar-background`). Themes that still use `--sidebar-background` should set `--sidebar: var(--sidebar-background)`. Remaining themes can adopt the full canonical set in `theme.css` over time.

---

## Refactor Opportunities

- **Shared theme hooks:** Move `useThemeBasePath`, `useCustomCode` (and similar) to `src/hooks/` or `src/themes/shared/` to avoid per-theme duplication.
- **Theme asset helper:** Centralize `asset(path)` / `getThemeAssetUrl` usage so themes don’t reimplement the same wrapper.
- **Package name:** Rename `package.json` name from `vite_react_shadcn_ts` to `sparti-theme` for clarity.
- **Docs index:** Add `docs/README.md` that links to root README, theme README, master README, this todo, and `docs/REFACTOR_PLAN.md`.

---

## Verification Notes

### Build / Typecheck

- Status: pass (run `npm run build` to confirm)
- Notes: TypeScript via Vite build.

### Lint

- Status: pass (run `npm run lint` to confirm)
- Notes: ESLint.

### Tests

- Status: partial / not fully run
- Notes: `test:unit` (Vitest), `test:contact`, `test:form` exist; no E2E in repo. Manual theme preview via dev server.

### Manual Checks

- Checked:
  - Dev: `/` shows dashboard; `/theme/<slug>/` loads theme.
  - Deploy: Set DEPLOY_THEME_SLUG and build; root serves that theme.
- Issues found: _(none recorded)_
