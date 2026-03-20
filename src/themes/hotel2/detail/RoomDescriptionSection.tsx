import React, { useState } from "react";

type Props = {
  description: string;
  descriptionMore?: string;
};

const COLLAPSE_LEN = 220;

export default function RoomDescriptionSection({ description, descriptionMore }: Props) {
  const full = descriptionMore ? `${description} ${descriptionMore}` : description;
  const long = full.length > COLLAPSE_LEN;
  const [open, setOpen] = useState(false);

  if (!long) {
    return (
      <section className="hotel2-detail-panelSection">
        <h2 className="hotel2-detail-panelHeading font-headline">Description</h2>
        <p className="hotel2-detail-prose font-body text-foreground/90">{description}</p>
        {descriptionMore ? (
          <p className="hotel2-detail-prose font-body text-foreground/90 mt-2">{descriptionMore}</p>
        ) : null}
      </section>
    );
  }

  const preview = open ? full : `${full.slice(0, COLLAPSE_LEN).trim()}…`;

  return (
    <section className="hotel2-detail-panelSection">
      <h2 className="hotel2-detail-panelHeading font-headline">Description</h2>
      <p className="hotel2-detail-prose font-body text-foreground/90">{open ? full : preview}</p>
      <button type="button" className="hotel2-detail-textBtn font-body" onClick={() => setOpen((o) => !o)}>
        {open ? "Show less" : "Read more"}
      </button>
    </section>
  );
}
