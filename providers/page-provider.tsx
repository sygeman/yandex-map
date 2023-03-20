import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { LngLatBounds } from "@yandex/ymaps3-types";

type PageStateContextValue = {
  bounds: LngLatBounds;
  selectedPlaceId: string | null;
  selectPlace: (id: string | null) => void;
  setBounds: (bounds: LngLatBounds) => void;
};

export const PageStateContext = createContext<PageStateContextValue>({
  bounds: [
    [0, 0],
    [0, 0],
  ],
  selectedPlaceId: null,
  selectPlace: () => undefined,
  setBounds: () => undefined,
});

export const PageStateProvider = (props: { children?: ReactNode }) => {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [bounds, setBounds] = useState<LngLatBounds>([
    [0, 0],
    [0, 0],
  ]);
  const selectPlace = useCallback(
    (id: string | null) => setSelectedPlaceId(id),
    []
  );

  const contextValue = useMemo(
    () => ({ bounds, selectedPlaceId, selectPlace, setBounds }),
    [bounds, selectedPlaceId, selectPlace, setBounds]
  );

  return (
    <PageStateContext.Provider value={contextValue}>
      {props.children}
    </PageStateContext.Provider>
  );
};

export const usePageState = () => useContext(PageStateContext);
