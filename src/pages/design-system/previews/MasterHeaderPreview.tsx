import React from "react";
import Header from "@/themes/master/components/layout/Header";

export function MasterHeaderPreview() {
  return (
    <Header
      tenantName="Design System Preview"
      tenantSlug="master"
      basePath="/design-system"
    />
  );
}
