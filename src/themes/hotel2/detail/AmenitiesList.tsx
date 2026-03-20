import React, { useState } from "react";

type Props = {
  amenities: string[];
  initialVisible?: number;
};

export default function AmenitiesList({ amenities, initialVisible = 6 }: Props) {
  const [open, setOpen] = useState(false);
  const needsToggle = amenities.length > initialVisible;
  const visible = open ? amenities : amenities.slice(0, initialVisible);

  return (
    <section className="hotel2-detail-panelSection">
      <h2 className="hotel2-detail-panelHeading font-headline">Amenities</h2>
      <ul className="hotel2-detail-amenities font-body">
        {visible.map((a, i) => (
          <li key={`${a}-${i}`}>{a}</li>
        ))}
      </ul>
      {needsToggle ? (
        <button type="button" className="hotel2-detail-textBtn font-body" onClick={() => setOpen((o) => !o)}>
          {open ? "Show less" : "Show more"}
        </button>
      ) : null}
    </section>
  );
}
