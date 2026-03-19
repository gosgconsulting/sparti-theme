# TODO

## Completed

- **hotel2 theme design system refactor** (2025-03-19)
  - Refactored `src/themes/hotel2/theme.css` to use canonical design tokens (`--background`, `--foreground`, `--primary`, `--card`, `--muted`, `--border`, `--radius`, `--font-sans`, etc.) per `docs/DESIGN_SYSTEM_GUIDELINE.md`.
  - Replaced all `--brand-*` and hard-coded colors with token-based values; added `.theme-hotel2.dark` block.
  - Updated hotel2 components to use design system utility classes: `text-foreground`, `text-muted-foreground`, `text-primary`, `bg-background`, `bg-card`, `bg-muted`, `border-border`, `btn-primary`, `btn-secondary`.
  - Verification: `npm run build` passes.

## Next

- (None at this time.)

## Blockers

- (None.)

## Verification notes

- Build: `npm run build` — pass.
- Manual: Preview `/theme/hotel2` and `/theme/hotel2/search` to confirm layout and colors (light; dark if theme toggle is added).
