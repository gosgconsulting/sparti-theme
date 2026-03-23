import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Hotel2Destination } from "../booking/countries";
import type { CollectionKey } from "../types";
import DestinationDropdown from "../booking/DestinationDropdown";
import OccupancySelector from "../booking/OccupancySelector";
import { getHotel2Hotels } from "../data/hotels";
import HotelCardLink from "../detail/HotelCardLink";
import HotelResultCard from "../results/HotelResultCard";
import HotelsMap from "../results/HotelsMap";
import { sortHotel2Results, type Hotel2SortKey } from "../results/hotel2Sort";
import ResultsFilterPanel from "../results/ResultsFilterPanel";
import ResultsSort from "../results/ResultsSort";
import { buildHotelDetailHref } from "../utils/hotelDetailUrl";
import { buildHotel2SearchHref } from "../utils/searchUrl";

type Props = {
  basePath: string;
};

const FILTER_PANEL_ID = "hotel2-search-filters";

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

export default function SearchResultsPage({ basePath }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.search]);

  const hotels = useMemo(() => getHotel2Hotels(), []);
  const initial = useMemo(() => readSearchParams(location.search), [location.search]);

  const [destination, setDestination] = useState<Hotel2Destination>(initial.destination);
  const [checkIn, setCheckIn] = useState(initial.checkIn);
  const [checkOut, setCheckOut] = useState(initial.checkOut);
  const [adults, setAdults] = useState(initial.adults);
  const [children, setChildren] = useState(initial.children);
  const [sort, setSort] = useState<Hotel2SortKey>("default");

  const [filterOpen, setFilterOpen] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [selectedCollections, setSelectedCollections] = useState<CollectionKey[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const destinationMatches = useMemo(() => {
    if (destination === "All") return hotels;
    return hotels.filter((h) => h.country === destination);
  }, [hotels, destination]);

  useEffect(() => {
    setMinRating(0);
    setSelectedCollections([]);
    setSelectedAmenities([]);
  }, [destination]);

  const collectionOptions = useMemo(() => {
    const s = new Set<CollectionKey>();
    destinationMatches.forEach((h) => h.collections.forEach((c) => s.add(c)));
    return [...s].sort((a, b) => a.localeCompare(b));
  }, [destinationMatches]);

  const amenityOptions = useMemo(() => {
    const s = new Set<string>();
    destinationMatches.forEach((h) => h.amenities.forEach((a) => s.add(a)));
    return [...s].sort((a, b) => a.localeCompare(b));
  }, [destinationMatches]);

  const filtered = useMemo(() => {
    let list = destinationMatches;
    if (selectedAmenities.length > 0) {
      list = list.filter((h) => selectedAmenities.every((a) => h.amenities.includes(a)));
    }
    if (minRating > 0) list = list.filter((h) => h.rating >= minRating);
    if (selectedCollections.length > 0) {
      list = list.filter((h) => selectedCollections.some((c) => h.collections.includes(c)));
    }
    return list;
  }, [destinationMatches, selectedAmenities, minRating, selectedCollections]);

  const ordered = useMemo(() => sortHotel2Results(filtered, sort), [filtered, sort]);

  const [activeHotelId, setActiveHotelId] = useState<string | null>(ordered[0]?.id ?? null);

  useEffect(() => {
    setActiveHotelId((prev) => {
      if (!ordered.length) return null;
      if (prev && ordered.some((h) => h.id === prev)) return prev;
      return ordered[0]!.id;
    });
  }, [ordered]);

  useEffect(() => {
    if (!filterOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFilterOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filterOpen]);

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

  const toggleCollection = (c: CollectionKey) => {
    setSelectedCollections((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  };

  const toggleAmenity = (name: string) => {
    setSelectedAmenities((prev) => (prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]));
  };

  const clearAllFilters = () => {
    setMinRating(0);
    setSelectedCollections([]);
    setSelectedAmenities([]);
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
                <button
                  type="button"
                  className={`hotel2-btn-tool${filterOpen ? " hotel2-btn-tool-active" : ""}`}
                  aria-label="Filter"
                  aria-expanded={filterOpen}
                  aria-controls={FILTER_PANEL_ID}
                  onClick={() => setFilterOpen((o) => !o)}
                >
                  Filter
                </button>
                <button type="button" className="hotel2-btn-search" onClick={applySearch}>
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="hotel2-results-content">
            <div className="hotel2-results-utilityStrip">
              <div className="hotel2-results-count font-body">
                <span className="tabular-nums">{ordered.length}</span>{" "}
                {ordered.length === 1 ? "result" : "Rentals"}
              </div>
              <ResultsSort sort={sort} onChange={setSort} />
            </div>

            {filterOpen && (
              <>
                <div
                  className="hotel2-results-filterScrim"
                  onClick={() => setFilterOpen(false)}
                  aria-hidden
                />
                <ResultsFilterPanel
                  id={FILTER_PANEL_ID}
                  amenityOptions={amenityOptions}
                  selectedAmenities={selectedAmenities}
                  onToggleAmenity={toggleAmenity}
                  minRating={minRating}
                  onMinRatingChange={setMinRating}
                  collectionOptions={collectionOptions}
                  selectedCollections={selectedCollections}
                  onToggleCollection={toggleCollection}
                  onClearAll={clearAllFilters}
                  onClose={() => setFilterOpen(false)}
                />
              </>
            )}

            <div className="hotel2-results-list" role="list">
              {ordered.map((h) => (
                <HotelCardLink
                  key={h.id}
                  to={buildHotelDetailHref(basePath, h.slug, {
                    destination,
                    checkIn,
                    checkOut,
                    adults,
                    children,
                  })}
                  active={h.id === activeHotelId}
                  onMouseEnter={() => setActiveHotelId(h.id)}
                  onFocus={() => setActiveHotelId(h.id)}
                >
                  <HotelResultCard hotel={h} />
                </HotelCardLink>
              ))}

              {!ordered.length && (
                <div className="hotel2-results-empty">
                  <div className="font-headline text-xl">No results</div>
                  <div className="font-body text-sm text-foreground/80 mt-1">
                    Try a different destination or adjust filters.
                  </div>
                </div>
              )}
            </div>
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
