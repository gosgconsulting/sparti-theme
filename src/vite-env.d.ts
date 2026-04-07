/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DEPLOY_THEME_SLUG: string;
  /** Medusa v2 backend origin for `@/lib/medusa` (e.g. https://localhost:9000) */
  readonly VITE_MEDUSA_BACKEND_URL?: string;
  /** Medusa publishable key for Store API (`x-publishable-api-key`); required when using Medusa storefront */
  readonly VITE_MEDUSA_PUBLISHABLE_KEY?: string;
  /** Alias for `VITE_MEDUSA_PUBLISHABLE_KEY` */
  readonly VITE_MEDUSA_PUBLISHABLE_API_KEY?: string;
  /** Optional default region id for cart.create (moondk) */
  readonly VITE_MEDUSA_REGION_ID?: string;
  /** Optional payment provider id for checkout.initiatePaymentSession */
  readonly VITE_MEDUSA_PAYMENT_PROVIDER_ID?: string;
  readonly VITE_DATABASE_PUBLIC_URL: string;
  readonly VITE_POSTGRES_DB: string;
  readonly VITE_POSTGRES_USER: string;
  readonly VITE_POSTGRES_PASSWORD: string;
  readonly VITE_ANTHROPIC_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// React Three Fiber JSX bridge
// In some setups (notably with newer React/TS JSX typings), R3F's intrinsic elements
// may not be picked up automatically. Declare the minimal tags we use.
declare namespace React {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      planeGeometry: any;
      shaderMaterial: any;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      planeGeometry: any;
      shaderMaterial: any;
    }
  }
}