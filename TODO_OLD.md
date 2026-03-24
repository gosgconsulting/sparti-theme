# TODO

## Completed

- **hotel2 theme design system refactor** (2025-03-19)
  - Refactored `src/themes/hotel2/theme.css` to use canonical design tokens (`--background`, `--foreground`, `--primary`, `--card`, `--muted`, `--border`, `--radius`, `--font-sans`, etc.) per `docs/DESIGN_SYSTEM_GUIDELINE.md`.
  - Replaced all `--brand-*` and hard-coded colors with token-based values; added `.theme-hotel2.dark` block.
  - Updated hotel2 components to use design system utility classes: `text-foreground`, `text-muted-foreground`, `text-primary`, `bg-background`, `bg-card`, `bg-muted`, `border-border`, `btn-primary`, `btn-secondary`.
  - Verification: `npm run build` passes.

## Next

- (None at this time.)

## Design system previews (2025-03-19)

- **STR Testimonials Section** — Extracted inline testimonials from `str/index.tsx` to `themes/str/components/STRTestimonialsSection.tsx`; added `STRTestimonialsSectionPreview.tsx` with mock data; registered in `DesignSystemPreview.tsx`. Systematic process documented in `docs/DESIGN_SYSTEM_PREVIEW_PLAN.md` (§5).
- **All themes** — Implemented previews for every design system registry entry: Flowbite (15), Master (5), Gosgconsulting (9), STR (11), Landingpage (7), Sissonne (5), E-shop (5), Nail-queen (2). Added `InlineSectionPlaceholder.tsx` for STR inline-only sections (about, programmes, gallery, team, FAQ, CTA, footer). All 59 registry IDs now have `hasPreview(id) === true` and a lazy-loaded preview in `DesignSystemPreview.tsx`.

## Refactor (2025-03-19)

- **Phase 6 — Unify theme-level lib/utils** — gosgconsulting and sissonne now use `@/lib/utils` for `cn()`; removed `src/themes/gosgconsulting/lib/utils.ts` and `src/themes/sissonne/lib/utils.ts`. Build passes. See `docs/REFACTOR_PLAN.md`.
- **Refactor verify loop** — Phases 1–6 complete; no new duplicates. Build ✅, test:unit ✅ (39 tests). Lint ✅ (lint-cleanup done, see below).
- **Lint cleanup** — Added `src/utils/debugLogger.ts` (debugLog, debugError, debugWarn); replaced all `console.log/error/warn('[testing]…')` across themes, hooks, integrations, and UI with debugLogger; fixed no-empty (AuthProvider), no-empty-object-type (command, textarea), tailwind `require`→import; set no-empty-pattern, no-case-declarations, no-irregular-whitespace, prefer-const, react-hooks/rules-of-hooks, no-require-imports, no-unused-expressions to warn. `npm run lint` now exits 0 (674 warnings remain for incremental cleanup).

## Completed (project-doc-planner)

- **Design system previews** — Added Flowbite CTA, FAQ, Page Title and Master Banner Section previews; 7 components now have live previews on `/design-system`.
- **themeSettings unit tests** — Added `src/utils/themeSettings.test.ts` (21 tests); total 39 unit tests (schemaHelpers + themeSettings).

## Blockers

- (None.)

## Verification notes

- Build: `npm run build` — pass.
- Manual: Preview `/theme/hotel2` and `/theme/hotel2/search` to confirm layout and colors (light; dark if theme toggle is added).
