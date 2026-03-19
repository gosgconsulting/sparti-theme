# Sparti Theme — Documentation

- **[Project README](../README.md)** — Overview, architecture, module responsibilities, conventions, key decisions, tech debt, and getting started.
- **[Root TODO](../TODO.md)** — Quick links to execution ledger and refactor plan.
- **[Design system guideline](DESIGN_SYSTEM_GUIDELINE.md)** — Canonical design tokens, component usage, and styling rules for all themes; use for every new theme and UI development. **Design system page:** `/design-system` — live catalog of Header, Footer, Hero, Sections from every theme and Flowbite; registry in `src/config/designSystemRegistry.ts`.
- **[Design system preview plan](DESIGN_SYSTEM_PREVIEW_PLAN.md)** — How to add missing previews (e.g. "Preview not yet implemented"); Vercel best practices for lazy loading and preload.
- **[Design system sections (all themes)](DESIGN_SYSTEM_SECTIONS.md)** — Categorised list of every layout, hero, and section per theme (component or inline); use to align the design system registry and extract inline sections.
- **Theme system** — [src/themes/README.md](../src/themes/README.md): theme structure, templates vs themes, master theme, mandatory files.
- **Master theme** — [src/themes/master/README.md](../src/themes/master/README.md): duplicate this theme for new production themes.
- **[TODO](todo.md)** — Current state, in progress, next, blocked, done, duplicate risks, refactor opportunities, verification notes.
- **[Refactor plan](REFACTOR_PLAN.md)** — Tech stack audit, unused/duplicate file list, phased refactor (Phases 1–3 done; 4–5 partial).
