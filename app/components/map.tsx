"use client";
import React from "react";
import { Map } from "../../libs/map";
import type { Place } from "../../types/place";
import MapControl from "./map-control";

interface MapContainerProps {
  places: Place[];
}

const MapContainer: React.FC<MapContainerProps> = ({ places }) => {
  return (
    <Map
      id="map"
      state={{
        center: [55.751574, 37.573856],
        zoom: 7,
        controls: [],
      }}
      options={{
        suppressMapOpenBlock: true,
        suppressObsoleteBrowserNotifier: true,
        yandexMapDisablePoiInteractivity: true,
      }}
      markers={places}
      createMarker={({ id }) => (
        <div className="absolute bottom-0 transform -translate-x-1/2">
          <div className="bg-white whitespace-nowrap py-1 px-2 rounded text-sm shadow">
            Marker - {id}
          </div>
        </div>
      )}
      createPopup={({ id }) => (
        <div className="bg-white whitespace-nowrap py-4 px-2 rounded text-sm shadow z-50">
          Popup - {id}
        </div>
      )}
    >
      <MapControl />
    </Map>
  );
};

export default MapContainer;
