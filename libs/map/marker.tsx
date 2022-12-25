import React from "react";

export interface MarkerProps {
  longitude: number;
  latitude: number;
  children?: React.ReactNode;
}

export const Marker: React.FC<MarkerProps> = (props) => {
  return <div className="absolute">{props.children}</div>;
};
