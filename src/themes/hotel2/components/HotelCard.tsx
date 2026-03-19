import React from "react";
import type { Hotel2Hotel } from "../types";

type Props = {
  hotel: Hotel2Hotel;
};

export default function HotelCard({ hotel }: Props) {
  return (
    <article
      className="min-w-[280px] w-[280px] sm:min-w-[320px] sm:w-[320px] lg:min-w-[340px] lg:w-[340px] rounded-2xl bg-transparent border border-border overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.10)] hover:shadow-[0_20px_54px_rgba(0,0,0,0.14)] transition-shadow"
    >
      <div className="relative">
        <div className="aspect-[4/3]">
          <img src={hotel.image} alt={hotel.name} className="h-full w-full object-cover" />
        </div>
        {hotel.tag && (
          <div className="absolute left-4 top-4">
            <span className="inline-flex items-center rounded-full bg-card/90 backdrop-blur px-3 py-1 text-[12px] font-body text-foreground border border-border">
              {hotel.tag}
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-headline text-lg text-foreground truncate">{hotel.name}</h3>
            <p className="mt-1 font-body text-sm text-foreground">
              <span className="text-muted-foreground">{hotel.city}</span>
              <span className="text-muted-foreground"> · </span>
              <span className="text-foreground">{hotel.country}</span>
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-body text-sm text-foreground tabular-nums">
              <span className="font-medium">${hotel.pricePerNight}</span>
              <span className="text-muted-foreground"> / night</span>
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 font-body text-xs text-foreground">
              <span className="text-primary" aria-hidden="true">
                ★
              </span>
              <span className="tabular-nums">{hotel.rating.toFixed(1)}</span>
            </span>
            <span className="font-body text-xs text-muted-foreground tabular-nums">
              {hotel.reviews.toLocaleString()} reviews
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {hotel.amenities.slice(0, 3).map((a) => (
            <span
              key={a}
              className="inline-flex items-center rounded-full border border-border px-3 py-1 font-body text-xs text-foreground"
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

