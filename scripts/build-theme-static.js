#!/usr/bin/env node
/**
 * Build script for static theme export
 * Creates a standalone frontend build for a specific theme that can be deployed independently
 * 
 * Usage:
 *   node scripts/build-theme-static.js <theme-slug>
 * 
 * Environment variable:
 *   DEPLOY_THEME_SLUG - Theme slug to build (e.g., "landingpage")
 */

import { build } from 'vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get theme slug from command line or environment variable
const themeSlug = process.argv[2] || process.env.DEPLOY_THEME_SLUG || process.env.VITE_DEPLOY_THEME_SLUG;

if (!themeSlug) {
  console.error('Error: Theme slug is required');
  console.error('Usage: node scripts/build-theme-static.js <theme-slug>');
  console.error('Or set DEPLOY_THEME_SLUG environment variable');
  process.exit(1);
}

// Auto-detect VITE_API_BASE_URL from Vercel if not set
let viteApiBaseUrl = process.env.VITE_API_BASE_URL;
const vercelUrl = process.env.VERCEL_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL;
if (!viteApiBaseUrl && vercelUrl) {
  viteApiBaseUrl = vercelUrl.startsWith('http') ? vercelUrl : `https://${vercelUrl}`;
  console.log(`[testing] Auto-detected VITE_API_BASE_URL from Vercel: ${viteApiBaseUrl}`);
} else if (!viteApiBaseUrl) {
  console.warn('[testing] WARNING: VITE_API_BASE_URL is not set');
  console.warn('[testing] Frontend API calls may fail. Set VITE_API_BASE_URL in Vercel (or .env).');
} else {
  console.log(`[testing] VITE_API_BASE_URL: ${viteApiBaseUrl}`);
}

// Get CMS_TENANT for tenant-specific deployment (accept either env var)
const cmsTenant = process.env.CMS_TENANT || process.env.VITE_DEPLOY_TENANT_ID;
if (cmsTenant) {
  console.log(`[testing] CMS_TENANT: ${cmsTenant} - Theme will use this tenant ID`);
} else {
  console.warn('[testing] WARNING: CMS_TENANT is not set');
  console.warn('[testing] Theme will need to determine tenant from URL or other means.');
}

// Optional build-time SEO overrides for standalone theme HTML
const themeMetaTitleEnv = process.env.THEME_META_TITLE;
const themeMetaDescriptionEnv = process.env.THEME_META_DESCRIPTION;

// Resolve canonical base URL for robots.txt and sitemap (no trailing slash)
// Priority: SITE_URL > VERCEL_PROJECT_PRODUCTION_URL > VERCEL_URL; skip if none set
function resolveBaseUrl() {
  const siteUrl = process.env.SITE_URL && String(process.env.SITE_URL).trim();
  if (siteUrl) {
    return siteUrl.replace(/\/+$/, '');
  }
  const prodUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL && String(process.env.VERCEL_PROJECT_PRODUCTION_URL).trim();
  if (prodUrl) {
    return prodUrl.startsWith('http') ? prodUrl.replace(/\/+$/, '') : `https://${prodUrl}`;
  }
  const vercelUrl = process.env.VERCEL_URL && String(process.env.VERCEL_URL).trim();
  if (vercelUrl) {
    return vercelUrl.startsWith('http') ? vercelUrl.replace(/\/+$/, '') : `https://${vercelUrl}`;
  }
  return null;
}

