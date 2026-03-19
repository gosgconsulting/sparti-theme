import React from "react";
import FlowbiteFAQSection from "@/libraries/flowbite/components/FlowbiteFAQSection";
import type { ComponentSchema } from "@/types/schema";

const mockFAQSchema: ComponentSchema = {
  type: "faq",
  props: {},
  items: [
    { key: "title", type: "heading", content: "Frequently Asked Questions" },
    { key: "subtitle", type: "text", content: "Design system preview" },
    {
      key: "faq1",
      type: "array",
      items: [
        { key: "question", type: "text", content: "What is this component?" },
        { key: "answer", type: "text", content: "A Flowbite FAQ section with accordion." },
      ],
    },
    {
      key: "faq2",
      type: "array",
      items: [
        { key: "question", type: "text", content: "How do I use it?" },
        { key: "answer", type: "text", content: "Pass a ComponentSchema with items for title, subtitle, and faq arrays." },
      ],
    },
  ],
};

export function FlowbiteFAQSectionPreview() {
  return <FlowbiteFAQSection component={mockFAQSchema} />;
}
