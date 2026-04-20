import React, { useEffect, useState, useMemo, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ThemeBasePathContext } from "../../context/ThemeBasePathContext";
import type { ComponentSchema } from "@/types/schema";
import BannerSection from "./components/BannerSection";
import TabFeaturesSection from "./components/TabFeaturesSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import FlowbiteTestimonialsSection from "@/libraries/flowbite/components/FlowbiteTestimonialsSection";
import FlowbiteFAQSection from "@/libraries/flowbite/components/FlowbiteFAQSection";
import { initFlowbiteTheme } from "@/utils/flowbiteThemeManager";
import { useThemeBranding } from "../../hooks/useThemeSettings";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ContactFormModal from "./components/modals/ContactFormModal";

import { ThankYouPage } from "./pages/ThankYouPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import BlogListPage from "./pages/blog/BlogListPage";
import BlogPostPage from "./pages/blog/BlogPostPage";
import "./theme.css";

// Helper function to adjust color brightness
const adjustColorBrightness = (hex: string, percent: number): string => {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
  return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
};

interface MasterThemeProps {
  basePath?: string;
  pageSlug?: string;
  tenantName?: string;
  tenantSlug?: string;
  tenantId?: string;
  designSystemTheme?: "default" | "minimal" | "enterprise" | "playful" | "mono";
  logoSrc?: string;
  heroSchemaOverride?: ComponentSchema;
  faqSchemaOverride?: ComponentSchema;
}

const normalizeSlug = (slug?: string) => {
  if (!slug) return "";
  return String(slug)
    .split("?")[0]
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");
};

/**
 * Master Theme
 *
 * This theme is meant to be the best-practice reference implementation for:
 * - folder structure
 * - CMS connection patterns
 * - deployable front-end theme output
 *
 * Asset convention:
 * - Put hard-coded assets under: src/themes/master/assets
 * - Reference them as: /theme/<themeSlug>/assets/<file>
 */
