# STR Theme TODO

## Current State

Production theme with inline sections, Google Reviews integration, and booking functionality. Build passes, all pages render correctly.

---

## In Progress

- [ ] _(none)_

---

## Next

### SEO Title Status

**Current State**: STR theme page titles come from:
1. Individual page components use `pageData?.meta_title` from CMS or construct from `siteName`
2. Example: `physiotherapy.tsx` line 83: `title: pageData?.meta_title || \`Physiotherapy - ${siteName}\``
3. Uses `useThemeBranding()` to get `siteName` from CMS

**Action Required**:
- [ ] Verify CMS database branding for STR tenant uses generic business services branding
- [ ] Check if any hardcoded "STR Fitness" or "ACATR" references remain in content text
- [ ] Test page titles in browser

### Component Work

- [ ] Consider extracting inline sections to components for reusability

---

## Completed

- [x] **SEO metadata update** (2026-03-24) — Updated pages.json to remove mixed branding (ACATR, STR Fitness). Now uses generic business services branding suitable for consulting/service businesses.
- [x] **Design token alignment** (2025-03-19) — Full canonical token set in `theme.css`.
- [x] **Shared utilities migration** — Uses `@/hooks/useCustomCode`, `@/utils/themeSettings`.
- [x] **Testimonials Section extraction** — Extracted inline testimonials to `STRTestimonialsSection.tsx`.
- [x] **Design system registry** — All STR sections registered (including inline placeholders).
- [x] **Documentation** — Created `docs/README.md` with theme-specific conventions.

---

## Notes

- Most sections are inline (not extracted to components)
- Google Reviews API integration for testimonials
- Dark theme with red accent
