"use client";

import React from "react";
import type { Place } from "../../types/place";
import Card from "./card";

interface ListProps {
  places: Place[];
}

const List: React.FC<ListProps> = (props) => {
  return (
    <div>
      {props.places.map((place) => (
        <Card key={place.id} place={place} />
      ))}
    </div>
  );
};

export default List;
