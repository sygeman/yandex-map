"use client";

import { YMap } from "@yandex/ymaps3-types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useMap } from "../../providers/map-provider";
import { usePageState } from "../../providers/page-provider";
import type { Place } from "../../types/place";
import getPopupPosition from "./helpers/get-popup-position";

interface MarkerWithPopupProps {
  mapRef: React.MutableRefObject<(YMap & { container: HTMLElement }) | null>;
  place: Place;
}

export const MarkerWithPopup = ({ mapRef, place }: MarkerWithPopupProps) => {
  const markerRef = useRef(null);
  const popupRef = useRef(null);
  const [position, setPosition] = useState<React.CSSProperties>({
    visibility: "hidden",
    opacity: "0",
  });

  const { selectedPlaceId, selectPlace } = usePageState();
  const selected = selectedPlaceId === place.id;

  const updatePositionAndShow = useCallback(() => {
    const map = mapRef?.current?.container;
    const marker = markerRef?.current;
    const popup = popupRef?.current;

    if (!map || !marker || !popup) return;

    setPosition({
      ...getPopupPosition(map, popup, marker),
      visibility: "visible",
      opacity: "1",
    });
  }, [mapRef]);

  useEffect(() => {
    if (selected) updatePositionAndShow();
  }, [selected, updatePositionAndShow]);

  const { reactifyApi } = useMap();

  if (!reactifyApi) return <></>;

  const { YMapMarker } = reactifyApi;

  return (
    <YMapMarker
      zIndex={selected ? 10 : 1}
      coordinates={[place.longitude, place.latitude]}
    >
      <div
        onMouseEnter={() => selectPlace(place.id)}
        onMouseLeave={() => selectPlace(null)}
      >
        <div
          ref={markerRef}
          className="absolute bottom-0 transform -translate-x-1/2 flex flex-col items-center"
        >
          <div
            className={`text-white whitespace-nowrap py-1 px-2 rounded text-sm shadow ${
              selected ? "bg-slate-600" : "bg-slate-700"
            }`}
          >
            {place.label}
          </div>
        </div>
        {selected ? (
          <div
            ref={popupRef}
            className="absolute transform -translate-x-1/2 transition-opacity"
            style={{ ...position }}
          >
            <div className="bg-slate-700 text-slate-300 min-w-[320px] p-4 rounded-lg text-sm shadow w-full h-full">
              <div className="text-lg text-white">{place.label}</div>
              <div className="text-sm">{place.text}</div>
            </div>
          </div>
        ) : null}
      </div>
    </YMapMarker>
  );
};
