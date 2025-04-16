import React, { ReactNode } from "react";
import { Rnd } from "react-rnd";

export interface position {
  x: number;
  y: number;
}

export interface size {
  width: number;
  height: number;
}

export interface pipState {
  position: position;
  size: size;
  show: boolean;
}

interface Props {
  children: ReactNode;
  pipState: pipState;
  setPipState: React.Dispatch<React.SetStateAction<pipState>>;
  className?: string;
}

// Picture-in-picture (PIP) element, which can render different components as children
export const PictureInPicture: React.FC<Props> = ({
  children,
  pipState,
  setPipState,
  className = "",
}: Props) => {
  return (
    <Rnd
      default={{
        x: pipState.position.x,
        y: pipState.position.y,
        width: pipState.size.width,
        height: pipState.size.height,
      }}
      bounds="parent"
      minWidth={150}
      minHeight={100}
      enableResizing={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
      onDragStop={(_e, d) => {
        setPipState({
          ...pipState,
          position: { x: d.x, y: d.y },
        });
      }}
      onResizeStop={(_e, _direction, _ref, delta, _position) => {
        setPipState({
          ...pipState,
          size: {
            width: pipState.size.width + delta.width,
            height: pipState.size.height + delta.height,
          },
          position: { x: _position.x, y: _position.y },
        });
      }}
      className={`rounded-lg overflow-hidden border border-border shadow-lg bg-black ${className}`}
    >
      {children}
    </Rnd>
  );
};
