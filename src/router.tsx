import { createBrowserRouter } from "react-router-dom";
import React from "react";
import { useSEO } from "@/hooks/useSEO";
import ErrorBoundary from '@/components/common/ErrorBoundary';
import NotFound from "./pages/NotFound";
import PublicDashboard from "./pages/PublicDashboard";
import TenantLandingPage from "./pages/TenantLandingPage";
import DesignSystemPage from "./pages/DesignSystemPage";

// When a theme is deployed, theme components manage their own SEO.
// Only run global SEO for the dev dashboard (no DEPLOY_THEME_SLUG).
const ConditionalSEO = () => {
  const { error: seoError } = useSEO({ skip: !!import.meta.env.DEPLOY_THEME_SLUG });
  if (seoError) console.warn("SEO initialization error (non-blocking):", seoError);
  return null;
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <ConditionalSEO />
    {children}
  </>
);

// Dev: show PublicDashboard at "/".
// Deployed: serve the configured theme at root.
const RootIndex: React.FC = () => {
  if (import.meta.env.DEPLOY_THEME_SLUG) {
    return (
      <ErrorBoundary>
        <TenantLandingPage />
      </ErrorBoundary>
    );
  }
  return <PublicDashboard />;
};

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
    // Dev: preview any theme at /theme/<slug>/...
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
    // Design system: component reference and preview (all themes + Flowbite)
    {
      path: "/design-system",
      element: (
        <RootLayout>
          <DesignSystemPage />
        </RootLayout>
      ),
    },
    {
      path: "/design-system/:componentId",
      element: (
        <RootLayout>
          <DesignSystemPage />
        </RootLayout>
      ),
    },
    // Deployed: theme handles all root-level page routes (e.g. /pricing, /blog/my-post)
    {
      path: "/:pageSlug",
      element: (
        <RootLayout>
          <ErrorBoundary>
            <TenantLandingPage />
          </ErrorBoundary>
        </RootLayout>
      ),
    },
    {
      path: "/:pageSlug/*",
      element: (
        <RootLayout>
          <ErrorBoundary>
            <TenantLandingPage />
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
      v7_relativeSplatPath: true,
    },
  }
);
