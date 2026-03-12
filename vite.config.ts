import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import dyadComponentTagger from '@dyad-sh/react-vite-component-tagger';
import { themeDevPlugin } from './vite-plugin-theme-dev';
import { generateRobotsTxt, generateSitemapXml } from './src/themes/pagesRegistry';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables from .env files
  // Vite's loadEnv loads .env, .env.local, .env.[mode], .env.[mode].local
  const env = loadEnv(mode, process.cwd(), '');

  // Merge loaded env vars with process.env (process.env takes precedence)
  const envVars = { ...env, ...process.env };

  const plugins = [
    // Tailwind v4 (Vite plugin)
    tailwindcss(),
    dyadComponentTagger(),
    react(),
    mode === 'development' && componentTagger(),
    {
      name: 'theme-spa-fallback',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url || '';
          const pathname = url.split('?')[0];
          const isThemePath = pathname === '/theme' || pathname.startsWith('/theme/');

          if (isThemePath) {
            // Check if it's an asset request (has file extension)
            const hasExtension = /\.([a-zA-Z0-9]+)$/.test(pathname);

            // If it's not an asset, serve index.html for SPA routing (including exact /theme)
            if (!hasExtension) {
              req.url = '/index.html';
            } else {
              // If it IS an asset, rewrite /theme/... to /src/theme/... for dev serving
              // Only do this if the file exists in src/theme, but simplest is to just rewrite
              // since /theme/ doesn't exist in root anyway.
              // Note: We only rewrite /theme/ to /src/theme/
              // The request might be /theme/landingpage/assets/logo.png -> /src/theme/landingpage/assets/logo.png
              if (pathname.startsWith('/theme/')) {
                req.url = req.url?.replace('/theme/', '/src/themes/');
              }
            }
          }

          next();
        });
      }
    },
    // Copy theme assets to dist/theme under correct structure for production
    {
      name: 'copy-theme-assets',
      closeBundle() {
        const themeDir = path.resolve(process.cwd(), 'src/themes');
        const distDir = path.resolve(process.cwd(), 'dist/theme');

        if (!fs.existsSync(themeDir)) return;

        try {
          // Get all themes
          const subjects = fs.readdirSync(themeDir);

          // Filter by DEPLOY_THEME_SLUG if set (using envVars merged from .env)
          const targetTheme = envVars.DEPLOY_THEME_SLUG || envVars.VITE_DEPLOY_THEME_SLUG;

          subjects.forEach((subject: string) => {
            // If a specific theme is targeted, skip others
            if (targetTheme && subject !== targetTheme) {
              return;
            }
            const subjectPath = path.join(themeDir, subject);
            const stats = fs.statSync(subjectPath);

            if (stats.isDirectory()) {
              const assetsDir = path.join(subjectPath, 'assets');
              if (fs.existsSync(assetsDir)) {
                // Target: dist/theme/{slug}/assets
                const destDir = path.join(distDir, subject, 'assets');
                fs.mkdirSync(path.dirname(destDir), { recursive: true });

                // Copy recursively
                fs.cpSync(assetsDir, destDir, { recursive: true });
                console.log(`[vite] Copied assets for theme: ${subject}`);
              }
            }
          });
        } catch (e) {
          console.error('[vite] Error copying theme assets:', e);
        }
      }
    },
    // Generate robots.txt and sitemap.xml as static files for non-Vercel deployments.
    // On Vercel, these are served dynamically by api/robots.ts and api/sitemap.ts instead.
    !envVars.VERCEL && {
      name: 'generate-seo-files',
      closeBundle() {
        const siteUrl = envVars.SITE_URL || '';
        const themeSlug = envVars.DEPLOY_THEME_SLUG || envVars.VITE_DEPLOY_THEME_SLUG || '';
        const distDir = path.resolve(process.cwd(), 'dist');

        if (!fs.existsSync(distDir)) return;

        if (!siteUrl) {
          console.warn('[vite] SITE_URL not set — skipping robots.txt / sitemap.xml generation');
          return;
        }

        fs.writeFileSync(path.join(distDir, 'robots.txt'), generateRobotsTxt(siteUrl), 'utf-8');
        console.log('[vite] Generated dist/robots.txt');

        if (themeSlug) {
          const xml = generateSitemapXml(siteUrl, themeSlug);
          if (xml) {
            fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf-8');
            console.log(`[vite] Generated dist/sitemap.xml for theme: ${themeSlug}`);
          } else {
            console.warn(`[vite] Unknown theme "${themeSlug}" — skipping sitemap.xml generation`);
          }
        } else {
          console.warn('[vite] DEPLOY_THEME_SLUG not set — skipping sitemap.xml generation');
        }
      },
    },
  ].filter(Boolean);

  // Add theme dev plugin if in theme dev mode
  if (envVars.VITE_DEV_THEME_SLUG || envVars.VITE_DEPLOY_THEME_SLUG || envVars.DEPLOY_THEME_SLUG || envVars.THEME_DEV_MODE) {
    const themeSlug = envVars.VITE_DEV_THEME_SLUG || envVars.VITE_DEPLOY_THEME_SLUG || envVars.DEPLOY_THEME_SLUG || 'custom';
    // Read tenant ID from .env file (CMS_TENANT) or environment variables
    // Priority: process.env (set by dev-theme.js) > .env file > fallback
    const tenantId = envVars.CMS_TENANT || envVars.VITE_DEV_TENANT_ID || envVars.VITE_DEPLOY_TENANT_ID || 'tenant-gosg';
    console.log(`[testing] Theme dev plugin: themeSlug: ${themeSlug}, tenantId: ${tenantId}`);
    console.log(`[testing] Env vars - CMS_TENANT: ${envVars.CMS_TENANT || 'not set'}, VITE_DEV_TENANT_ID: ${envVars.VITE_DEV_TENANT_ID || 'not set'}`);
    plugins.push(themeDevPlugin(themeSlug, tenantId));
  }

  // When theme folder is excluded (CMS-only deployments), resolve src/theme to stubs so build succeeds.
  // NOTE: Vercel sets process.env.VERCEL=1 automatically, but we still want themes to work on Vercel.
  // Use VITE_SKIP_THEMES=1 (or VERCEL_CMS_ONLY=1) explicitly to enable stubs.
  const useThemeStubs = envVars.VITE_SKIP_THEMES === '1' || envVars.VERCEL_CMS_ONLY === '1';
  const themeStubsPath = path.resolve(__dirname, 'src/theme-stubs');
  const resolveAlias: Array<{ find: string | RegExp; replacement: string }> = [
    { find: '@', replacement: path.resolve(__dirname, './src') },
  ];
  if (useThemeStubs) {
    // IMPORTANT: Vite can sometimes attempt to load an aliased directory as a file.
    // Map top-level theme entry imports to the actual stub index file explicitly.
    resolveAlias.push({
      find: /src\/themes\/([^/]+)$/,
      replacement: themeStubsPath + '/$1/index.tsx',
    });

    // Map deep imports (e.g. src/themes/gosgconsulting/services/wordpressApi)
    // directly into the stubs folder.
    resolveAlias.push({ find: /src\/themes(.*)/, replacement: themeStubsPath + '$1' });
  }

  const deployThemeSlug = envVars.DEPLOY_THEME_SLUG || envVars.VITE_DEPLOY_THEME_SLUG || '';

  return {
    define: deployThemeSlug
      ? { 'import.meta.env.DEPLOY_THEME_SLUG': JSON.stringify(deployThemeSlug) }
      : { 'import.meta.env.DEPLOY_THEME_SLUG': JSON.stringify('') },
    server: {
      host: "::",
      port: 8080,
      strictPort: false,
      hmr: {
        host: 'localhost',
        protocol: 'ws'
      }
    },
    plugins,
    resolve: {
      alias: resolveAlias,
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react/jsx-runtime', 'flowbite'],
      force: true
    },
    build: {
      commonjsOptions: {
        include: [/node_modules/],
      },
      rollupOptions: {
        output: {
          /**
           * Split node_modules into focused vendor chunks for better HTTP caching.
           * - react-vendor: React core (rarely changes)
           * - query-vendor:  React Query (rarely changes)
           * - ui-vendor:     Radix UI + shadcn primitives (changes with design system upgrades)
           * - three-vendor:  Three.js (large, only loaded by 3D-capable themes)
           * - animation-vendor: GSAP + framer-motion (only loaded by animated themes)
           * - chart-vendor:  Recharts + Chart.js (only loaded by dashboard themes)
           */
          manualChunks(id: string) {
            if (!id.includes('node_modules')) return;

            // React core runtime
            if (
              id.includes('/react/') ||
              id.includes('/react-dom/') ||
              id.includes('/react-router') ||
              id.includes('/scheduler/')
            ) {
              return 'react-vendor';
            }

            // React Query / TanStack
            if (id.includes('@tanstack/')) {
              return 'query-vendor';
            }

            // Radix UI primitives + shadcn/ui building blocks
            if (id.includes('@radix-ui/') || id.includes('class-variance-authority') || id.includes('tailwind-merge') || id.includes('clsx')) {
              return 'ui-vendor';
            }

            // Heavy 3D library — only used by specific themes
            if (id.includes('/three/') || id.includes('@react-three/')) {
              return 'three-vendor';
            }

            // Animation libraries — only used by animated themes
            if (id.includes('/gsap/') || id.includes('@gsap/') || id.includes('/framer-motion/') || id.includes('/motion/')) {
              return 'animation-vendor';
            }

            // Charting libraries — only used by dashboard/analytics themes
            if (id.includes('/recharts/') || id.includes('/chart.js/') || id.includes('/react-chartjs-2/')) {
              return 'chart-vendor';
            }
          },
        },
      },
    },
  };
});