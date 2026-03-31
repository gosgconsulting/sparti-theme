import React from "react";
import { Link, useLocation } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SocialMediaSticky } from "./SocialMediaSticky";
import { useEffect, useState } from "react";
import ContactPanel from "./ContactPanel";
import { useThemeBranding } from "../../../hooks/useThemeSettings";
import { getThemeAssetUrl } from "../../../utils/themeAssets";
import { getSiteName, getLogoSrc } from "../utils/settings";

const THEME_SLUG = "nail-queen";

interface LayoutProps {
  basePath: string;
  children: React.ReactNode;
  tenantId?: string;
}

const joinPath = (basePath: string, subPath: string) => {
  const base = basePath.replace(/\/+$/, "");
  const sub = subPath.startsWith("/") ? subPath : `/${subPath}`;
  return subPath === "" ? base : `${base}${sub}`;
};

export function Layout({ basePath, children, tenantId }: LayoutProps) {
  const location = useLocation();

  // Load branding settings from database
  const { branding, loading: brandingLoading } = useThemeBranding('nail-queen', tenantId);

  // Get settings from database with fallback to defaults
  const siteName = getSiteName(branding, 'Nail Queen');
  const logoSrc = getLogoSrc(branding);
  const defaultLogoSrc = getThemeAssetUrl(basePath, "nq-site-brand.png", THEME_SLUG);

  const [isContactOpen, setIsContactOpen] = useState(false);
  useEffect(() => {
    const handler = () => setIsContactOpen(true);
    window.addEventListener("nailqueen:open-contact", handler);
    return () => window.removeEventListener("nailqueen:open-contact", handler);
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Pricing", path: "/pricing" },
    { label: "Find us", path: "/find-us" },
    { label: "Gallery", path: "/gallery" },
    { label: "About", path: "/about" },
    { label: "Blog", path: "/blog" },
  ];

  const isActive = (path: string) => {
    const full = joinPath(basePath, path);
    return location.pathname === full;
  };

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setMobileNavOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const renderBrandLogo = () => (
    <img
      src={brandingLoading ? defaultLogoSrc : logoSrc}
      alt={siteName}
      className="h-12 w-auto max-h-12 max-md:h-10 max-md:max-h-10"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        if (target.dataset.fallbackAdded) return;
        target.dataset.fallbackAdded = "true";
        if (target.src !== defaultLogoSrc) {
          target.src = defaultLogoSrc;
        }
      }}
    />
  );

  const bookNowButtonClass = cn(
    "inline-flex items-center justify-center rounded-full bg-nail-queen-brown font-medium text-white transition-colors hover:bg-nail-queen-brown/90",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nail-queen-brown focus-visible:ring-offset-2 max-md:focus-visible:ring-offset-0",
    "min-h-9 max-w-full px-2.5 py-1.5 text-xs md:shrink-0 md:max-w-none md:px-5 md:py-2.5 md:min-h-11 md:text-sm"
  );

  return (
    <div className="min-h-screen bg-background">
      <SocialMediaSticky basePath={basePath} />

      <nav
        className={cn(
          "fixed top-0 left-0 right-0 border-b border-[hsl(var(--border))] bg-white shadow-sm max-md:overflow-x-visible",
          mobileNavOpen ? "z-[120]" : "z-50"
        )}
        aria-label="Main navigation"
      >
        <div
          className={cn(
            "mx-auto box-border max-w-7xl px-4 sm:px-6 lg:px-8",
            /* Wider right inset on small screens so the hamburger clears the screen edge. */
            "max-md:pr-8"
          )}
        >
          {/* Mobile: logo left · hamburger right (Book now lives in the drawer) */}
          <div className="flex h-16 items-center justify-between gap-3 md:hidden">
            <Link
              to={joinPath(basePath, "/")}
              className="flex min-w-0 shrink items-center"
            >
              {renderBrandLogo()}
            </Link>
            <button
              type="button"
              id="nail-queen-menu-trigger"
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileNavOpen}
              aria-controls="nail-queen-mobile-nav"
              onClick={() => setMobileNavOpen((o) => !o)}
              className={cn(
                "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-nail-queen-brown",
                "hover:bg-nail-queen-brown/5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nail-queen-brown focus-visible:ring-offset-2"
              )}
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                aria-hidden={true}
              >
                <path d="M5 7h14M5 12h14M5 17h14" />
              </svg>
            </button>
          </div>

          {/* Desktop / tablet: logo + inline nav + Book now */}
          <div className="hidden h-16 items-center justify-between md:flex">
            <Link to={joinPath(basePath, "/")} className="flex items-center space-x-2">
              {renderBrandLogo()}
            </Link>

            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={joinPath(basePath, item.path)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive(item.path) ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <button type="button" className={bookNowButtonClass} onClick={() => setIsContactOpen(true)}>
              Book now
            </button>
          </div>
        </div>
      </nav>

      {/* Sheet portals to body; inline --nail-queen-brown on content so drawer tokens match the theme wrapper. */}
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen} modal>
        <SheetContent
          id="nail-queen-mobile-nav"
          side="right"
          aria-describedby="nail-queen-mobile-nav-desc"
          style={
            {
              "--nail-queen-brown": "39 33% 25%",
              "--nail-queen-brown-light": "39 33% 70%",
            } as React.CSSProperties
          }
          className={cn(
            "box-border w-[min(100vw-2rem,20rem)] max-w-full border-l border-nail-queen-brown/20 bg-white sm:max-w-sm",
            "!top-16 !bottom-0 !h-[calc(100dvh-4rem)] border-t border-nail-queen-brown/15",
            "flex flex-col overflow-x-hidden overflow-y-auto p-0 pt-12",
            "[&>button]:text-nail-queen-brown [&>button]:hover:opacity-100",
            "data-[state=open]:duration-300 data-[state=closed]:duration-200",
            "z-[110]"
          )}
        >
          {/* Inline padding: Tailwind v4 often drops arbitrary ps/pe when the value contains commas (max(, env()). */}
          <div
            className="box-border flex min-h-0 min-w-0 w-full max-w-full flex-1 flex-col pb-6"
            style={{
              paddingLeft: "max(1.75rem, env(safe-area-inset-left, 0px))",
              paddingRight: "max(1.75rem, env(safe-area-inset-right, 0px))",
            }}
          >
            <SheetHeader className="shrink-0 border-b border-nail-queen-brown/15 px-0 pb-4 text-left">
              <SheetTitle className="font-semibold text-nail-queen-brown">Menu</SheetTitle>
              <SheetDescription id="nail-queen-mobile-nav-desc" className="sr-only">
                Site sections and booking for {siteName}
              </SheetDescription>
            </SheetHeader>
            <nav className="flex min-w-0 w-full max-w-full shrink-0 flex-col py-4" aria-label="Mobile pages">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={joinPath(basePath, item.path)}
                  aria-current={isActive(item.path) ? "page" : undefined}
                  onClick={() => setMobileNavOpen(false)}
                  className={cn(
                    "box-border flex min-h-12 w-full max-w-full min-w-0 items-center rounded-lg px-4 py-3 text-base font-medium transition-colors",
                    isActive(item.path)
                      ? "font-semibold text-nail-queen-brown"
                      : "text-nail-queen-brown/90 hover:bg-nail-queen-brown/5"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 box-border w-full min-w-0 max-w-full shrink-0 border-t border-nail-queen-brown/15 pt-4">
                <button
                  type="button"
                  className={cn(
                    "inline-flex min-h-10 w-fit max-w-full shrink-0 items-center justify-center self-start rounded-full border border-transparent bg-nail-queen-brown px-5 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-nail-queen-brown/90",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nail-queen-brown focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  )}
                  onClick={() => {
                    setMobileNavOpen(false);
                    setIsContactOpen(true);
                  }}
                >
                  Book now
                </button>
              </div>
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      <main className="pt-16">{children}</main>

      <ContactPanel open={isContactOpen} onOpenChange={setIsContactOpen} />

      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/6597916789"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
        </a>
      </div>

      <footer className="bg-background text-black py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-6 text-sm">
              <Link to={joinPath(basePath, "/privacy")} className="hover:text-gray-600 transition-colors">
                Privacy Policy
              </Link>
              <Link to={joinPath(basePath, "/terms")} className="hover:text-gray-600 transition-colors">
                Terms & Conditions
              </Link>
            </div>
            <p className="text-sm text-gray-600">Copyright © 2025 {siteName}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}