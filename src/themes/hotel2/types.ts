export type CollectionKey =
  | "Luxury Escapes"
  | "Family Friendly"
  | "Romantic Getaways"
  | "Wellness Retreats";

export type Hotel2PricingType = "fixed" | "per_night" | "per_unit";

export type Hotel2AddOn = {
  id: string;
  title: string;
  description: string;
  price: number;
  pricingType: Hotel2PricingType;
  /** Max selectable units (default 1 for simple add-ons). */
  maxQuantity?: number;
};

export type Hotel2Rate = {
  id: string;
  title: string;
  pricePerNight: number;
  taxNote: string;
  summary: string;
  /** Optional longer copy for read more */
  detail?: string;
  cancellationPolicy: string;
  depositPolicy: string;
  inclusions: string[];
  isDefault: boolean;
};

export type Hotel2Room = {
  id: string;
  name: string;
  images: string[];
  pricePerNight: number;
  currency: string;
  bedType: string;
  maxGuests: number;
  shortLabel?: string;
  badge?: string;
  description: string;
  /** Extra paragraph shown when expanded */
  descriptionMore?: string;
  amenities: string[];
  rates: Hotel2Rate[];
  addOns: Hotel2AddOn[];
};

export type Hotel2Hotel = {
  id: string;
  slug: string;
  name: string;
  city: string;
  country: string;
  /** Listing / search card nightly from */
  pricePerNight: number;
  rating: number;
  reviews: number;
  amenities: string[];
  /** Primary hero image */
  image: string;
  galleryImages: string[];
  tags: string[];
  tag?: string;
  collections: CollectionKey[];
  listedAt: string;
  rooms: Hotel2Room[];
};
