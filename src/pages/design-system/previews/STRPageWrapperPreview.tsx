import React from "react";
import { PageWrapper } from "@/themes/str/components/PageWrapper";

/**
 * Design system preview for STR PageWrapper.
 * PageWrapper handles SEO, GTM, GA, favicon, and injects siteName/logoSrc/faviconSrc into children.
 * Uses a minimal div as child since cloneElement requires a single React element.
 */
export function STRPageWrapperPreview() {
  return (
    <PageWrapper
      tenantName="STR"
      pageTitle="Design System Preview"
      pageDescription="STR Page Wrapper - handles branding, SEO, GTM, GA, and favicon for all STR theme pages."
    >
      <div className="rounded-lg border border-border bg-card p-6 text-foreground">
        <h2 className="text-lg font-semibold mb-2">Sample page content</h2>
        <p className="text-sm text-muted-foreground">
          PageWrapper wraps all STR theme pages with SEO metadata, Google Tag Manager, Google Analytics,
          and injects <code className="bg-muted px-1 rounded">siteName</code>,{" "}
          <code className="bg-muted px-1 rounded">logoSrc</code>, and{" "}
          <code className="bg-muted px-1 rounded">faviconSrc</code> into its child.
        </p>
      </div>
    </PageWrapper>
  );
}
