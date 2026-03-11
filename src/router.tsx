import { createBrowserRouter, Navigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import React from "react";
import { useSEO } from "@/hooks/useSEO";
import ErrorBoundary from '@/components/common/ErrorBoundary';
import NotFound from "./pages/NotFound";
import PublicDashboard from "./pages/PublicDashboard";
import TenantLandingPage from "./pages/TenantLandingPage";
import TenantPage from "./pages/TenantPage";
import { KNOWN_THEME_SLUGS } from "@/themes/themeRegistry";

// KNOWN_THEME_SLUGS is now auto-generated from the src/themes/* directory structure
// via import.meta.glob in src/themes/themeRegistry.ts.
// To add a new theme, simply create src/themes/<slug>/index.tsx — no changes needed here.

// Component to handle theme sub-routes - checks if it's a known theme
const ThemeRouteHandler: React.FC = () => {
  const { tenantSlug } = useParams<{ tenantSlug: string }>();

  if (tenantSlug && KNOWN_THEME_SLUGS.includes(tenantSlug)) {
    // Route to theme component which handles sub-routes
    return <TenantLandingPage />;
  }

  // Otherwise, use TenantPage for database-driven pages
  return <TenantPage />;
};

// Short theme URL: /gosgconsulting or /gosgconsulting/services etc. - only when slug is a known theme
// When DEPLOY_THEME_SLUG is set, /services etc. are page paths under the deploy theme - always render TenantLandingPage
const ShortThemeRoute: React.FC = () => {
  const { themeSlug } = useParams<{ themeSlug: string }>();
  const deployThemeSlug = import.meta.env.DEPLOY_THEME_SLUG;
  if (deployThemeSlug) {
    return <TenantLandingPage />;
  }
  if (themeSlug && KNOWN_THEME_SLUGS.includes(themeSlug)) {
    return <TenantLandingPage />;
  }
  return <NotFound />;
};

// Simple alias route: /master/* -> /theme/master/*
const MasterAliasRoute: React.FC = () => {
  const location = useLocation();
  const rest = location.pathname.replace(/^\/master/, "");
  return (
    <Navigate
      to={`/theme/master${rest}${location.search}${location.hash}`}
      replace
    />
  );
};

// Component to conditionally load SEO based on current route
const ConditionalSEO = () => {
  const location = useLocation();
  const deployThemeSlug = import.meta.env.DEPLOY_THEME_SLUG;

  const pathParts = location.pathname.split("/").filter(Boolean);
  const firstSegment = pathParts[0] || "";
  const isKnownShortThemeRoute = KNOWN_THEME_SLUGS.includes(firstSegment);
  const isThemePrefixedRoute = location.pathname.startsWith("/theme/");
  const isThemeOwnedRootRoute =
    location.pathname.startsWith("/booking") ||
    location.pathname.startsWith("/packages") ||
    location.pathname === "/blog" ||
    location.pathname.startsWith("/blog/") ||
    location.pathname.startsWith("/product/") ||
    location.pathname === "/thank-you";

  // Theme pages manage their own SEO/title via theme components.
  // Keep global SEO only for CMS/public dashboard routes.
  const skipGlobalSEO =
    !!deployThemeSlug ||
    isThemePrefixedRoute ||
    isKnownShortThemeRoute ||
    isThemeOwnedRootRoute;

  // No auth pages anymore
  const { error: seoError } = useSEO({ skip: skipGlobalSEO });

  if (seoError) {
    console.warn("SEO initialization error (non-blocking):", seoError);
  }

  return null;
};

// Root layout component
const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <ConditionalSEO />
      {/* <AdminTopBar /> - Removed */}
      {children}
    </>
  );
};

// Root: dashboard at / (direct access, no redirect)
// When DEPLOY_THEME_SLUG is set (Vercel env), serve theme at root (no /theme/ prefix)
// In production, automatically serve landingpage theme at root (keep /theme/landingpage in localhost)
const RootIndex: React.FC = () => {
  const deployThemeSlug = import.meta.env.DEPLOY_THEME_SLUG;
  // In production, automatically serve landingpage theme at root
  const isProduction = import.meta.env.PROD;
  const shouldServeLandingpageAtRoot = isProduction && !deployThemeSlug;

  if (deployThemeSlug || shouldServeLandingpageAtRoot) {
    return (
      <ErrorBoundary>
        <TenantLandingPage />
      </ErrorBoundary>
    );
  }

  // Check if we're in theme deployment mode (standalone theme build)
  const isThemeDeployment =
    typeof window !== "undefined" &&
    (window as any).__THEME_DEPLOYMENT__ === true;

  if (isThemeDeployment) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Theme deployment mode detected. This App.tsx should not be loaded.</p>
        <p>
          If you see this, the theme build may not be using the standalone entry
          point.
        </p>
      </div>
    );
  }

  return <PublicDashboard />;
};

