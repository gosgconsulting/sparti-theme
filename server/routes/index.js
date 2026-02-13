import express from 'express';
import { authenticateWithAccessKey } from '../middleware/accessKey.js';
import { authenticateTenantApiKey } from '../middleware/tenantApiKey.js';

// Import route modules (minimal: health, tenants, themes, theme SPA)
import healthRoutes from './health.js';
import themeRoutes from './theme.js';
import themeAdminRoutes from './theme-admin.js';
import themesApiRoutes from './themes.js';
import tenantsApiRoutes from './tenants-api.js';
import publicRoutes from './public.js';

const router = express.Router();

// Apply access key authentication middleware to all API routes except verify-access-key and v1 routes
router.use('/api', (req, res, next) => {
  // Skip authentication for OPTIONS requests (handled by CORS middleware)
  if (req.method === 'OPTIONS') {
    return next();
  }
  // IMPORTANT: Inside a router mounted at '/api', req.path is relative (e.g., '/auth/login')
  // Skip access key authentication for the verify-access-key endpoint
  if (req.path === '/auth/verify-access-key') {
    return next();
  }
  // Skip access key authentication for auth endpoints that use JWT or are public
  if (
    req.path === '/auth/login' ||
    req.path === '/auth/register' ||
    req.path === '/auth/me' // allow JWT auth to handle this route
  ) {
    return next();
  }
  // Skip access key authentication for v1 routes (they use tenant API key authentication)
  if (req.path.startsWith('/v1')) {
    return next();
  }
  return authenticateWithAccessKey(req, res, next);
});

// Mount routes
// Health check routes
router.use('/', healthRoutes);

// Public tenant API routes (no authentication required for list and by-slug)
router.use('/api/tenants', tenantsApiRoutes);

// Public themes API routes
router.use('/api/themes', themesApiRoutes);

// Public v1 API (pages, blog, header/footer, settings, branding) – tenant via API key or tenantId query/header
router.use('/api/v1', authenticateTenantApiKey, publicRoutes);

// Theme routes (mounted before other routes to catch /theme/* paths)
// Theme auth routes (must come before general theme routes, but only handle specific paths)
// This route is very specific: /theme/:themeSlug/auth
// Note: Admin route has been removed to avoid conflicts
router.use('/theme', themeAdminRoutes);

// Block /theme/template (root only). Template previews live under /theme/template/*
router.use('/theme/template', (req, res, next) => {
  // When mounted at /theme/template, req.path is '' or '/' for the root.
  if (req.path === '' || req.path === '/') {
    return res.status(404).send('Not Found');
  }
  return next();
});

// All themes: React SPA
// This handles all other /theme/* paths that weren't matched by themeAdminRoutes
// Routes like /theme/str, /theme/str/group-class, etc.
router.use('/theme', themeRoutes);

// Dynamic robots.txt route - serves different content based on deployment type
router.get('/robots.txt', (req, res) => {
  const deployThemeSlug = process.env.VITE_DEPLOY_THEME_SLUG;
  const cmsTenant = process.env.CMS_TENANT;
  
  // Check if this is a theme deployment (both DEPLOY_THEME_SLUG and CMS_TENANT should be set)
  const isThemeDeployment = deployThemeSlug && cmsTenant;
  
  res.setHeader('Content-Type', 'text/plain');
  
  if (isThemeDeployment) {
    // Allow indexing for theme deployments
    res.send(`User-agent: *
Allow: /

# Sitemap
Sitemap: ${req.protocol}://${req.get('host')}/sitemap.xml
`);
    console.log('[testing] Serving robots.txt for theme deployment - allowing indexing');
  } else {
    // Prevent indexing for CMS admin interface
    res.send(`User-agent: *
Disallow: /

# CMS Admin Interface - Not for public indexing
`);
    console.log('[testing] Serving robots.txt for CMS admin - preventing indexing');
  }
});

export default router;