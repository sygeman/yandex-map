import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
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

const BALLOON_LAYOUT_CONTENT_CLASS = "balloon-content";

export function Map(props: MapProps) {
  const { yamapAPI, apiIsReady, onMapMount, onMapUnmount } =
    useContext(MountedMapsContext);

  const createIconLayout = (marker: Marker) => {
    return yamapAPI.templateLayoutFactory.createClass<any>(``, {
      build() {
        this.constructor.superclass.build.call(this);
        ReactDOM.render(props.createMarker(marker), this.getElement());
      },
    });
  };

  const createBalloonContentLayout = (marker: Marker) => {
    return yamapAPI.templateLayoutFactory.createClass<any>(
      `<div class="${BALLOON_LAYOUT_CONTENT_CLASS} relative">Popup</div>`, // createPopup
      {
        build() {
          this.constructor.superclass.build.call(this);

          const container = this.getElement().querySelector(
            `.${BALLOON_LAYOUT_CONTENT_CLASS}`
          );

          ReactDOM.render(props.createPopup(marker), container);
        },
        clear() {
          this.constructor.superclass.clear.call(this);
          this.constructor.render = null;
        },
      }
    );
  };

  const createBalloonLayout = () => {
    return yamapAPI.templateLayoutFactory.createClass<any>(
      `<div class="popover">$[[options.contentLayout]]</div>`,
      {
        build() {
          this.constructor.superclass.build.call(this);
          this.layout = this.getElement().querySelector(".popover");
          this.content = this.getElement().querySelector(
            `.${BALLOON_LAYOUT_CONTENT_CLASS} > *`
          );
        },
      }
    );
  };

  const createPlacemark = (marker: Marker) => {
    const iconLayout = createIconLayout(marker);
    const balloonContentLayout = createBalloonContentLayout(marker);
    const balloonLayout = createBalloonLayout();

    return new yamapAPI.Placemark(
      [marker.longitude, marker.latitude],
      {},
      {
        iconLayout,
        balloonContentLayout,
        balloonLayout,
        balloonAutoPan: true,
        balloonOffset: [0, 0],
        balloonPanelMaxMapArea: 0,
        hideIconOnBalloonOpen: false,
        openBalloonOnClick: true,
        pane: "overlaps",
      }
    );
  };

  useEffect(() => {
    if (apiIsReady) {
      yamapAPI.ready(() => {
        const myMap = new yamapAPI.Map(
          props.id,
          props.state || {},
          props.options || {}
        );

        myMap.events.add("click", function (e) {
          // Получение координат щелчка
          var coords = e.get("coords");
          console.log(coords.join(", "));
        });

        props.markers.forEach((marker) => {
          const placemark = createPlacemark(marker);
          myMap.geoObjects.add(placemark);
        });

        onMapMount(myMap, props.state);
      });
    }

    return () => {
      if (apiIsReady) {
        onMapUnmount();
      }
    };
  }, [apiIsReady]);

  return (
    <div id={props.id} style={{ width: "100%", height: "100%" }}>
      {props.children}
    </div>
  );
}

export default Map;
