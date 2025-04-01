import React from "react";
import { ImageStream } from "@/components/image-stream";

export const CameraViewer: React.FC = () => {
  return (
    <div className="h-full w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Camera Viewer</h1>
      <div className="h-[calc(100vh-8rem)] w-full rounded-lg overflow-hidden border border-border">
        <ImageStream />
      </div>
    </div>
  );
};
