import React, { useEffect, useMemo, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ThemeBasePathContext } from "../../context/ThemeBasePathContext";
import { useThemeBranding } from "../../hooks/useThemeSettings";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
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

const normalizeSlug = (slug?: string) => {
  if (!slug) return "";
  return String(slug)
    .split("?")[0]
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");
};

interface Hotel1ThemeProps {
  basePath?: string;
  pageSlug?: string;
  tenantName?: string;
  tenantSlug?: string;
  tenantId?: string;
  designSystemTheme?: string;
}

/**
 * Hotel1 Theme
 *
 * A new hotel booking theme based on the hotel theme structure.
 */
const Hotel1Theme: React.FC<Hotel1ThemeProps> = ({
  basePath: basePathProp = "/theme/hotel1",
  pageSlug,
  tenantName = "Hotel1",
  tenantSlug = "hotel1",
  tenantId,
  designSystemTheme,
}) => {
  const location = useLocation();
  const params = useParams<{ pageSlug?: string }>();
  const ctxBasePath = useContext(ThemeBasePathContext);
  const resolvedBasePath = basePathProp ?? ctxBasePath ?? `/theme/${tenantSlug}`;

  const themeSlug = tenantSlug || "hotel1";

  const { branding } = useThemeBranding(themeSlug, tenantId);

  // Apply branding colors as CSS variables
  useEffect(() => {
    if (branding) {
      const root = document.documentElement;
      const brandingColors = branding as any;

      // Apply primary color (defaults to #0a0a0a)
      if (brandingColors.color_primary) {
        const primaryColor = String(brandingColors.color_primary);
        root.style.setProperty("--brand-primary", primaryColor);
      } else {
        root.style.setProperty("--brand-primary", "#0a0a0a");
      }

      // Apply accent color (defaults to #a37d4c - gold)
      if (brandingColors.color_accent) {
        const accentColor = String(brandingColors.color_accent);
        root.style.setProperty("--brand-accent", accentColor);
        const darker = adjustColorBrightness(accentColor, -10);
        root.style.setProperty("--brand-accent-dark", darker);
        const lighter = adjustColorBrightness(accentColor, 20);
        root.style.setProperty("--brand-accent-light", lighter);
      } else {
        root.style.setProperty("--brand-accent", "#a37d4c");
        root.style.setProperty("--brand-accent-dark", "#967142");
        root.style.setProperty("--brand-accent-light", "#b89365");
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
    }
  }, [branding]);

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

  return (
    <div className="theme-hotel1 min-h-screen flex flex-col">
      <Header
        tenantName={tenantName}
        tenantSlug={themeSlug}
        basePath={resolvedBasePath}
      />

      <main className="flex-1">
        <HomePage
          basePath={resolvedBasePath}
          tenantId={tenantId}
          tenantName={tenantName}
          themeSlug={themeSlug}
        />
      </main>

      <Footer tenantName={tenantName} tenantSlug={themeSlug} basePath={resolvedBasePath} />
    </div>
  );
};

export default Hotel1Theme;
