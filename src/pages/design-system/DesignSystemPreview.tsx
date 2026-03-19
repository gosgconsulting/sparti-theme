/**
 * Design system preview loaders.
 * Add a case here when you want a component to be previewable on /design-system.
 * Use designSystemRegistry.ts for the sidebar list; this file controls what actually renders.
 */

import React, { lazy, Suspense } from "react";

const MasterHeaderPreview = lazy(() =>
  import("./previews/MasterHeaderPreview").then((m) => ({ default: m.MasterHeaderPreview }))
);
const MasterFooterPreview = lazy(() =>
  import("./previews/MasterFooterPreview").then((m) => ({ default: m.MasterFooterPreview }))
);
const FlowbiteHeroSectionPreview = lazy(() =>
  import("./previews/FlowbiteHeroSectionPreview").then((m) => ({ default: m.FlowbiteHeroSectionPreview }))
);
const FlowbiteCTASectionPreview = lazy(() =>
  import("./previews/FlowbiteCTASectionPreview").then((m) => ({ default: m.FlowbiteCTASectionPreview }))
);
const FlowbiteFAQSectionPreview = lazy(() =>
  import("./previews/FlowbiteFAQSectionPreview").then((m) => ({ default: m.FlowbiteFAQSectionPreview }))
);
const FlowbitePageTitlePreview = lazy(() =>
  import("./previews/FlowbitePageTitlePreview").then((m) => ({ default: m.FlowbitePageTitlePreview }))
);
const MasterBannerSectionPreview = lazy(() =>
  import("./previews/MasterBannerSectionPreview").then((m) => ({ default: m.MasterBannerSectionPreview }))
);

const PREVIEW_MAP: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  "master-header": MasterHeaderPreview,
  "master-footer": MasterFooterPreview,
  "master-banner-section": MasterBannerSectionPreview,
  "flowbite-hero-section": FlowbiteHeroSectionPreview,
  "flowbite-cta-section": FlowbiteCTASectionPreview,
  "flowbite-faq-section": FlowbiteFAQSectionPreview,
  "flowbite-page-title": FlowbitePageTitlePreview,
};

export function getPreviewComponent(id: string): React.ReactNode {
  const Lazy = PREVIEW_MAP[id];
  if (!Lazy) return null;
  return (
    <Suspense fallback={<div className="p-4 text-muted-foreground">Loading…</div>}>
      <Lazy />
    </Suspense>
  );
}

export function hasPreview(id: string): boolean {
  return id in PREVIEW_MAP;
}

/** Preload preview chunk on hover/focus to reduce perceived latency (Vercel bundle-preload). */
const PRELOAD_LOADERS: Record<string, () => Promise<unknown>> = {
  "master-header": () => import("./previews/MasterHeaderPreview"),
  "master-footer": () => import("./previews/MasterFooterPreview"),
  "master-banner-section": () => import("./previews/MasterBannerSectionPreview"),
  "flowbite-hero-section": () => import("./previews/FlowbiteHeroSectionPreview"),
  "flowbite-cta-section": () => import("./previews/FlowbiteCTASectionPreview"),
  "flowbite-faq-section": () => import("./previews/FlowbiteFAQSectionPreview"),
  "flowbite-page-title": () => import("./previews/FlowbitePageTitlePreview"),
};

export function preloadPreview(id: string): void {
  if (typeof window !== "undefined" && id in PRELOAD_LOADERS) {
    void PRELOAD_LOADERS[id]();
  }
}
