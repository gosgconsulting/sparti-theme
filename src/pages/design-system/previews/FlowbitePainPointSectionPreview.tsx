import React from "react";
import FlowbitePainPointSection from "@/libraries/flowbite/components/FlowbitePainPointSection";
import type { ComponentSchema } from "@/types/schema";

const mockSchema: ComponentSchema = {
  type: "painPoint",
  props: {},
  items: [
    { key: "title", type: "heading", content: "Common Challenges" },
    { key: "subtitle", type: "text", content: "Design system pain point section preview." },
    {
      key: "points",
      type: "array",
      items: [
        { key: "text", type: "text", content: "First pain point." },
        { key: "text", type: "text", content: "Second pain point." },
        { key: "text", type: "text", content: "Third pain point." },
      ],
    },
  ],
};

export function FlowbitePainPointSectionPreview() {
  return <FlowbitePainPointSection component={mockSchema} />;
}
