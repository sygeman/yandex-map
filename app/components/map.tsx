"use client";

import React from "react";
import { useMap } from "../../providers/map-provider";
import type { Place } from "../../types/place";
import { MarkerWithPopup } from "./marker-with-popup";

export const Map = ({ places }: { places: Place[] }) => {
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

      {places.map((place) => (
        <YMapMarker
          key={place.id}
          zIndex={1}
          coordinates={[place.latitude, place.longitude]}
        >
          <MarkerWithPopup place={place} />
        </YMapMarker>
      ))}
    </YMap>
  );
};
