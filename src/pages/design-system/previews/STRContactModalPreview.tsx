import React from "react";
import ContactModal from "@/themes/str/ContactModal";

export function STRContactModalPreview() {
  return (
    <div className="p-4">
      <p className="text-sm text-muted-foreground mb-2">
        STR Contact Modal — open via theme context. Rendered below for preview:
      </p>
      <ContactModal isOpen={true} onClose={() => {}} />
    </div>
  );
}
