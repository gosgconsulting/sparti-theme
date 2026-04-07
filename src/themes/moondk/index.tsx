import React, { useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./theme.css";
import { CartProvider } from "./contexts/CartContext";

import IndexPage from "./pages/Index";
import CategoryPage from "./pages/Category";
import ProductDetailPage from "./pages/ProductDetail";
import CheckoutPage from "./pages/Checkout";
import HitPayCallbackPage from "./pages/HitPayCallbackPage";
import OurStoryPage from "./pages/about/OurStory";
import SustainabilityPage from "./pages/about/Sustainability";
import SizeGuidePage from "./pages/about/SizeGuide";
import StoreLocatorPage from "./pages/about/StoreLocator";
import PrivacyPolicyPage from "./pages/PrivacyPolicy";
import TermsOfServicePage from "./pages/TermsOfService";
import DeliveryAndReturnPolicyPage from "./pages/DeliveryAndReturnPolicy";
import NotFoundPage from "./pages/NotFound";
import RecipesPage from "./pages/Recipes";
import RecipeDetailPage from "./pages/RecipeDetail";
import BrokPrivateDinningPage from "./pages/BrokPrivateDinning";

interface MoondkThemeProps {
  tenantName?: string;
  tenantSlug?: string;
  tenantId?: string;
  pageSlug?: string;
}

function normalizeSlug(slug?: string) {
  if (!slug) return "";
  return slug.replace(/^\/+/, "").replace(/\/+$/, "");
}

const MoondkTheme: React.FC<MoondkThemeProps> = ({
  tenantName = "Moondk",
  tenantSlug = "moondk",
  tenantId,
  pageSlug,
}) => {
  const location = useLocation();
  const params = useParams<{ pageSlug?: string }>();

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

    if (current === "checkout/hitpay/callback") {
      return <HitPayCallbackPage />;
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

    if (current === "delivery-and-return-policy") {
      return <DeliveryAndReturnPolicyPage />;
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

    if (current === "about/store-locator") {
      return <StoreLocatorPage />;
    }

    if (current === "recipes") {
      return <RecipesPage />;
    }

    if (current.startsWith("recipes/")) {
      const recipeSlug = current.split("/").slice(1).join("/") || "";
      return <RecipeDetailPage recipeSlug={recipeSlug} />;
    }

    if (current === "beok-private-dinning") {
      return <BrokPrivateDinningPage />;
    }

    return <NotFoundPage />;
  };

  return (
    <CartProvider>
      <div className="moondk-theme min-h-screen bg-background text-foreground">
        {renderPage()}
      </div>
    </CartProvider>
  );
};

export default MoondkTheme;