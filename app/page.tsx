"use client";

import { LngLatBounds } from "@yandex/ymaps3-types";
import { useCallback, useState } from "react";
import { MapProvider } from "../providers/map-provider";
import { Map } from "./components/map";
import { places } from "./data/base";

export default function Index() {
  const apiUrl = `https://api-maps.yandex.ru/3.0/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAP_KEY}&lang=ru_RU`;

  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [bounds, setBounds] = useState<LngLatBounds>([
    [0, 0],
    [0, 0],
  ]);
  const selectPlace = useCallback(
    (id: string | null) => setSelectedPlaceId(id),
    []
  );

  return (
    <div className="absolute w-full h-full inset-0 overflow-hidden flex">
      <MapProvider apiUrl={apiUrl}>
        <div className="p-2 w-80 shrink-0 md:block hidden">
          <div className="flex items-center justify-between mb-1">
            <div>Places - {places.length}</div>
          </div>
          <div className="text-xs text-slate-500 mb-1">
            <div>
              {bounds[0][0]}, {bounds[0][1]}
            </div>
            <div>
              {bounds[1][0]}, {bounds[1][1]}
            </div>
          </div>
          <div className="space-y-2 h-full overflow-y-auto">
            {places.map((place) => (
              <div
                key={place.id}
                onMouseEnter={() => selectPlace(place.id)}
                onMouseLeave={() => selectPlace(null)}
                className={`p-4 rounded-lg ${
                  selectedPlaceId === place.id ? "bg-slate-600" : "bg-slate-700"
                }`}
              >
                {place.label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-full w-full">
          <Map
            places={places}
            selectedPlaceId={selectedPlaceId}
            selectPlace={selectPlace}
            onBoundsChange={setBounds}
          />
        </div>
      </MapProvider>
    </div>
  );
}
