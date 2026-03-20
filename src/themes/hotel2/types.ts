export type CollectionKey =
  | "Luxury Escapes"
  | "Family Friendly"
  | "Romantic Getaways"
  | "Wellness Retreats";

export type Hotel2Hotel = {
  id: string;
  name: string;
  city: string;
  country: string;
  pricePerNight: number;
  rating: number;
  reviews: number;
  amenities: string[];
  image: string;
  tag?: string;
  collections: CollectionKey[];
  /** ISO date (YYYY-MM-DD) for listing / sort by date */
  listedAt: string;
};

