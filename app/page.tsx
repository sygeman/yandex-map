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
    [56.04785018702136, 37.34204440950727],
    [55.187530758015846, 38.500545705915606],
    [55.85367530400972, 37.06738620638225],
    [55.85830988519754, 38.32257419466352],
    [55.52475698166306, 37.023440893882274],
    [55.558618711600225, 37.707061659273904],
    [55.23034108804907, 37.113799940523904],
    [55.74807716325511, 37.641143690523904],
  ].map(([longitude, latitude], i) => ({
    id: `${i}`,
    label: `Place ${i + 1}`,
    longitude,
    latitude,
  }));

  return (
    <div className="absolute w-full h-full inset-0 overflow-hidden flex">
      <MapProvider apiUrl="https://api-maps.yandex.ru/2.1/?lang=ru_RU">
        <div
          className={`p-4 ${
            mapIsOpen ? "basis-1/2" : "w-full"
          } md:block hidden`}
        >
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
