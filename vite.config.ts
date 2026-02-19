import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import dyadComponentTagger from '@dyad-sh/react-vite-component-tagger';
import { themeDevPlugin } from './vite-plugin-theme-dev';

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
        const distDir = path.resolve(process.cwd(), 'dist/themes');

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
  ].filter(Boolean);

  // Add theme dev plugin if in theme dev mode
  if (envVars.VITE_DEV_THEME_SLUG || envVars.VITE_DEPLOY_THEME_SLUG || envVars.THEME_DEV_MODE) {
    const themeSlug = envVars.VITE_DEV_THEME_SLUG || envVars.VITE_DEPLOY_THEME_SLUG || 'custom';
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
      strictPort: false, // Allow port fallback if 8080 is in use
      hmr: {
        host: 'localhost',
        protocol: 'ws'
        // port and clientPort removed - Vite will auto-detect from server.port
      }
    },
    plugins,
    resolve: {
      alias: resolveAlias,
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      // Force React and React-DOM to be pre-bundled together
      include: ['react', 'react-dom', 'react/jsx-runtime', 'flowbite'],
      force: true // Force re-optimization to clear cache
    },
    build: {
      commonjsOptions: {
        include: [/node_modules/],
      },
    },
  };
});