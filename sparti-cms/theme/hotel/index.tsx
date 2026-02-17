import React, { useEffect, useMemo, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ThemeBasePathContext } from "../../context/ThemeBasePathContext";
import { RoomContext } from "./context/RoomContext";
import { useThemeBranding } from "../../hooks/useThemeSettings";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import RoomDetailsPage from "./pages/RoomDetailsPage";
import type { HotelThemeProps } from "./types";
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

/**
 * Hotel Theme
 *
 * Interactive hotel booking theme with room listings, filtering, and reservation system.
 * Features:
 * - Hero slider with autoplay
 * - Room search with guest count filters (adults/kids)
 * - Detailed room views with booking functionality
 * - Responsive design optimized for mobile and desktop
 */
const HotelTheme: React.FC<HotelThemeProps> = ({
  basePath: basePathProp = "/theme/hotel",
  pageSlug,
  tenantName = "Hotel Adina",
  tenantSlug = "hotel",
  tenantId,
  designSystemTheme,
}) => {
  const location = useLocation();
  const params = useParams<{ pageSlug?: string }>();
  const ctxBasePath = useContext(ThemeBasePathContext);
  const resolvedBasePath = basePathProp ?? ctxBasePath ?? `/theme/${tenantSlug}`;

  const themeSlug = tenantSlug || "hotel";

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

  const slugParts = resolvedPageSlug.split("/").filter(Boolean);
  const topLevelSlug = slugParts[0] || "";

  const renderMain = () => {
    if (topLevelSlug === "room") {
      const roomId = slugParts[1] || "";
      return (
        <RoomDetailsPage
          roomId={roomId}
          basePath={resolvedBasePath}
          tenantId={tenantId}
          tenantName={tenantName}
          themeSlug={themeSlug}
        />
      );
    }

    return (
      <HomePage
        basePath={resolvedBasePath}
        tenantId={tenantId}
        tenantName={tenantName}
        themeSlug={themeSlug}
      />
    );
  };

  return (
    <RoomContext>
      <div className="theme-hotel min-h-screen flex flex-col">
        <Header
          tenantName={tenantName}
          tenantSlug={themeSlug}
          basePath={resolvedBasePath}
        />

        <main className="flex-1">{renderMain()}</main>

        <Footer tenantName={tenantName} tenantSlug={themeSlug} />
      </div>
    </RoomContext>
  );
};

export default HotelTheme;