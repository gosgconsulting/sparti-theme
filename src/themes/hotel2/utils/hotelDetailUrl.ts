import type { Hotel2SearchPayload } from "./searchUrl";

/** Build absolute path under theme base for hotel detail, preserving stay search params. */
export function buildHotelDetailHref(
  basePath: string,
  slug: string,
  stay?: Partial<Hotel2SearchPayload> | URLSearchParams | string
): string {
  const base = basePath?.endsWith("/") ? basePath.slice(0, -1) : basePath;
  let qs = "";
  if (typeof stay === "string") {
    qs = stay.startsWith("?") ? stay : stay ? `?${stay}` : "";
  } else if (stay instanceof URLSearchParams) {
    const s = stay.toString();
    qs = s ? `?${s}` : "";
  } else if (stay && typeof stay === "object") {
    const p = new URLSearchParams();
    if (stay.destination != null) p.set("destination", String(stay.destination));
    if (stay.checkIn != null && stay.checkIn !== "") p.set("checkIn", stay.checkIn);
    if (stay.checkOut != null && stay.checkOut !== "") p.set("checkOut", stay.checkOut);
    if (stay.adults != null) p.set("adults", String(stay.adults));
    if (stay.children != null) p.set("children", String(stay.children));
    const s = p.toString();
    qs = s ? `?${s}` : "";
  }
  return `${base}/hotels/${encodeURIComponent(slug)}${qs}`;
}
