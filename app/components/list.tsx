import { usePageState } from "../../providers/page-provider";
import type { Place } from "../../types/place";

const List = ({ places }: { places: Place[] }) => {
  const { selectedPlaceId, selectPlace } = usePageState();

  return (
    <div className="space-y-2 h-full overflow-y-auto">
      {places.map((place) => (
        <div
          key={place.id}
          onMouseEnter={() => selectPlace(place.id)}
          onMouseLeave={() => selectPlace(null)}
          className={`p-4 rounded-lg ${
            selectedPlaceId === place.id ? "bg-slate-600" : "bg-slate-700"
          }`}
        >
          {place.label}
        </div>
      ))}
    </div>
  );
};

export default List;
