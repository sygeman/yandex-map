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
          <div className="bg-slate-700 text-white whitespace-nowrap py-1 px-2 rounded text-sm shadow">
            {places.find((place) => place.id === id)?.label}
          </div>
        </div>
      )}
      createPopup={({ id }) => (
        <div className="absolute bottom-8 transform -translate-x-1/2">
          <div className="bg-slate-700 text-white min-w-[320px] p-4 rounded text-sm shadow z-50 w-full h-full">
            <div className="text-lg">
              {places.find((place) => place.id === id)?.label}
            </div>
            <div className="text-slate-300 text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </div>
        </div>
      )}
    >
      <MapControl />
    </Map>
  );
};

export default MapContainer;
