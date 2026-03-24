import React from "react";
import { Link } from "react-router-dom";

type Props = {
  to: string;
  /** Search results list: keyboard/hover map sync. Omit on home rail cards. */
  active?: boolean;
  /** `results` = horizontal list row card; `rail` = home/collections carousel card. */
  variant?: "results" | "rail";
  onMouseEnter?: () => void;
  onFocus?: () => void;
  children: React.ReactNode;
};

/**
 * Wraps a hotel card so the full surface navigates without nested buttons.
 */
export default function HotelCardLink({
  to,
  active = false,
  variant = "results",
  onMouseEnter,
  onFocus,
  children,
}: Props) {
  const linkClass =
    variant === "rail"
      ? "hotel2-rail-card-link"
      : `hotel2-result-card-link${active ? " is-active" : ""}`;

  return (
    <Link to={to} className={linkClass} onMouseEnter={onMouseEnter} onFocus={onFocus}>
      {children}
    </Link>
  );
}
