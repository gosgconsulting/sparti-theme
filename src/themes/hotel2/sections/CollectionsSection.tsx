import React, { useMemo, useState } from "react";
import type { CollectionKey, Hotel2Hotel } from "../types";
import HorizontalRail from "../components/HorizontalRail";
import HotelCard from "../components/HotelCard";

const TABS: CollectionKey[] = [
  "Luxury Escapes",
  "Family Friendly",
  "Romantic Getaways",
  "Wellness Retreats",
];

type Props = {
  hotels: Hotel2Hotel[];
};

export default function CollectionsSection({ hotels }: Props) {
  const [active, setActive] = useState<CollectionKey>("Luxury Escapes");

  const filtered = useMemo(() => {
    return hotels.filter((h) => h.collections.includes(active));
  }, [hotels, active]);

  return (
    <section className="py-10 lg:py-14">
      <div className="container mx-auto">
        <div className="flex flex-col gap-4">
          <div>
            <p className="font-body text-xs tracking-[0.18em] uppercase text-brand-muted">
              Collections & Experience
            </p>
            <h2 className="mt-2 font-headline text-2xl sm:text-3xl text-black">
              Moments that define your stay
            </h2>
            <p className="mt-2 font-body text-sm text-brand-dark/80 max-w-2xl">
              Switch categories to explore stays that match the tone of your trip—always curated, never crowded.
            </p>
          </div>

          {/* Tabs */}
          <div className="border-b border-black/10">
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
              {TABS.map((t) => {
                const isActive = active === t;
                return (
                  <button
                    key={t}
                    type="button"
                    className={`relative whitespace-nowrap px-4 sm:px-5 py-3 font-body text-sm transition-colors ${
                      isActive ? "text-brand-accent" : "text-brand-dark/70 hover:text-brand-dark"
                    }`}
                    onClick={() => setActive(t)}
                    aria-pressed={isActive}
                  >
                    {t}
                    {isActive && (
                      <span className="absolute left-0 right-0 -bottom-[1px] h-0.5 bg-[var(--brand-accent)]" />
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
            <HotelCard hotel={h} />
          </div>
        ))}
        </HorizontalRail>
      </div>
    </section>
  );
}

