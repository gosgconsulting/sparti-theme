import React, { useContext, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ThemeBasePathContext } from "../../context/ThemeBasePathContext";
import Header from "../hotel1/components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import "./theme.css";

interface Hotel2ThemeProps {
  basePath?: string;
  pageSlug?: string;
  tenantName?: string;
  tenantSlug?: string;
}

const normalizeSlug = (slug?: string) => {
  if (!slug) return "";
  return String(slug)
    .split("?")[0]
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");
};

const Hotel2Theme: React.FC<Hotel2ThemeProps> = ({
  basePath: basePathProp = "/theme/hotel2",
  tenantName = "Hotel2",
  tenantSlug = "hotel2",
  pageSlug,
}) => {
  const location = useLocation();
  const params = useParams<{ pageSlug?: string }>();
  const ctxBasePath = useContext(ThemeBasePathContext);
  const resolvedBasePath = basePathProp ?? ctxBasePath ?? `/theme/${tenantSlug}`;

  const resolvedPageSlug = useMemo(() => {
    const n = (s?: string) => (s && String(s).trim() ? normalizeSlug(s) : "");
    if (n(pageSlug)) return n(pageSlug);
    if (params.pageSlug) return params.pageSlug;
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

  const topLevelSlug = resolvedPageSlug.split("/").filter(Boolean)[0] || "";

  return (
    <div className="theme-hotel2 min-h-screen flex flex-col">
      <Header tenantName={tenantName} tenantSlug={tenantSlug} basePath={resolvedBasePath} />
      <main className="flex-1">
        {topLevelSlug === "search" ? (
          <SearchResultsPage basePath={resolvedBasePath} />
        ) : (
          <HomePage basePath={resolvedBasePath} />
        )}
      </main>
      <Footer tenantName={tenantName} tenantSlug={tenantSlug} basePath={resolvedBasePath} />
    </div>
  );
};

export default Hotel2Theme;

