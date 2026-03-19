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

## 5. Registry

| Component ID | Source | Preview |
|--------------|--------|---------|
| str-page-wrapper | STR | ✅ Implemented |

---

## 6. Docs to Update

- **docs/todo.md** — Add "STR Page Wrapper preview" to Done.
- **docs/DESIGN_SYSTEM_GUIDELINE.md** — §4.1 already documents the pattern; no change needed unless adding a new section.
- **README.md** — No change unless design system section is expanded.
