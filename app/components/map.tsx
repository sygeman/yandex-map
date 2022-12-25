"use client";
import React from "react";
import { Map, Marker, Popup } from "../../libs/map";
import type { Place } from "../../types/place";
import MapControl from "./map-control";

interface MapContainerProps {
  places: Place[];
}

const MapContainer: React.FC<MapContainerProps> = ({ places }) => {
  return (
    <Map
      id="map"
      defaultState={{
        center: [55.751574, 37.573856],
        zoom: 7,
        controls: [],
      }}
      options={{
        suppressMapOpenBlock: true,
        suppressObsoleteBrowserNotifier: true,
      }}
    >
      {places.map((place) => (
        <Marker
          key={place.id}
          longitude={place.longitude}
          latitude={place.latitude}
        >
          {place.label}
        </Marker>
      ))}

      <Popup>Popup</Popup>

      <MapControl />
    </Map>
  );
};

export default MapContainer;
