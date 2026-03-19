# Design System — All Sections by Theme (Categorised)

**Purpose:** Single reference for every layout, hero, and section used across themes. The `/design-system` sidebar is built from `src/config/designSystemRegistry.ts`, which today lists **reusable components with their own files**. Many themes also use **inline sections** (markup inside the theme’s index or page file). This doc lists both, by theme and by category.

**How to use:**
- **Design system page** (`/design-system`): shows only entries in `designSystemRegistry.ts` (one row per component file).
- **This doc**: lists all page sections per theme (component or inline). Use it to add missing entries to the registry or to extract inline sections into components.

---

## Categories

| Category   | Description |
|-----------|-------------|
| **Layout** | Header, Footer, Page Wrapper, Layout shell, navigation. |
| **Hero**   | Hero section, hero slider, hero banner, large hero. |
| **Sections** | Content blocks: About, Programmes, Gallery, FAQ, CTA, Testimonials, Team, Services, etc. |
| **Modals** | Contact modal, gallery lightbox, form dialogs. |
| **UI**     | Contact panel, page title, base section, small primitives. |
| **Other**  | Blog, checkout, booking-specific blocks. |

---

## Flowbite (shared library)

All are **components** in `src/libraries/flowbite/components/`. All are in the design system registry.

| Section / Component     | Category | In registry |
|--------------------------|----------|-------------|
| FlowbiteHeader           | Layout   | ✅ |
| FlowbiteFooter           | Layout   | ✅ |
| FlowbiteHeroSection      | Hero     | ✅ |
| FlowbiteCTASection       | Sections | ✅ |
| FlowbiteFAQSection       | Sections | ✅ |
| FlowbiteContentSection   | Sections | ✅ |
| FlowbiteTestimonialsSection | Sections | ✅ |
| FlowbiteFeaturesSection  | Sections | ✅ |
| FlowbitePainPointSection | Sections | ✅ |
| FlowbiteWhatsIncludedSection | Sections | ✅ |
| FlowbiteWhyChooseUsSection | Sections | ✅ |
| FlowbiteNewsletter       | Sections | ✅ |
| FlowbitePageTitle        | UI       | ✅ |
| FlowbiteSection (base)   | UI       | ✅ |

---

## Master theme

**Source:** `src/themes/master/index.tsx` + components.

| Section / Component   | Category | In registry | Notes |
|------------------------|----------|-------------|--------|
| Header                 | Layout   | ✅ | `components/layout/Header` |
| Footer                 | Layout   | ✅ | `components/layout/Footer` |
| BannerSection          | Sections | ✅ | Flowbite-style banner |
| OurServicesSection     | Sections | ✅ | Services list |
| ContactFormModal       | Modals   | ✅ | Contact form in modal |
| (Hero via schema)      | Hero     | — | Uses Flowbite/schema override |
| (Testimonials, FAQ, CTA, etc.) | Sections | — | Flowbite components in master index |

---

## STR theme

**Source:** `src/themes/str/index.tsx` (homepage), `group-class.tsx`, `personal-training.tsx`, `physiotherapy.tsx`, `thank-you.tsx`, `booking.tsx`, `packages.tsx`, `classes.tsx`.

STR has **one reusable component** (HeroSection) and **one layout helper** (PageWrapper). All other sections are **inline** in the theme files.

### Layout

| Section        | In registry | Where |
|----------------|-------------|--------|
| Page Wrapper   | ✅ | `components/PageWrapper.tsx` (SEO, GTM, GA, favicon, child inject) |
| Header (sticky) | ❌ | Inline in `index.tsx` (and sub-pages) |
| Footer         | ❌ | Inline in `index.tsx` |

### Hero

| Section     | In registry | Where |
|-------------|-------------|--------|
| Hero Section | ✅ | `components/HeroSection.tsx` |

### Sections (homepage and programme pages)

| Section           | In registry | Where |
|-------------------|-------------|--------|
| About Us          | ❌ | Inline `#about` in `index.tsx` |
| Programmes        | ❌ | Inline `#programmes` (accordion) in `index.tsx` |
| Gallery           | ❌ | Inline `#gallery` (tabs + carousel) in `index.tsx` |
| Testimonials      | ❌ | Inline `#testimonials` (Google reviews carousel) in `index.tsx` |
| Our Team          | ❌ | Inline `#team` in `index.tsx` |
| FAQ               | ❌ | Inline `#faq` (accordion) in `index.tsx` |
| Call to Action Banner | ❌ | Inline `#contact` in `index.tsx` |

