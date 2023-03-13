"use client";
import React, { useCallback, useState } from "react";
import { useMap } from "../../libs/map/provider";
import type { Place } from "../../types/place";

interface MapContainerProps {
  places: Place[];
}

const MarkerWithPopup = ({ place }: { place: Place }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const togglePopup = useCallback(
    () => setPopupOpen((prev) => !prev),
    [setPopupOpen]
  );

  return (
    <>
      <div
        className="absolute bottom-0 transform -translate-x-1/2 flex flex-col items-center"
        onClick={togglePopup}
      >
        <div className="bg-slate-700 text-white whitespace-nowrap py-1 px-2 rounded text-sm shadow">
          {place.label}
        </div>
      </div>
      {popupOpen ? (
        <div className="absolute transform -translate-x-1/2">
          <div className="bg-slate-700 text-white min-w-[320px] p-4 rounded text-sm shadow z-50 w-full h-full">
            <div className="text-lg">{place.label}</div>
            <div className="text-slate-300 text-sm">{place.text}</div>
          </div>
        </div>
      ) : null}
    </>
  );
};

const MapContainer: React.FC<MapContainerProps> = ({ places }) => {
  const { reactifyApi } = useMap();

  if (!reactifyApi) return <div>Загрузка лучшей карты в мире...</div>;

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

export default MapContainer;
