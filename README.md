# Sparti Theme

This project is a React-based frontend application built with Vite, TypeScript, and TailwindCSS. It creates a theme system compatible with Sparti CMS.

## Project Structure

- `src/`: Source code for the frontend application.
- `sparti-cms/`: CMS-related logic and components.
- `public/`: Static assets.
- `scripts/`: Helper scripts for development and building.

## Getting Started

### Prerequisites

- Node.js (v20.19.0 or higher)
- npm (v10.0.0 or higher)

### Installation

Install the dependencies:

```bash
npm install
```

### Development

To start the development server:

```bash
npm run dev
```

This will run Vite in development mode. Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### Building

To build the application for production:

```bash
npm run build
```

The output will be in the `dist/` directory.

## Deployment on Vercel

This project is configured for deployment on Vercel.

1. **Push to GitHub**: Ensure your code is pushed to a GitHub repository.
2. **Import Project**: In Vercel, import your project from GitHub.
3. **Configure Settings**:
    - **Framework Preset**: Vite
    - **Build Command**: `npm run build`
    - **Output Directory**: `dist`
    - **Install Command**: `npm install`
4. **Deploy**: Click Deploy.

The `vercel.json` file includes configuration for single-page application (SPA) rewrites to ensure routing works correctly.

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
