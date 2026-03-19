import React from "react";
import Footer from "@/themes/master/components/layout/Footer";

export function MasterFooterPreview() {
  return (
    <Footer
      tenantName="Design System Preview"
      basePath="/design-system"
      legalLinks={[
        { label: "Privacy Policy", href: "/design-system#privacy" },
        { label: "Terms & Conditions", href: "/design-system#terms" },
      ]}
    />
  );
}