### Modals

| Section         | In registry | Where |
|-----------------|-------------|--------|
| Contact Modal   | ❌ | `ContactModal.tsx` (imported in index) |
| Gallery Image Modal | ❌ | Inline `Dialog` in `index.tsx` |

**Summary:** STR has **2** items in the design system registry (Hero Section, Page Wrapper) but **10+** distinct page sections. To show them all on `/design-system`, either add registry entries that point to “inline” (and optionally add preview wrappers) or extract About, Programmes, Gallery, Testimonials, Team, FAQ, CTA, Header, Footer, ContactModal into separate components and register those.

---

## Gosgconsulting theme

**Source:** Schema-driven via `DynamicPageRenderer`; component set in `src/themes/gosgconsulting/components/registry.ts`.

All sections below are **components** (own files). Only a subset is in the **design system registry** today.

### Layout

| Section / Component | In registry | File |
|----------------------|-------------|------|
| Header               | ✅ | `Header.tsx` |
| Footer               | ✅ | `Footer.tsx` |

### Hero

| Section / Component | In registry | File |
|----------------------|-------------|------|
| Hero Section         | ✅ | `HeroSection.tsx` |
| Home Hero Section    | ❌ | `HomeHeroSection.tsx` |
| Hero Section Simple  | ❌ | `HeroSectionSimple.tsx` |
| Simple Hero Banner   | ❌ | `SimpleHeroBanner.tsx` |

### Sections

| Section / Component     | In registry | File |
|--------------------------|-------------|------|
| Features Section        | ✅ | `FeaturesSection.tsx` |
| Services Showcase       | ✅ | `ServicesShowcase.tsx` |
| Content Section         | ✅ | `ContentSection.tsx` |
| CTA Section             | ✅ | `CTASection.tsx` |
| Testimonials Section    | ✅ | `TestimonialsSection.tsx` |
| Newsletter               | ✅ | `Newsletter.tsx` |
| About Section           | ❌ | `AboutSection.tsx` |
| Challenge Section       | ❌ | `ChallengeSection.tsx` |
| Gallery4 Section        | ❌ | `Gallery4Section.tsx` |
| Blog Section            | ❌ | `BlogSection.tsx` |
| Results Carousel Section| ❌ | `ResultsCarouselSection.tsx` |
| Case Study Banner       | ❌ | `CaseStudyBanner.tsx` |
| Our Services (wrapper)  | ❌ | `OurServicesSectionWrapper.tsx` |
| Simple Pricing Section  | ❌ | `SimplePricingSection.tsx` |
| Simple Text Section     | ❌ | `SimpleTextSection.tsx` |
| Simple List Section     | ❌ | `SimpleListSection.tsx` |
| Simple Stats Section    | ❌ | `SimpleStatsSection.tsx` |
| FAQ Section             | ❌ | `FAQSection.tsx` |
| FAQ Accordion           | ❌ | `FAQAccordion.tsx` |
| Gallery Section         | ❌ | `GallerySection.tsx` |
| Image Gallery           | ❌ | `ImageGallery.tsx` |
| Pain Point Section      | ❌ | `PainPointSection.tsx` |
| Results Section         | ❌ | `ResultsSection.tsx` |
| Services Section        | ❌ | `ServicesSection.tsx` |
| Team Section            | ❌ | `TeamSection.tsx` |
| Video Section           | ❌ | `VideoSection.tsx` |
| Whats Included Section  | ❌ | `WhatsIncludedSection.tsx` |
| Why Choose Us Section  | ❌ | `WhyChooseUsSection.tsx` |
| Ingredients Section    | ❌ | `IngredientsSection.tsx` |

### Modals / UI

| Section / Component | In registry | File |
|----------------------|-------------|------|
| Contact Modal        | ❌ | `ContactModal.tsx` |
| Simple Header        | ❌ | `SimpleHeader.tsx` |
| Page Title           | ❌ | `PageTitle.tsx` |

---

## Landingpage theme

**Source:** `src/themes/landingpage/index.tsx` + components.

