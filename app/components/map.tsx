"use client";

import { LngLat } from "@yandex/ymaps3-types";
import React from "react";
import { useMap } from "../../providers/map-provider";
import type { Place } from "../../types/place";
import { MarkerWithPopup } from "./marker-with-popup";

interface MapProps {
  places: Place[];
  selectedPlaceId: string | null;
  selectPlace: (id: string | null) => void;
}

export const Map = ({ places, selectedPlaceId, selectPlace }: MapProps) => {
  const { reactifyApi } = useMap();
  if (!reactifyApi) {
    return <div>Загрузка лучшей карты в мире...</div>;
  }

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } =
    reactifyApi;

  return (
    <YMap location={{ center: [37.623082, 55.75254], zoom: 9 }}>
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />

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
