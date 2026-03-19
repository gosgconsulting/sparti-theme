import React from "react";
import { Layout } from "@/themes/nail-queen/components/Layout";

export function NailQueenLayoutPreview() {
  return (
    <Layout basePath="/design-system">
      <div className="p-6 text-muted-foreground text-sm">
        Design system preview: Nail-queen Layout (header, nav, footer, contact panel).
      </div>
    </Layout>
  );
}
