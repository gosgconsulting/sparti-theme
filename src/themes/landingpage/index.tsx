import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './theme.css';
import { ThemeBasePathContext } from '../../context/ThemeBasePathContext';
import { getThemeAssetUrl } from '../../utils/themeAssets';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import { ContactFormDialog } from './components/ContactFormDialog';
import { ThankYouPage } from './components/ThankYouPage';
import BlogListPage from './pages/blog/BlogListPage';
import BlogPostPage from './pages/blog/BlogPostPage';
import { useThemeBranding } from '../../hooks/useThemeSettings';
import { debugLog, debugWarn } from '@/utils/debugLogger';
import { getSiteName, getLogoSrc, getFaviconSrc, applyFavicon } from './utils/settings';
import { getTenantId } from '@/utils/tenantConfig';

/** Default CMS tenant for ACATR / landingpage when no env or prop is set */
const LANDINGPAGE_DEFAULT_TENANT_ID = 'tenant-2960b682';

interface TenantLandingProps {
  tenantName?: string;
  tenantSlug?: string;
  tenantId?: string;
  basePath?: string;
  pageSlug?: string;
}

const normalizeSlug = (slug?: string) => {
  if (!slug) return "";
  return String(slug)
    .split("?")[0]
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");
};

/**
 * ACATR Professional Business Services Landing Page Theme
 * Fetches settings from database via API, with fallback to default values
 */
