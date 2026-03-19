import React, { useState } from "react";
import ContactFormModal from "@/themes/master/components/modals/ContactFormModal";

export function MasterContactFormModalPreview() {
  const [open, setOpen] = useState(true);
  return (
    <div className="p-4">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm"
      >
        Open Contact Form Modal
      </button>
      <ContactFormModal
        isOpen={open}
        onClose={() => setOpen(false)}
        tenantName="Design System"
        themeSlug="master"
      />
    </div>
  );
}
