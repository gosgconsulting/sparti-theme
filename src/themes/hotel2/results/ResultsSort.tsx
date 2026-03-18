import React from "react";

type SortKey = "default" | "price_low" | "rating_high" | "reviews_high";

type Props = {
  sort: SortKey;
  onChange: (v: SortKey) => void;
};

export default function ResultsSort({ sort, onChange }: Props) {
  return (
    <div className="hotel2-results-sort font-body">
      <span className="hotel2-results-sortLabel">Sort By:</span>
      <select
        className="hotel2-results-sortSelect"
        value={sort}
        onChange={(e) => onChange(e.target.value as SortKey)}
        aria-label="Sort results"
      >
        <option value="default">Default Order</option>
        <option value="price_low">Price (Low)</option>
        <option value="rating_high">Rating (High)</option>
        <option value="reviews_high">Most reviewed</option>
      </select>
    </div>
  );
}

