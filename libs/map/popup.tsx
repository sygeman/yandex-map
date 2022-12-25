import React from "react";

export interface PopupProps {
  children?: React.ReactNode;
}

export const Popup: React.FC<PopupProps> = (props) => {
  return (
    <div className="absolute top-10 left-10 bg-white z-50">
      {props.children}
    </div>
  );
};