const MasterTheme: React.FC<MasterThemeProps> = ({
  basePath: basePathProp = "/theme/master",
  pageSlug,
  tenantName = "Master Template",
  tenantSlug = "master",
  tenantId,
  designSystemTheme = "default",
  logoSrc: logoSrcProp,
  heroSchemaOverride,
  faqSchemaOverride,
}) => {
  const location = useLocation();
  const params = useParams<{ pageSlug?: string }>();
  const ctxBasePath = useContext(ThemeBasePathContext);
  const resolvedBasePath = basePathProp ?? ctxBasePath ?? `/theme/${tenantSlug}`;
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const themeSlug = tenantSlug || "master";

  // Fetch branding colors from database
  const { branding } = useThemeBranding(themeSlug, tenantId);

  // Extract logo from branding if not provided as prop
  const logoSrc = logoSrcProp || (branding as any)?.site_logo || undefined;

  // Apply branding colors as CSS variables
  useEffect(() => {
    if (branding) {
      const root = document.documentElement;
      const brandingColors = branding as any;

      if (brandingColors.color_primary) {
        const primaryColor = String(brandingColors.color_primary);
        root.style.setProperty("--brand-primary", primaryColor);
        const darker = adjustColorBrightness(primaryColor, -10);
        root.style.setProperty("--brand-primary-dark", darker);
        const lighter = adjustColorBrightness(primaryColor, 20);
        root.style.setProperty("--brand-primary-light", lighter);
      }

      if (brandingColors.color_secondary) {
        const secondaryColor = String(brandingColors.color_secondary);
        root.style.setProperty("--brand-secondary", secondaryColor);
        const darker = adjustColorBrightness(secondaryColor, -10);
        root.style.setProperty("--brand-secondary-dark", darker);
        const lighter = adjustColorBrightness(secondaryColor, 20);
        root.style.setProperty("--brand-secondary-light", lighter);
      }

      if (brandingColors.color_accent) {
        const accentColor = String(brandingColors.color_accent);
        root.style.setProperty("--brand-accent", accentColor);
        const darker = adjustColorBrightness(accentColor, -10);
        root.style.setProperty("--brand-accent-dark", darker);
        const lighter = adjustColorBrightness(accentColor, 20);
        root.style.setProperty("--brand-accent-light", lighter);
      }

      if (brandingColors.color_text) {
        root.style.setProperty("--brand-text", String(brandingColors.color_text));
      }

      if (brandingColors.color_background) {
        root.style.setProperty(
          "--brand-background",
          String(brandingColors.color_background)
        );
      }

      if (brandingColors.color_gradient_start) {
        root.style.setProperty(
          "--brand-gradient-start",
          String(brandingColors.color_gradient_start)
        );
      }

      if (brandingColors.color_gradient_end) {
        root.style.setProperty(
          "--brand-gradient-end",
          String(brandingColors.color_gradient_end)
        );
      }
    }
  }, [branding]);

  // Initialize Flowbite theme on mount
  useEffect(() => {
    initFlowbiteTheme(designSystemTheme);
  }, [designSystemTheme]);

  // Intercept CTA button clicks to open contact modal
  useEffect(() => {
    const handleCTAClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('a[href="#contact"], button');
      if (button && button.getAttribute("href") === "#contact") {
        e.preventDefault();
        e.stopPropagation();
        setIsContactModalOpen(true);
      }
    };

    document.addEventListener("click", handleCTAClick, true);
    return () => {
      document.removeEventListener("click", handleCTAClick, true);
    };
  }, []);

  const resolvedPageSlug = useMemo(() => {
    const n = (s?: string) => (s && String(s).trim()) ? normalizeSlug(s) : '';
    if (n(pageSlug)) return n(pageSlug);
    if (params.pageSlug) return params.pageSlug;
    const pathParts = location.pathname.split('/').filter(Boolean);
    const themeIndex = pathParts.indexOf('theme');
    const tenantIndex = pathParts.indexOf(tenantSlug);
    if (themeIndex < 0 || tenantIndex !== themeIndex + 1) {
      return pathParts.length ? pathParts.join('/') : '';
    }
    if (tenantIndex >= 0 && tenantIndex < pathParts.length - 1) {
      return pathParts.slice(tenantIndex + 1).join('/');
    }
    return '';
  }, [location.pathname, tenantSlug, params.pageSlug, pageSlug]);

  const slugParts = resolvedPageSlug.split("/").filter(Boolean);
  const topLevelSlug = slugParts[0] || "";

  const isThankYouPage =
    topLevelSlug === "thank-you" ||
    location.pathname === "/thank-you" ||
    location.pathname.endsWith("/thank-you") ||
    location.pathname.includes("/thank-you");

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  if (isThankYouPage) {
    return (
      <ThankYouPage
        tenantName={tenantName}
        tenantSlug={themeSlug}
        tenantId={tenantId}
        basePath={resolvedBasePath}
      />
    );
  }

  // Landing page schemas - use overrides if provided, otherwise use defaults
  const heroSchema: ComponentSchema = heroSchemaOverride || {
    type: "banner-section",
    props: {},
    items: [
      {
        key: "subtitle",
        type: "text",
        content: "Web Platform for Growing Brands",
      },
      {
        key: "title",
        type: "heading",
        level: 1,
        content: "Your Business Needs More Than a Website.\nIt Needs Growth.",
      },
      {
        key: "description",
        type: "text",
        content:
          "High‑performance pages, strong messaging, and conversion-first UX — so every visit has a clear path to revenue.",
      },
      {
        key: "cta",
        type: "button",
        content: "Get Started",
        link: "#contact",
      },
    ],
  };

  const testimonialsSchema: ComponentSchema = {
    type: "flowbite-testimonials-section",
    props: {},
    items: [
      { key: "title", type: "heading", level: 2, content: "Loved by growing brands" },
      { key: "subtitle", type: "text", content: "Real feedback from teams we've helped." },
      {
        key: "reviews",
        type: "array",
        items: [
          { key: "r1", type: "review", props: { content: "Our landing page went from 'nice' to 'high converting' in a week. Clean sections, fast results.", name: "Sarah C.", title: "Founder" } },
          { key: "r2", type: "review", props: { content: "The design looks premium and the SEO content we generate ranks within days.", name: "Marcus T.", title: "Marketing Lead" } },
          { key: "r3", type: "review", props: { content: "We finally have a consistent brand system we can iterate on without redoing everything.", name: "Priya S.", title: "Operations" } },
          { key: "r4", type: "review", props: { content: "The layout feels modern and fast. Great UX on mobile, great results on desktop.", name: "David L.", title: "CEO" } },
        ],
      },
    ],
  };

  const aboutSchema: ComponentSchema = {
    type: "about-section",
    props: {
      imageSrc: `/theme/${themeSlug}/assets/placeholder.svg`,
      imageAlt: "About us",
    },
    items: [
      { key: "badge", type: "text", content: "About us" },
      { key: "title", type: "heading", level: 2, content: "We Are Your Growth Team And We Will Take You Further" },
      { key: "content1", type: "text", content: "We handle the full funnel end-to-end: positioning, website conversion, SEO, paid ads, creatives, and tracking — so every channel works together to drive revenue." },
      { key: "content2", type: "text", content: "Our proven systems generate leads and revenue month after month, while you stay focused on running the business." },
      { key: "bullet1", type: "text", content: "Full-funnel strategy from day one" },
      { key: "bullet2", type: "text", content: "Dedicated growth team, not freelancers" },
      { key: "bullet3", type: "text", content: "Transparent reporting every month" },
      { key: "stat1", type: "stat", props: { value: "3×", label: "Average revenue growth" } },
      { key: "stat2", type: "stat", props: { value: "90%", label: "Client retention rate" } },
      { key: "stat3", type: "stat", props: { value: "50+", label: "Brands scaled" } },
      { key: "cta", type: "button", content: "Work with us", link: "#contact" },
    ],
  };

  const contactSchema: ComponentSchema = {
    type: "contact-section",
    props: {},
    items: [
      {
        key: "headline",
        type: "text",
        content: "Scale Your Revenue 10x Faster Than In-House",
      },
      {
        key: "description",
        type: "text",
        content:
          "Fill out this form and we will get back to you to understand your business and goals. If we can help, we will develop a free customised growth strategy.",
      },
      {
        key: "buttonLabel",
        type: "text",
        content: "Get My Free Strategy",
      },
    ],
  };

  const faqSchema: ComponentSchema = faqSchemaOverride || {
    type: "flowbite-faq-section",
    props: {},
    items: [
      {
        key: "title",
        type: "heading",
        level: 2,
        content: "Frequently Asked Questions",
      },
      {
        key: "faqItems",
        type: "array",
        items: [
          {
            key: "question",
            type: "text",
            content: "What does 'full‑stack growth' mean?",
          },
          {
            key: "answer",
            type: "text",
            content:
              "We handle the full funnel end-to-end: positioning, website conversion, SEO, paid ads, creatives, and tracking—so every channel works together to drive revenue.",
          },
        ],
      },
      {
        key: "faq1",
        type: "array",
        items: [
          {
            key: "question",
            type: "text",
            content: "How fast will I see results?",
          },
          {
            key: "answer",
            type: "text",
            content:
              "Paid ads can generate leads quickly, while SEO compounds over time. We'll align the plan to your goals and share clear performance reporting month-to-month.",
          },
        ],
      },
      {
        key: "faq2",
        type: "array",
        items: [
          {
            key: "question",
            type: "text",
            content: "Do you work with my existing website?",
          },
          {
            key: "answer",
            type: "text",
            content:
              "Yes. We can optimize your current site for conversions and SEO, or rebuild key pages where needed—without disrupting your brand.",
          },
        ],
      },
      {
        key: "faq3",
        type: "array",
        items: [
          {
            key: "question",
            type: "text",
            content: "Is this a good fit for small businesses?",
          },
          {
            key: "answer",
            type: "text",
            content:
              "Yes. We tailor scopes to your stage—whether you need a consistent lead pipeline, better conversion rates, or a complete growth system.",
          },
        ],
      },
    ],
  };

  const renderMain = () => {
    if (topLevelSlug === "blog") {
      if (slugParts.length === 1) {
        return <BlogListPage basePath={resolvedBasePath} tenantId={tenantId} />;
      }
      return (
        <BlogPostPage
          basePath={resolvedBasePath}
          slug={slugParts[1] || ""}
          tenantId={tenantId}
        />
      );
    }

    if (topLevelSlug === "privacy-policy") {
      return <PrivacyPolicyPage tenantName={tenantName} />;
    }

    if (topLevelSlug === "terms-and-conditions" || topLevelSlug === "terms") {
      return <TermsAndConditionsPage tenantName={tenantName} />;
    }

    return (
      <>
        <div id="hero">
          <BannerSection component={heroSchema} />
        </div>

        <div id="features" className="scroll-mt-20">
          <TabFeaturesSection themeSlug={themeSlug} />
        </div>

        <div id="testimonials" className="scroll-mt-20">
          <FlowbiteTestimonialsSection component={testimonialsSchema} />
        </div>

        <div id="about" className="scroll-mt-20">
          <AboutSection component={aboutSchema} />
        </div>

        <div id="faq" className="scroll-mt-20">
          <FlowbiteFAQSection component={faqSchema} />
        </div>

        <ContactSection
          component={contactSchema}
          tenantName={tenantName}
          themeSlug={themeSlug}
        />
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-(--brand-background)">
      <Header
        tenantName={tenantName}
        tenantSlug={themeSlug}
        basePath={resolvedBasePath}
        logoSrc={logoSrc}
        onContactClick={handleContactClick}
      />

      <main className="flex-1">{renderMain()}</main>

      <Footer tenantName={tenantName} tenantSlug={themeSlug} basePath={resolvedBasePath} />

      <ContactFormModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        tenantName={tenantName}
        themeSlug={themeSlug}
      />
    </div>
  );
};

export default MasterTheme;