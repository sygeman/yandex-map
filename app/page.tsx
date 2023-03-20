"use client";

import { MapProvider } from "../providers/map-provider";
import { PageStateProvider } from "../providers/page-provider";
import Bounds from "./components/bounds";
import List from "./components/list";
import { Map } from "./components/map";
import { places } from "./data/base";

export default function Index() {
  const apiUrl = `https://api-maps.yandex.ru/3.0/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAP_KEY}&lang=ru_RU`;

  return (
    <PageStateProvider>
      <div className="absolute w-full h-full inset-0 overflow-hidden flex">
        <MapProvider apiUrl={apiUrl}>
          <div className="p-2 w-80 shrink-0 md:block hidden">
            <div className="flex items-center justify-between mb-1">
              <div>Places - {places.length}</div>
            </div>
            <Bounds />
            <List places={places} />
          </div>

          <div className="relative h-full w-full">
            <Map places={places} />
          </div>
        </MapProvider>
      </div>
    </PageStateProvider>
  );
}
