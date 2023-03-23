import { memo } from "react";
import type { Place } from "../../types/place";

const Card = ({
  place,
  selectPlace,
}: {
  place: Place;
  selectPlace: (id: string | null) => void;
}) => (
  <div
    onMouseEnter={() => selectPlace(place.id)}
    onMouseLeave={() => selectPlace(null)}
    className="p-4 rounded-lg bg-slate-700 hover:bg-slate-600"
  >
    {place.label}
  </div>
);

export default memo(Card);
