import type { Hotel2Hotel } from "../types";

export type LatLng = { lat: number; lng: number };

const COUNTRY_CENTER: Record<string, LatLng> = {
  Thailand: { lat: 13.7563, lng: 100.5018 },
  Japan: { lat: 35.0116, lng: 135.7681 },
  Singapore: { lat: 1.3521, lng: 103.8198 },
  France: { lat: 48.8566, lng: 2.3522 },
  Italy: { lat: 43.7696, lng: 11.2558 },
  "United States": { lat: 27.6386, lng: -80.3973 },
  "United Kingdom": { lat: 51.5072, lng: -0.1276 },
  Australia: { lat: -33.8688, lng: 151.2093 },
  "United Arab Emirates": { lat: 25.2048, lng: 55.2708 },
  Switzerland: { lat: 47.3769, lng: 8.5417 },
};

export function centerForHotels(hotels: Hotel2Hotel[]): LatLng {
  const first = hotels[0];
  if (!first) return { lat: 20, lng: 0 };
  return COUNTRY_CENTER[first.country] ?? { lat: 20, lng: 0 };
}

export function hotelToLatLng(hotel: Hotel2Hotel): LatLng {
  const base = COUNTRY_CENTER[hotel.country] ?? { lat: 20, lng: 0 };
  const hash = [...hotel.id].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const jitter = (n: number) => ((n % 100) - 50) / 5000;
  return {
    lat: base.lat + jitter(hash * 13),
    lng: base.lng + jitter(hash * 29),
  };
}

