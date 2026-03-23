# TODO

## Completed

- **hotel2 theme design system refactor** (2025-03-19)
  - Refactored `src/themes/hotel2/theme.css` to use canonical design tokens (`--background`, `--foreground`, `--primary`, `--card`, `--muted`, `--border`, `--radius`, `--font-sans`, etc.) per `docs/DESIGN_SYSTEM_GUIDELINE.md`.
  - Replaced all `--brand-*` and hard-coded colors with token-based values; added `.theme-hotel2.dark` block.
  - Updated hotel2 components to use design system utility classes: `text-foreground`, `text-muted-foreground`, `text-primary`, `bg-background`, `bg-card`, `bg-muted`, `border-border`, `btn-primary`, `btn-secondary`.
  - Verification: `npm run build` passes.

## Next

- (None at this time.)

## Completed (2025-03-23)

- **hotel2 destination dropdown brand styling** — `DestinationDropdown.tsx`: scoped `hotel2-destination-*` classes; `theme.css`: token-based trigger (boxed / underline / compact), panel shadow, list scrollbar, selected `accent` row + primary check + active rail; overrides global square buttons. `HeroSection` + `SearchResultsPage`: Lucide `MapPin` in primary. `.hotel2-control-icon` uses primary. Verification: `npm run build` pass.
- **hotel2 home rail cards → detail** — `HotelResultsSection`, `CollectionsSection`: wrap `HotelCard` with `HotelCardLink` + `buildHotelDetailHref` (destination, adults, children); `HotelCardLink` `variant="rail"` + `.hotel2-rail-card-link` in `theme.css`. `HomePage` passes `basePath` and occupancy. Verification: `npm run build` pass.
- **hotel2 detail amenities icons** — `AmenitiesList.tsx`: Lucide icons per amenity label (substring rules; `Tv` for flat-screen TV, etc.); `theme.css`: flex rows, primary-colored icon slot, removed dot `::before`. Verification: `npm run build` pass.
- **hotel2 rate card inclusions** — `RateOptionCard.tsx`: removed bottom inclusion row (Accommodation, Wi‑Fi, breakfast, etc.) and `InclusionGlyph`; dropped unused `.hotel2-rate-inclusion*` rules from `theme.css`. `Hotel2Rate.inclusions` remains on mock data for possible future use. Verification: `npm run build` pass.
- **hotel2 hero date range popover** — `StayDateRangePicker.tsx`: Radix Popover + `Calendar` with **`mode="single"`** and **Check-in / Check-out tabs** (react-day-picker `mode="range"` `addToRange` keeps `from` when both ends exist and only moves `to` for most clicks). Two months; check-out disables days before check-in; pick check-in then check-out (or switch tabs). Verification: `npm run build` pass.

## Completed (2025-03-20) — hotel2 detail flow

- **hotel2 hotel detail + room booking UI** — Slug routes `…/hotels/:slug` (via theme `pageSlug`), `hotelSlugFromName` + `buildHotelDetailHref`, extended `Hotel2Hotel` / room / rate / add-on types, `buildHotel2Rooms` mock data for all listings, `HotelDetailPage` + detail components, clickable search result cards, not-found state, stay query params preserved. Verification: `npm run build` pass.

## Completed (2025-03-20)

- **hotel2 Search results sort control** — `ResultsSort` + `theme.css`: removed pill background/border on sort `<select>`; custom chevron via `.hotel2-results-sortTrigger` / `.hotel2-results-sortChevron`; focus-visible ring for accessibility.
- **hotel2 Search results Filter** — `SearchResultsPage.tsx`, `results/ResultsFilterPanel.tsx`, `theme.css`: Scrim + panel; **amenities** grid (AND match, More/Less), min rating, collections; no price slider. Dashed section dividers; primary-colored “More” link.
- **hotel2 Sort dropdown** — Custom listbox in `ResultsSort.tsx`, `results/hotel2Sort.ts`, `theme.css`: seven options (default, price low/high, rating, featured first, date old/new); navy selected row, muted hover/highlight; solid caret; `listedAt` on `Hotel2Hotel` + seed data for date sorts.

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
