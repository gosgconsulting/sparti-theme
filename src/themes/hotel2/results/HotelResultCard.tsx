import React from "react";
import type { Hotel2Hotel } from "../types";

type Props = {
  hotel: Hotel2Hotel;
  active: boolean;
  onHover: () => void;
  onFocus: () => void;
};

export default function HotelResultCard({ hotel, active, onHover, onFocus }: Props) {
  return (
    <article
      className={`hotel2-result-card ${active ? "is-active" : ""}`}
      tabIndex={0}
      onMouseEnter={onHover}
      onFocus={onFocus}
      role="listitem"
      aria-label={hotel.name}
    >
      <div className="hotel2-result-image">
        <img src={hotel.image} alt={hotel.name} loading="lazy" />
        {hotel.tag && <div className="hotel2-result-badge">{hotel.tag}</div>}
      </div>

      <div className="hotel2-result-content">
        <div className="hotel2-result-top">
          <div className="hotel2-result-titleWrap">
            <div className="hotel2-result-title font-headline">{hotel.name}</div>
            <div className="hotel2-result-location font-body">
              <span className="text-brand-muted">{hotel.city}</span>
              <span className="text-brand-muted"> · </span>
              <span className="text-brand-dark">{hotel.country}</span>
            </div>
          </div>
          <div className="hotel2-result-price font-body">
            <div className="hotel2-result-priceValue tabular-nums">${hotel.pricePerNight}</div>
            <div className="hotel2-result-priceUnit text-brand-muted">/ night</div>
          </div>
        </div>

        <div className="hotel2-result-facts font-body">
          <span className="hotel2-fact">
            <span aria-hidden="true">🛏️</span> 3 Bedrooms
          </span>
          <span className="hotel2-fact">
            <span aria-hidden="true">🛁</span> 2 Baths
          </span>
          <span className="hotel2-fact">
            <span aria-hidden="true">👥</span> 8 Guests
          </span>
        </div>

        <div className="hotel2-result-bottom">
          <div className="hotel2-result-rating font-body">
            <span className="hotel2-star" aria-hidden="true">
              ★
            </span>
            <span className="tabular-nums">{hotel.rating.toFixed(1)}</span>
            <span className="hotel2-dot" aria-hidden="true">
              ·
            </span>
            <span className="text-brand-muted tabular-nums">{hotel.reviews.toLocaleString()} reviews</span>
          </div>

          <div className="hotel2-result-amenities font-body">
            {hotel.amenities.slice(0, 2).map((a) => (
              <span key={a} className="hotel2-amenity">
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

