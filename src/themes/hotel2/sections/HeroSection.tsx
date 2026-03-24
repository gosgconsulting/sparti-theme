import React, { useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import StayDateRangePicker from "../booking/StayDateRangePicker";
import DestinationDropdown from "../booking/DestinationDropdown";
import OccupancySelector from "../booking/OccupancySelector";
import type { Hotel2Destination } from "../booking/countries";

type Props = {
  destination: Hotel2Destination;
  onDestinationChange: (v: Hotel2Destination) => void;
  adults: number;
  children: number;
  onAdultsChange: (n: number) => void;
  onChildrenChange: (n: number) => void;
  onFindHotels: (payload: {
    destination: Hotel2Destination;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
  }) => void;
};

function yyyyMmDd(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function nightsBetween(start: string, end: string) {
  const s = new Date(`${start}T00:00:00`);
  const e = new Date(`${end}T00:00:00`);
  if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return 0;
  const ms = e.getTime() - s.getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}

export default function HeroSection({
  destination,
  onDestinationChange,
  adults,
  children,
  onAdultsChange,
  onChildrenChange,
  onFindHotels,
}: Props) {
  const today = useMemo(() => new Date(), []);
  const [checkIn, setCheckIn] = useState(() => yyyyMmDd(today));
  const [checkOut, setCheckOut] = useState(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + 2);
    return yyyyMmDd(d);
  });

  return (
    <>
      <section className="relative overflow-hidden min-h-[62vh] sm:min-h-[68vh] lg:min-h-[74vh]">
        {/* Full-bleed hero image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2000&q=80"
            alt="Hotel lobby"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/15" />
        </div>

        <div className="relative pt-32 sm:pt-36 lg:pt-40 pb-24 lg:pb-28">
          <div className="container mx-auto">
            <div className="max-w-3xl">
              <p className="font-body text-xs tracking-[0.18em] uppercase text-white/80">
                Modern urban hospitality
              </p>
              <h1 className="mt-3 font-headline text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.02]">
                Stay with intention.
                <br />
                Travel with ease.
              </h1>
              <p className="mt-4 font-body text-sm sm:text-base text-white/85 max-w-xl">
                Curated design, quiet service, and a booking experience that feels as refined as the stay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking widget below hero */}
      <section className="relative -mt-10 sm:-mt-12 lg:-mt-14 pb-10 lg:pb-14 overflow-visible">
        <div className="container mx-auto">
          <div className="relative z-[70] overflow-visible bg-card border border-border shadow-xl px-5 sm:px-6 py-5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end overflow-visible">
              {/* Destination */}
              <div className="lg:col-span-3">
                <div className="flex items-center gap-2 font-body text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={2} aria-hidden />
                  <span>Destination</span>
                </div>
                <div className="mt-2">
                  <DestinationDropdown
                    value={destination}
                    onChange={onDestinationChange}
                    variant="underline"
                    placeholder="Where can we take you?"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="lg:col-span-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 font-body text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
                    <span aria-hidden="true">🗓️</span>
                    <span>{Math.max(1, nightsBetween(checkIn, checkOut))} NIGHT</span>
                  </div>
                </div>
                <StayDateRangePicker
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onRangeChange={({ checkIn: nextIn, checkOut: nextOut }) => {
                    setCheckIn(nextIn);
                    setCheckOut(nextOut);
                  }}
                />
              </div>

              {/* Guests */}
              <div className="lg:col-span-2 overflow-visible min-w-0">
                <div className="flex items-center gap-2 font-body text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
                  <span aria-hidden="true">👤</span>
                  <span>Guests</span>
                </div>
                <div className="mt-2 overflow-visible">
                  <OccupancySelector
                    adults={adults}
                    children={children}
                    onAdultsChange={onAdultsChange}
                    onChildrenChange={onChildrenChange}
                    variant="underline"
                  />
                </div>
              </div>

              {/* CTA */}
              <div className="lg:col-span-2">
                <button
                  type="button"
                  className="w-full h-14 lg:h-16 btn-primary font-body text-[15px] font-medium tracking-wide whitespace-nowrap"
                  onClick={() => {
                    onFindHotels({ destination, checkIn, checkOut, adults, children });
                  }}
                >
                  Find Hotels
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