const TenantLanding: React.FC<TenantLandingProps> = ({ 
  tenantName = 'ACATR Business Services', 
  tenantSlug = 'landingpage',
  tenantId,
  basePath: basePathProp = `/theme/${tenantSlug || 'landingpage'}`,
  pageSlug
}) => {
  const location = useLocation();
  const params = useParams<{ pageSlug?: string }>();
  const ctxBasePath = useContext(ThemeBasePathContext);
  const resolvedBasePath = basePathProp ?? ctxBasePath ?? `/theme/${tenantSlug}`;
  
  // Tenant for CMS: router prop, then Vite/window injection, else ACATR default (never null for API calls)
  const effectiveTenantId = tenantId ?? getTenantId() ?? null;
  const cmsTenantId = effectiveTenantId ?? LANDINGPAGE_DEFAULT_TENANT_ID;

  if (cmsTenantId) {
    debugLog('[testing] Theme using tenant ID:', cmsTenantId);
  }

  const { branding, loading: brandingLoading, error: brandingError } = useThemeBranding(
    tenantSlug,
    cmsTenantId
  );
  
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  
  // Page resolution: supports standalone/Vercel (pathname without /theme/slug)
  const resolvedPageSlug = useMemo(() => {
    const n = (s?: string) => (s && String(s).trim()) ? String(s).replace(/^\/+/, '').replace(/\/+$/, '') : '';
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
  
  const isThankYouPage = topLevelSlug === "thank-you" ||
                         location.pathname === '/thank-you' || 
                         location.pathname.endsWith('/thank-you') ||
                         location.pathname.includes('/thank-you');
  
  const isBlogPage = topLevelSlug === "blog" ||
                     location.pathname === '/blog' ||
                     location.pathname.startsWith('/blog/') ||
                     location.pathname.includes('/blog');

  const handleContactClick = () => {
    setIsContactDialogOpen(true);
  };

  // Get settings from database with fallback to defaults using utility functions
  const siteName = getSiteName(branding, tenantName);
  const siteTagline = branding?.site_tagline || '';
  const siteDescription = branding?.site_description || '';
  const logoSrc = getLogoSrc(branding);
  const faviconSrc = getFaviconSrc(branding);
  const heroImageSrc = getThemeAssetUrl(ctxBasePath ?? undefined, 'hero-business.jpg', tenantSlug);
  
  // Apply favicon when branding loads
  useEffect(() => {
    if (faviconSrc && !brandingLoading) {
      // Apply favicon immediately
      applyFavicon(faviconSrc);
      
      // Also apply after a short delay to ensure it persists (in case useSEO runs after)
      const timeoutId = setTimeout(() => {
        applyFavicon(faviconSrc);
      }, 300);
      
      return () => {
        clearTimeout(timeoutId);
        // Clean up observer if it exists
        if ((window as any).__faviconObserver) {
          (window as any).__faviconObserver.disconnect();
          delete (window as any).__faviconObserver;
        }
      };
    }
  }, [faviconSrc, brandingLoading]);
  
  // Show loading state if settings are being fetched
  if (brandingLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Log any errors but continue with fallback values
  if (brandingError) {
    debugWarn('[testing] Error loading branding settings, using defaults:', brandingError);
  }
  
  const asset = (p: string) => getThemeAssetUrl(ctxBasePath ?? undefined, p, tenantSlug);
  const serviceImages = [
    asset('incorporation-services.jpg'),
    asset('accounting-dashboard.jpg'),
    asset('corporate-secretarial.jpg')
  ];

  // Professional services data
  const services = [
    {
      title: 'Singapore Company Incorporation Services',
      subtitle: 'One-Time Fee: S$1,815 (S$1,115 for Locals)',
      description: 'Professional incorporation services for Singapore Pte. Ltd. companies, providing comprehensive setup and ongoing compliance support for local and international entrepreneurs. Includes professional fees (S$1,500) + government fees (S$315). Local clients pay only S$800 professional fee + S$315 government fee.',
      image: serviceImages[0],
      features: [
        'Company registration with ACRA',
        'Corporate secretary services included',
        'Company constitution and statutory documents',
        'Initial compliance setup',
        'Complete documentation for local & international clients',
        'Standard incorporation: 1 week timeline'
      ],
      highlight: 'Fast-track option available with complete documentation'
    },
    {
      title: 'Annual Ongoing Services',
      subtitle: 'S$4,300/year (varies by transaction volume)',
      description: 'Comprehensive annual compliance and support services to maintain your Singapore company in good standing. Includes corporate secretary fee (S$800), tax filing services (S$800), basic bookkeeping (S$200), and local director services (S$2,500). Accounting fees are variable based on transaction volume and can increase up to S$6,000/year for high-volume businesses.',
      image: serviceImages[1],
      features: [
        'Corporate Secretary Fee (S$800/year)',
        'Tax Filing Services (S$1,200/year)',
        'Basic Bookkeeping (S$900/year minimum)',
        'Local Director Services (S$4,500/year)',
        'Annual compliance filing',
        'Regulatory authority submissions'
      ],
      highlight: 'Local director fee waived if client provides their own'
    },
    {
      title: 'Additional Services & Support',
      subtitle: 'Enhanced Business Operations',
      description: 'Comprehensive additional services to support your Singapore business operations beyond basic incorporation and compliance. From registered address services to employment pass assistance, we provide end-to-end support for your business growth and operational needs in Singapore.',
      image: serviceImages[2],
      features: [
        'Registered address and mailroom services',
        'Enhanced bookkeeping (monthly/weekly)',
        'Payroll services',
        'GST registration and filing',
        'Employment pass visa assistance',
        'Banking account opening support'
      ],
      highlight: 'Streamlined process from setup to operations with professional oversight'
    }
  ];

  // Render blog pages
  if (isBlogPage) {
    debugLog('[testing] Blog page detected:', { pageSlug, resolvedPageSlug, slugParts, topLevelSlug, pathname: location.pathname });
    
    // Determine if it's a blog post or blog list page
    // Check pathname directly for more reliable detection
    const pathParts = location.pathname.split('/').filter(Boolean);
    const blogIndex = pathParts.indexOf('blog');
    const isBlogPost = blogIndex >= 0 && blogIndex + 1 < pathParts.length;
    const postSlug = isBlogPost ? pathParts[blogIndex + 1] : null;
    
    if (isBlogPost && postSlug) {
      return (
        <BlogPostPage
          basePath={resolvedBasePath}
          slug={postSlug}
          tenantId={cmsTenantId}
          tenantName={siteName}
          tenantSlug={tenantSlug}
          logoSrc={logoSrc}
          onContactClick={handleContactClick}
        />
      );
    }
    
    // Blog list page
    return (
      <BlogListPage 
        basePath={resolvedBasePath} 
        tenantId={cmsTenantId}
        tenantName={siteName}
        tenantSlug={tenantSlug}
        logoSrc={logoSrc}
        onContactClick={handleContactClick}
      />
    );
  }

  // Render thank you page if on thank you route, otherwise render homepage
  if (isThankYouPage) {
    return (
      <ThankYouPage 
        tenantName={siteName}
        tenantSlug={tenantSlug}
        tenantId={cmsTenantId}
      />
    );
  }

  // Always render hardcoded content - no database checks
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        tenantName={siteName}
        tenantSlug={tenantSlug}
        logoSrc={logoSrc}
        onContactClick={handleContactClick}
      />

      {/* Hero Section */}
      <HeroSection 
        tenantName={siteName}
        title="Singapore Business Setup In 24 Hours - ACRA Registered"
        description="ACRA-registered filing agents providing complete Singapore company incorporation, professional accounting services, and 100% compliance guarantee. Start your business today with expert guidance from day one."
        imageSrc={heroImageSrc}
        imageAlt="Professional business team collaboration"
        buttonText="Start Your Business Journey Today"
        features={[
          'Singapore Company Incorporation in 24 Hours',
          '100% ACRA & IRAS Compliance Guaranteed',
          'Professional Accounting & GST Filing'
        ]}
        onButtonClick={handleContactClick}
      />

      {/* Services Section */}
      <ServicesSection 
        title="Complete Singapore Business Solutions with ACRA Guarantee"
        subtitle="ACRA-registered filing agents providing 24-hour company incorporation, professional accounting services, and guaranteed compliance for Singapore businesses."
        services={services}
        onContactClick={handleContactClick}
      />

      {/* Testimonials Section */}
      <TestimonialsSection 
        title="Trusted by Businesses Worldwide"
        subtitle="Local and international businesses trust our ACRA-registered filing agents for 24-hour Singapore company incorporation, professional accounting services, and guaranteed compliance with zero penalties."
      />

      {/* FAQ Section */}
      <FAQSection 
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our services, processes, and how we can help your business succeed."
      />

      {/* CTA Section */}
      <CTASection 
        title="Results You Can Count On"
        description="Our clients consistently experience accelerated growth, improved compliance, and valuable time savings thanks to our all-encompassing support. By providing end-to-end solutions from incorporation to regulatory management, we enable businesses to operate seamlessly and confidently."
        buttonText="Start Your Business Journey Today"
        onButtonClick={handleContactClick}
      />

      {/* Footer */}
      <Footer 
        tenantName={siteName}
        tenantSlug={tenantSlug}
        logoSrc={logoSrc}
        companyDescription="Empowering businesses with professional, efficient, and scalable support. Your trusted partner for business success from day one."
      />

      {/* Contact Form Dialog */}
      <ContactFormDialog 
        isOpen={isContactDialogOpen}
        onOpenChange={setIsContactDialogOpen}
      >
        <div />
      </ContactFormDialog>
    </div>
  );
};

export default TenantLanding;

