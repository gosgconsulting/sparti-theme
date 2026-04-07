# Nail Queen Theme TODO

## Current State

Production nail salon theme. Build passes, all pages render correctly.

---

## In Progress

- [ ] _(none)_

---

## Next

### SEO Title Status

**Current State**: Nail-queen theme uses pages.json for SEO (updated 2026-03-24 with detailed descriptions).

**Action Required**:
- [ ] Verify CMS database branding uses "Nail Queen" or generic "Premium Nail Salon" branding
- [ ] Test page titles in browser
- [ ] Verify no hardcoded client-specific references in components

---

## Completed

- [x] **About team carousel** (2026-04-07) — `AboutPage.tsx`: removed `basis-1/2 sm:basis-1/3 md:basis-1/4` overrides on team `CarouselItem` so shared `CarouselItem` default `basis-full` applies (one card per view at all breakpoints).
- [x] **Gallery lightbox aspect ratio** (2026-04-07) — `thumbnails-carousel.tsx` + `GalleryPage.tsx`: mobile viewport `h-[min(56vh,440px)]`, light wrapper/slide padding, `bg-transparent`; dialog `p-5`/`gap-3`, `mt-2 sm:mt-4` above carousel; `sm:` unchanged; `DialogContent` `shadow-none`; no carousel `shadow-lg`.
- [x] **Why Choose Us card copy → button gap (mobile)** (2026-04-07) — `HomePage.tsx`: body copy uses `mb-5` (mobile) / `md:mb-6` and drops `flex-grow` / `min-h-[120px]` below `md`; `md:` restores 3-col alignment; Learn more uses `md:mt-auto` only.
- [x] **Home section spacing (mobile)** (2026-04-07) — `HomePage.tsx`: reduced vertical padding between Our History ↔ Our Services and Our Services ↔ Why Choose Us (`pt`/`pb`/`py` responsive to `md`); desktop unchanged.
- [x] **Our Services mobile layout** (2026-04-07) — `HomePage.tsx`: services card grid `grid-cols-1 md:grid-cols-2` so one card per row on mobile, two columns from `md` up.
- [x] **Luxe Spa card footer alignment** (2026-04-03) — `PricingPage.tsx`: flex column + `flex-1` body so price rows align per row on `lg` grid.
- [x] **Pricing title–cards gap** (2026-04-03) — `PricingPage.tsx`: reduced vertical space below “Pricing” and above the grid.
- [x] **Pricing soak-off text alignment** (2026-04-03) — `PricingPage.tsx`: stripped accidental NBSP padding from SOFT GEL/BIAB and HARD GEL soak-off blurbs.
- [x] **Our Services cards** (2026-04-03) — `HomePage.tsx`: more horizontal padding on card copy; fixed-height image wells; flex layout so **Learn more** aligns across cards in each grid row.
- [x] **Navbar height** (2026-04-03) — `Layout.tsx`: nav rows `h-20`, `main` `pt-20`, mobile sheet offset matches `5rem`; `index.tsx`: pricing anchor extra scroll adjusted for taller fixed header.
- [x] **SEO metadata update** (2026-03-24) — Enhanced pages.json with detailed meta_title and meta_description for all pages. Added keywords for better SEO. Changed from minimal "Nail Queen" titles to descriptive "Premium Nail Salon - Professional Manicure & Pedicure Services" format.
- [x] **Design token alignment** (2025-03-19) — Full canonical token set in `theme.css`.
- [x] **Shared utilities migration** — Uses `@/hooks/useCustomCode`, `@/utils/themeSettings`.
- [x] **Custom NotFound** — Keeps custom NotFoundPage (blog slug check + redirect).
- [x] **Documentation** — Created `docs/README.md` and `docs/TODO.md`.

---

## Notes

- Gallery-focused design
- Custom NotFound with redirect logic
