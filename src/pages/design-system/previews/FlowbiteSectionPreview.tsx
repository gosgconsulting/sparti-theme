import React from "react";
import FlowbiteSection from "@/libraries/flowbite/components/FlowbiteSection";

export function FlowbiteSectionPreview() {
  return (
    <FlowbiteSection
      title="Design System Section (base)"
      subtitle="Use this as the base section wrapper with title and subtitle."
    >
      <div className="p-4 text-sm text-muted-foreground">
        Children content goes here. Use FlowbiteSection for consistent section layout.
      </div>
    </FlowbiteSection>
  );
}
