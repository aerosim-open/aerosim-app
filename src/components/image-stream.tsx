import * as React from "react";
import { useEffect, useState } from "react";

export const ImageStream: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5002");

    ws.onmessage = (event: MessageEvent) => {
      setImageSrc(`data:image/jpeg;base64,${event.data}`);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error in camera stream:", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-background flex items-center justify-center">
      {imageSrc ? (
        <img src={imageSrc} alt="Camera Stream" />
      ) : (
        <p>Camera connecting...</p>
      )}
    </div>
  );
};
