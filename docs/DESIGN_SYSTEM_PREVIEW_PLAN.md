# Design System Preview Implementation Plan

**Date:** 2025-03-19  
**Status:** Active  
**Related:** `docs/DESIGN_SYSTEM_GUIDELINE.md`, `docs/todo.md`, `src/config/designSystemRegistry.ts`

---

## 1. Purpose

When a component in the design system sidebar shows "Preview not yet implemented", follow this plan to add a live preview. The goal is to make all registry components previewable so themes can be built from the design system as templates.

---

## 2. Vercel React Best Practices (Preview Rendering)

| Rule | Application |
|------|-------------|
| **bundle-dynamic-imports** | Use `React.lazy()` for preview components so they load on demand (not in initial bundle). |
| **bundle-preload** | Call `preloadPreview(id)` on `onMouseEnter`/`onFocus` for sidebar links to preload chunks before click. |
| **rendering-conditional-render** | Use ternary (`? :`) instead of `&&` when the condition can be falsy (0, NaN). |
| **rerender-lazy-state-init** | Pass `() => value` to `useState` when the initial value is expensive to compute. |

---

## 3. Implementation Steps

### Step 1: Create the preview wrapper

Create `src/pages/design-system/previews/<Source><ComponentName>Preview.tsx`.

For **STR Page Wrapper** (`str-page-wrapper`):

- File: `src/pages/design-system/previews/STRPageWrapperPreview.tsx`
- The component renders the real `PageWrapper` with a minimal child (e.g. a div with "Sample page content").
- PageWrapper requires `children` as a single `React.ReactElement` (it uses `React.cloneElement`).
- PageWrapper uses `useThemeBranding` and `useCustomCode` - these will fetch from API; in design system context they may return null/empty (fallbacks apply).

### Step 2: Register in DesignSystemPreview.tsx

Add the lazy import and map entry:

```ts
const STRPageWrapperPreview = lazy(() =>
  import("./previews/STRPageWrapperPreview").then((m) => ({ default: m.STRPageWrapperPreview }))
);

// In PREVIEW_MAP:
"str-page-wrapper": STRPageWrapperPreview,

// In PRELOAD_LOADERS:
"str-page-wrapper": () => import("./previews/STRPageWrapperPreview"),
```

### Step 3: Verify

- Run `npm run build` and `npm run lint`.
- Open `/design-system?theme=STR` and confirm "Page Wrapper" shows a live preview.

---

## 4. Component-Specific Notes

### STR PageWrapper

- **Props:** `tenantName`, `tenantId`, `pageTitle`, `pageDescription`, `children`
- **Child:** Must be a single `React.ReactElement`. Use `<div className="p-6 ...">Sample content</div>`.
- **Dependencies:** `useThemeBranding`, `useCustomCode`, `STR_ASSETS`, `getSiteName`, etc. All have fallbacks when API returns null.

### Components with CMS/API dependencies

For components that fetch from CMS (e.g. FlowbiteHeader, PageWrapper):

- Use the real component with fallbacks; the hooks will return null/loading when API is unavailable.
- No mocking needed if the component handles null/loading gracefully.

### Components with complex children

For wrappers that expect specific child structure (e.g. layout with header/footer slots):

- Provide a minimal valid child that satisfies the structure.
- Document the expected shape in the preview file.

---

## 5. Systematic Process: Theme Component + Preview

Use this workflow when adding a **new theme component** or when a component is **inline** in a theme page and you want it in the design system with a live preview.

| Step | Action |
|------|--------|
| 1 | **Register** — Ensure the component is in `src/config/designSystemRegistry.ts` (id, source, name, category, pathHint). |
| 2 | **Extract (if inline)** — If the UI lives inline in a theme file (e.g. `themes/str/index.tsx`), extract it to a presentational component under `themes/<slug>/components/` with clear props (title, data, loading, etc.). Update the theme page to use that component. |
| 3 | **Preview wrapper** — Create `src/pages/design-system/previews/<Source><ComponentName>Preview.tsx` that imports the theme component and passes **mock/static data** (no API calls in preview). |
| 4 | **Wire preview** — In `src/pages/design-system/DesignSystemPreview.tsx`: add a `lazy()` import, add the id to `PREVIEW_MAP`, and add the same id to `PRELOAD_LOADERS`. |
| 5 | **Verify** — `npm run build`, `npm run lint`, then open `/design-system` and select the component to confirm the preview renders. |

**Example (STR Testimonials):** The testimonials block was inline in `str/index.tsx`. It was extracted to `themes/str/components/STRTestimonialsSection.tsx` (props: title, buttonText, buttonUrl, testimonials, placeInfo, loading). The theme page and `STRTestimonialsSectionPreview.tsx` both use that component; the preview passes mock testimonials and placeInfo so no Google API is called.

---

## 6. Registry

All registry entries now have a preview (real component or inline placeholder). Summary by source:

| Source | Preview count |
|--------|----------------|
| Flowbite | 15 (header, footer, hero, CTA, FAQ, content, testimonials, features, pain-point, whats-included, why-choose-us, newsletter, page-title, section) |
| Master | 5 (header, footer, banner-section, our-services-section, contact-form-modal) |
| Gosgconsulting | 9 (header, footer, hero, features, services-showcase, content, CTA, testimonials, newsletter) |
| STR | 11 (page-wrapper, hero, about, programmes, gallery, testimonials, team, FAQ, CTA, footer, contact-modal; inline sections use InlineSectionPlaceholder) |
| Landingpage | 7 (header, footer, hero, CTA, FAQ, services, testimonials) |
| Sissonne | 5 (layout, hero-slider, testimonial-slider, faculty-slider, gallery-slider) |
| E-shop | 5 (header, footer, category-header, product-grid, large-hero) |
| Nail-queen | 2 (layout, contact-panel) |

---

## 7. Docs to Update

- **docs/todo.md** — Add completed preview tasks to Done.
- **docs/DESIGN_SYSTEM_GUIDELINE.md** — §4.1 already documents the pattern; no change needed unless adding a new section.
- **README.md** — Design system page paragraph references this plan; link to `docs/DESIGN_SYSTEM_PREVIEW_PLAN.md` for "how to add a preview".
