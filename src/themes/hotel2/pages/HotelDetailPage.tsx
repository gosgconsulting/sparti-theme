import React, { useEffect, useMemo, useState } from "react";
import { HOTEL2_COUNTRIES, type Hotel2Destination } from "../booking/countries";
import AddOnSelector from "../detail/AddOnSelector";
import AmenitiesList from "../detail/AmenitiesList";
import HotelDetailHeader from "../detail/HotelDetailHeader";
import RateOptionCard from "../detail/RateOptionCard";
import RoomDescriptionSection from "../detail/RoomDescriptionSection";
import RoomSelectorCard from "../detail/RoomSelectorCard";
import SpecialRequestsField from "../detail/SpecialRequestsField";
import { getHotel2HotelBySlug } from "../data/hotels";
import { Link, useLocation } from "react-router-dom";

type Props = {
  basePath: string;
  hotelSlug: string;
};

function clampInt(v: string | null, fallback: number, min: number, max: number) {
  const n = Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.trunc(n)));
}

function readStayFromSearch(search: string) {
  const p = new URLSearchParams(search);
  const rawDest = p.get("destination") || "";
  const destination = HOTEL2_COUNTRIES.includes(rawDest as Hotel2Destination)
    ? (rawDest as Hotel2Destination)
    : rawDest || "All";
  return {
    checkIn: p.get("checkIn") || "",
    checkOut: p.get("checkOut") || "",
    adults: clampInt(p.get("adults"), 2, 1, 12),
    children: clampInt(p.get("children"), 0, 0, 8),
    roomCount: clampInt(p.get("rooms"), 1, 1, 8),
    destination: destination === "All" ? "" : destination,
  };
}

export default function HotelDetailPage({ basePath, hotelSlug }: Props) {
  const location = useLocation();
  const stay = useMemo(() => readStayFromSearch(location.search), [location.search]);
  const searchQueryForBack = location.search || "";

  const hotel = useMemo(() => getHotel2HotelBySlug(decodeURIComponent(hotelSlug)), [hotelSlug]);

  const [roomIdOverride, setRoomIdOverride] = useState<string | null>(null);

  useEffect(() => {
    setRoomIdOverride(null);
  }, [hotel?.id]);
  const [rateIdOverride, setRateIdOverride] = useState<string | null>(null);
  const [addonQty, setAddonQty] = useState<Record<string, number>>({});
  const [specialRequests, setSpecialRequests] = useState("");
  const [galleryIdx, setGalleryIdx] = useState(0);

  const effectiveRoomId =
    (roomIdOverride && hotel?.rooms.some((r) => r.id === roomIdOverride) ? roomIdOverride : null) ??
    hotel?.rooms[0]?.id ??
    null;

  const room = hotel?.rooms.find((r) => r.id === effectiveRoomId) ?? null;

  const defaultRateId = room?.rates?.find((r) => r.isDefault)?.id ?? room?.rates?.[0]?.id ?? null;

  const effectiveRateId =
    (rateIdOverride && room?.rates?.some((r) => r.id === rateIdOverride) ? rateIdOverride : null) ??
    defaultRateId;

  useEffect(() => {
    setRateIdOverride(null);
  }, [room?.id]);

  useEffect(() => {
    if (!room) return;
    setAddonQty({});
    setGalleryIdx(0);
  }, [room]);

  const galleryImages = useMemo(() => {
    if (!hotel) return [];
    if (room?.images.length) return room.images;
    return hotel.galleryImages;
  }, [hotel, room]);

  const mainImg = galleryImages[galleryIdx] ?? hotel?.image;

  if (!hotel) {
    return (
      <div className="hotel2-detail-page">
        <div className="hotel2-detail-shell">
          <div className="hotel2-detail-notFound">
            <h1 className="font-headline text-2xl">Hotel not found</h1>
            <p className="font-body text-muted-foreground mt-2">
              We couldn’t find a listing for “{decodeURIComponent(hotelSlug)}”. It may have been removed or the link
              is incorrect.
            </p>
            <Link className="hotel2-detail-primaryLink font-body mt-6 inline-block" to={`${basePath.replace(/\/$/, "")}/search`}>
              Back to search results
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hotel2-detail-page">
      <div className="hotel2-detail-shell">
        <HotelDetailHeader
          basePath={basePath}
          hotelName={hotel.name}
          city={hotel.city}
          country={hotel.country}
          stay={{
            checkIn: stay.checkIn,
            checkOut: stay.checkOut,
            adults: stay.adults,
            children: stay.children,
            roomCount: stay.roomCount,
            destination: stay.destination,
          }}
          searchQueryForBack={searchQueryForBack}
        />

        <section className="hotel2-detail-gallery" aria-label="Room images">
          <div className="hotel2-detail-galleryMain">
            {mainImg ? (
              <img src={mainImg} alt={`${hotel.name} — ${room?.name ?? "Gallery"}`} className="hotel2-detail-galleryHero" />
            ) : null}
          </div>
          {galleryImages.length > 1 ? (
            <div className="hotel2-detail-galleryThumbs" role="tablist" aria-label="Image thumbnails">
              {galleryImages.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={i === galleryIdx}
                  className={`hotel2-detail-thumb${i === galleryIdx ? " is-on" : ""}`}
                  onClick={() => setGalleryIdx(i)}
                >
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          ) : null}
        </section>

        <section className="hotel2-detail-roomsSection" aria-labelledby="hotel2-rooms-heading">
          <h2 id="hotel2-rooms-heading" className="hotel2-detail-sectionTitle font-headline">
            Choose your room
          </h2>
          <div className="hotel2-detail-roomGrid">
            {hotel.rooms.map((r) => (
              <RoomSelectorCard
                key={r.id}
                room={r}
                selected={r.id === effectiveRoomId}
                onSelect={() => setRoomIdOverride(r.id)}
              />
            ))}
          </div>
        </section>

        {room ? (
          <section className="hotel2-detail-booking" aria-label="Booking options">
            <div className="hotel2-detail-bookingPanel">
              <RoomDescriptionSection description={room.description} descriptionMore={room.descriptionMore} />
              <AmenitiesList amenities={room.amenities} />
              <section className="hotel2-detail-panelSection">
                <h2 className="hotel2-detail-panelHeading font-headline">Choose your rate</h2>
                <div className="hotel2-rate-stack">
                  {room.rates.map((rate) => (
                    <RateOptionCard
                      key={rate.id}
                      rate={rate}
                      selected={rate.id === effectiveRateId}
                      onSelect={() => setRateIdOverride(rate.id)}
                      currency={room.currency}
                    />
                  ))}
                </div>
              </section>
              <AddOnSelector
                addOns={room.addOns}
                quantities={addonQty}
                onQuantityChange={(id, qty) => setAddonQty((prev) => ({ ...prev, [id]: qty }))}
                currency={room.currency}
              />
              <SpecialRequestsField value={specialRequests} onChange={setSpecialRequests} />
              <div className="hotel2-detail-cta font-body">
                <p className="text-muted-foreground text-sm">
                  Selection is saved in this session for a future checkout step (payment not implemented in this mock).
                </p>
                <button type="button" className="hotel2-btn-search hotel2-detail-continue" disabled>
                  Continue to checkout
                </button>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
