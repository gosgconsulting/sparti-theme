import React, { useState } from "react";
import ContactPanel from "@/themes/nail-queen/components/ContactPanel";

export function NailQueenContactPanelPreview() {
  const [open, setOpen] = useState(true);
  return (
    <div className="p-4">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm"
      >
        Open Contact Panel
      </button>
      <ContactPanel open={open} onOpenChange={setOpen} />
    </div>
  );
}
