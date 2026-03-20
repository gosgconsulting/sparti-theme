import React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function SpecialRequestsField({ value, onChange }: Props) {
  return (
    <section className="hotel2-detail-panelSection">
      <h2 className="hotel2-detail-panelHeading font-headline">Comments & special requests</h2>
      <p className="hotel2-detail-hint font-body text-muted-foreground text-sm mb-2">
        Optional — share arrival time, bed preference, allergies, or celebration notes.
      </p>
      <textarea
        className="hotel2-detail-textarea font-body"
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Arriving around 22:00 · Twin beds preferred · Nut allergy · Anniversary dinner"
        aria-label="Special requests for the property"
      />
    </section>
  );
}
