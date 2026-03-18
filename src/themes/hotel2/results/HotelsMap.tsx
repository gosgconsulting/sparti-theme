import React, { useEffect, useMemo } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Hotel2Hotel } from "../types";
import { centerForHotels, hotelToLatLng } from "./geo";

type Props = {
  hotels: Hotel2Hotel[];
  activeHotelId: string | null;
  onActiveHotelIdChange: (id: string | null) => void;
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
};

export default function HotelsMap({
  hotels,
  activeHotelId,
  onActiveHotelIdChange,
  activeIndex,
  onPrev,
  onNext,
}: Props) {
  const center = useMemo(() => centerForHotels(hotels), [hotels]);

  useEffect(() => {
    // Fix default marker icons in bundlers (Leaflet expects URLs).
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const iconRetinaUrl = new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).toString();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const iconUrl = new URL("leaflet/dist/images/marker-icon.png", import.meta.url).toString();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const shadowUrl = new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).toString();

    L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });
  }, [activeHotelId]);

  const ActiveSync = ({ lat, lng }: { lat: number; lng: number }) => {
    const map = useMap();
    useEffect(() => {
      map.setView([lat, lng], Math.max(map.getZoom(), 6), { animate: true });
    }, [map, lat, lng]);
    return null;
  };

  const activeHotel = useMemo(() => {
    if (!activeHotelId) return null;
    return hotels.find((h) => h.id === activeHotelId) ?? null;
  }, [hotels, activeHotelId]);

  const activePos = useMemo(() => {
    if (!activeHotel) return null;
    return hotelToLatLng(activeHotel);
  }, [activeHotel]);

  const activeIcon = useMemo(
    () =>
      L.divIcon({
        className: "hotel2-map-pin hotel2-map-pin--active",
        html: `<div class="hotel2-map-pinDot"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      }),
    []
  );

  const normalIcon = useMemo(
    () =>
      L.divIcon({
        className: "hotel2-map-pin",
        html: `<div class="hotel2-map-pinDot"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      }),
    []
  );

  return (
    <div className="hotel2-map-shell">
      <div className="hotel2-map">
        <div className="hotel2-map-overlay">
          <div className="hotel2-map-overlayRight">
            <button type="button" className="hotel2-map-nav" onClick={onPrev} aria-label="Previous">
              Prev
            </button>
            <button type="button" className="hotel2-map-nav" onClick={onNext} aria-label="Next">
              Next
            </button>
          </div>
        </div>

        <MapContainer
          center={[center.lat, center.lng]}
          zoom={6}
          scrollWheelZoom
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {activePos && <ActiveSync lat={activePos.lat} lng={activePos.lng} />}

          {hotels.map((h) => {
            const pos = hotelToLatLng(h);
            const isActive = h.id === activeHotelId;
            return (
              <Marker
                key={h.id}
                position={[pos.lat, pos.lng]}
                icon={isActive ? activeIcon : normalIcon}
                eventHandlers={{
                  click: () => onActiveHotelIdChange(h.id),
                }}
              />
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}

