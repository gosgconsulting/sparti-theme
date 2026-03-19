/**
 * Design system preview loaders.
 * Add a case here when you want a component to be previewable on /design-system.
 * Use designSystemRegistry.ts for the sidebar list; this file controls what actually renders.
 */

import React, { lazy, Suspense } from "react";

// Master
const MasterHeaderPreview = lazy(() =>
  import("./previews/MasterHeaderPreview").then((m) => ({ default: m.MasterHeaderPreview }))
);
const MasterFooterPreview = lazy(() =>
  import("./previews/MasterFooterPreview").then((m) => ({ default: m.MasterFooterPreview }))
);
const MasterBannerSectionPreview = lazy(() =>
  import("./previews/MasterBannerSectionPreview").then((m) => ({ default: m.MasterBannerSectionPreview }))
);
const MasterOurServicesSectionPreview = lazy(() =>
  import("./previews/MasterOurServicesSectionPreview").then((m) => ({ default: m.MasterOurServicesSectionPreview }))
);
const MasterContactFormModalPreview = lazy(() =>
  import("./previews/MasterContactFormModalPreview").then((m) => ({ default: m.MasterContactFormModalPreview }))
);

// Flowbite
const FlowbiteHeaderPreview = lazy(() =>
  import("./previews/FlowbiteHeaderPreview").then((m) => ({ default: m.FlowbiteHeaderPreview }))
);
const FlowbiteFooterPreview = lazy(() =>
  import("./previews/FlowbiteFooterPreview").then((m) => ({ default: m.FlowbiteFooterPreview }))
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
const FlowbiteContentSectionPreview = lazy(() =>
  import("./previews/FlowbiteContentSectionPreview").then((m) => ({ default: m.FlowbiteContentSectionPreview }))
);
const FlowbiteTestimonialsSectionPreview = lazy(() =>
  import("./previews/FlowbiteTestimonialsSectionPreview").then((m) => ({ default: m.FlowbiteTestimonialsSectionPreview }))
);
const FlowbiteFeaturesSectionPreview = lazy(() =>
  import("./previews/FlowbiteFeaturesSectionPreview").then((m) => ({ default: m.FlowbiteFeaturesSectionPreview }))
);
const FlowbitePainPointSectionPreview = lazy(() =>
  import("./previews/FlowbitePainPointSectionPreview").then((m) => ({ default: m.FlowbitePainPointSectionPreview }))
);
const FlowbiteWhatsIncludedSectionPreview = lazy(() =>
  import("./previews/FlowbiteWhatsIncludedSectionPreview").then((m) => ({ default: m.FlowbiteWhatsIncludedSectionPreview }))
);
const FlowbiteWhyChooseUsSectionPreview = lazy(() =>
  import("./previews/FlowbiteWhyChooseUsSectionPreview").then((m) => ({ default: m.FlowbiteWhyChooseUsSectionPreview }))
);
const FlowbiteNewsletterPreview = lazy(() =>
  import("./previews/FlowbiteNewsletterPreview").then((m) => ({ default: m.FlowbiteNewsletterPreview }))
);
const FlowbitePageTitlePreview = lazy(() =>
  import("./previews/FlowbitePageTitlePreview").then((m) => ({ default: m.FlowbitePageTitlePreview }))
);
const FlowbiteSectionPreview = lazy(() =>
  import("./previews/FlowbiteSectionPreview").then((m) => ({ default: m.FlowbiteSectionPreview }))
);

// Gosgconsulting
const GosgconsultingHeaderPreview = lazy(() =>
  import("./previews/GosgconsultingHeaderPreview").then((m) => ({ default: m.GosgconsultingHeaderPreview }))
);
const GosgconsultingFooterPreview = lazy(() =>
  import("./previews/GosgconsultingFooterPreview").then((m) => ({ default: m.GosgconsultingFooterPreview }))
);
const GosgconsultingHeroSectionPreview = lazy(() =>
  import("./previews/GosgconsultingHeroSectionPreview").then((m) => ({ default: m.GosgconsultingHeroSectionPreview }))
);
const GosgconsultingFeaturesSectionPreview = lazy(() =>
  import("./previews/GosgconsultingFeaturesSectionPreview").then((m) => ({ default: m.GosgconsultingFeaturesSectionPreview }))
);
const GosgconsultingServicesShowcasePreview = lazy(() =>
  import("./previews/GosgconsultingServicesShowcasePreview").then((m) => ({ default: m.GosgconsultingServicesShowcasePreview }))
);
const GosgconsultingContentSectionPreview = lazy(() =>
  import("./previews/GosgconsultingContentSectionPreview").then((m) => ({ default: m.GosgconsultingContentSectionPreview }))
);
const GosgconsultingCTASectionPreview = lazy(() =>
  import("./previews/GosgconsultingCTASectionPreview").then((m) => ({ default: m.GosgconsultingCTASectionPreview }))
);
const GosgconsultingTestimonialsSectionPreview = lazy(() =>
  import("./previews/GosgconsultingTestimonialsSectionPreview").then((m) => ({ default: m.GosgconsultingTestimonialsSectionPreview }))
);
const GosgconsultingNewsletterPreview = lazy(() =>
  import("./previews/GosgconsultingNewsletterPreview").then((m) => ({ default: m.GosgconsultingNewsletterPreview }))
);

// STR
const STRPageWrapperPreview = lazy(() =>
  import("./previews/STRPageWrapperPreview").then((m) => ({ default: m.STRPageWrapperPreview }))
);
const STRHeroSectionPreview = lazy(() =>
  import("./previews/STRHeroSectionPreview").then((m) => ({ default: m.STRHeroSectionPreview }))
);
const STRAboutSectionPreview = lazy(() =>
  import("./previews/STRAboutSectionPreview").then((m) => ({ default: m.STRAboutSectionPreview }))
);
const STRProgrammesSectionPreview = lazy(() =>
  import("./previews/STRProgrammesSectionPreview").then((m) => ({ default: m.STRProgrammesSectionPreview }))
);
const STRGallerySectionPreview = lazy(() =>
  import("./previews/STRGallerySectionPreview").then((m) => ({ default: m.STRGallerySectionPreview }))
);
const STRTestimonialsSectionPreview = lazy(() =>
  import("./previews/STRTestimonialsSectionPreview").then((m) => ({ default: m.STRTestimonialsSectionPreview }))
);
const STRTeamSectionPreview = lazy(() =>
  import("./previews/STRTeamSectionPreview").then((m) => ({ default: m.STRTeamSectionPreview }))
);
const STRFAQSectionPreview = lazy(() =>
  import("./previews/STRFAQSectionPreview").then((m) => ({ default: m.STRFAQSectionPreview }))
);
const STRCTASectionPreview = lazy(() =>
  import("./previews/STRCTASectionPreview").then((m) => ({ default: m.STRCTASectionPreview }))
);
const STRFooterPreview = lazy(() =>
  import("./previews/STRFooterPreview").then((m) => ({ default: m.STRFooterPreview }))
);
const STRContactModalPreview = lazy(() =>
  import("./previews/STRContactModalPreview").then((m) => ({ default: m.STRContactModalPreview }))
);

// Landingpage
const LandingpageHeaderPreview = lazy(() =>
  import("./previews/LandingpageHeaderPreview").then((m) => ({ default: m.LandingpageHeaderPreview }))
);
const LandingpageFooterPreview = lazy(() =>
  import("./previews/LandingpageFooterPreview").then((m) => ({ default: m.LandingpageFooterPreview }))
);
const LandingpageHeroSectionPreview = lazy(() =>
  import("./previews/LandingpageHeroSectionPreview").then((m) => ({ default: m.LandingpageHeroSectionPreview }))
);
const LandingpageCTASectionPreview = lazy(() =>
  import("./previews/LandingpageCTASectionPreview").then((m) => ({ default: m.LandingpageCTASectionPreview }))
);
const LandingpageFAQSectionPreview = lazy(() =>
  import("./previews/LandingpageFAQSectionPreview").then((m) => ({ default: m.LandingpageFAQSectionPreview }))
);
const LandingpageServicesSectionPreview = lazy(() =>
  import("./previews/LandingpageServicesSectionPreview").then((m) => ({ default: m.LandingpageServicesSectionPreview }))
);
const LandingpageTestimonialsSectionPreview = lazy(() =>
  import("./previews/LandingpageTestimonialsSectionPreview").then((m) => ({ default: m.LandingpageTestimonialsSectionPreview }))
);

// Sissonne
const SissonneLayoutPreview = lazy(() =>
  import("./previews/SissonneLayoutPreview").then((m) => ({ default: m.SissonneLayoutPreview }))
);
const SissonneHeroSliderPreview = lazy(() =>
  import("./previews/SissonneHeroSliderPreview").then((m) => ({ default: m.SissonneHeroSliderPreview }))
);
const SissonneTestimonialSliderPreview = lazy(() =>
  import("./previews/SissonneTestimonialSliderPreview").then((m) => ({ default: m.SissonneTestimonialSliderPreview }))
);
const SissonneFacultySliderPreview = lazy(() =>
  import("./previews/SissonneFacultySliderPreview").then((m) => ({ default: m.SissonneFacultySliderPreview }))
);
const SissonneGallerySliderPreview = lazy(() =>
  import("./previews/SissonneGallerySliderPreview").then((m) => ({ default: m.SissonneGallerySliderPreview }))
);

// E-shop
const EshopHeaderPreview = lazy(() =>
  import("./previews/EshopHeaderPreview").then((m) => ({ default: m.EshopHeaderPreview }))
);
const EshopFooterPreview = lazy(() =>
  import("./previews/EshopFooterPreview").then((m) => ({ default: m.EshopFooterPreview }))
);
const EshopCategoryHeaderPreview = lazy(() =>
  import("./previews/EshopCategoryHeaderPreview").then((m) => ({ default: m.EshopCategoryHeaderPreview }))
);
const EshopProductGridPreview = lazy(() =>
  import("./previews/EshopProductGridPreview").then((m) => ({ default: m.EshopProductGridPreview }))
);
const EshopLargeHeroPreview = lazy(() =>
  import("./previews/EshopLargeHeroPreview").then((m) => ({ default: m.EshopLargeHeroPreview }))
);

// Nail-queen
const NailQueenLayoutPreview = lazy(() =>
  import("./previews/NailQueenLayoutPreview").then((m) => ({ default: m.NailQueenLayoutPreview }))
);
const NailQueenContactPanelPreview = lazy(() =>
  import("./previews/NailQueenContactPanelPreview").then((m) => ({ default: m.NailQueenContactPanelPreview }))
);

const PREVIEW_MAP: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  "master-header": MasterHeaderPreview,
  "master-footer": MasterFooterPreview,
  "master-banner-section": MasterBannerSectionPreview,
  "master-our-services-section": MasterOurServicesSectionPreview,
  "master-contact-form-modal": MasterContactFormModalPreview,
  "flowbite-header": FlowbiteHeaderPreview,
  "flowbite-footer": FlowbiteFooterPreview,
  "flowbite-hero-section": FlowbiteHeroSectionPreview,
  "flowbite-cta-section": FlowbiteCTASectionPreview,
  "flowbite-faq-section": FlowbiteFAQSectionPreview,
  "flowbite-content-section": FlowbiteContentSectionPreview,
  "flowbite-testimonials-section": FlowbiteTestimonialsSectionPreview,
  "flowbite-features-section": FlowbiteFeaturesSectionPreview,
  "flowbite-pain-point-section": FlowbitePainPointSectionPreview,
  "flowbite-whats-included-section": FlowbiteWhatsIncludedSectionPreview,
  "flowbite-why-choose-us-section": FlowbiteWhyChooseUsSectionPreview,
  "flowbite-newsletter": FlowbiteNewsletterPreview,
  "flowbite-page-title": FlowbitePageTitlePreview,
  "flowbite-section": FlowbiteSectionPreview,
  "gosgconsulting-header": GosgconsultingHeaderPreview,
  "gosgconsulting-footer": GosgconsultingFooterPreview,
  "gosgconsulting-hero-section": GosgconsultingHeroSectionPreview,
  "gosgconsulting-features-section": GosgconsultingFeaturesSectionPreview,
  "gosgconsulting-services-showcase": GosgconsultingServicesShowcasePreview,
  "gosgconsulting-content-section": GosgconsultingContentSectionPreview,
  "gosgconsulting-cta-section": GosgconsultingCTASectionPreview,
  "gosgconsulting-testimonials-section": GosgconsultingTestimonialsSectionPreview,
  "gosgconsulting-newsletter": GosgconsultingNewsletterPreview,
  "str-page-wrapper": STRPageWrapperPreview,
  "str-hero-section": STRHeroSectionPreview,
  "str-about-section": STRAboutSectionPreview,
  "str-programmes-section": STRProgrammesSectionPreview,
  "str-gallery-section": STRGallerySectionPreview,
  "str-testimonials-section": STRTestimonialsSectionPreview,
  "str-team-section": STRTeamSectionPreview,
  "str-faq-section": STRFAQSectionPreview,
  "str-cta-section": STRCTASectionPreview,
  "str-footer": STRFooterPreview,
  "str-contact-modal": STRContactModalPreview,
  "landingpage-header": LandingpageHeaderPreview,
  "landingpage-footer": LandingpageFooterPreview,
  "landingpage-hero-section": LandingpageHeroSectionPreview,
  "landingpage-cta-section": LandingpageCTASectionPreview,
  "landingpage-faq-section": LandingpageFAQSectionPreview,
  "landingpage-services-section": LandingpageServicesSectionPreview,
  "landingpage-testimonials-section": LandingpageTestimonialsSectionPreview,
  "sissonne-layout": SissonneLayoutPreview,
  "sissonne-hero-slider": SissonneHeroSliderPreview,
  "sissonne-testimonial-slider": SissonneTestimonialSliderPreview,
  "sissonne-faculty-slider": SissonneFacultySliderPreview,
  "sissonne-gallery-slider": SissonneGallerySliderPreview,
  "eshop-header": EshopHeaderPreview,
  "eshop-footer": EshopFooterPreview,
  "eshop-category-header": EshopCategoryHeaderPreview,
  "eshop-product-grid": EshopProductGridPreview,
  "eshop-large-hero": EshopLargeHeroPreview,
  "nail-queen-layout": NailQueenLayoutPreview,
  "nail-queen-contact-panel": NailQueenContactPanelPreview,
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
  "master-our-services-section": () => import("./previews/MasterOurServicesSectionPreview"),
  "master-contact-form-modal": () => import("./previews/MasterContactFormModalPreview"),
  "flowbite-header": () => import("./previews/FlowbiteHeaderPreview"),
  "flowbite-footer": () => import("./previews/FlowbiteFooterPreview"),
  "flowbite-hero-section": () => import("./previews/FlowbiteHeroSectionPreview"),
  "flowbite-cta-section": () => import("./previews/FlowbiteCTASectionPreview"),
  "flowbite-faq-section": () => import("./previews/FlowbiteFAQSectionPreview"),
  "flowbite-content-section": () => import("./previews/FlowbiteContentSectionPreview"),
  "flowbite-testimonials-section": () => import("./previews/FlowbiteTestimonialsSectionPreview"),
  "flowbite-features-section": () => import("./previews/FlowbiteFeaturesSectionPreview"),
  "flowbite-pain-point-section": () => import("./previews/FlowbitePainPointSectionPreview"),
  "flowbite-whats-included-section": () => import("./previews/FlowbiteWhatsIncludedSectionPreview"),
  "flowbite-why-choose-us-section": () => import("./previews/FlowbiteWhyChooseUsSectionPreview"),
  "flowbite-newsletter": () => import("./previews/FlowbiteNewsletterPreview"),
  "flowbite-page-title": () => import("./previews/FlowbitePageTitlePreview"),
  "flowbite-section": () => import("./previews/FlowbiteSectionPreview"),
  "gosgconsulting-header": () => import("./previews/GosgconsultingHeaderPreview"),
  "gosgconsulting-footer": () => import("./previews/GosgconsultingFooterPreview"),
  "gosgconsulting-hero-section": () => import("./previews/GosgconsultingHeroSectionPreview"),
  "gosgconsulting-features-section": () => import("./previews/GosgconsultingFeaturesSectionPreview"),
  "gosgconsulting-services-showcase": () => import("./previews/GosgconsultingServicesShowcasePreview"),
  "gosgconsulting-content-section": () => import("./previews/GosgconsultingContentSectionPreview"),
  "gosgconsulting-cta-section": () => import("./previews/GosgconsultingCTASectionPreview"),
  "gosgconsulting-testimonials-section": () => import("./previews/GosgconsultingTestimonialsSectionPreview"),
  "gosgconsulting-newsletter": () => import("./previews/GosgconsultingNewsletterPreview"),
  "str-page-wrapper": () => import("./previews/STRPageWrapperPreview"),
  "str-hero-section": () => import("./previews/STRHeroSectionPreview"),
  "str-about-section": () => import("./previews/STRAboutSectionPreview"),
  "str-programmes-section": () => import("./previews/STRProgrammesSectionPreview"),
  "str-gallery-section": () => import("./previews/STRGallerySectionPreview"),
  "str-testimonials-section": () => import("./previews/STRTestimonialsSectionPreview"),
  "str-team-section": () => import("./previews/STRTeamSectionPreview"),
  "str-faq-section": () => import("./previews/STRFAQSectionPreview"),
  "str-cta-section": () => import("./previews/STRCTASectionPreview"),
  "str-footer": () => import("./previews/STRFooterPreview"),
  "str-contact-modal": () => import("./previews/STRContactModalPreview"),
  "landingpage-header": () => import("./previews/LandingpageHeaderPreview"),
  "landingpage-footer": () => import("./previews/LandingpageFooterPreview"),
  "landingpage-hero-section": () => import("./previews/LandingpageHeroSectionPreview"),
  "landingpage-cta-section": () => import("./previews/LandingpageCTASectionPreview"),
  "landingpage-faq-section": () => import("./previews/LandingpageFAQSectionPreview"),
  "landingpage-services-section": () => import("./previews/LandingpageServicesSectionPreview"),
  "landingpage-testimonials-section": () => import("./previews/LandingpageTestimonialsSectionPreview"),
  "sissonne-layout": () => import("./previews/SissonneLayoutPreview"),
  "sissonne-hero-slider": () => import("./previews/SissonneHeroSliderPreview"),
  "sissonne-testimonial-slider": () => import("./previews/SissonneTestimonialSliderPreview"),
  "sissonne-faculty-slider": () => import("./previews/SissonneFacultySliderPreview"),
  "sissonne-gallery-slider": () => import("./previews/SissonneGallerySliderPreview"),
  "eshop-header": () => import("./previews/EshopHeaderPreview"),
  "eshop-footer": () => import("./previews/EshopFooterPreview"),
  "eshop-category-header": () => import("./previews/EshopCategoryHeaderPreview"),
  "eshop-product-grid": () => import("./previews/EshopProductGridPreview"),
  "eshop-large-hero": () => import("./previews/EshopLargeHeroPreview"),
  "nail-queen-layout": () => import("./previews/NailQueenLayoutPreview"),
  "nail-queen-contact-panel": () => import("./previews/NailQueenContactPanelPreview"),
};

export function preloadPreview(id: string): void {
  if (typeof window !== "undefined" && id in PRELOAD_LOADERS) {
    void PRELOAD_LOADERS[id]();
  }
}
