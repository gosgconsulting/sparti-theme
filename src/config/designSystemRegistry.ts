/**
 * Design System Registry
 *
 * Single source of truth for all components that appear on the /design-system page.
 * When you add a new theme component (header, footer, hero, section), add an entry here.
 * When you add a new shared component in src/libraries/, add an entry here.
 *
 * Convention:
 * - New themes should reuse components from this registry where possible.
 * - New components (theme or library) must be registered here so they appear
 *   in the design system sidebar and can be used as reference/templates.
 */

export type DesignSystemCategory = "Layout" | "Hero" | "Sections" | "Modals" | "UI" | "Other";

export interface DesignSystemEntry {
  id: string;
  source: string;
  name: string;
  category: DesignSystemCategory;
  /** Optional: path hint for developers (e.g. "themes/master/components/layout/Header") */
  pathHint?: string;
}

/**
 * Full list of design system components, grouped by source (theme or library).
 * Used to build the sidebar on /design-system. Add new components here when you create them.
 */
export const DESIGN_SYSTEM_ENTRIES: DesignSystemEntry[] = [
  // ---- Flowbite (shared library) ----
  { id: "flowbite-header", source: "Flowbite", name: "Header", category: "Layout", pathHint: "libraries/flowbite/components/FlowbiteHeader" },
  { id: "flowbite-footer", source: "Flowbite", name: "Footer", category: "Layout", pathHint: "libraries/flowbite/components/FlowbiteFooter" },
  { id: "flowbite-hero-section", source: "Flowbite", name: "Hero Section", category: "Hero", pathHint: "libraries/flowbite/components/FlowbiteHeroSection" },
  { id: "flowbite-cta-section", source: "Flowbite", name: "CTA Section", category: "Sections", pathHint: "libraries/flowbite/components/FlowbiteCTASection" },
  { id: "flowbite-faq-section", source: "Flowbite", name: "FAQ Section", category: "Sections", pathHint: "libraries/flowbite/components/FlowbiteFAQSection" },
  { id: "flowbite-content-section", source: "Flowbite", name: "Content Section", category: "Sections", pathHint: "libraries/flowbite/components/FlowbiteContentSection" },
  { id: "flowbite-testimonials-section", source: "Flowbite", name: "Testimonials Section", category: "Sections", pathHint: "libraries/flowbite/components/FlowbiteTestimonialsSection" },
  { id: "flowbite-features-section", source: "Flowbite", name: "Features Section", category: "Sections", pathHint: "libraries/flowbite/components/FlowbiteFeaturesSection" },
  { id: "flowbite-pain-point-section", source: "Flowbite", name: "Pain Point Section", category: "Sections", pathHint: "libraries/flowbite/components/FlowbitePainPointSection" },
  { id: "flowbite-whats-included-section", source: "Flowbite", name: "Whats Included Section", category: "Sections", pathHint: "libraries/flowbite/components/FlowbiteWhatsIncludedSection" },
  { id: "flowbite-why-choose-us-section", source: "Flowbite", name: "Why Choose Us Section", category: "Sections", pathHint: "libraries/flowbite/components/FlowbiteWhyChooseUsSection" },
  { id: "flowbite-newsletter", source: "Flowbite", name: "Newsletter", category: "Sections", pathHint: "libraries/flowbite/components/FlowbiteNewsletter" },
  { id: "flowbite-page-title", source: "Flowbite", name: "Page Title", category: "UI", pathHint: "libraries/flowbite/components/FlowbitePageTitle" },
  { id: "flowbite-section", source: "Flowbite", name: "Section (base)", category: "UI", pathHint: "libraries/flowbite/components/FlowbiteSection" },

  // ---- Master theme ----
  { id: "master-header", source: "Master", name: "Header", category: "Layout", pathHint: "themes/master/components/layout/Header" },
  { id: "master-footer", source: "Master", name: "Footer", category: "Layout", pathHint: "themes/master/components/layout/Footer" },
  { id: "master-banner-section", source: "Master", name: "Banner Section", category: "Sections", pathHint: "themes/master/components/BannerSection" },
  { id: "master-our-services-section", source: "Master", name: "Our Services Section", category: "Sections", pathHint: "themes/master/components/OurServicesSection" },
  { id: "master-contact-form-modal", source: "Master", name: "Contact Form Modal", category: "Modals", pathHint: "themes/master/components/modals/ContactFormModal" },

  // ---- Gosgconsulting theme ----
  { id: "gosgconsulting-header", source: "Gosgconsulting", name: "Header", category: "Layout", pathHint: "themes/gosgconsulting/components/Header" },
  { id: "gosgconsulting-footer", source: "Gosgconsulting", name: "Footer", category: "Layout", pathHint: "themes/gosgconsulting/components/Footer" },
  { id: "gosgconsulting-hero-section", source: "Gosgconsulting", name: "Hero Section", category: "Hero", pathHint: "themes/gosgconsulting/components/HeroSection" },
  { id: "gosgconsulting-features-section", source: "Gosgconsulting", name: "Features Section", category: "Sections", pathHint: "themes/gosgconsulting/components/FeaturesSection" },
  { id: "gosgconsulting-services-showcase", source: "Gosgconsulting", name: "Services Showcase", category: "Sections", pathHint: "themes/gosgconsulting/components/ServicesShowcase" },
  { id: "gosgconsulting-content-section", source: "Gosgconsulting", name: "Content Section", category: "Sections", pathHint: "themes/gosgconsulting/components/ContentSection" },
  { id: "gosgconsulting-cta-section", source: "Gosgconsulting", name: "CTA Section", category: "Sections", pathHint: "themes/gosgconsulting/components/CTASection" },
  { id: "gosgconsulting-testimonials-section", source: "Gosgconsulting", name: "Testimonials Section", category: "Sections", pathHint: "themes/gosgconsulting/components/TestimonialsSection" },
  { id: "gosgconsulting-newsletter", source: "Gosgconsulting", name: "Newsletter", category: "Sections", pathHint: "themes/gosgconsulting/components/Newsletter" },

  // ---- STR theme ----
  { id: "str-hero-section", source: "STR", name: "Hero Section", category: "Hero", pathHint: "themes/str/components/HeroSection" },
  { id: "str-page-wrapper", source: "STR", name: "Page Wrapper", category: "Layout", pathHint: "themes/str/components/PageWrapper" },

  // ---- Landingpage theme ----
  { id: "landingpage-header", source: "Landingpage", name: "Header", category: "Layout", pathHint: "themes/landingpage/components/Header" },
  { id: "landingpage-footer", source: "Landingpage", name: "Footer", category: "Layout", pathHint: "themes/landingpage/components/Footer" },
  { id: "landingpage-hero-section", source: "Landingpage", name: "Hero Section", category: "Hero", pathHint: "themes/landingpage/components/HeroSection" },
  { id: "landingpage-cta-section", source: "Landingpage", name: "CTA Section", category: "Sections", pathHint: "themes/landingpage/components/CTASection" },
  { id: "landingpage-faq-section", source: "Landingpage", name: "FAQ Section", category: "Sections", pathHint: "themes/landingpage/components/FAQSection" },
  { id: "landingpage-services-section", source: "Landingpage", name: "Services Section", category: "Sections", pathHint: "themes/landingpage/components/ServicesSection" },
  { id: "landingpage-testimonials-section", source: "Landingpage", name: "Testimonials Section", category: "Sections", pathHint: "themes/landingpage/components/TestimonialsSection" },

  // ---- Sissonne theme ----
  { id: "sissonne-layout", source: "Sissonne", name: "Layout", category: "Layout", pathHint: "themes/sissonne/components/Layout" },
  { id: "sissonne-hero-slider", source: "Sissonne", name: "Hero Slider", category: "Hero", pathHint: "themes/sissonne/components/HeroSlider" },
  { id: "sissonne-testimonial-slider", source: "Sissonne", name: "Testimonial Slider", category: "Sections", pathHint: "themes/sissonne/components/TestimonialSlider" },
  { id: "sissonne-faculty-slider", source: "Sissonne", name: "Faculty Slider", category: "Sections", pathHint: "themes/sissonne/components/FacultySlider" },
  { id: "sissonne-gallery-slider", source: "Sissonne", name: "Gallery Slider", category: "Sections", pathHint: "themes/sissonne/components/GallerySlider" },

  // ---- E-shop theme ----
  { id: "eshop-header", source: "E-shop", name: "Header", category: "Layout", pathHint: "themes/e-shop/components/header/Header" },
  { id: "eshop-footer", source: "E-shop", name: "Footer", category: "Layout", pathHint: "themes/e-shop/components/footer/Footer" },
  { id: "eshop-category-header", source: "E-shop", name: "Category Header", category: "Layout", pathHint: "themes/e-shop/components/category/CategoryHeader" },
  { id: "eshop-product-grid", source: "E-shop", name: "Product Grid", category: "Sections", pathHint: "themes/e-shop/components/category/ProductGrid" },
  { id: "eshop-large-hero", source: "E-shop", name: "Large Hero", category: "Hero", pathHint: "themes/e-shop/components/content/LargeHero" },

  // ---- Nail-queen theme ----
  { id: "nail-queen-layout", source: "Nail-queen", name: "Layout", category: "Layout", pathHint: "themes/nail-queen/components/Layout" },
  { id: "nail-queen-contact-panel", source: "Nail-queen", name: "Contact Panel", category: "UI", pathHint: "themes/nail-queen/components/ContactPanel" },
];

/** Sources in display order for the sidebar */
export const DESIGN_SYSTEM_SOURCES_ORDER = [
  "Flowbite",
  "Master",
  "Gosgconsulting",
  "STR",
  "Landingpage",
  "Sissonne",
  "E-shop",
  "Nail-queen",
] as const;

export function getEntriesBySource(): Map<string, DesignSystemEntry[]> {
  const map = new Map<string, DesignSystemEntry[]>();
  for (const source of DESIGN_SYSTEM_SOURCES_ORDER) {
    map.set(source, []);
  }
  for (const entry of DESIGN_SYSTEM_ENTRIES) {
    const list = map.get(entry.source) ?? [];
    list.push(entry);
    map.set(entry.source, list);
  }
  return map;
}

export function getEntryById(id: string): DesignSystemEntry | undefined {
  return DESIGN_SYSTEM_ENTRIES.find((e) => e.id === id);
}
