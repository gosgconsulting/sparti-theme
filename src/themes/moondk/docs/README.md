# Moondk Theme Documentation

## Overview

Moondk is a Korean home dining e-commerce theme featuring chef-led curation, clean airy design, and food-forward editorial aesthetics.

**Category**: E-commerce  
**Design System**: Custom (moondk)  
**Key Features**: Product catalog, shopping cart, checkout flow, category browsing

---

## Design System

### Color Palette

Moondk uses a nature-inspired Korean home dining palette:

- **Primary**: `hsl(145, 33%, 28%)` — Dark forest green (from logo)
- **Background**: `hsl(0, 0%, 95%)` — Light neutral gray
- **Secondary (Cream)**: `hsl(48, 38%, 91%)` — Warm cream/beige
- **Muted (Sage)**: `hsl(100, 9%, 79%)` — Soft sage green
- **Accent (Pink)**: `hsl(350, 19%, 90%)` — Subtle pink

### Tokens

All canonical design tokens are defined in [theme.css](../theme.css) in HSL format for Tailwind compatibility:

- **Core tokens**: `--background`, `--foreground`, `--card`, `--primary`, `--border`, `--ring`, etc.
- **Sidebar tokens**: `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, etc.
- **Chart colors**: `--chart-1` through `--chart-5`
- **Typography**: `--font-sans` (Inter), `--font-serif` (Playfair Display), `--font-mono`
- **Spacing**: `--spacing`, `--letter-spacing`
- **Shadow**: `--shadow-offset-x`, `--shadow-offset-y`, `--shadow-blur`, etc.

### Dark Mode

Dark mode is fully supported via `.moondk-theme.dark` class with adjusted HSL values for all tokens.

### Typography

- **Headings**: Playfair Display (serif) — elegant, editorial
- **Body**: Inter (sans-serif) — clean, readable
- **Font classes**: Use `font-heading` for serif, `font-body` for sans-serif

### Component Styling

- **Buttons**: Fully rounded (`--radius-full: 9999px`)
- **Cards**: Large rounded corners (`--radius-card: 1.5rem`)
- **Shadows**: Subtle, using canonical shadow tokens
- **Transitions**: Smooth cubic-bezier easing
- **Borders**: Use canonical `border-border` with opacity modifiers (`/10`, `/20`, `/50`) for subtle dividers and outlines

---

## Pages and Routing

### Main Pages

- `/` → Homepage with hero slider, category carousel, new arrivals
- `/category/:category` → Product category browsing with filters
- `/product/:id` → Product detail with gallery, description, reviews, add to cart
- `/checkout` → Multi-step checkout flow
- `/about/*` → About pages (our story, sustainability, size guide, store locator)
- `/recipes` → Recipe listing (hidden by default, toggle in Navigation)
- `/recipes/:slug` → Recipe detail
- `/beok-private-dinning` → Private dining experience page

### Legal Pages

- `/privacy-policy`
- `/terms-of-service`
- `/delivery-and-return-policy`

---

## Key Components

### Layout

- **Header** ([components/header/Header.tsx](../components/header/Header.tsx)) — Sticky navigation with logo, menu, search, account, cart
- **Navigation** ([components/header/Navigation.tsx](../components/header/Navigation.tsx)) — Responsive nav with dropdown support, mobile menu
- **Footer** ([components/footer/Footer.tsx](../components/footer/Footer.tsx)) — Brand info, links, contact, social

### E-commerce

- **ShoppingBag** ([components/header/ShoppingBag.tsx](../components/header/ShoppingBag.tsx)) — Off-canvas cart panel
- **CartContext** ([contexts/CartContext.tsx](../contexts/CartContext.tsx)) — Shopping cart state management with localStorage persistence
- **ProductGrid** ([components/category/ProductGrid.tsx](../components/category/ProductGrid.tsx)) — Product listing grid
- **ProductInfo** ([components/product/ProductInfo.tsx](../components/product/ProductInfo.tsx)) — Product detail info, quantity selector, add to bag
- **Checkout** ([pages/Checkout.tsx](../pages/Checkout.tsx)) — Full checkout flow with customer details, shipping, payment

### Home Sections

- **HomeHeroSlider** ([components/home/HomeHeroSlider.tsx](../components/home/HomeHeroSlider.tsx)) — Auto-rotating hero with product/story slides
- **HomeCategoryCarousel** ([components/home/HomeCategoryCarousel.tsx](../components/home/HomeCategoryCarousel.tsx)) — Category navigation carousel
- **HomeNewArrivalsSection** ([components/home/HomeNewArrivalsSection.tsx](../components/home/HomeNewArrivalsSection.tsx)) — New products showcase
- **HomeAboutSection**, **HomeFineDiningSection** — Brand storytelling sections

### UI Components

- **ContactFormSheet** ([components/ContactFormSheet.tsx](../components/ContactFormSheet.tsx)) — Side sheet contact form
- **AddToBagNotification** ([components/ui/AddToBagNotification.tsx](../components/ui/AddToBagNotification.tsx)) — Toast notification for cart actions

---

## Asset Conventions

### Static (git) assets

- **Location**: `src/themes/moondk/assets/`
- **Served at**: `/theme/moondk/assets/<file>`
- **No cross-theme imports**: All assets are self-contained within moondk folder

### Product Images

Product images are organized by category in `assets/`:
- `tea/` — Tea product images
- `oil/` — Oil product images
- `alcohol/` — Alcohol product images
- `noodles/` — Noodle product images

---

## Constants

Theme-specific constants are defined in [constants.ts](../constants.ts):

- `DELIVERY_FEE`: Standard delivery fee (30)
- `FREE_DELIVERY_THRESHOLD`: Free delivery threshold (150)

---

## State Management

### CartContext

Shopping cart state is managed via React Context with localStorage persistence:

- **Provider**: `CartProvider` wraps the entire theme in [index.tsx](../index.tsx)
- **Hook**: `useCart()` provides cart state and actions
- **Actions**: `addToCart`, `updateQuantity`, `removeFromCart`, `clearCart`, `openCart`, `closeCart`
- **Persistence**: Cart items are saved to localStorage (`moondk_cart_items`)

---

## Conventions

### No Cross-Theme Dependencies

Moondk is fully self-contained — no imports from other themes (e.g., e-shop). All assets, components, and styles are within `src/themes/moondk/`.

### Shared Utilities

Moondk uses project-wide shared utilities:
- `@/components/ThemeLink` — Theme-aware navigation links
- `@/hooks/useThemeBasePath` — Base path resolution
- `@/pages/NotFound` — Shared 404 page
- `@/components/ui/*` — Shared UI primitives (Button, Sheet, Input, etc.)
- `@/utils/debugLogger` — Logging utilities (replaces console.log)

### Code Quality

- **No console.log**: Use `debugLog`, `debugError`, `debugWarn` from `@/utils/debugLogger`
- **HSL tokens**: All color tokens in HSL format for Tailwind compatibility
- **Semantic classes**: Prefer `bg-primary`, `text-foreground` over hard-coded colors

---

## Links

- **Root README**: [../../../README.md](../../../README.md) — Project architecture, conventions, systems
- **Design System**: `/design-system` — Live catalog of all components
- **Canonical Tokens**: [src/themes/tokens.css](../../tokens.css) — Token defaults
- **TODO**: [TODO.md](TODO.md) — Theme-specific backlog
