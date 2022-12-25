"use client";
import { useState } from "react";
import { Place } from "../types/place";
import { MapProvider } from "../libs/map";
import List from "./components/list";
import MapContainer from "./components/map";

export default function Index() {
  const [mapIsOpen, setMapIsOpen] = useState(true);
  const toggleMap = () => setMapIsOpen((isOpen) => !isOpen);

  const places: Place[] = [
    {
      id: "1",
      label: "Place 1",
      longitude: 55.684758,
      latitude: 37.738521,
    },
  ];

  return (
    <div className="absolute w-full h-full inset-0 overflow-hidden flex">
      <MapProvider apiUrl="https://api-maps.yandex.ru/2.1/?lang=ru_RU">
        <div className={`p-4 ${mapIsOpen ? "basis-1/2" : "w-full"}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="text-lg">Places</div>
            <button
              className="py-1 px-2 rounded bg-slate-800"
              onClick={toggleMap}
            >
              {mapIsOpen ? "Hide" : "Open"} Map
            </button>
          </div>
          <List places={places} />
        </div>
        {mapIsOpen && (
          <div className="basis-1/2 relative">
            <MapContainer places={places} />
          </div>
        )}
      </MapProvider>
    </div>
  );
}
