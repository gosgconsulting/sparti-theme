import React from "react";
import { Link } from "react-router-dom";
import { buildHotel2SearchHref } from "../utils/searchUrl";
import { HOTEL2_COUNTRIES, type Hotel2Destination } from "../booking/countries";

type StaySummary = {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomCount: number;
  destination: string;
};

type Props = {
  basePath: string;
  hotelName: string;
  city: string;
  country: string;
  stay: StaySummary;
  searchQueryForBack: string;
};

function formatDateLabel(iso: string): string {
  if (!iso) return "—";
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function IconCalendar({ variant }: { variant: "in" | "out" }) {
  const common = {
    className: "hotel2-detail-staySvg",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
  };
  if (variant === "in") {
    return (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 15v3M10.5 16.5h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 16l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconGuests() {
  return (
    <svg className="hotel2-detail-staySvg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconRooms() {
  return (
    <svg className="hotel2-detail-staySvg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9zM9 22V12h6v10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPin() {
  return (
    <svg className="hotel2-detail-localeSvg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function HotelDetailHeader({
  basePath,
  hotelName,
  city,
  country,
  stay,
  searchQueryForBack,
}: Props) {
  const backHref = `${basePath.replace(/\/$/, "")}/search${searchQueryForBack}`;

  const destResolved: Hotel2Destination =
    stay.destination && HOTEL2_COUNTRIES.includes(stay.destination as Hotel2Destination)
      ? (stay.destination as Hotel2Destination)
      : "All";

  const searchHref = buildHotel2SearchHref(basePath, {
    destination: destResolved,
    checkIn: stay.checkIn,
    checkOut: stay.checkOut,
    adults: stay.adults,
    children: stay.children,
  });

  const guestLine =
    `${stay.adults} adult${stay.adults === 1 ? "" : "s"}` +
    (stay.children > 0 ? `, ${stay.children} child${stay.children === 1 ? "" : "ren"}` : "");

  return (
    <header className="hotel2-detail-header">
      <div className="hotel2-detail-headerTop">
        <Link to={backHref} className="hotel2-detail-back font-body">
          ← Back to results
        </Link>
        <Link to={searchHref} className="hotel2-detail-editSearch font-body">
          Edit search
        </Link>
      </div>

      <div className="hotel2-detail-headingBlock">
        <h1 className="hotel2-detail-title font-headline">{hotelName}</h1>
        <p className="hotel2-detail-locale font-body">
          <span className="hotel2-detail-localeIconWrap" aria-hidden="true">
            <IconPin />
          </span>
          <span className="hotel2-detail-localeText text-muted-foreground">
            {city} · {country}
            {stay.destination ? ` · ${stay.destination}` : ""}
          </span>
        </p>
      </div>

      <div className="hotel2-detail-stayRow font-body" role="group" aria-label="Stay summary">
        <div className="hotel2-detail-stayItem">
          <span className="hotel2-detail-stayIconWrap" aria-hidden="true">
            <IconCalendar variant="in" />
          </span>
          <div className="hotel2-detail-stayBody">
            <span className="hotel2-detail-stayLabel">Check-in</span>
            <span className="hotel2-detail-stayValue">{formatDateLabel(stay.checkIn)}</span>
          </div>
        </div>
        <div className="hotel2-detail-stayItem">
          <span className="hotel2-detail-stayIconWrap" aria-hidden="true">
            <IconCalendar variant="out" />
          </span>
          <div className="hotel2-detail-stayBody">
            <span className="hotel2-detail-stayLabel">Check-out</span>
            <span className="hotel2-detail-stayValue">{formatDateLabel(stay.checkOut)}</span>
          </div>
        </div>
        <div className="hotel2-detail-stayItem">
          <span className="hotel2-detail-stayIconWrap" aria-hidden="true">
            <IconGuests />
          </span>
          <div className="hotel2-detail-stayBody">
            <span className="hotel2-detail-stayLabel">Guests</span>
            <span className="hotel2-detail-stayValue tabular-nums">{guestLine}</span>
          </div>
        </div>
        <div className="hotel2-detail-stayItem">
          <span className="hotel2-detail-stayIconWrap" aria-hidden="true">
            <IconRooms />
          </span>
          <div className="hotel2-detail-stayBody">
            <span className="hotel2-detail-stayLabel">Rooms</span>
            <span className="hotel2-detail-stayValue tabular-nums">{stay.roomCount}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
