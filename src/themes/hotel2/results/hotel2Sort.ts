import type { Hotel2Hotel } from "../types";

export type Hotel2SortKey =
  | "default"
  | "price_low"
  | "price_high"
  | "rating"
  | "featured_first"
  | "date_asc"
  | "date_desc";

export const HOTEL2_SORT_OPTIONS: { value: Hotel2SortKey; label: string }[] = [
  { value: "default", label: "Default Order" },
  { value: "price_low", label: "Price (Low to High)" },
  { value: "price_high", label: "Price (High to Low)" },
  { value: "rating", label: "Rating" },
  { value: "featured_first", label: "Featured First" },
  { value: "date_asc", label: "Date Old to New" },
  { value: "date_desc", label: "Date New to Old" },
];

export function sortHotel2Results(hotels: Hotel2Hotel[], sort: Hotel2SortKey): Hotel2Hotel[] {
  if (sort === "default") return [...hotels];
  const copy = [...hotels];
  switch (sort) {
    case "price_low":
      copy.sort((a, b) => a.pricePerNight - b.pricePerNight);
      break;
    case "price_high":
      copy.sort((a, b) => b.pricePerNight - a.pricePerNight);
      break;
    case "rating":
      copy.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
      break;
    case "featured_first":
      copy.sort((a, b) => {
        const af = a.tag ? 1 : 0;
        const bf = b.tag ? 1 : 0;
        if (bf !== af) return bf - af;
        return b.rating - a.rating;
      });
      break;
    case "date_asc":
      copy.sort((a, b) => a.listedAt.localeCompare(b.listedAt));
      break;
    case "date_desc":
      copy.sort((a, b) => b.listedAt.localeCompare(a.listedAt));
      break;
    default:
      break;
  }
  return copy;
}
