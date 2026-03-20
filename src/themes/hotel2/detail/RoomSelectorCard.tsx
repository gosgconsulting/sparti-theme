import React, { useState } from "react";
import type { Hotel2Room } from "../types";

type Props = {
  room: Hotel2Room;
  selected: boolean;
  onSelect: () => void;
};

export default function RoomSelectorCard({ room, selected, onSelect }: Props) {
  const [imgIdx, setImgIdx] = useState(0);
  const img = room.images[imgIdx] ?? room.images[0];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`hotel2-room-card font-body${selected ? " is-selected" : ""}`}
      aria-pressed={selected}
    >
      <div className="hotel2-room-card-media">
        {img && <img src={img} alt="" className="hotel2-room-card-img" loading="lazy" />}
        {room.images.length > 1 && (
          <div className="hotel2-room-card-dots" aria-hidden="true">
            {room.images.map((_, i) => (
              <button
                key={`${room.id}-dot-${i}`}
                type="button"
                tabIndex={-1}
                className={`hotel2-room-card-dot${i === imgIdx ? " is-on" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setImgIdx(i);
                }}
              />
            ))}
          </div>
        )}
        {room.badge && <span className="hotel2-room-card-badge">{room.badge}</span>}
        {room.shortLabel && <span className="hotel2-room-card-urgent">{room.shortLabel}</span>}
      </div>
      <div className="hotel2-room-card-body">
        <div className="hotel2-room-card-name font-headline">{room.name}</div>
        <div className="hotel2-room-card-meta text-muted-foreground">
          {room.bedType} · Up to {room.maxGuests} guests
        </div>
        <div className="hotel2-room-card-price">
          <span className="hotel2-room-card-from text-muted-foreground">From</span>
          <span className="hotel2-room-card-amount tabular-nums">
            {room.currency === "USD" ? "$" : `${room.currency} `}
            {room.pricePerNight}
          </span>
          <span className="hotel2-room-card-unit text-muted-foreground">/ night</span>
        </div>
      </div>
    </button>
  );
}
