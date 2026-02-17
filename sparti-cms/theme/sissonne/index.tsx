import React, { useMemo } from 'react';
import { useLocation, useParams } from "react-router-dom";
import './theme.css';
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Programs from "./pages/Programs";
import Faculty from "./pages/Faculty";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Baskerville from "./pages/Baskerville";
import EbGaramond from "./pages/EbGaramond";
import Lora from "./pages/Lora";
import AmalfiAvenir from "./pages/AmalfiAvenir";
import { ThankYouPage } from "./components/ThankYouPage";

interface TenantLandingProps {
  tenantName?: string;
  tenantSlug?: string;
  tenantId?: string;
  pageSlug?: string;
}

/**
 * Sissonne Dance Academy Theme
 * A sophisticated dance academy theme with multiple pages, programs showcase,
 * faculty profiles, gallery, and comprehensive dance education content.
 * 
 * Uses the parent app's router - routes are determined by the current location path.
 * Handles both /theme/sissonne (homepage) and /theme/sissonne/:pageSlug (sub-pages).
 */
const TenantLanding: React.FC<TenantLandingProps> = ({ 
  tenantName = 'Sissonne Dance Academy', 
  tenantSlug = 'sissonne',
  tenantId,
  pageSlug
}) => {
  const location = useLocation();
  const params = useParams<{ pageSlug?: string }>();
  
  // Determine which page to render (supports standalone/Vercel deploy: pathname without /theme/slug)
  // Priority: 1) pageSlug prop, 2) params.pageSlug, 3) extract from pathname, 4) homepage
  const currentPage = useMemo(() => {
    const normalized = (s?: string) => (s && s.trim()) ? String(s).replace(/^\/+/, '').replace(/\/+$/, '') : '';
    if (normalized(pageSlug)) return normalized(pageSlug);
    if (params.pageSlug) return params.pageSlug;

    const pathParts = location.pathname.split('/').filter(Boolean);
    const themeIndex = pathParts.indexOf('theme');
    const tenantIndex = pathParts.indexOf(tenantSlug);

    // Standalone deploy: pathname has no /theme/tenantSlug (e.g. /programs, /thank-you)
    if (themeIndex < 0 || tenantIndex !== themeIndex + 1) {
      return pathParts.length ? pathParts.join('/') : '';
    }
    // CMS mode: pathname like /theme/sissonne/programs
    if (tenantIndex >= 0 && tenantIndex < pathParts.length - 1) {
      return pathParts.slice(tenantIndex + 1).join('/');
    }
    return '';
  }, [location.pathname, tenantSlug, params.pageSlug, pageSlug]);

  // Render the appropriate page component based on current route
  const renderPage = () => {
    switch (currentPage) {
      case '':
      case undefined:
        return <Index />;
      case 'programs':
        return <Programs />;
      case 'faculty':
        return <Faculty />;
      case 'gallery':
        return <Gallery />;
      case 'about':
        return <About />;
      case 'thank-you':
        return <ThankYouPage tenantName={tenantName} tenantSlug={tenantSlug} tenantId={tenantId} />;
      case 'baskerville':
        return <Baskerville />;
      case 'eb-garamond':
        return <EbGaramond />;
      case 'lora':
        return <Lora />;
      case 'amalfi-avenir':
        return <AmalfiAvenir />;
      default:
        return <NotFound />;
    }
  };

  // ThankYouPage already includes Layout, so don't wrap it
  if (currentPage === 'thank-you') {
    return renderPage();
  }

  return (
    <Layout tenantSlug={tenantSlug}>
      {renderPage()}
    </Layout>
  );
};

export default TenantLanding;