| Section / Component | Category | In registry | File |
|----------------------|----------|-------------|------|
| Header               | Layout   | ✅ | `Header.tsx` |
| Footer                | Layout   | ✅ | `Footer.tsx` |
| Hero Section          | Hero     | ✅ | `HeroSection.tsx` |
| Services Section      | Sections | ✅ | `ServicesSection.tsx` |
| Testimonials Section  | Sections | ✅ | `TestimonialsSection.tsx` |
| FAQ Section           | Sections | ✅ | `FAQSection.tsx` |
| CTA Section           | Sections | ✅ | `CTASection.tsx` |
| Contact Form Dialog   | Modals   | ❌ | `ContactFormDialog.tsx` |

---

## Sissonne theme

**Source:** `src/themes/sissonne/index.tsx`, `pages/Index.tsx`, `Layout.tsx`, sliders.

| Section / Component   | Category | In registry | File / location |
|------------------------|----------|-------------|-------------------|
| Layout                 | Layout   | ✅ | `Layout.tsx` |
| Hero Slider            | Hero     | ✅ | `HeroSlider.tsx` |
| Testimonial Slider     | Sections | ✅ | `TestimonialSlider.tsx` |
| Faculty Slider         | Sections | ✅ | `FacultySlider.tsx` |
| Gallery Slider         | Sections | ✅ | `GallerySlider.tsx` |
| (Programs, Faculty, Gallery, About content) | Sections | ❌ | Inline in `pages/Index.tsx` and other pages |

---

## E-shop theme

**Source:** `src/themes/e-shop/index.tsx`, `pages/Index.tsx`, `pages/Category.tsx`, content components.

| Section / Component       | Category | In registry | File |
|----------------------------|----------|-------------|------|
| Header                     | Layout   | ✅ | `header/Header.tsx` |
| Footer                     | Layout   | ✅ | `footer/Footer.tsx` |
| Category Header            | Layout   | ✅ | `category/CategoryHeader.tsx` |
| Large Hero                 | Hero     | ✅ | `content/LargeHero.tsx` |
| Product Grid               | Sections | ✅ | `category/ProductGrid.tsx` |
| FiftyFifty Section         | Sections | ❌ | `content/FiftyFiftySection.tsx` |
| Product Carousel           | Sections | ❌ | `content/ProductCarousel.tsx` |
| OneThirdTwoThirds Section  | Sections | ❌ | `content/OneThirdTwoThirdsSection.tsx` |
| Editorial Section          | Sections | ❌ | `content/EditorialSection.tsx` |

---

## Nail-queen theme

**Source:** `src/themes/nail-queen/index.tsx`, Layout + pages.

| Section / Component | Category | In registry | File |
|----------------------|----------|-------------|------|
| Layout               | Layout   | ✅ | `Layout.tsx` |
| Contact Panel        | UI       | ✅ | `ContactPanel.tsx` |
| (Page content)       | —        | — | Per-page (HomePage, PricingPage, GalleryPage, etc.) |

---

## Summary: registry vs actual sections

- **Flowbite, Master, Landingpage, Sissonne, E-shop, Nail-queen:** registry is a reasonable subset of what the theme uses; some sections are inline or not yet registered.
- **STR:** registry has only Hero Section + Page Wrapper; all other sections (About, Programmes, Gallery, Testimonials, Team, FAQ, CTA, Header, Footer, Contact Modal) are inline — design system sidebar under STR is incomplete.
- **Gosgconsulting:** many section components exist in the theme registry; only a few are in the **design system** registry. Adding more to `designSystemRegistry.ts` would make the design system page reflect the full set.

---

## Keeping this doc up to date

1. When adding a **new section** to a theme (component or inline), add a row under that theme and set “In registry” to ✅ only if it’s in `src/config/designSystemRegistry.ts`.
2. When adding an entry to `designSystemRegistry.ts`, add or update the corresponding row here and set “In registry” to ✅.
3. Optionally add a “Next” section at the bottom listing sections to extract or register (e.g. “STR: extract About, Programmes, Gallery… into components and register”).

---

**Related:** `src/config/designSystemRegistry.ts`, `docs/DESIGN_SYSTEM_GUIDELINE.md`, `docs/DESIGN_SYSTEM_PREVIEW_PLAN.md`, `/design-system` route.
