"use client";

import React, { useCallback, useState } from "react";
import type { Place } from "../../types/place";

interface MarkerWithPopupProps {
  place: Place;
  selected: boolean;
  selectPlace: (id: string | null) => void;
}

export const MarkerWithPopup = ({
  place,
  selected,
  selectPlace,
}: MarkerWithPopupProps) => {
  return (
    <div
      onMouseEnter={() => selectPlace(place.id)}
      onMouseLeave={() => selectPlace(null)}
    >
      <div className="absolute bottom-0 transform -translate-x-1/2 flex flex-col items-center">
        <div
          className={`text-white whitespace-nowrap py-1 px-2 rounded text-sm shadow ${
            selected ? "bg-slate-600" : "bg-slate-700"
          }`}
        >
          {place.label}
        </div>
      </div>
      {selected ? (
        <div className="absolute transform -translate-x-1/2">
          <div className="bg-slate-700 text-slate-300 min-w-[320px] p-4 rounded-lg text-sm shadow w-full h-full">
            <div className="text-lg text-white">{place.label}</div>
            <div className="text-sm">{place.text}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
