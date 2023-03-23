"use client";

import {
  YMap,
  YMapLocationRequest,
} from "@yandex/ymaps3-types/imperative/YMap";
import { useDebouncedCallback } from "use-debounce";
import React, { useMemo, useRef, useState } from "react";
import { useMap } from "../../providers/map-provider";
import type { Place } from "../../types/place";
import MarkerWithPopup from "./marker-with-popup";
import { getBboxByCoordinates } from "./helpers/get-bbox-by-coordinates";
import { usePageState } from "../../providers/page-provider";
import Loading from "./loading";

interface MapProps {
  places: Place[];
}

export const Map = ({ places }: MapProps) => {
  const mapRef = useRef<(YMap & { container: HTMLElement }) | null>(null);
  const { selectedPlaceId, setBounds, selectPlace } = usePageState();
  const startBounds = useMemo(
    () =>
      getBboxByCoordinates(
        places.map((place) => [place.longitude, place.latitude])
      ),
    [places]
  );
  const [location, setLocation] = useState<YMapLocationRequest>(
    // @ts-ignore
    startBounds ? { bounds: startBounds, margin: 20 } : { zoom: 0 }
  );
  const setBoundsDebounced = useDebouncedCallback(
    (value) => setBounds(value),
    500
  );
  const setLocationDebounced = useDebouncedCallback(
    (value) => setLocation(value),
    100
  );
  const { reactifyApi } = useMap();

  if (!reactifyApi) return <Loading />;

  const {
    YMap,
    YMapListener,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
  } = reactifyApi;

  return (
    <YMap location={location} ref={mapRef}>
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />

      <YMapListener
        onUpdate={({ location }) => {
          setLocationDebounced(location);
          setBoundsDebounced(location.bounds);
        }}
      />

      {places.map((place) => (
        <MarkerWithPopup
          key={place.id}
          place={place}
          mapRef={mapRef}
          reactifyApi={reactifyApi}
          selected={selectedPlaceId === place.id}
          selectPlace={selectPlace}
        />
      ))}
    </YMap>
  );
};
