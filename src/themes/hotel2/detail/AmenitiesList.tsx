import React, { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AirVent,
  Bath,
  BedDouble,
  Blinds,
  Building2,
  Check,
  Clock,
  Coffee,
  ConciergeBell,
  DoorOpen,
  Droplets,
  Dumbbell,
  Mountain,
  Refrigerator,
  Shield,
  Sparkles,
  SunMedium,
  ThermometerSun,
  TreePine,
  Tv,
  Umbrella,
  Utensils,
  Waves,
  Wifi,
  Wind,
  Wine,
} from "lucide-react";

type Props = {
  amenities: string[];
  initialVisible?: number;
};

/** Longer / more specific phrases first so substring rules do not steal matches. */
const AMENITY_ICON_RULES: { needle: string; Icon: LucideIcon }[] = [
  { needle: "high-speed wireless", Icon: Wifi },
  { needle: "rain shower", Icon: Droplets },
  { needle: "deep soaking bathtub", Icon: Bath },
  { needle: "private balcony", Icon: DoorOpen },
  { needle: "in-room safe", Icon: Shield },
  { needle: "blackout curtains", Icon: Blinds },
  { needle: "daily housekeeping", Icon: Sparkles },
  { needle: "flat-screen", Icon: Tv },
  { needle: "flat screen", Icon: Tv },
  { needle: "nespresso", Icon: Coffee },
  { needle: "rooftop pool", Icon: Waves },
  { needle: "private cabana", Icon: Umbrella },
  { needle: "sky bar", Icon: Wine },
  { needle: "penthouse bar", Icon: Wine },
  { needle: "wine cellar", Icon: Wine },
  { needle: "late checkout", Icon: Clock },
  { needle: "afternoon tea", Icon: Coffee },
  { needle: "tea lounge", Icon: Coffee },
  { needle: "harbour views", Icon: Mountain },
  { needle: "city views", Icon: Building2 },
  { needle: "lake views", Icon: Waves },
  { needle: "air conditioning", Icon: AirVent },
  { needle: "hair dryer", Icon: Wind },
  { needle: "minibar", Icon: Refrigerator },
  { needle: "wireless", Icon: Wifi },
  { needle: "wi-fi", Icon: Wifi },
  { needle: "wifi", Icon: Wifi },
  { needle: "television", Icon: Tv },
  { needle: "shower", Icon: Droplets },
  { needle: "bathtub", Icon: Bath },
  { needle: "balcony", Icon: DoorOpen },
  { needle: "housekeeping", Icon: Sparkles },
  { needle: "onsen", Icon: Bath },
  { needle: "sauna", Icon: ThermometerSun },
  { needle: "concierge", Icon: ConciergeBell },
  { needle: "bistro", Icon: Utensils },
  { needle: "dining", Icon: Utensils },
  { needle: "gym", Icon: Dumbbell },
  { needle: "spa", Icon: Sparkles },
  { needle: "terrace", Icon: SunMedium },
  { needle: "garden", Icon: TreePine },
  { needle: "suites", Icon: BedDouble },
  { needle: "pool", Icon: Waves },
  { needle: "safe", Icon: Shield },
  { needle: "coffee", Icon: Coffee },
  { needle: "tv", Icon: Tv },
];

function normalizeAmenityLabel(label: string): string {
  return label.toLowerCase().normalize("NFKD");
}

function iconForAmenityLabel(label: string): LucideIcon {
  const s = normalizeAmenityLabel(label);
  for (const { needle, Icon } of AMENITY_ICON_RULES) {
    if (s.includes(needle)) return Icon;
  }
  return Check;
}

export default function AmenitiesList({ amenities, initialVisible = 6 }: Props) {
  const [open, setOpen] = useState(false);
  const needsToggle = amenities.length > initialVisible;
  const visible = open ? amenities : amenities.slice(0, initialVisible);

  return (
    <section className="hotel2-detail-panelSection">
      <h2 className="hotel2-detail-panelHeading font-headline">Amenities</h2>
      <ul className="hotel2-detail-amenities font-body">
        {visible.map((a, i) => {
          const Icon = iconForAmenityLabel(a);
          return (
            <li key={`${a}-${i}`}>
              <span className="hotel2-detail-amenityIcon" aria-hidden>
                <Icon className="hotel2-detail-amenityIconSvg" strokeWidth={2} />
              </span>
              <span>{a}</span>
            </li>
          );
        })}
      </ul>
      {needsToggle ? (
        <button type="button" className="hotel2-detail-textBtn font-body" onClick={() => setOpen((o) => !o)}>
          {open ? "Show less" : "Show more"}
        </button>
      ) : null}
    </section>
  );
}