// Create router with future flags to eliminate v7 warnings
export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <RootLayout>
          <RootIndex />
        </RootLayout>
      ),
    },
    {
      path: "/master/*",
      element: (
        <RootLayout>
          <MasterAliasRoute />
        </RootLayout>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <RootLayout>
          <Navigate to="/" replace />
        </RootLayout>
      ),
    },
    {
      path: "/dashboard/*",
      element: (
        <RootLayout>
          <Navigate to="/" replace />
        </RootLayout>
      ),
    },
    {
      path: "/theme",
      element: <Navigate to="/theme/landingpage" replace />,
    },
    {
      path: "/blog",
      element: (
        <RootLayout>
          <ErrorBoundary>
            <TenantLandingPage />
          </ErrorBoundary>
        </RootLayout>
      ),
    },
    {
      path: "/blog/:slug",
      element: (
        <RootLayout>
          <ErrorBoundary>
            <TenantLandingPage />
          </ErrorBoundary>
        </RootLayout>
      ),
    },
    {
      path: "/product/:id",
      element: (
        <RootLayout>
          <ErrorBoundary>
            <TenantLandingPage />
          </ErrorBoundary>
        </RootLayout>
      ),
    },
    {
      path: "/theme/:tenantSlug/product/:productname",
      element: (
        <RootLayout>
          <ErrorBoundary>
            <ThemeRouteHandler />
          </ErrorBoundary>
        </RootLayout>
      ),
    },
    {
      path: "/theme/:tenantSlug/blog/:slug",
      element: (
        <RootLayout>
          <ErrorBoundary>
            <ThemeRouteHandler />
          </ErrorBoundary>
        </RootLayout>
      ),
    },
    {
      path: "/theme/:tenantSlug",
      element: (
        <RootLayout>
          <ErrorBoundary>
            <TenantLandingPage />
          </ErrorBoundary>
        </RootLayout>
      ),
    },
    {
      path: "/theme/:tenantSlug/:pageSlug",
      element: (
        <RootLayout>
          <ErrorBoundary>
            <TenantLandingPage />
          </ErrorBoundary>
        </RootLayout>
      ),
    },
    {
      path: "/theme/:tenantSlug/*",
      element: (
        <RootLayout>
          <ErrorBoundary>
            <TenantLandingPage />
          </ErrorBoundary>
        </RootLayout>
      ),
    },
    {
      path: "/tenant/:tenantSlug/:pageSlug",
      element: (
        <RootLayout>
          <ErrorBoundary>
            <TenantPage />
          </ErrorBoundary>
        </RootLayout>
      ),
    },
    {
      path: "/thank-you",
      element: (
        <RootLayout>
          <TenantLandingPage />
        </RootLayout>
      ),
    },
    // Root-level routes for deployed STR theme (booking/classes, packages, etc.)
    {
      path: "/booking/*",
      element: (
        <RootLayout>
          <ErrorBoundary>
            <TenantLandingPage />
          </ErrorBoundary>
        </RootLayout>
      ),
    },
    {
      path: "/packages",
      element: (
        <RootLayout>
          <ErrorBoundary>
            <TenantLandingPage />
          </ErrorBoundary>
        </RootLayout>
      ),
    },
    // Short theme URLs: /gosgconsulting, /gosgconsulting/services, /gosgconsulting/*
    {
      path: "/:themeSlug",
      element: (
        <RootLayout>
          <ErrorBoundary>
            <ShortThemeRoute />
          </ErrorBoundary>
        </RootLayout>
      ),
    },
    {
      path: "/:themeSlug/:pageSlug",
      element: (
        <RootLayout>
          <ErrorBoundary>
            <ShortThemeRoute />
          </ErrorBoundary>
        </RootLayout>
      ),
    },
    {
      path: "/:themeSlug/*",
      element: (
        <RootLayout>
          <ErrorBoundary>
            <ShortThemeRoute />
          </ErrorBoundary>
        </RootLayout>
      ),
    },
    {
      path: "*",
      element: (
        <RootLayout>
          <NotFound />
        </RootLayout>
      ),
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);