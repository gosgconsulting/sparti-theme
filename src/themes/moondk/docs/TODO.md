# Moondk Theme TODO

## Current State

Production e-commerce theme with full HSL token system, dark mode support, and canonical design system compliance. Build passes, all pages render correctly.

---

## Completed (2026-03-24)

### Bēok private dining page

- [x] **CTA buttons — design system** — `BrokPrivateDinning.tsx`: solid actions use theme tokens; hero “View menu” uses frosted white outline on the image. Verification: `npm run build` pass.

### SEO Metadata Update

- [x] **pages.json structure update** — Added meta_title, meta_description, seo_index, status, page_type, and keywords fields to all pages. Previously used minimal structure without SEO metadata. Now follows standard pages.json format with proper SEO titles for fashion e-commerce theme.

### Design System Refactor — 5 Phases

- [x] **Phase 1**: Removed all cross-theme e-shop asset imports; deleted unused content components (LargeHero, FiftyFiftySection, OneThirdTwoThirdsSection, EditorialSection, HeroSlider); replaced e-shop barley tea image with moondk asset; removed unused image preload code
- [x] **Phase 2**: Rewrote theme.css with HSL tokens for all canonical variables; added full token set (sidebar, chart, font, spacing, shadow); added `.moondk-theme.dark` block; mapped legacy `--moondk-*` vars to canonical tokens; replaced `--primary-hover` with `hover:bg-primary/90`
- [x] **Phase 3**: Replaced hard-coded hex/rgba colors in Navigation, ContactFormSheet, HomeHeroSlider, ShoppingBag, ProductInfo, AddToBagNotification, HomeNewArrivalsSection with semantic Tailwind classes (`bg-primary`, `text-foreground`, etc.)
- [x] **Phase 4**: Deleted unused hero-shader.tsx; replaced all `console.log/error` with `debugLog/debugError` from `@/utils/debugLogger`; dynamic copyright year in Footer; centralized delivery fee constants in `constants.ts`
- [x] **Phase 5**: Added `designSystem` and `designSystemTheme` fields to theme.json; comprehensive docs/README.md with full token list, dark mode, component inventory, conventions; updated docs/TODO.md

### UX Streamlining — Border & Layout Refinement

- [x] **Standardized border pattern**: Removed all `border-border-light` custom utility; replaced with canonical `border-border` with opacity modifiers (`/10`, `/20`, `/50`) across 15+ files
- [x] **Footer dividers**: Changed to subtle `border-border/10` for airy, minimal feel
- [x] **ProductDescription**: Removed section divider line before accordions for cleaner layout
- [x] **ProductAccordion**: Replaced hard-coded `#195B3E` colors with semantic tokens (`ring-primary`, `border-primary/20`)
- [x] **Policy pages**: Replaced all hard-coded `#195B3E`, `#1F3D2A` colors with `text-primary`, `bg-primary`, `hover:bg-primary/90`
- [x] **Checkout**: Replaced `#2F5C3E`, `#F2EFDC` with `bg-primary`, `bg-secondary`, `border-primary/20`
- [x] **HomeAboutSection**: Replaced `#F2EFDC` with `bg-secondary`
- [x] **HomeHeroSlider**: Removed unused `accent` property from slide data

---

## Next

### SEO Title Status

**Current State**: moondk theme uses pages.json for SEO (no custom SEOHead component). Page titles come from:
1. CMS branding API if available
2. pages.json meta_title (updated 2026-03-24)
3. No hardcoded brand fallbacks in components

**Action Required**: 
- [ ] Verify CMS database branding for moondk tenant uses generic "Premium Fashion Store" or similar
- [ ] Test page titles in browser with CMS online/offline

### Component Work

- [ ] Register moondk components in `src/config/designSystemRegistry.ts` (Header, Footer, HomeHeroSlider, HomeCategoryCarousel, HomeNewArrivalsSection, ShoppingBag, ProductGrid)
- [ ] Add design system previews under `src/pages/design-system/previews/` for registered components
- [ ] Optional: Wire search input in Navigation (currently non-functional UI)
- [ ] Optional: Wire account button in Navigation (currently no action)
- [ ] Optional: Implement favorites feature (state exists but no data backing)

---

## Notes

- E-commerce product catalog with 13 products across Tea, Oil, Noodles, Alcohol categories
- Shopping cart with localStorage persistence
- Full checkout flow (customer details, shipping, payment)
- All tokens in HSL format for Tailwind compatibility
- Dark mode ready (`.moondk-theme.dark` defined)
- No cross-theme dependencies — fully self-contained
