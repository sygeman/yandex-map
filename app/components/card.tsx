"use client";

import React from "react";
import type { Place } from "../../types/place";

interface CardProps {
  place: Place;
}

const Card: React.FC<CardProps> = ({ place }) => {
  return (
    <div key={place.id} className="p-4 bg-slate-700 rounded-lg">
      {place.label}
    </div>
  );
};

export default Card;
