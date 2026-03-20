import React from "react";
import type { Hotel2AddOn } from "../types";

type Props = {
  addOns: Hotel2AddOn[];
  quantities: Record<string, number>;
  onQuantityChange: (id: string, qty: number) => void;
  currency: string;
};

function priceSuffix(pricingType: Hotel2AddOn["pricingType"]): string {
  if (pricingType === "per_night") return " / night";
  if (pricingType === "per_unit") return " / unit / night";
  return "";
}

export default function AddOnSelector({ addOns, quantities, onQuantityChange, currency }: Props) {
  const sym = currency === "USD" ? "$" : `${currency} `;

  return (
    <section className="hotel2-detail-panelSection">
      <h2 className="hotel2-detail-panelHeading font-headline">Add-ons</h2>
      <ul className="hotel2-addon-list font-body">
        {addOns.map((a) => {
          const max = a.maxQuantity ?? 1;
          const q = quantities[a.id] ?? 0;
          const simple = max <= 1;

          return (
            <li key={a.id} className="hotel2-addon-row">
              <div className="hotel2-addon-left">
                <div className="hotel2-addon-control">
                  {simple ? (
                    <>
                      <input
                        type="checkbox"
                        id={`addon-${a.id}`}
                        checked={q > 0}
                        onChange={(e) => onQuantityChange(a.id, e.target.checked ? 1 : 0)}
                        className="hotel2-addon-checkbox-input"
                        aria-label={a.title}
                      />
                      <span className="hotel2-addon-checkbox-visual" aria-hidden="true" />
                    </>
                  ) : (
                    <span className="hotel2-addon-control-spacer" aria-hidden="true" />
                  )}
                </div>
                <div className="hotel2-addon-content">
                  {simple ? (
                    <label htmlFor={`addon-${a.id}`} className="hotel2-addon-titleWrap">
                      <span className="hotel2-addon-title">{a.title}</span>
                    </label>
                  ) : (
                    <div className="hotel2-addon-title">{a.title}</div>
                  )}
                  <p className="hotel2-addon-desc text-muted-foreground">{a.description}</p>
                </div>
              </div>

              <div className="hotel2-addon-right">
                <span className="hotel2-addon-price tabular-nums" title={`${sym}${a.price}${priceSuffix(a.pricingType)}`}>
                  {sym}
                  {a.price}
                  {priceSuffix(a.pricingType)}
                </span>
                {!simple ? (
                  <div className="hotel2-addon-stepper">
                    <button
                      type="button"
                      aria-label={`Decrease ${a.title}`}
                      disabled={q <= 0}
                      onClick={() => onQuantityChange(a.id, Math.max(0, q - 1))}
                    >
                      −
                    </button>
                    <span className="tabular-nums">{q}</span>
                    <button
                      type="button"
                      aria-label={`Increase ${a.title}`}
                      disabled={q >= max}
                      onClick={() => onQuantityChange(a.id, Math.min(max, q + 1))}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <span className="hotel2-addon-stepper-spacer" aria-hidden="true" />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
