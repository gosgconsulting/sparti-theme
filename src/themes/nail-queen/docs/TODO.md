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

- [x] **SEO metadata update** (2026-03-24) — Enhanced pages.json with detailed meta_title and meta_description for all pages. Added keywords for better SEO. Changed from minimal "Nail Queen" titles to descriptive "Premium Nail Salon - Professional Manicure & Pedicure Services" format.
- [x] **Design token alignment** (2025-03-19) — Full canonical token set in `theme.css`.
- [x] **Shared utilities migration** — Uses `@/hooks/useCustomCode`, `@/utils/themeSettings`.
- [x] **Custom NotFound** — Keeps custom NotFoundPage (blog slug check + redirect).
- [x] **Documentation** — Created `docs/README.md` and `docs/TODO.md`.

---

## Notes

- Gallery-focused design
- Custom NotFound with redirect logic
