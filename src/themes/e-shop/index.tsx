import React, { useEffect, useMemo, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ThemeBasePathContext } from "../../context/ThemeBasePathContext";
import "./theme.css";
import { ThemeBasePathProvider } from "./components/ThemeLink";

import IndexPage from "./pages/Index";
import CategoryPage from "./pages/Category";
import ProductDetailPage from "./pages/ProductDetail";
import CheckoutPage from "./pages/Checkout";
import OurStoryPage from "./pages/about/OurStory";
import SustainabilityPage from "./pages/about/Sustainability";
import SizeGuidePage from "./pages/about/SizeGuide";
import CustomerCarePage from "./pages/about/CustomerCare";
import StoreLocatorPage from "./pages/about/StoreLocator";
import PrivacyPolicyPage from "./pages/PrivacyPolicy";
import TermsOfServicePage from "./pages/TermsOfService";
import NotFoundPage from "./pages/NotFound";

interface EShopThemeProps {
  tenantName?: string;
  tenantSlug?: string;
  tenantId?: string;
  pageSlug?: string;
}

function normalizeSlug(slug?: string) {
  if (!slug) return "";
  return slug.replace(/^\/+/, "").replace(/\/+$/, "");
}

const EShopTheme: React.FC<EShopThemeProps> = ({
  tenantName = "E-shop",
  tenantSlug = "e-shop",
  tenantId,
  pageSlug,
}) => {
  const location = useLocation();
  const params = useParams<{ pageSlug?: string }>();
  const ctxBasePath = useContext(ThemeBasePathContext);
  const basePath = ctxBasePath ?? `/theme/${tenantSlug}`;

  const current = useMemo(() => {
    const n = normalizeSlug(pageSlug);
    if (n) return n;
    if (params.pageSlug) return normalizeSlug(params.pageSlug);
    const pathParts = location.pathname.split("/").filter(Boolean);
    const themeIndex = pathParts.indexOf("theme");
    const tenantIndex = pathParts.indexOf(tenantSlug);
    if (themeIndex < 0 || tenantIndex !== themeIndex + 1) {
      return pathParts.length ? pathParts.join("/") : "";
    }
    if (tenantIndex >= 0 && tenantIndex < pathParts.length - 1) {
      return pathParts.slice(tenantIndex + 1).join("/");
    }
    return "";
  }, [location.pathname, tenantSlug, params.pageSlug, pageSlug]);

  // Scroll restoration for theme navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [current]);

  const renderPage = () => {
    if (!current) {
      return <IndexPage />;
    }

    if (current.startsWith("category/")) {
      const category = current.split("/").slice(1).join("/") || "shop";
      return <CategoryPage category={category} />;
    }

    if (current.startsWith("product/")) {
      const productId = current.split("/").slice(1).join("/") || "";
      return <ProductDetailPage productId={productId} />;
    }

    if (current === "checkout") {
      return <CheckoutPage />;
    }

    if (current === "privacy-policy") {
      return <PrivacyPolicyPage />;
    }

    if (current === "terms-of-service") {
      return <TermsOfServicePage />;
    }

    if (current === "about/our-story") {
      return <OurStoryPage />;
    }

    if (current === "about/sustainability") {
      return <SustainabilityPage />;
    }

    if (current === "about/size-guide") {
      return <SizeGuidePage />;
    }

    if (current === "about/customer-care") {
      return <CustomerCarePage />;
    }

    if (current === "about/store-locator") {
      return <StoreLocatorPage />;
    }

    return <NotFoundPage />;
  };

  return (
    <ThemeBasePathProvider basePath={basePath}>
      <div className="eshop-theme min-h-screen bg-background text-foreground">
        {renderPage()}
      </div>
    </ThemeBasePathProvider>
  );
};

export default EShopTheme;