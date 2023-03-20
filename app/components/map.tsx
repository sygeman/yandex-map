"use client";

import {
  YMap,
  YMapLocationRequest,
} from "@yandex/ymaps3-types/imperative/YMap";
import { useDebouncedCallback } from "use-debounce";
import React, { useMemo, useRef, useState } from "react";
import { useMap } from "../../providers/map-provider";
import type { Place } from "../../types/place";
import { MarkerWithPopup } from "./marker-with-popup";
import { getBboxByCoordinates } from "./helpers/get-bbox-by-coordinates";
import { LngLatBounds } from "@yandex/ymaps3-types";

interface MapProps {
  places: Place[];
  selectedPlaceId: string | null;
  selectPlace: (id: string | null) => void;
  onBoundsChange?: (bounds: LngLatBounds) => void;
}

export const Map = ({
  places,
  selectedPlaceId,
  selectPlace,
  onBoundsChange,
}: MapProps) => {
  const mapRef = useRef<(YMap & { container: HTMLElement }) | null>(null);
  const startBounds = useMemo(
    () =>
      getBboxByCoordinates(
        places.map((place) => [place.longitude, place.latitude])
      ),
    [places]
  );
  const [location, setLocation] = useState<YMapLocationRequest>(
    startBounds ? { bounds: startBounds } : { zoom: 0 }
  );
  const setBoundsDebounced = useDebouncedCallback((value) => {
    if (typeof onBoundsChange === "function") {
      onBoundsChange(value);
    }
  }, 500);
  const setLocationDebounced = useDebouncedCallback(
    (value) => setLocation(value),
    100
  );
  const { reactifyApi } = useMap();

  if (!reactifyApi) {
    return <div>Загрузка лучшей карты в мире...</div>;
  }

  const {
    YMap,
    YMapMarker,
    YMapListener,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
  } = reactifyApi;

  return (
    <YMap location={location} ref={mapRef}>
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />

      <YMapListener
        onUpdate={(o) => {
          setLocationDebounced(o.location);
          setBoundsDebounced(o.location.bounds);
        }}
      />

      {places.map((place) => {
        const selected = selectedPlaceId === place.id;
        return (
          <YMapMarker
            key={place.id}
            zIndex={selected ? 10 : 1}
            coordinates={[place.longitude, place.latitude]}
          >
            <MarkerWithPopup
              mapRef={mapRef}
              place={place}
              selected={selected}
              selectPlace={selectPlace}
            />
          </YMapMarker>
        );
      })}
    </YMap>
  );
};
