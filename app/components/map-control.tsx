"use client";
import React from "react";
import { useMap } from "../../libs/map";

const ControlButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => (
  <button
    className="h-8 w-8 flex items-center justify-center bg-slate-800 rounded-full text-lg"
    {...props}
  />
);

const MapControl = () => {
  const { zoomIn, zoomOut, reset } = useMap();

  return (
    <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
      <ControlButton onClick={zoomIn}>+</ControlButton>
      <ControlButton onClick={zoomOut}>-</ControlButton>
      <ControlButton onClick={reset}>R</ControlButton>
    </div>
  );
};

export default MapControl;
