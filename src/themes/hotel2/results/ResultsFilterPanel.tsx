import React, { useMemo, useState } from "react";
import type { CollectionKey } from "../types";

const AMENITIES_PREVIEW_COUNT = 6;

type Props = {
  id: string;
  amenityOptions: string[];
  selectedAmenities: string[];
  onToggleAmenity: (name: string) => void;
  minRating: number;
  onMinRatingChange: (v: number) => void;
  collectionOptions: CollectionKey[];
  selectedCollections: CollectionKey[];
  onToggleCollection: (c: CollectionKey) => void;
  onClearAll: () => void;
  onClose: () => void;
};

export default function ResultsFilterPanel({
  id,
  amenityOptions,
  selectedAmenities,
  onToggleAmenity,
  minRating,
  onMinRatingChange,
  collectionOptions,
  selectedCollections,
  onToggleCollection,
  onClearAll,
  onClose,
}: Props) {
  const [amenitiesExpanded, setAmenitiesExpanded] = useState(false);

  const { visibleAmenities, hiddenCount } = useMemo(() => {
    if (amenitiesExpanded || amenityOptions.length <= AMENITIES_PREVIEW_COUNT) {
      return { visibleAmenities: amenityOptions, hiddenCount: 0 };
    }
    return {
      visibleAmenities: amenityOptions.slice(0, AMENITIES_PREVIEW_COUNT),
      hiddenCount: amenityOptions.length - AMENITIES_PREVIEW_COUNT,
    };
  }, [amenityOptions, amenitiesExpanded]);

  return (
    <div
      id={id}
      className="hotel2-results-filterPanel font-body"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
    >
      <div className="hotel2-results-filterPanelHeader">
        <h2 id={`${id}-title`} className="hotel2-results-filterPanelTitle font-headline">
          Filters
        </h2>
        <button type="button" className="hotel2-results-filterClose" onClick={onClose} aria-label="Close filters">
          ×
        </button>
      </div>

      <div className="hotel2-results-filterPanelBody">
        {amenityOptions.length > 0 && (
          <div className="hotel2-results-filterField">
            <div className="hotel2-results-filterAmenitiesHeader">
              <div className="hotel2-results-filterLabel">Amenities</div>
              {hiddenCount > 0 && (
                <button
                  type="button"
                  className="hotel2-results-filterMore"
                  onClick={() => setAmenitiesExpanded((e) => !e)}
                  aria-expanded={amenitiesExpanded}
                >
                  {amenitiesExpanded ? "Less" : "More"}
                </button>
              )}
            </div>
            <div className="hotel2-results-filterAmenitiesGrid" role="group" aria-label="Amenities">
              {visibleAmenities.map((name) => (
                <label key={name} className="hotel2-results-filterCheck hotel2-results-filterCheck-grid">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(name)}
                    onChange={() => onToggleAmenity(name)}
                  />
                  <span>{name}</span>
                </label>
              ))}
            </div>
            <p className="hotel2-results-filterHint text-muted-foreground text-xs m-0 mt-1">
              Stays must include every amenity you select.
            </p>
          </div>
        )}

        <div className="hotel2-results-filterField">
          <label htmlFor={`${id}-rating`} className="hotel2-results-filterLabel">
            Minimum rating
          </label>
          <select
            id={`${id}-rating`}
            className="hotel2-results-filterSelect"
            value={minRating}
            onChange={(e) => onMinRatingChange(Number(e.target.value))}
          >
            <option value={0}>Any</option>
            <option value={4}>4+ stars</option>
            <option value={4.5}>4.5+ stars</option>
          </select>
        </div>

        {collectionOptions.length > 0 && (
          <div className="hotel2-results-filterField">
            <div className="hotel2-results-filterLabel">Collections</div>
            <div className="hotel2-results-filterChecks" role="group" aria-label="Collections">
              {collectionOptions.map((c) => (
                <label key={c} className="hotel2-results-filterCheck">
                  <input
                    type="checkbox"
                    checked={selectedCollections.includes(c)}
                    onChange={() => onToggleCollection(c)}
                  />
                  <span>{c}</span>
                </label>
              ))}
            </div>
            <p className="hotel2-results-filterHint text-muted-foreground text-xs m-0 mt-1">
              Show stays that match any selected collection.
            </p>
          </div>
        )}
      </div>

      <div className="hotel2-results-filterPanelFooter">
        <button type="button" className="hotel2-results-filterBtnSecondary" onClick={onClearAll}>
          Clear all
        </button>
        <button type="button" className="hotel2-results-filterBtnPrimary" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}