// Helper function to fetch branding during build
async function fetchBrandingForBuild(themeSlug, tenantId) {
  // Check for branding in environment variable first
  if (process.env.BRANDING_SETTINGS_JSON) {
    try {
      const branding = JSON.parse(process.env.BRANDING_SETTINGS_JSON);
      console.log(`[testing] Using branding from BRANDING_SETTINGS_JSON env var`);
      return branding;
    } catch (error) {
      console.warn(`[testing] Failed to parse BRANDING_SETTINGS_JSON:`, error);
    }
  }

  // Try to fetch from database if tenant ID is provided
  if (tenantId) {
    try {
      console.log(`[testing] Fetching branding from database for tenant: ${tenantId}`);
      const { getBrandingSettings } = await import('../sparti-cms/db/modules/branding.js');
      const settings = await getBrandingSettings(tenantId);
      const brandingData = settings.branding || {};

      if (brandingData && Object.keys(brandingData).length > 0) {
        console.log(`[testing] Fetched branding from database:`, Object.keys(brandingData));
        return brandingData;
      } else {
        console.warn(`[testing] No branding data found in database for tenant: ${tenantId}`);
      }
    } catch (error) {
      console.warn(`[testing] Could not fetch branding from database (database may not be available):`, error.message);
    }
  }

  return null;
}

console.log(`[testing] Building static export for theme: ${themeSlug}`);

// Check if theme exists (sparti-cms/theme or src/themes fallback for repo layout)
const themePathCms = path.join(__dirname, '..', 'sparti-cms', 'theme', themeSlug);
const themePathSrc = path.join(__dirname, '..', 'src', 'themes', themeSlug);
const themeExists = fs.existsSync(themePathCms) ||
  fs.existsSync(path.join(themePathSrc, 'index.tsx')) ||
  fs.existsSync(path.join(themePathSrc, 'pages.json'));
if (!themeExists) {
  console.error(`Error: Theme "${themeSlug}" not found at ${themePathCms} or ${themePathSrc}`);
  process.exit(1);
}

// Create standalone entry point with only the theme (no admin/CMS)
const standaloneEntryPath = path.join(__dirname, '..', 'src', 'theme-standalone.tsx');
const standaloneEntryContent = `import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import './index.css';
import '@/styles/modal-sparti-fix.css';
import '@/styles/rich-text-editor.css';

// Import the theme component and ThemeBasePathContext for deploy-at-root
import { ThemeBasePathContext } from '@/context/ThemeBasePathContext';

const ThemeComponent = React.lazy(() => import('@/themes/${themeSlug}'));

// Theme name mapping (all themes deployable via DEPLOY_THEME_SLUG)
const themeNames: Record<string, string> = {
  'landingpage': 'ACATR Business Services',
  'sparti-seo-landing': 'Sparti SEO Landing',
  'gosgconsulting': 'GO SG Consulting',
  'gosgconsulting.com': 'GO SG Consulting',
  'sissonne': 'Sissonne Dance Academy',
  'storefront': 'Storefront',
  'moondk': 'Moondk',
  'str': 'STR',
  'optimalconsulting': 'Optimal Consulting',
  'master': 'Master Template',
  'e-shop': 'E-shop',
  'hotel': 'Hotel Adina',
  'nail-queen': 'Nail Queen',
  'custom': 'Custom'
};

const queryClient = new QueryClient();

// Wrapper that passes pageSlug from current path so index (/) = theme home (same as /theme/${themeSlug})
const ThemeWithPageSlug = ({ themeName }) => {
  const location = useLocation();
  const pathname = location.pathname || '/';
  const pageSlug = pathname === '/' || pathname === '' ? '' : pathname.replace(/^\\//, '');
  return (
    <ThemeBasePathContext.Provider value="">
      <Suspense fallback={null}>
        <ThemeComponent 
          tenantName={themeName} 
          tenantSlug="${themeSlug}"
          tenantId={typeof window !== 'undefined' ? window.__CMS_TENANT__ : null}
          pageSlug={pageSlug}
        />
      </Suspense>
    </ThemeBasePathContext.Provider>
  );
};

const App = () => {
  const themeName = themeNames['${themeSlug}'] || '${themeSlug}';
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="*" element={
              <ErrorBoundary>
                <ThemeWithPageSlug themeName={themeName} />
              </ErrorBoundary>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// Set light mode by default
document.documentElement.classList.add("light");

// Render the app
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
`;

// Write standalone entry point
fs.writeFileSync(standaloneEntryPath, standaloneEntryContent);
console.log(`[testing] Created standalone entry point: ${standaloneEntryPath}`);

