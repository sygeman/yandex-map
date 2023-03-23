import { memo } from "react";
import { usePageState } from "../../providers/page-provider";
import type { Place } from "../../types/place";
import Card from "./card";

const List = ({ places }: { places: Place[] }) => {
  const { selectPlace } = usePageState();

  return (
    <div className="space-y-2 h-full overflow-y-auto">
      {places.map((place) => (
        <Card key={place.id} place={place} selectPlace={selectPlace} />
      ))}
    </div>
  );
};

export default memo(List);
