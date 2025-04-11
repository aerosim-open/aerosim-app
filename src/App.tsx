import React, { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { SimViewer } from "@/pages/sim-viewer";
import { pipState, position, size } from "@/components/picture-in-picture";

export function App(): React.ReactElement {
  // Get renderer from environment or URL parameters
  const getRenderer = () => {
    // First try URL parameters (for development)
    const urlParams = new URLSearchParams(window.location.search);
    const urlRenderer = urlParams.get("renderer");
    if (
      urlRenderer &&
      ["unreal", "omniverse"].includes(urlRenderer.toLowerCase())
    ) {
      return urlRenderer.toLowerCase();
    }

    // Then try environment variable (set by Vite)
    if (
      process.env.RENDERER &&
      ["unreal", "omniverse"].includes(process.env.RENDERER.toLowerCase())
    ) {
      return process.env.RENDERER.toLowerCase();
    }

    // Default to unreal
    return "unreal";
  };

  const [renderer] = useState(getRenderer());

  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Define default PFD size
  const defaultPFDSize: size = {
    width: Math.min(650, windowDimensions.width * 0.42),
    height: Math.min(350, windowDimensions.height * 0.42),
  };

  // Define default PIP size and positions
  const defaultPIPSize: size = {
    width: Math.min(500, windowDimensions.width * 0.4),
    height: Math.min(350, windowDimensions.height * 0.3),
  };

  const defaultCameraPosition: position = {
    x: Math.max(0, windowDimensions.width - defaultPIPSize.width - 30),
    y: Math.max(0, windowDimensions.height - defaultPIPSize.height - 120),
  };

  const defaultPfdPosition: position = {
    x: Math.max(
      0,
      windowDimensions.width - defaultPFDSize.width - defaultPFDSize.width
    ),
    y: Math.max(0, windowDimensions.height - defaultPFDSize.height - 120),
  };

  const defaultCameraState: pipState = {
    position: defaultCameraPosition,
    size: defaultPIPSize,
    show: true,
  };

  const defaultPfdState: pipState = {
    position: defaultPfdPosition,
    size: defaultPFDSize,
    show: true,
  };

  const initialCameraState =
    JSON.parse(sessionStorage.getItem("cameraState") ?? "null") ||
    defaultCameraState;
  const initialPfdState =
    JSON.parse(sessionStorage.getItem("pfdState") ?? "null") || defaultPfdState;

  const [cameraState, setCameraState] = useState(initialCameraState);
  const [pfdState, setPfdState] = useState(initialPfdState);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="aerosim-ui-theme">
      <div className="min-h-screen bg-background">
        <SimViewer
          renderer={renderer}
          cameraState={cameraState}
          setCameraState={setCameraState}
          pfdState={pfdState}
          setPfdState={setPfdState}
          windowDimensions={windowDimensions}
          setWindowDimensions={setWindowDimensions}
        />
      </div>
    </ThemeProvider>
  );
}
