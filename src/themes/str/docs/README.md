# STR Theme Documentation

## Overview

Strength training and rehabilitation theme with inline sections, Google reviews integration, and booking functionality.

---

## Features

- **Page Wrapper**: SEO, GTM, GA, favicon, child inject
- **Hero Section**: Reusable hero component
- **Inline Sections**: About, Programmes, Gallery, Testimonials, Team, FAQ, CTA
- **Google Reviews**: Live testimonials carousel
- **Booking Integration**: Class and personal training booking
- **Contact Modal**: Lead generation form

---

## Design System

### Tokens

STR theme uses the canonical design token set with brand-specific overrides:

- **Primary:** Red accent (`#ff0000`)
- **Background:** Dark mode (`0 0% 12%`)
- **Typography:** Bebas Neue (headings), Inter (body)

See `theme.css` for the full token set.

### Components

STR has **one reusable component** (HeroSection) and **one layout helper** (PageWrapper). All other sections are **inline** in the theme files.

Registry entries in `src/config/designSystemRegistry.ts`:
- Page Wrapper, Hero Section
- About, Programmes, Gallery, Testimonials, Team, FAQ, CTA (inline sections with placeholders)
- Header, Footer, Contact Modal (inline)

---

## Pages and Routing

- `/theme/str/` → Homepage
- `/theme/str/group-class` → Group class page
- `/theme/str/personal-training` → Personal training page
- `/theme/str/physiotherapy` → Physiotherapy page
- `/theme/str/thank-you` → Thank you page
- `/theme/str/booking` → Booking page
- `/theme/str/packages` → Packages page
- `/theme/str/classes` → Classes page

---

## Asset Conventions

### Static (git) assets

- Location: `src/themes/str/assets/`
- Served at: `/theme/str/assets/<file>`

---

## Styling Conventions

- Dark theme with red accent
- Bold typography (Bebas Neue)
- Inline sections (not extracted to components)
- Google Reviews API integration

---

## Links

- **Root README:** `../../../README.md` — Project architecture, conventions, systems.
- **Design System:** `/design-system` — Live catalog of all components.
- **Tokens:** `src/themes/tokens.css` — Canonical token defaults.
