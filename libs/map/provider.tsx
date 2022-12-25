// @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { createContext, useCallback, useContext, useState } from "react";
import Script from "next/script";
import type ymaps, { Map } from "yandex-maps";

export type YMapsApi = typeof ymaps;

type MountedMapsContextValue = {
  yamapAPI: YMapsApi;
  apiIsReady: boolean;
  map: Map;
  onMapMount: (map: Map, defaultState?: ymaps.IMapState) => void;
  onMapUnmount: () => void;
  reset: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
};

export const MountedMapsContext = createContext<MountedMapsContextValue>(null);

export const MapProvider: React.FC<{
  children?: React.ReactNode;
  apiUrl: string;
}> = (props) => {
  const yamapAPI = (typeof window !== "undefined" &&
    window["ymaps"]) as YMapsApi;
  const [map, setMap] = useState<Map>(null);
  const [apiIsReady, setApiIsReady] = useState<boolean>(false);
  const [defaultState, setDefaultState] = useState<ymaps.IMapState>({});

  const onMapMount = useCallback((map: Map, defaultState: ymaps.IMapState) => {
    if (defaultState) setDefaultState(defaultState);
    setMap(map);
  }, []);

  const onMapUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const zoomIn = useCallback(() => map.setZoom(map.getZoom() + 1), [map]);
  const zoomOut = useCallback(() => map.setZoom(map.getZoom() - 1), [map]);

  const reset = useCallback(() => {
    map.setCenter(defaultState.center);
    map.setZoom(defaultState.zoom);
  }, [map, defaultState]);

  return (
    <MountedMapsContext.Provider
      value={{
        yamapAPI,
        apiIsReady,
        map,
        onMapMount,
        onMapUnmount,
        reset,
        zoomIn,
        zoomOut,
      }}
    >
      <Script
        src={props.apiUrl}
        onLoad={() => {
          setApiIsReady(true);
        }}
      />
      {props.children}
    </MountedMapsContext.Provider>
  );
};

export const useMap = () => useContext(MountedMapsContext);
