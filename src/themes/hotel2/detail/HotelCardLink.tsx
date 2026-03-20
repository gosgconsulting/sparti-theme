import React from "react";
import { Link } from "react-router-dom";

type Props = {
  to: string;
  active: boolean;
  onMouseEnter?: () => void;
  onFocus?: () => void;
  children: React.ReactNode;
};

/**
 * Wraps a result card so the full row navigates without nested buttons.
 */
export default function HotelCardLink({ to, active, onMouseEnter, onFocus, children }: Props) {
  return (
    <Link
      to={to}
      className={`hotel2-result-card-link${active ? " is-active" : ""}`}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
    >
      {children}
    </Link>
  );
}
