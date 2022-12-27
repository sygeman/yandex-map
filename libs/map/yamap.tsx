import React, { useContext, useEffect } from "react";
import { createPlacemark } from "./create-placemark";
import { MountedMapsContext } from "./provider";

export type Marker = {
  id: string;
  longitude: number;
  latitude: number;
};

export interface MapProps {
  id: string;
  options?: ymaps.IMapOptions;
  children?: React.ReactNode;
  state?: ymaps.IMapState;
  markers: Marker[];
  createMarker: (marker: Marker) => React.ReactElement;
  createPopup: (marker: Marker) => React.ReactElement;
}

export const Map: React.FC<MapProps> = ({
  id,
  state,
  options,
  markers,
  children,
  createMarker,
  createPopup,
}) => {
  const { yamapAPI, apiIsReady, onMapMount, onMapUnmount } =
    useContext(MountedMapsContext);

  useEffect(() => {
    if (apiIsReady) {
      yamapAPI.ready(() => {
        const bounds = yamapAPI.util.bounds.fromPoints(
          markers.map((marker) => [marker.longitude, marker.latitude])
        );

        console.log(yamapAPI.util.bounds.getCenterAndZoom(bounds, [500, 500]));

        const myMap = new yamapAPI.Map(id, state || {}, options || {});

        myMap.setBounds(bounds);

        myMap.events.add("click", function (e) {
          // Получение координат щелчка
          console.log(e.get("coords").join(", "));
        });

        markers.forEach((marker) => {
          const placemark = createPlacemark({
            marker,
            yamapAPI,
            createMarker,
            createPopup,
          });
          myMap.geoObjects.add(placemark);
        });

        onMapMount(myMap, state);
      });
    }

    return () => {
      if (apiIsReady) {
        onMapUnmount();
      }
    };
  }, [apiIsReady]);

  return (
    <div id={id} style={{ width: "100%", height: "100%" }}>
      {children}
    </div>
  );
};
