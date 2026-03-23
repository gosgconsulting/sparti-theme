import React, { useState } from "react";
import type { Hotel2Rate } from "../types";

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
      </div>
    </div>
  );
}
