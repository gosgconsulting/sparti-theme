import React from "react";
import FlowbiteWhatsIncludedSection from "@/libraries/flowbite/components/FlowbiteWhatsIncludedSection";
import type { ComponentSchema } from "@/types/schema";

const mockSchema: ComponentSchema = {
  type: "whatsIncluded",
  props: {},
  items: [
    { key: "title", type: "heading", content: "What's Included" },
    { key: "subtitle", type: "text", content: "Design system preview." },
    {
      key: "items",
      type: "array",
      items: [
        { key: "title", type: "heading", content: "Item 1" },
        { key: "description", type: "text", content: "Description one." },
        { key: "title", type: "heading", content: "Item 2" },
        { key: "description", type: "text", content: "Description two." },
      ],
    },
  ],
};

export function FlowbiteWhatsIncludedSectionPreview() {
  return <FlowbiteWhatsIncludedSection component={mockSchema} />;
}
