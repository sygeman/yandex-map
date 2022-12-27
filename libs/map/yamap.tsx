import React, { useContext, useEffect } from "react";
import { renderToString } from "react-dom/server";
import { MountedMapsContext } from "./provider";

type Marker = {
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

  const createPlacemark = (marker: Marker) =>
    new yamapAPI.Placemark(
      [marker.longitude, marker.latitude],
      {},
      {
        iconLayout: yamapAPI.templateLayoutFactory.createClass(
          renderToString(createMarker(marker))
        ),
        balloonContentLayout: yamapAPI.templateLayoutFactory.createClass(
          renderToString(createPopup(marker))
        ),
        balloonLayout: yamapAPI.templateLayoutFactory.createClass(
          `$[[options.contentLayout]]`
        ),
        hideIconOnBalloonOpen: false,
        openBalloonOnClick: true,
        pane: "overlaps",
      }
    );

  useEffect(() => {
    if (apiIsReady) {
      yamapAPI.ready(() => {
        const myMap = new yamapAPI.Map(id, state || {}, options || {});

        myMap.events.add("click", function (e) {
          // Получение координат щелчка
          console.log(e.get("coords").join(", "));
        });

        markers.forEach((marker) => {
          const placemark = createPlacemark(marker);
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
