import React, { useMemo, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ThemeBasePathContext } from "../../context/ThemeBasePathContext";
import "./theme.css";
import Homepage from "./components/Homepage";
import Shop from "./components/Shop";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

interface TenantLandingProps {
  tenantName?: string;
  tenantSlug?: string;
  tenantId?: string;
  pageSlug?: string;
}

const StorefrontTheme: React.FC<TenantLandingProps> = ({
  tenantName = "Storefront",
  tenantSlug = "storefront",
  tenantId,
  pageSlug,
}) => {
  const location = useLocation();
  const params = useParams<{ pageSlug?: string }>();
  const ctxBasePath = useContext(ThemeBasePathContext);
  const basePath = ctxBasePath ?? `/theme/${tenantSlug}`;
  const link = (path: string) => (basePath ? `${basePath.replace(/\/+$/, "")}${path}` : path || "/");

  const current = useMemo(() => {
    const n = (s?: string) => (s && String(s).trim()) ? String(s).replace(/^\/+/, "").replace(/\/+$/, "").toLowerCase() : "";
    if (n(pageSlug)) return n(pageSlug);
    if (params.pageSlug) return params.pageSlug.toLowerCase();
    const pathParts = location.pathname.split("/").filter(Boolean);
    const themeIndex = pathParts.indexOf("theme");
    const tenantIndex = pathParts.indexOf(tenantSlug);
    if (themeIndex < 0 || tenantIndex !== themeIndex + 1) {
      return pathParts[0]?.toLowerCase() || "";
    }
    if (tenantIndex >= 0 && tenantIndex < pathParts.length - 1) {
      return pathParts[tenantIndex + 1]?.toLowerCase() || "";
    }
    return "";
  }, [location.pathname, tenantSlug, params.pageSlug, pageSlug]);

  const renderPage = () => {
    switch (current) {
      case "shop":
        return <Shop />;
      case "product":
        return <Product />;
      case "cart":
        return <Cart />;
      case "checkout":
        return <Checkout />;
      default:
        return <Homepage />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <header className="w-full border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-brandPurple/10 flex items-center justify-center text-brandPurple font-bold">
              {tenantName.substring(0, 1)}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">{tenantName}</span>
              <span className="text-xs text-gray-500">Simple storefront theme</span>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <a
              href={link("")}
              className="px-3 py-2 rounded-md bg-white text-brandPurple border border-brandPurple hover:bg-brandPurple hover:text-white text-sm transition-colors"
            >
              Home
            </a>
            <a
              href={link("/shop")}
              className="px-3 py-2 rounded-md bg-white text-brandPurple border border-brandPurple hover:bg-brandPurple hover:text-white text-sm transition-colors"
            >
              Shop
            </a>
            <a
              href={link("/cart")}
              className="px-3 py-2 rounded-md bg-brandPurple text-white hover:bg-brandPurple hover:text-white border border-brandPurple text-sm transition-colors"
            >
              Cart
            </a>
            <a
              href={link("/checkout")}
              className="px-3 py-2 rounded-md bg-white text-brandPurple border border-brandPurple hover:bg-brandPurple hover:text-white text-sm transition-colors"
            >
              Checkout
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">{renderPage()}</main>

      <footer className="w-full border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto p-4 text-sm text-gray-600">
          © {new Date().getFullYear()} {tenantName}. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default StorefrontTheme;