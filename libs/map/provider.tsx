import React, { createContext, useContext, useState } from "react";
import ReactDOM from "react-dom";
import Script from "next/script";
import type {} from "@yandex/ymaps3-types";
import { ReactifiedModule } from "@yandex/ymaps3-types/reactify";

type ReactifyApi = ReactifiedModule<
  typeof import("/project/yandex-map/node_modules/.pnpm/@yandex+ymaps3-types@0.0.5/node_modules/@yandex/ymaps3-types/index")
>;

type MountedMapsContextValue = {
  ymapsReady: boolean;
  reactifyApi: ReactifyApi | null;
};

export const MountedMapsContext = createContext<MountedMapsContextValue>({
  ymapsReady: false,
  reactifyApi: null,
});

export const MapProvider: React.FC<{
  children?: React.ReactNode;
  apiUrl: string;
}> = (props) => {
  const [ymapsReady, setYmapsReady] = useState<boolean>(false);
  const [reactifyApi, setReactifyApi] = useState<ReactifyApi | null>(null);

  return (
    <MountedMapsContext.Provider value={{ ymapsReady, reactifyApi }}>
      <Script
        src={props.apiUrl}
        onLoad={async () => {
          const [ymaps3React] = await Promise.all([
            ymaps3.import("@yandex/ymaps3-reactify"),
            ymaps3.ready,
          ]);
          const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
          const r = reactify.module(ymaps3);
          setReactifyApi(r);
          setYmapsReady(true);
        }}
      />
      {props.children}
    </MountedMapsContext.Provider>
  );
};

export const useMap = () => useContext(MountedMapsContext);
