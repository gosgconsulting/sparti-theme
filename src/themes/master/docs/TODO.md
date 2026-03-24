# Master Theme TODO

## Current State

Master theme is the reference implementation for all new themes. It demonstrates best-practice folder structure, CMS integration patterns, and design token usage. Build passes, all pages render correctly.

---

## In Progress

- [ ] _(none)_

---

## Next

### SEO Title Status

**Current State**: Master theme uses generic "Master Theme" branding. No client-specific references. SEO metadata is appropriate for reference theme.

**Action**: No action required. Master theme should remain generic.

---

## Completed

- [x] **SEO metadata verification** (2026-03-24) — Verified pages.json already uses generic "Master Theme" branding. No client-specific references. SEO metadata is appropriate for reference theme.
- [x] **Design token alignment** (2025-03-19) — Full canonical token set in `theme.css` (`:root` and `.dark`).
- [x] **Component registry** — All master components registered in design system registry.
- [x] **Documentation** — Created `docs/README.md` with theme-specific conventions.

---

## Notes

- Master theme should remain generic and reusable.
- Do not add client-specific branding or content to master.
- Keep as the reference for new theme creation.
