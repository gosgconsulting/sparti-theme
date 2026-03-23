import React, { useMemo, useState } from "react";
import type { Hotel2Destination } from "../booking/countries";
import type { CollectionKey, Hotel2Hotel } from "../types";
import HorizontalRail from "../components/HorizontalRail";
import HotelCard from "../components/HotelCard";
import HotelCardLink from "../detail/HotelCardLink";
import { buildHotelDetailHref } from "../utils/hotelDetailUrl";

const TABS: CollectionKey[] = [
  "Luxury Escapes",
  "Family Friendly",
  "Romantic Getaways",
  "Wellness Retreats",
];

type Props = {
  basePath: string;
  hotels: Hotel2Hotel[];
  destination: Hotel2Destination;
  adults: number;
  children: number;
};

export default function CollectionsSection({ basePath, hotels, destination, adults, children }: Props) {
  const [active, setActive] = useState<CollectionKey>("Luxury Escapes");

  const filtered = useMemo(() => {
    return hotels.filter((h) => h.collections.includes(active));
  }, [hotels, active]);

  return (
    <section className="py-10 lg:py-14">
      <div className="container mx-auto">
        <div className="flex flex-col gap-4">
          <div>
            <p className="font-body text-xs tracking-[0.18em] uppercase text-muted-foreground">
              Collections & Experience
            </p>
            <h2 className="mt-2 font-headline text-2xl sm:text-3xl text-foreground">
              Moments that define your stay
            </h2>
            <p className="mt-2 font-body text-sm text-foreground/80 max-w-2xl">
              Switch categories to explore stays that match the tone of your trip—always curated, never crowded.
            </p>
          </div>

          {/* Tabs */}
          <div className="border-b border-border">
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
              {TABS.map((t) => {
                const isActive = active === t;
                return (
                  <button
                    key={t}
                    type="button"
                    className={`relative whitespace-nowrap px-4 sm:px-5 py-3 font-body text-sm transition-colors ${
                      isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"
                    }`}
                    onClick={() => setActive(t)}
                    aria-pressed={isActive}
                  >
                    {t}
                    {isActive && (
                      <span className="absolute left-0 right-0 -bottom-[1px] h-0.5 bg-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 lg:mt-8">
        <HorizontalRail asSection={false}>
        {filtered.map((h) => (
          <div key={h.id} data-rail-card className="transition-opacity duration-200">
            <HotelCardLink
              variant="rail"
              to={buildHotelDetailHref(basePath, h.slug, { destination, adults, children })}
            >
              <HotelCard hotel={h} />
            </HotelCardLink>
          </div>
        ))}
        </HorizontalRail>
      </div>
    </section>
  );
}

