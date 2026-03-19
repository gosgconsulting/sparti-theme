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

const PREVIEW_MAP: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  "master-header": MasterHeaderPreview,
  "master-footer": MasterFooterPreview,
  "flowbite-hero-section": FlowbiteHeroSectionPreview,
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
