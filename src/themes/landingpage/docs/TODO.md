# Landingpage Theme TODO

## Current State

Production landing page theme. Build passes, all pages render correctly.

---

## In Progress

- [ ] _(none)_

---

## Next

### SEO Title Status

**Current State**: Landingpage theme uses schema-driven rendering with pages.json SEO metadata (updated 2026-03-24).

**Action Required**:
- [ ] Verify CMS database branding uses generic "Professional Business Services" or similar
- [ ] Test page titles in browser with CMS online/offline
- [ ] Check for any hardcoded "ACATR" references in content text

---

## Completed

- [x] **SEO metadata update** (2026-03-24) — Updated pages.json to remove "ACATR" branding. Now uses generic "Professional Business Services" branding suitable for any business services client.
- [x] **Design token alignment** (2025-03-19) — Full canonical token set in `theme.css`.
- [x] **Shared utilities migration** — Uses `@/utils/schemaHelpers`, `@/utils/themeSettings`.
- [x] **Component registry** — All components registered in design system registry.
- [x] **Documentation** — Created `docs/README.md` and `docs/TODO.md`.

---

## Notes

- Clean landing page design
- Schema-driven sections
