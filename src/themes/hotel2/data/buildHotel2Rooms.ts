import type { Hotel2AddOn, Hotel2Rate, Hotel2Room } from "../types";

const ROOM_IMAGES = [
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
  "https://images.unsplash.com/photo-1566665797739-1674de7a215a?w=1200&q=80",
];

function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i += 1) h = Math.imul(31, h) + id.charCodeAt(i);
  return Math.abs(h);
}

function pickImages(hotelId: string, roomIndex: number): string[] {
  const h = hashId(hotelId) + roomIndex * 17;
  const a = ROOM_IMAGES[h % ROOM_IMAGES.length]!;
  const b = ROOM_IMAGES[(h + 2) % ROOM_IMAGES.length]!;
  const c = ROOM_IMAGES[(h + 4) % ROOM_IMAGES.length]!;
  return [a, b, c];
}

const AMENITY_CATALOG = [
  "High-speed wireless",
  "Rain shower",
  "Deep soaking bathtub",
  "Private balcony",
  "Minibar",
  "Air conditioning",
  "55\" flat-screen TV",
  "Nespresso machine",
  "In-room safe",
  "Hair dryer",
  "Blackout curtains",
  "Daily housekeeping",
] as const;

function roomAmenities(hotelId: string, roomIndex: number): string[] {
  const h = hashId(hotelId) + roomIndex;
  const start = h % 4;
  const out: string[] = [];
  for (let i = 0; i < 8; i += 1) {
    out.push(AMENITY_CATALOG[(start + i) % AMENITY_CATALOG.length]!);
  }
  return out;
}

function buildRates(roomId: string, base: number): Hotel2Rate[] {
  return [
    {
      id: `${roomId}-rate-room`,
      title: "Room only",
      pricePerNight: base,
      taxNote: "Taxes and city levy may apply at checkout.",
      summary: "Flexible timing for independent travelers who prefer to dine out.",
      detail:
        "Includes accommodation only. Breakfast and other meals are available à la carte or via add-ons. Ideal when you already have plans in the city.",
      cancellationPolicy: "Free cancellation until 48 hours before check-in (local time).",
      depositPolicy: "No deposit charged today; card held for guarantee only.",
      inclusions: ["Accommodation", "Wi‑Fi"],
      isDefault: true,
    },
    {
      id: `${roomId}-rate-bb`,
      title: "Bed & breakfast",
      pricePerNight: base + 32,
      taxNote: "VAT included on breakfast portion where applicable.",
      summary: "Start the day with chef-prepared breakfast in the lounge or in-room.",
      detail:
        "Full hot and continental selection with seasonal pastries, barista coffee, and fresh juice. Served 6:30–10:30 on weekdays and until 11:00 on weekends.",
      cancellationPolicy: "Free cancellation until 72 hours before arrival.",
      depositPolicy: "First night may be authorized 7 days prior to arrival.",
      inclusions: ["Accommodation", "Daily breakfast", "Wi‑Fi"],
      isDefault: false,
    },
  ];
}

function buildAddOns(roomId: string): Hotel2AddOn[] {
  return [
    {
      id: `${roomId}-addon-transfer`,
      title: "Airport transfer",
      description: "Private sedan, meet-and-greet, up to 3 guests with luggage.",
      price: 85,
      pricingType: "fixed",
      maxQuantity: 1,
    },
    {
      id: `${roomId}-addon-bed`,
      title: "Extra bed",
      description: "Rollaway with premium linens; subject to room layout.",
      price: 45,
      pricingType: "per_night",
      maxQuantity: 2,
    },
    {
      id: `${roomId}-addon-late`,
      title: "Late checkout",
      description: "Depart by 14:00 instead of 11:00, pending availability.",
      price: 65,
      pricingType: "fixed",
      maxQuantity: 1,
    },
    {
      id: `${roomId}-addon-breakfast`,
      title: "Breakfast upgrade",
      description: "Champagne breakfast for two in the private dining room.",
      price: 28,
      pricingType: "per_night",
      maxQuantity: 1,
    },
    {
      id: `${roomId}-addon-romantic`,
      title: "Romantic welcome set",
      description: "Chilled sparkling wine, artisan chocolates, and floral arrangement.",
      price: 95,
      pricingType: "fixed",
      maxQuantity: 1,
    },
    {
      id: `${roomId}-addon-spa`,
      title: "Spa access",
      description: "Thermal suite and vitality pool per guest, per night.",
      price: 35,
      pricingType: "per_unit",
      maxQuantity: 8,
    },
  ];
}

const ROOM_BLUEPRINTS: {
  name: string;
  bedType: string;
  maxGuests: number;
  priceMul: number;
  lead: string;
  more: string;
}[] = [
  {
    name: "Deluxe King",
    bedType: "1 king bed",
    maxGuests: 2,
    priceMul: 1,
    lead: "Floor-to-ceiling windows, a sculptural workspace, and a marble bath with both walk-in rain shower and soaking tub.",
    more: "Soft evening lighting, curated minibar with local producers, and twice-daily housekeeping with turndown on request.",
  },
  {
    name: "Executive Suite",
    bedType: "1 king + sofa bed",
    maxGuests: 4,
    priceMul: 1.28,
    lead: "Separate living room with dining for four, pantry kitchenette, and panoramic city views from a deep wraparound balcony.",
    more: "Ideal for longer stays: walk-in wardrobe, double vanity, and complimentary pressing of two garments per night.",
  },
  {
    name: "Penthouse Residence",
    bedType: "2 queen beds",
    maxGuests: 6,
    priceMul: 1.55,
    lead: "Two bedrooms, a private terrace with plunge pool, and a dedicated host line for dining and experience reservations.",
    more: "Chef’s kitchen with wine fridge, Sonos throughout, and priority access to the rooftop lounge during your stay.",
  },
];

/**
 * Deterministic mock rooms, rates, and add-ons for every hotel listing.
 */
export function buildHotel2Rooms(
  hotelId: string,
  city: string,
  basePricePerNight: number
): Hotel2Room[] {
  const h = hashId(hotelId);
  return ROOM_BLUEPRINTS.map((bp, idx) => {
    const roomId = `${hotelId}-room-${idx + 1}`;
    const floor = 3 + ((h + idx) % 12);
    const base = Math.round(basePricePerNight * bp.priceMul + (h % 7) * 3);
    const rates = buildRates(roomId, base);
    const shortLabel =
      idx === 0 ? (h % 3 === 0 ? "1 room left" : h % 3 === 1 ? "Popular choice" : undefined) : undefined;
    const badge =
      idx === 1 ? "Best value" : idx === 2 ? (h % 2 === 0 ? "Editor’s pick" : "Quiet wing") : undefined;
    const room: Hotel2Room = {
      id: roomId,
      name: `${bp.name} · ${city}`,
      images: pickImages(hotelId, idx),
      pricePerNight: base,
      currency: "USD",
      bedType: bp.bedType,
      maxGuests: bp.maxGuests,
      shortLabel,
      badge,
      description: `${bp.lead} Located on floor ${floor} with sound-insulated windows for restful nights.`,
      descriptionMore: bp.more,
      amenities: roomAmenities(hotelId, idx),
      rates,
      addOns: buildAddOns(roomId),
    };
    return room;
  });
}
