import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Hotel2Destination } from "../booking/countries";
import type { Hotel2Hotel } from "../types";
import DestinationDropdown from "../booking/DestinationDropdown";
import OccupancySelector from "../booking/OccupancySelector";
import { getHotel2Hotels } from "../data/hotels";
import { buildHotel2SearchHref } from "../utils/searchUrl";
import HotelsMap from "../results/HotelsMap";
import HotelResultCard from "../results/HotelResultCard";
import ResultsSort from "../results/ResultsSort";

type Props = {
  basePath: string;
};

type SortKey = "default" | "price_low" | "rating_high" | "reviews_high";

function clampInt(v: string | null, fallback: number, min: number, max: number) {
  const n = Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.trunc(n)));
}

function readSearchParams(search: string) {
  const p = new URLSearchParams(search);
  const destination = (p.get("destination") || "All") as Hotel2Destination;
  const checkIn = p.get("checkIn") || "";
  const checkOut = p.get("checkOut") || "";
  const adults = clampInt(p.get("adults"), 2, 1, 12);
  const children = clampInt(p.get("children"), 0, 0, 8);
  return { destination, checkIn, checkOut, adults, children };
}

function sortHotels(hotels: Hotel2Hotel[], sort: SortKey) {
  const copy = [...hotels];
  if (sort === "price_low") copy.sort((a, b) => a.pricePerNight - b.pricePerNight);
  else if (sort === "rating_high") copy.sort((a, b) => b.rating - a.rating);
  else if (sort === "reviews_high") copy.sort((a, b) => b.reviews - a.reviews);
  return copy;
}

export default function SearchResultsPage({ basePath }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const hotels = useMemo(() => getHotel2Hotels(), []);
  const initial = useMemo(() => readSearchParams(location.search), [location.search]);

  const [destination, setDestination] = useState<Hotel2Destination>(initial.destination);
  const [checkIn, setCheckIn] = useState(initial.checkIn);
  const [checkOut, setCheckOut] = useState(initial.checkOut);
  const [adults, setAdults] = useState(initial.adults);
  const [children, setChildren] = useState(initial.children);
  const [sort, setSort] = useState<SortKey>("default");

  const filtered = useMemo(() => {
    if (destination === "All") return hotels;
    return hotels.filter((h) => h.country === destination);
  }, [hotels, destination]);

  const ordered = useMemo(() => sortHotels(filtered, sort), [filtered, sort]);

  const [activeHotelId, setActiveHotelId] = useState<string | null>(ordered[0]?.id ?? null);

  const activeIdx = useMemo(() => {
    if (!activeHotelId) return -1;
    return Math.max(
      0,
      ordered.findIndex((h) => h.id === activeHotelId)
    );
  }, [ordered, activeHotelId]);

  const applySearch = () => {
    navigate(
      buildHotel2SearchHref(basePath, { destination, checkIn, checkOut, adults, children }),
      { replace: false }
    );
  };

  return (
    <div className="hotel2-results-page">
      <div className="hotel2-results-shell">
        <div className="hotel2-results-left">
          <div className="hotel2-results-header">
            <div className="hotel2-results-titleRow">
              <h1 className="font-headline hotel2-results-title">Search results</h1>
              <div className="hotel2-results-destination">
                <span className="hotel2-results-pill">
                  {destination === "All" ? "All destinations" : destination}
                </span>
              </div>
            </div>

            <div className="hotel2-results-toolbar">
              <div className="hotel2-results-controls">
                <div className="hotel2-control">
                  <div className="hotel2-control-icon" aria-hidden="true">
                    🗓️
                  </div>
                  <div className="hotel2-control-body">
                    <div className="hotel2-control-label">Arrive</div>
                    <input
                      aria-label="Arrive"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="hotel2-control-input"
                    />
                  </div>
                </div>

                <div className="hotel2-control">
                  <div className="hotel2-control-icon" aria-hidden="true">
                    🗓️
                  </div>
                  <div className="hotel2-control-body">
                    <div className="hotel2-control-label">Depart</div>
                    <input
                      aria-label="Depart"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="hotel2-control-input"
                    />
                  </div>
                </div>

                <div className="hotel2-control hotel2-control-dropdown">
                  <div className="hotel2-control-icon" aria-hidden="true">
                    👤
                  </div>
                  <div className="hotel2-control-body">
                    <div className="hotel2-control-label">Guests</div>
                    <OccupancySelector
                      adults={adults}
                      children={children}
                      onAdultsChange={setAdults}
                      onChildrenChange={setChildren}
                      variant="compact"
                    />
                  </div>
                </div>

                <div className="hotel2-control hotel2-control-dropdown">
                  <div className="hotel2-control-icon" aria-hidden="true">
                    📍
                  </div>
                  <div className="hotel2-control-body">
                    <div className="hotel2-control-label">Destination</div>
                    <DestinationDropdown
                      value={destination}
                      onChange={setDestination}
                      variant="compact"
                      placeholder="All"
                    />
                  </div>
                </div>
              </div>

              <div className="hotel2-results-toolbarActions">
                <button type="button" className="hotel2-btn-tool" aria-label="Filter">
                  Filter
                </button>
                <button type="button" className="hotel2-btn-search" onClick={applySearch}>
                  Search
                </button>
              </div>
            </div>

            <div className="hotel2-results-utilityStrip">
              <div className="hotel2-results-count font-body">
                <span className="tabular-nums">{ordered.length}</span>{" "}
                {ordered.length === 1 ? "result" : "Rentals"}
              </div>
              <ResultsSort sort={sort} onChange={setSort} />
            </div>
          </div>

          <div className="hotel2-results-list" role="list">
            {ordered.map((h) => (
              <HotelResultCard
                key={h.id}
                hotel={h}
                active={h.id === activeHotelId}
                onHover={() => setActiveHotelId(h.id)}
                onFocus={() => setActiveHotelId(h.id)}
              />
            ))}

            {!ordered.length && (
              <div className="hotel2-results-empty">
                <div className="font-headline text-xl">No results</div>
                <div className="font-body text-sm text-foreground/80 mt-1">
                  Try a different destination.
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="hotel2-results-right" aria-label="Map panel">
          <HotelsMap
            hotels={ordered}
            activeHotelId={activeHotelId}
            onActiveHotelIdChange={setActiveHotelId}
            activeIndex={activeIdx}
            onPrev={() => {
              if (!ordered.length) return;
              const next = (activeIdx - 1 + ordered.length) % ordered.length;
              setActiveHotelId(ordered[next]!.id);
            }}
            onNext={() => {
              if (!ordered.length) return;
              const next = (activeIdx + 1) % ordered.length;
              setActiveHotelId(ordered[next]!.id);
            }}
          />
        </div>
      </div>
    </div>
  );
}

