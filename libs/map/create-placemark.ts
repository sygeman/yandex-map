import { renderToString } from "react-dom/server";
import { YMapsApi } from "./provider";
import { Marker } from "./yamap";

export const createPlacemark = ({
  marker,
  yamapAPI,
  createMarker,
  createPopup,
}: {
  marker: Marker;
  yamapAPI: YMapsApi;
  createMarker: (marker: Marker) => React.ReactElement;
  createPopup: (marker: Marker) => React.ReactElement;
}) =>
  new yamapAPI.Placemark(
    [marker.longitude, marker.latitude],
    {},
    {
      iconLayout: yamapAPI.templateLayoutFactory.createClass(
        renderToString(createMarker(marker))
      ),
      balloonContentLayout: yamapAPI.templateLayoutFactory.createClass<any>(
        renderToString(createPopup(marker)),
        {
          build() {
            this.constructor.superclass.build.call(this);

            setTimeout(() => {
              const mapElement = window.document.getElementById("map");
              const popupElement = this.getElement().firstChild;

              popupElement.style.bottom = "40px";
              popupElement.style.left = "0";

              if (mapElement && popupElement) {
                const mapElementData =
                  mapElement.getBoundingClientRect() as DOMRect;
                const popupElementData =
                  popupElement.getBoundingClientRect() as DOMRect;

                const MARGIN = 20;

                // Check top overflow
                if (popupElementData.y < mapElementData.y) {
                  popupElement.style.bottom = "";
                  popupElement.style.top = "0px";
                }

                // Check left overflow
                if (popupElementData.x < mapElementData.x) {
                  const offset = mapElementData.x - popupElementData.x;
                  popupElement.style.left = `${offset + MARGIN}px`;
                }

                // Check right overflow
                if (popupElementData.right > mapElementData.right) {
                  const offset = popupElementData.right - mapElementData.right;
                  popupElement.style.left = `-${offset + MARGIN}px`;
                }

                // Check bottom overflow
                if (popupElementData.bottom > mapElementData.bottom) {
                  popupElement.style.top = "";
                  popupElement.style.bottom = "0px";
                }

                popupElement.style.visibility = "visible";
              }
            }, 0);
          },
        }
      ),
      balloonLayout: yamapAPI.templateLayoutFactory.createClass(
        `$[[options.contentLayout]]`
      ),
      hideIconOnBalloonOpen: false,
      openBalloonOnClick: true,
      pane: "overlaps",
    }
  );
