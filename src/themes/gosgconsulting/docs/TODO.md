# Digital Marketing Theme TODO

## Current State

Production theme with schema-driven rendering, blog integration, and comprehensive component library. Build passes, all pages render correctly. SEO metadata updated to use generic branding.

---

## In Progress

- [x] **Phase 2: Component Fallback Cleanup** — Updating hardcoded "GO SG Consulting" references to "Digital Marketing Agency"

---

## Next

### Hardcoded Brand Reference Cleanup

**Problem**: Page titles still show "GO SG Consulting" because:
1. CMS database contains "GO SG" branding (fetched by `useThemeBranding()`)
2. 50+ files have hardcoded "GO SG Consulting" fallback values
3. Theme uses custom `SEOHead` component that sets page title from branding API

**Solution Plan**:

#### Phase 1: CMS Database Update (External)
- [ ] Update `site_name` in CMS branding table for tenant-gosg → "Digital Marketing Agency"
- [ ] Update `site_tagline` → "Full-Stack Growth Solutions"
- [ ] Update `site_description` → Generic description without "GO SG"
- [ ] Update logo/favicon if they contain "GO SG" branding

#### Phase 2: Component Fallback Cleanup (Code)
- [ ] **index.tsx** (5 locations):
  - Line 39: `tenantName = 'GO SG Consulting'` → `'Digital Marketing Agency'`
  - Line 1130: Same
  - Line 1928: Same
  - Line 2090: Same
  - Line 248, 1334: Content text references
- [ ] **components/Header.tsx**: Line 15 `tenantName = 'GO SG Consulting'`
- [ ] **components/Footer.tsx**: Lines 13, 24-25 "GO SG" references
- [ ] **components/HeroSection.tsx**: Line 22
- [ ] **components/Blog.tsx**: Line 18
- [ ] **components/BlogSection.tsx**: Line 119 content text
- [ ] **components/ThankYouPage.tsx**: Line 16
- [ ] **components/ModalContactForm.tsx**: Line 131 form name
- [ ] **utils/settings.ts**: Line 11 fallback
- [ ] **Design system previews** (3 files): GosgconsultingHeaderPreview, GosgconsultingFooterPreview, GosgconsultingHeroSectionPreview

#### Phase 3: Asset Cleanup
- [ ] **assets/go-sg-logo-official.png** — Replace with generic logo or remove
- [ ] Update imports in Header.tsx, HomeHeroSection.tsx

#### Phase 4: Content Text Cleanup
- [ ] Search for "GO SG" in content strings (lines 248, 646, 1334, 1757 in index.tsx)
- [ ] Replace with generic agency references or remove

#### Phase 5: Verification
- [ ] Test with CMS API online (should show CMS branding)
- [ ] Test with CMS API offline (should show generic fallbacks)
- [ ] Check browser tab title, meta tags, Open Graph tags
- [ ] Verify logo displays correctly

---

## Completed

- [x] **Phase 2: Component Fallback Cleanup** (2026-03-24) — Updated 15+ files to replace hardcoded "GO SG Consulting" with "Digital Marketing Agency":
  - `index.tsx`: 4 component default props + 2 content text references
  - `components/Header.tsx`, `Footer.tsx`, `HeroSection.tsx`, `Blog.tsx`, `BlogSection.tsx`, `ThankYouPage.tsx`, `ModalContactForm.tsx`
  - `utils/settings.ts`: Fallback value
  - Design system previews: `GosgconsultingHeaderPreview`, `GosgconsultingFooterPreview`, `GosgconsultingHeroSectionPreview`
  - `src/pages/PublicDashboard.tsx`: Theme display name
  - `src/themes/themeRegistry.ts`: Theme display name
  - Build ✅
- [x] **SEO metadata update** (2026-03-24) — Updated all pages.json meta_title and meta_description to remove "GO SG Consulting" references. Now uses generic "Digital Marketing Agency" branding suitable for any client.
- [x] **Design token alignment** (2025-03-19) — Full canonical token set in `theme.css`.
- [x] **Shared utilities migration** — Uses `@/lib/utils`, `@/utils/schemaHelpers`, `@/utils/themeSettings`.
- [x] **Component registry** — All components registered in design system registry.
- [x] **Documentation** — Created `docs/README.md` with theme-specific conventions.
- [x] **Migration from gosgwebsite-main** — Successfully migrated and integrated into CMS.

---

## Notes

- Schema-driven rendering via `DynamicPageRenderer`
- WordPress API integration for blog
- Extensive component library (40+ components)
