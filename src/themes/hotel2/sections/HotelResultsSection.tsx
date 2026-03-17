import React, { useMemo } from "react";
import type { Hotel2Hotel } from "../types";
import HotelCard from "../components/HotelCard";
import HorizontalRail from "../components/HorizontalRail";

type Props = {
  hotels: Hotel2Hotel[];
  destination: string;
};

export default function HotelResultsSection({ hotels, destination }: Props) {
  const filtered = useMemo(() => {
    if (destination === "All") return hotels;
    return hotels.filter((h) => h.country === destination);
  }, [hotels, destination]);

  return (
    <HorizontalRail
      title="Hotel Results List"
      subtitle={
        destination === "All"
          ? "A curated set of premium hotels—scroll to explore, then refine with destination when needed."
          : `Curated stays in ${destination}.`
      }
    >
      {filtered.map((h) => (
        <div key={h.id} data-rail-card>
          <HotelCard hotel={h} />
        </div>
      ))}
    </HorizontalRail>
  );
}

