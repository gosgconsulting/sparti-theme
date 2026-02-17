import React, { useContext } from 'react';
import { ThemeBasePathContext } from '../../context/ThemeBasePathContext';
import { getThemeAssetUrl } from '../../utils/themeAssets';
import './theme.css';
import HeroSection from './components/HeroSection';
import WorkflowSection from './components/WorkflowSection';
import ComparisonSection from './components/ComparisonSection';
import { InteractiveSEOSection } from './components/InteractiveSEOSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';
import SpartiLogo from './components/ui/SpartiLogo';
import Button from './components/ui/Button';

interface TenantLandingProps {
  tenantName?: string;
  tenantSlug?: string;
  tenantId?: string;
  pageSlug?: string;
}

/**
 * Sparti SEO Landing Page Theme
 * A modern, conversion-optimized landing page for AI-powered SEO automation
 * with interactive features, pricing tables, and compelling testimonials
 */
const TenantLanding: React.FC<TenantLandingProps> = ({
  tenantName = 'Sparti',
  tenantSlug = 'sparti-seo-landing',
  tenantId,
  pageSlug,
}) => {
  const ctxBasePath = useContext(ThemeBasePathContext);
  const asset = (path: string) => getThemeAssetUrl(ctxBasePath ?? undefined, path, tenantSlug);

  const handleGetStarted = () => {
    window.location.href = 'https://app.sparti.ai/seo-copilot-trial';
  };

  const logoSrc = asset('logos/sparti-logo-light.png');
  const heroBackgroundSrc = asset('hero-background.jpg');

  const keywordImages = [
    { src: asset('keywords-explorer.png'), alt: 'Keywords Explorer Interface' },
    { src: asset('keyword-table.png'), alt: 'Keywords Table with Search Volume' }
  ];

  const topicsImages = [
    { src: asset('topics-research.png'), alt: 'Topics Research Management' },
    { src: asset('source-information.png'), alt: 'Source Information from Google Results' }
  ];

  const imageGenerationImages = [
    { src: asset('featured-image-placeholder.png'), alt: 'Featured Image Management Modal' },
    { src: asset('article-preview-placeholder.png'), alt: 'Article Preview with Generated Image' }
  ];

  const seoFeatureImages = {
    keywordAnalysis: asset('keyword-analysis.png'),
    editTopicAI: asset('edit-topic-ai.png'),
    articleGeneration: asset('article-generation.png')
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-card">
      {/* Navigation */}
      <nav className="w-full py-4 px-6 border-b border-border/50 glass bg-background/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <SpartiLogo size="md" showText tenantSlug={tenantSlug} />
          <div className="flex items-center gap-4">
            <Button onClick={handleGetStarted} className="bg-primary hover:bg-primary/90">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection 
        tenantName={tenantName}
        heroBackgroundSrc={heroBackgroundSrc}
        onGetStarted={handleGetStarted}
      />

      {/* Workflow Section - "SEO is more important than ever" + Features */}
      <WorkflowSection 
        keywordImages={keywordImages}
        topicsImages={topicsImages}
        imageGenerationImages={imageGenerationImages}
        tenantSlug={tenantSlug}
        onGetStarted={handleGetStarted}
      />

      {/* Comparison Section - Sparti vs Generic AI */}
      <ComparisonSection 
        onGetStarted={handleGetStarted}
      />

      {/* Interactive SEO Section */}
      <InteractiveSEOSection 
        seoFeatureImages={seoFeatureImages}
        tenantSlug={tenantSlug}
      />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Pricing Section */}
      <PricingSection 
        onGetStarted={handleGetStarted}
      />

      {/* Footer */}
      <Footer 
        tenantName={tenantName}
        tenantSlug={tenantSlug}
      />
    </div>
  );
};

export default TenantLanding;