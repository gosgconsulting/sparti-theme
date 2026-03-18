import type { Hotel2Destination } from "../booking/countries";

export type Hotel2SearchPayload = {
  destination: Hotel2Destination;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
};

export function buildHotel2SearchHref(basePath: string, payload: Hotel2SearchPayload): string {
  const params = new URLSearchParams();
  params.set("destination", payload.destination);
  params.set("checkIn", payload.checkIn);
  params.set("checkOut", payload.checkOut);
  params.set("adults", String(payload.adults));
  params.set("children", String(payload.children));

  const base = basePath?.endsWith("/") ? basePath.slice(0, -1) : basePath;
  return `${base}/search?${params.toString()}`;
}

