import React from "react";
import { Layout } from "@/themes/sissonne/components/Layout";

export function SissonneLayoutPreview() {
  return (
    <Layout tenantSlug="sissonne">
      <div className="p-6 text-muted-foreground text-sm">
        Design system preview: Sissonne Layout wraps the full page (header, nav, footer, contact modal).
      </div>
    </Layout>
  );
}
