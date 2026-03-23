import React, { useMemo } from "react";
import type { Hotel2Destination } from "../booking/countries";
import type { Hotel2Hotel } from "../types";
import HotelCard from "../components/HotelCard";
import HorizontalRail from "../components/HorizontalRail";
import HotelCardLink from "../detail/HotelCardLink";
import { buildHotelDetailHref } from "../utils/hotelDetailUrl";

type Props = {
  basePath: string;
  hotels: Hotel2Hotel[];
  destination: Hotel2Destination;
  adults: number;
  children: number;
};

export default function HotelResultsSection({ basePath, hotels, destination, adults, children }: Props) {
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
          <HotelCardLink
            variant="rail"
            to={buildHotelDetailHref(basePath, h.slug, { destination, adults, children })}
          >
            <HotelCard hotel={h} />
          </HotelCardLink>
        </div>
      ))}
    </HorizontalRail>
  );
}

