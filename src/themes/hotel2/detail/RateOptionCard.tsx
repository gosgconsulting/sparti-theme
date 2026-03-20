import React, { useState } from "react";
import type { Hotel2Rate } from "../types";

function normalizeInclusionLabel(s: string) {
  return s.toLowerCase().replace(/[\u2010-\u2015\u2212]/g, "-");
}

function InclusionGlyph({ label }: { label: string }) {
  const n = normalizeInclusionLabel(label);
  const common = { className: "hotel2-rate-inclusionSvg", viewBox: "0 0 24 24", fill: "none", "aria-hidden": true as const };

  if (n.includes("wi-fi") || n.includes("wifi")) {
    return (
      <svg {...common}>
        <path
          d="M5 12.55a11 11 0 0 1 14.08 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (n.includes("breakfast")) {
    return (
      <svg {...common}>
        <path
          d="M6 13V7a1 1 0 0 1 1-1h1v14M9 6h8a2 2 0 0 1 2 2v2a4 4 0 0 1-4 4H9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (n.includes("accommodation")) {
    return (
      <svg {...common}>
        <path
          d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9zM9 22V12h6v10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Props = {
  rate: Hotel2Rate;
  selected: boolean;
  onSelect: () => void;
  currency: string;
};

export default function RateOptionCard({ rate, selected, onSelect, currency }: Props) {
  const [more, setMore] = useState(false);
  const sym = currency === "USD" ? "$" : `${currency} `;

  return (
    <div className={`hotel2-rate-card font-body${selected ? " is-selected" : ""}`}>
      <button
        type="button"
        className="hotel2-rate-selectRow"
        onClick={onSelect}
        aria-pressed={selected}
      >
        <span className={`hotel2-rate-radioUi${selected ? " is-on" : ""}`} aria-hidden="true" />
        <div className="hotel2-rate-card-top">
          <div className="hotel2-rate-title font-headline">{rate.title}</div>
          <div className="hotel2-rate-price tabular-nums">
            {sym}
            {rate.pricePerNight}
            <span className="hotel2-rate-per text-muted-foreground"> / night</span>
          </div>
        </div>
      </button>
      <div className="hotel2-rate-card-inner">
        <p className="hotel2-rate-summary text-muted-foreground">{rate.summary}</p>
        <p className="hotel2-rate-tax text-muted-foreground text-sm">{rate.taxNote}</p>
        {rate.detail ? (
          <>
            {more ? <p className="hotel2-rate-detail">{rate.detail}</p> : null}
            <button type="button" className="hotel2-detail-textBtn font-body" onClick={() => setMore((m) => !m)}>
              {more ? "Read less" : "Read more"}
            </button>
          </>
        ) : null}
        <div className="hotel2-rate-policies">
          <div>
            <span className="hotel2-rate-policyLabel">Cancellation</span>
            <p>{rate.cancellationPolicy}</p>
          </div>
          <div>
            <span className="hotel2-rate-policyLabel">Deposit</span>
            <p>{rate.depositPolicy}</p>
          </div>
        </div>
        {rate.inclusions.length > 0 ? (
          <ul className="hotel2-rate-inclusions">
            {rate.inclusions.map((inc, i) => (
              <li key={`${rate.id}-inc-${i}`} className="hotel2-rate-inclusionItem">
                <span className="hotel2-rate-inclusionIcon" aria-hidden="true">
                  <InclusionGlyph label={inc} />
                </span>
                <span className="hotel2-rate-inclusionText">{inc}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
