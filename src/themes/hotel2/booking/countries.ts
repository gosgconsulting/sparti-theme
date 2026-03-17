export const HOTEL2_COUNTRIES = [
  "All",
  "Thailand",
  "Japan",
  "Singapore",
  "France",
  "Italy",
  "United States",
  "United Kingdom",
  "Australia",
  "United Arab Emirates",
  "Switzerland",
] as const;

export type Hotel2Destination = (typeof HOTEL2_COUNTRIES)[number];

