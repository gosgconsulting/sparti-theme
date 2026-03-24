# GO SG Consulting Theme Documentation

## Overview

A full-stack digital growth solution theme with integrated blog functionality, migrated from the original gosgwebsite-main design.

---

## Features

- **Homepage with Hero Section**: Eye-catching hero section with gradient backgrounds and call-to-action
- **Integrated Blog System**: Blog listing and post rendering with WordPress API integration
- **Contact Forms**: Modal-based contact form for lead generation
- **SEO Optimization**: Proper meta tags and structured data
- **Mobile Responsive**: Fully responsive design across all devices
- **Modern UI**: Gradient backgrounds, smooth animations, and modern design patterns

---

## Design System

### Tokens

GO SG Consulting theme uses the canonical design token set with brand-specific overrides:

- **Primary:** Custom gradient (blue to purple)
- **Background:** Light/dark mode support
- **Typography:** Modern sans-serif stack

See `theme.css` for the full token set.

### Components

- **Schema-driven rendering** via `DynamicPageRenderer`
- **Component registry** in `components/registry.ts`
- **Shared components** from `src/libraries/flowbite/`
- **Theme-specific components** in `components/`

All sections are components (own files). Registry entries in `src/config/designSystemRegistry.ts`:
- Header, Footer
- Hero Section, Home Hero Section, Hero Section Simple, Simple Hero Banner
- Features Section, Services Showcase, Content Section, CTA Section, Testimonials Section, Newsletter
- About Section, Challenge Section, Gallery4 Section, Blog Section, Results Carousel Section
- Case Study Banner, FAQ Section, Gallery Section, Pain Point Section, Results Section, Services Section, Team Section, Video Section, Whats Included Section, Why Choose Us Section, Ingredients Section
- Contact Modal, Simple Header, Page Title

---

## Pages and Routing

Schema-driven pages via `DynamicPageRenderer`. See `pages.json` for registered pages.

---

## Asset Conventions

### Static (git) assets

- Location: `src/themes/gosgconsulting/assets/`
- Served at: `/theme/gosgconsulting/assets/<file>`

Assets include:
- `go-sg-logo-official.png`
- `gregoire-liao.png`
- `logos/` — Client logos
- `results/` — SEO results images
- `seo/` — SEO service images

---

## Styling Conventions

- Uses canonical design tokens
- Gradient backgrounds for hero sections
- Modern card-based layouts
- Responsive grid systems

---

## Links

- **Root README:** `../../../README.md` — Project architecture, conventions, systems.
- **Design System:** `/design-system` — Live catalog of all components.
- **Tokens:** `src/themes/tokens.css` — Canonical token defaults.
