import React from "react";
import type { Hotel2Hotel } from "../types";

type Props = {
  hotel: Hotel2Hotel;
};

export default function HotelResultCard({ hotel }: Props) {
  return (
    <article className="hotel2-result-card" role="listitem" aria-label={hotel.name}>
      <div className="hotel2-result-image">
        <img src={hotel.image} alt={hotel.name} loading="lazy" />
        {hotel.tag && <div className="hotel2-result-badge">{hotel.tag}</div>}
      </div>

      <div className="hotel2-result-content">
        <div className="hotel2-result-top">
          <div className="hotel2-result-titleWrap">
            <div className="hotel2-result-title font-headline">{hotel.name}</div>
            <div className="hotel2-result-location font-body">
              <span className="text-muted-foreground">{hotel.city}</span>
              <span className="text-muted-foreground"> · </span>
              <span className="text-foreground">{hotel.country}</span>
            </div>
          </div>
          <div className="hotel2-result-price font-body">
            <div className="hotel2-result-priceValue tabular-nums">${hotel.pricePerNight}</div>
            <div className="hotel2-result-priceUnit text-muted-foreground">/ night</div>
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
            <span className="text-muted-foreground tabular-nums">{hotel.reviews.toLocaleString()} reviews</span>
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