// Backup original index.html and create hybrid version
const originalIndexPath = path.join(__dirname, '..', 'index.html');
const backupIndexPath = path.join(__dirname, '..', 'index.html.backup');
const themeTitle = themeSlug.split('-').map(word =>
  word.charAt(0).toUpperCase() + word.slice(1)
).join(' ');

// Backup original index.html if it exists
if (fs.existsSync(originalIndexPath)) {
  fs.copyFileSync(originalIndexPath, backupIndexPath);
  console.log(`[testing] Backed up original index.html`);
}

// Fetch branding data and create HTML (async wrapper)
async function createStandaloneHtml() {
  // Fetch branding data before creating HTML
  let brandingData = null;
  if (cmsTenant) {
    brandingData = await fetchBrandingForBuild(themeSlug, cmsTenant);
  }

  // Build script content for injection
  let scriptContent = `
      window.__THEME_DEPLOYMENT__ = true;
      window.__THEME_SLUG__ = '${themeSlug}';`;
  if (cmsTenant) {
    scriptContent += `\n      window.__CMS_TENANT__ = '${cmsTenant.replace(/'/g, "\\'")}';`;
  }
  if (brandingData && Object.keys(brandingData).length > 0) {
    // Escape JSON for safe injection into HTML
    const brandingJson = JSON.stringify(brandingData)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/\//g, '\\/');
    scriptContent += `\n      window.__BRANDING_SETTINGS__ = ${brandingJson};`;
    console.log(`[testing] Branding will be injected into HTML:`, Object.keys(brandingData));
  }

  // Favicon priority: THEME_FAVICON_URL env > branding.site_favicon > default
  let faviconUrl = process.env.THEME_FAVICON_URL && String(process.env.THEME_FAVICON_URL).trim();
  if (!faviconUrl && brandingData && brandingData.site_favicon) {
    faviconUrl = brandingData.site_favicon;
  }
  if (!faviconUrl) {
    faviconUrl = '/favicon.png';
  }
  // Resolve /uploads/ paths to API base URL for static deploy so favicon loads from backend
  const apiBase = process.env.VITE_API_BASE_URL && String(process.env.VITE_API_BASE_URL).trim();
  if (faviconUrl.startsWith('/uploads/') && apiBase) {
    const base = apiBase.replace(/\/$/, '');
    faviconUrl = base + faviconUrl;
  }
  // Safe for HTML attribute (no double quotes)
  faviconUrl = faviconUrl.replace(/"/g, '%22');
  const faviconType = faviconUrl.toLowerCase().includes('.ico')
    ? 'image/x-icon'
    : faviconUrl.toLowerCase().includes('.svg')
      ? 'image/svg+xml'
      : 'image/png';

  // Escape HTML entities for safe injection into <title> and meta tags.
  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  // Resolve title priority:
  // THEME_META_TITLE env > branding.site_name > theme title fallback
  const getPageTitle = () => {
    if (themeMetaTitleEnv && themeMetaTitleEnv.trim()) {
      return escapeHtml(themeMetaTitleEnv.trim());
    }
    if (brandingData && brandingData.site_name) {
      return escapeHtml(brandingData.site_name);
    }
    return escapeHtml(themeTitle);
  };

  // Resolve description priority:
  // THEME_META_DESCRIPTION env > branding.site_description > generic fallback
  const getPageDescription = () => {
    if (themeMetaDescriptionEnv && themeMetaDescriptionEnv.trim()) {
      return escapeHtml(themeMetaDescriptionEnv.trim());
    }
    if (brandingData && brandingData.site_description) {
      return escapeHtml(brandingData.site_description);
    }
    return escapeHtml(`${themeTitle} website`);
  };

  const pageTitle = getPageTitle();
  const pageDescription = getPageDescription();

  if (brandingData && brandingData.site_favicon) {
    console.log(`[testing] Using favicon from branding: ${faviconUrl}`);
  }

  // Create standalone HTML file that uses our theme-only entry point
  const standaloneHtmlContent = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${pageTitle}</title>
    <meta name="description" content="${pageDescription}" />
    <meta property="og:title" content="${pageTitle}" />
    <meta property="og:description" content="${pageDescription}" />
    <meta name="twitter:title" content="${pageTitle}" />
    <meta name="twitter:description" content="${pageDescription}" />
    <link rel="icon" type="${faviconType}" href="${faviconUrl}" />
    <link rel="apple-touch-icon" href="${faviconUrl}" />
    <!-- Allow indexing for theme deployments -->
    <meta name="robots" content="index, follow" />
    <script>${scriptContent}
    </script>
    <!-- CUSTOM_CODE_HEAD_PLACEHOLDER -->
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/theme-standalone.tsx"></script>
    <!-- CUSTOM_CODE_BODY_PLACEHOLDER -->
  </body>
</html>
`;

  fs.writeFileSync(originalIndexPath, standaloneHtmlContent);
  console.log(`[testing] Created standalone HTML with theme at /`);

  return brandingData;
}

// Create HTML with branding
const brandingData = await createStandaloneHtml();

// Build configuration for theme-only build
// Note: Branding is already injected directly into the HTML template above
// We don't need the plugin here since we're doing direct injection
const buildConfig = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, '..', 'src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: path.join(__dirname, '..', 'index.html'),
    },
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  optimizeDeps: {
    exclude: ['pg', 'express'],
    include: ['react', 'react-dom', 'react/jsx-runtime'],
  },
});

// Build the theme
console.log(`[testing] Starting build process...`);
console.log(`[testing] Theme slug: ${themeSlug}`);
console.log(`[testing] Build config:`, JSON.stringify({
  outDir: 'dist',
  input: 'index.html'
}, null, 2));

// Cleanup function to ensure files are restored on failure
function cleanupOnFailure() {
  try {
    // Restore original index.html if backup exists
    if (fs.existsSync(backupIndexPath)) {
      fs.copyFileSync(backupIndexPath, originalIndexPath);
      fs.unlinkSync(backupIndexPath);
      console.log(`[testing] Restored original index.html after failure`);
    }
    // Remove temporary entry point
    if (fs.existsSync(standaloneEntryPath)) {
      fs.unlinkSync(standaloneEntryPath);
    }
  } catch (error) {
    console.warn(`[testing] Warning: Could not clean up temporary files:`, error);
  }
}

// Verify build output exists and is valid
function verifyBuildOutput() {
  const distPath = path.join(__dirname, '..', 'dist');
  if (!fs.existsSync(distPath)) {
    throw new Error('Build failed: dist directory does not exist');
  }
  const distContents = fs.readdirSync(distPath);
  if (distContents.length === 0) {
    throw new Error('Build failed: dist directory is empty');
  }
  // Check for index.html
  const indexPath = path.join(distPath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    throw new Error('Build failed: index.html not found in dist');
  }
  console.log(`[testing] Build verification passed: ${distContents.length} files in dist/`);
}

// Copy theme assets to dist so /theme/<slug>/assets/* resolve when serving static build
function copyThemeAssetsToDist() {
  const projectRoot = path.join(__dirname, '..');
  const sourceAssets = path.join(projectRoot, 'sparti-cms', 'theme', themeSlug, 'assets');
  const destAssets = path.join(projectRoot, 'dist', 'theme', themeSlug, 'assets');

  if (!fs.existsSync(sourceAssets)) {
    console.log(`[testing] No assets folder at src/themes/${themeSlug}/assets, skipping copy`);
    return;
  }

  const stat = fs.statSync(sourceAssets);
  if (!stat.isDirectory()) {
    console.log(`[testing] src/themes/${themeSlug}/assets is not a directory, skipping copy`);
    return;
  }

  fs.mkdirSync(path.join(projectRoot, 'dist', 'theme', themeSlug), { recursive: true });
  fs.cpSync(sourceAssets, destAssets, { recursive: true });
  console.log(`[testing] Copied theme assets to dist/theme/${themeSlug}/assets/`);
}

// Escape for XML text/attributes (sitemap <loc>)
function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Read theme pages from src/themes/<themeSlug>/pages.json; return normalized path list ('' for root, else no leading slash)
function getThemePagePaths(projectRoot, slug) {
  const pagesPath = path.join(projectRoot, 'src', 'themes', slug, 'pages.json');
  if (!fs.existsSync(pagesPath)) {
    return [''];
  }
  let data;
  try {
    data = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));
  } catch (err) {
    console.warn(`[testing] Could not parse ${pagesPath}, using homepage only:`, err.message);
    return [''];
  }
  const pages = Array.isArray(data?.pages) ? data.pages : [];
  const paths = [];
  const seen = new Set();
  for (const p of pages) {
    const raw = p?.slug != null ? String(p.slug).trim() : '';
    const normalized = raw === '/' || raw === '' ? '' : raw.replace(/^\/+/, '').replace(/\/+$/, '');
    if (normalized === '' && seen.has('')) continue;
    if (normalized !== '' && seen.has(normalized)) continue;
    seen.add(normalized);
    paths.push(normalized);
  }
  if (paths.length === 0) paths.push('');
  return paths;
}

// Write deployment-specific robots.txt to dist/
function writeRobotsTxt(projectRoot, baseUrl) {
  const content = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
  const outPath = path.join(projectRoot, 'dist', 'robots.txt');
  fs.writeFileSync(outPath, content, 'utf8');
  console.log(`[testing] Wrote robots.txt (Sitemap: ${baseUrl}/sitemap.xml)`);
}

// Write sitemap.xml to dist/ using baseUrl and theme page paths
function writeSitemapXml(projectRoot, baseUrl, pagePaths) {
  const lastmod = new Date().toISOString().split('T')[0];
  const urlEntries = pagePaths.map((p) => {
    const loc = p === '' ? baseUrl : `${baseUrl}/${p}`;
    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join('\n')}
</urlset>
`;
  const outPath = path.join(projectRoot, 'dist', 'sitemap.xml');
  fs.writeFileSync(outPath, xml, 'utf8');
  console.log(`[testing] Wrote sitemap.xml with ${pagePaths.length} URL(s)`);
}

// Build the theme
(async () => {
  try {
    await build(buildConfig);
    // Verify build output
    verifyBuildOutput();
    // Copy theme assets so static deploy can serve /theme/<slug>/assets/*
    copyThemeAssetsToDist();

    // Deployment-specific robots.txt and sitemap.xml (only when base URL is known)
    const projectRoot = path.join(__dirname, '..');
    const baseUrl = resolveBaseUrl();
    if (baseUrl) {
      writeRobotsTxt(projectRoot, baseUrl);
      const pagePaths = getThemePagePaths(projectRoot, themeSlug);
      writeSitemapXml(projectRoot, baseUrl, pagePaths);
    } else {
      console.log(`[testing] SITE_URL / Vercel URL not set; skipping robots.txt and sitemap.xml`);
    }

    console.log(`[testing] ✅ Standalone theme build completed successfully!`);
    console.log(`[testing] Output directory: dist/`);
    console.log(`[testing] Theme: ${themeSlug}`);
    console.log(`[testing] Theme available at: /`);
    console.log(`[testing] Standalone deployment - no admin/CMS routes`);

    // Clean up temporary files and restore original index.html
    try {
      fs.unlinkSync(standaloneEntryPath);
      // Restore original index.html if backup exists
      if (fs.existsSync(backupIndexPath)) {
        fs.copyFileSync(backupIndexPath, originalIndexPath);
        fs.unlinkSync(backupIndexPath);
        console.log(`[testing] Restored original index.html`);
      }
      console.log(`[testing] Cleaned up temporary files`);
    } catch (error) {
      console.warn(`[testing] Warning: Could not clean up temporary files:`, error);
    }
  } catch (error) {
    console.error(`[testing] Build failed:`, error);
    // Cleanup on failure
    cleanupOnFailure();
    process.exit(1);
  }
})();

