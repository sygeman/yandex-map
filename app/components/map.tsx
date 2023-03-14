"use client";

import { YMapLocation } from "@yandex/ymaps3-types/imperative/YMap";
import React, { useState } from "react";
import { useMap } from "../../providers/map-provider";
import type { Place } from "../../types/place";
import { MarkerWithPopup } from "./marker-with-popup";

interface MapProps {
  places: Place[];
  selectedPlaceId: string | null;
  selectPlace: (id: string | null) => void;
}

export const Map = ({ places, selectedPlaceId, selectPlace }: MapProps) => {
  const [location, setLocation] = useState<YMapLocation>({
    center: [37.623082, 55.75254],
    zoom: 9,
  });
  const { reactifyApi } = useMap();
  if (!reactifyApi) {
    return <div>Загрузка лучшей карты в мире...</div>;
  }

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapMarker,
    YMapListener,
  } = reactifyApi;

  return (
    <YMap location={location}>
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />

      <YMapListener onUpdate={(o) => setLocation(o.location)} />

      {places.map((place) => {
        const selected = selectedPlaceId === place.id;
        return (
          <YMapMarker
            key={place.id}
            zIndex={selected ? 10 : 1}
            coordinates={[place.longitude, place.latitude]}
          >
            <MarkerWithPopup
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
