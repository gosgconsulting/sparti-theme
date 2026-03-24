import { hotelSlugFromName } from "../utils/hotelSlug";
import type { Hotel2Hotel } from "../types";
import { buildHotel2Rooms } from "./buildHotel2Rooms";

const GALLERY_POOL = [
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebdb?w=1200&q=80",
];

function galleryFor(image: string, index: number): string[] {
  const a = GALLERY_POOL[index % GALLERY_POOL.length]!;
  const b = GALLERY_POOL[(index + 1) % GALLERY_POOL.length]!;
  const c = GALLERY_POOL[(index + 2) % GALLERY_POOL.length]!;
  return [image, a, b, c];
}

function buildAllHotels(): Hotel2Hotel[] {
  const seed: Omit<
    Hotel2Hotel,
    "id" | "listedAt" | "slug" | "galleryImages" | "tags" | "rooms"
  >[] = [
    {
      name: "Atelier Arcadia",
      city: "Bangkok",
      country: "Thailand",
      pricePerNight: 240,
      rating: 4.8,
      reviews: 412,
      amenities: ["Rooftop pool", "Concierge", "Spa"],
      tag: "Editor’s pick",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
      collections: ["Luxury Escapes", "Wellness Retreats", "Romantic Getaways"],
    },
    {
      name: "Kiyomizu House",
      city: "Kyoto",
      country: "Japan",
      pricePerNight: 310,
      rating: 4.9,
      reviews: 286,
      amenities: ["Onsen", "Tea lounge", "Garden"],
      tag: "Quiet luxury",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80",
      collections: ["Luxury Escapes", "Romantic Getaways", "Wellness Retreats"],
    },
    {
      name: "Civic Atelier",
      city: "Singapore",
      country: "Singapore",
      pricePerNight: 280,
      rating: 4.7,
      reviews: 534,
      amenities: ["Sky bar", "Gym", "Late checkout"],
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80",
      collections: ["Luxury Escapes", "Family Friendly"],
    },
    {
      name: "Maison Rivoli",
      city: "Paris",
      country: "France",
      pricePerNight: 360,
      rating: 4.8,
      reviews: 621,
      amenities: ["Bistro", "Concierge", "Suites"],
      tag: "Boutique",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
      collections: ["Romantic Getaways", "Luxury Escapes"],
    },
    {
      name: "Palazzo Lucente",
      city: "Florence",
      country: "Italy",
      pricePerNight: 330,
      rating: 4.6,
      reviews: 307,
      amenities: ["Terrace", "Wine cellar", "Spa"],
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",
      collections: ["Romantic Getaways", "Luxury Escapes", "Wellness Retreats"],
    },
    {
      name: "SoHo Residences",
      city: "New York",
      country: "United States",
      pricePerNight: 420,
      rating: 4.5,
      reviews: 894,
      amenities: ["Penthouse bar", "City views", "Gym"],
      tag: "New",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80",
      collections: ["Luxury Escapes", "Family Friendly"],
    },
    {
      name: "Mayfair Atelier",
      city: "London",
      country: "United Kingdom",
      pricePerNight: 390,
      rating: 4.7,
      reviews: 515,
      amenities: ["Afternoon tea", "Concierge", "Suites"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
      collections: ["Luxury Escapes", "Romantic Getaways"],
    },
    {
      name: "Harbourline Hotel",
      city: "Sydney",
      country: "Australia",
      pricePerNight: 295,
      rating: 4.6,
      reviews: 448,
      amenities: ["Harbour views", "Pool", "Dining"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
      collections: ["Family Friendly", "Luxury Escapes"],
    },
    {
      name: "Desert Gallery",
      city: "Dubai",
      country: "United Arab Emirates",
      pricePerNight: 410,
      rating: 4.9,
      reviews: 702,
      amenities: ["Private cabana", "Spa", "Concierge"],
      tag: "Signature",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
      collections: ["Luxury Escapes", "Wellness Retreats", "Family Friendly"],
    },
    {
      name: "Alpine Archive",
      city: "Zürich",
      country: "Switzerland",
      pricePerNight: 380,
      rating: 4.8,
      reviews: 243,
      amenities: ["Lake views", "Sauna", "Dining"],
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80",
      collections: ["Wellness Retreats", "Romantic Getaways", "Luxury Escapes"],
    },
  ];

  const expanded: Hotel2Hotel[] = [];
  for (let i = 0; i < 20; i += 1) {
    const base = seed[i % seed.length]!;
    const id = `h-${i + 1}`;
    const name = i < seed.length ? base.name : `${base.name} ${i - seed.length + 2}`;
    const pricePerNight = base.pricePerNight + (i % 5) * 15;
    const slug = hotelSlugFromName(name);
    const galleryImages = galleryFor(base.image, i);
    const tags = [...base.amenities];
    if (base.tag) tags.unshift(base.tag);
    expanded.push({
      id,
      slug,
      name,
      city: base.city,
      country: base.country,
      pricePerNight,
      rating: base.rating,
      reviews: base.reviews + i * 7,
      amenities: base.amenities,
      image: base.image,
      galleryImages,
      tags,
      tag: base.tag,
      collections: base.collections,
      listedAt: new Date(2024, 0, 1 + i).toISOString().slice(0, 10),
      rooms: buildHotel2Rooms(id, base.city, pricePerNight),
    });
  }
  return expanded;
}

let cache: Hotel2Hotel[] | null = null;

export function getHotel2Hotels(): Hotel2Hotel[] {
  if (!cache) cache = buildAllHotels();
  return cache;
}

export function getHotel2HotelBySlug(slug: string): Hotel2Hotel | undefined {
  return getHotel2Hotels().find((h) => h.slug === slug);
}
