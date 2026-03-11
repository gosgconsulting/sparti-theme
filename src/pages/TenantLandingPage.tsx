import React, { Suspense, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ThemeBasePathContext } from '@/context/ThemeBasePathContext';
import { themeComponentMap, getThemeDisplayName } from '@/themes/themeRegistry';

/**
 * Client-side React component for tenant landing pages.
 * Dynamically loads themes based on tenantSlug (which is the theme slug).
 *
 * To add a new theme, create `src/themes/<slug>/index.tsx` — no changes
 * needed here or in router.tsx.
 */
const TenantLandingPage: React.FC = () => {
  const { tenantSlug, themeSlug, pageSlug, productname, slug: blogSlug } = useParams<{
    tenantSlug?: string;
    themeSlug?: string;
    pageSlug?: string;
    productname?: string;
    slug?: string;
  }>();
  const location = useLocation();

  // Derive theme slug from pathname for short URLs (/gosgconsulting, /str, etc.) so we don't rely on params
  const pathParts = useMemo(() => location.pathname.split('/').filter(Boolean), [location.pathname]);
  const themeIndexInPath = pathParts.indexOf('theme');
  const firstSegment = pathParts[0];
  const slugFromShortPath =
    themeIndexInPath < 0 && firstSegment && firstSegment in themeComponentMap ? firstSegment : null;

  // Handle root-level blog routes (/blog or /blog/:slug)
  const isRootBlogRoute = !tenantSlug && !themeSlug && !slugFromShortPath && (location.pathname === '/blog' || location.pathname.startsWith('/blog/'));

  // Handle root-level STR theme routes (booking, packages, etc.)
  const isRootSTRRoute = !tenantSlug && !themeSlug && !slugFromShortPath && (
    location.pathname === '/booking' ||
    location.pathname.startsWith('/booking/') ||
    location.pathname === '/packages' ||
    location.pathname.startsWith('/packages/')
  );

  // When DEPLOY_THEME_SLUG is set (Vercel/env), always use it so theme is served at root
  const deploySlug = import.meta.env.DEPLOY_THEME_SLUG;
  const slug =
    (deploySlug && deploySlug.trim()) ||
    (tenantSlug && tenantSlug.trim()) ||
    (themeSlug && themeSlug.trim()) ||
    slugFromShortPath ||
    (isRootSTRRoute ? 'str' : 'landingpage');

  // When deploy theme at root, basePath is '' so links use /services not /theme/gosgconsulting/services
  // Also use root basePath when auto-deploying landingpage in production
  const isDeployAtRoot = (!!deploySlug || autoLandingpageDeploy) && !location.pathname.startsWith('/theme/');
  const basePath = isDeployAtRoot ? '' : undefined;

  // Extract full page path from location for nested routes like /booking/classes
  const fullPageSlug = useMemo(() => {
    if (productname) {
      return `product/${productname}`;
    }

    // Handle root-level blog routes (/blog or /blog/:slug)
    if (isRootBlogRoute) {
      if (blogSlug) {
        return `blog/${blogSlug}`;
      }
      return 'blog';
    }

    // Extract full path from pathname to handle nested routes
    const parts = location.pathname.split('/').filter(Boolean);
    const themeIndex = parts.indexOf('theme');
    const effectiveSlug = (tenantSlug && tenantSlug.trim()) || (themeSlug && themeSlug.trim()) || slug;
    const tenantIndex = parts.indexOf(effectiveSlug);

    // Short theme URL: /gosgconsulting or /gosgconsulting/services
    if (themeIndex < 0 && parts.length > 0 && parts[0] === effectiveSlug) {
      return parts.slice(1).join('/');
    }

    // Handle other root-level routes (e.g. /blog or /blog/slug)
    if (themeIndex < 0 && parts.length > 0) {
      return parts.join('/');
    }

    if (themeIndex >= 0 && tenantIndex === themeIndex + 1 && tenantIndex + 1 < parts.length) {
      return parts.slice(tenantIndex + 1).join('/');
    }

    return pageSlug || '';
  }, [pageSlug, location.pathname, tenantSlug, themeSlug, productname, isRootBlogRoute, blogSlug, slug]);

  const isKnownTheme = slug in themeComponentMap;
  // Resolve component from registry; fall back to landingpage if slug not found
  const ThemeComponent = themeComponentMap[slug] ?? themeComponentMap['landingpage'];
  const tenantName = getThemeDisplayName(slug);

  // Error component for unknown themes
  const ThemeNotFound = () => (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Theme Not Found</AlertTitle>
        <AlertDescription>
          <p className="mb-2">
            Theme <code className="bg-muted px-1 py-0.5 rounded">{slug}</code> was not found.
          </p>
          <p className="text-sm mt-2">
            Available themes: {Object.keys(themeComponentMap).join(', ')}
          </p>
          <p className="text-sm mt-2">
            To add a new theme, create a folder at{' '}
            <code className="bg-muted px-1 py-0.5 rounded">src/themes/{slug}/</code> with an{' '}
            <code className="bg-muted px-1 py-0.5 rounded">index.tsx</code> file.
          </p>
        </AlertDescription>
      </Alert>
    </div>
  );

  if (!isKnownTheme && slug !== 'landingpage') {
    return <ThemeNotFound />;
  }

  return (
    <ThemeBasePathContext.Provider value={basePath}>
      <Suspense fallback={<div />}>
        <ThemeComponent
          tenantName={tenantName}
          tenantSlug={slug}
          pageSlug={fullPageSlug}
          tenantId={undefined}
          basePath={basePath}
        />
      </Suspense>
    </ThemeBasePathContext.Provider>
  );
};

export default TenantLandingPage;