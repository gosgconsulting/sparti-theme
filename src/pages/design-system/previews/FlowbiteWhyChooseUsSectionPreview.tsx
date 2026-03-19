import React from "react";
import FlowbiteWhyChooseUsSection from "@/libraries/flowbite/components/FlowbiteWhyChooseUsSection";
import type { ComponentSchema } from "@/types/schema";

const mockSchema: ComponentSchema = {
  type: "whyChooseUs",
  props: {},
  items: [
    { key: "title", type: "heading", content: "Why Choose Us" },
    { key: "subtitle", type: "text", content: "Design system preview." },
    {
      key: "reasons",
      type: "array",
      items: [
        { key: "title", type: "heading", content: "Reason 1" },
        { key: "description", type: "text", content: "First reason description." },
        { key: "title", type: "heading", content: "Reason 2" },
        { key: "description", type: "text", content: "Second reason description." },
      ],
    },
  ],
};

export function FlowbiteWhyChooseUsSectionPreview() {
  return <FlowbiteWhyChooseUsSection component={mockSchema} />;
}
