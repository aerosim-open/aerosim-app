import React, { useMemo, useEffect } from "react";
import { UnrealViewer } from "@/components/unreal-viewer";
import { OmniverseViewer } from "@/components/omniverse-viewer";
import { FlightControls } from "@/components/flight-controls";
import {
  PictureInPicture,
  pipState,
  size,
} from "@/components/picture-in-picture";
import { NavBar } from "@/components/nav-bar";
import { ImageStream } from "@/components/image-stream";
import { PFD } from "@/components/pfd";
import { useFlightData } from "@/hooks/use-flight-data";

interface Props {
  renderer: string;
  cameraState: pipState;
  setCameraState: React.Dispatch<React.SetStateAction<pipState>>;
  pfdState: pipState;
  setPfdState: React.Dispatch<React.SetStateAction<pipState>>;
  windowDimensions: size;
  setWindowDimensions: React.Dispatch<React.SetStateAction<size>>;
}

export const SimViewer: React.FC<Props> = ({
  renderer,
  cameraState,
  setCameraState,
  pfdState,
  setPfdState,
  setWindowDimensions,
}: Props) => {
  // Update window dimensions when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleReload = () => {
    sessionStorage.setItem("cameraState", JSON.stringify(cameraState));
    sessionStorage.setItem("pfdState", JSON.stringify(pfdState));
    window.location.reload();
  };

  // Keep camera and pfd state when page reloads, run once the component mounts
  useEffect(() => {
    const savedCameraState = sessionStorage.getItem("cameraState");
    if (savedCameraState) setCameraState(JSON.parse(savedCameraState));
    const savedPfdState = sessionStorage.getItem("pfdState");
    if (savedPfdState) setPfdState(JSON.parse(savedPfdState));
  }, []);

  // Memoize the renderer component to prevent unnecessary re-renders
  // This is beneficial because:
  // 1. The renderer components are likely expensive to render
  // 2. The renderer only changes when the 'renderer' prop changes
  // 3. Prevents re-creation of the component on every render of SimViewer
  const memoizedRenderer = useMemo(() => {
    if (renderer === "unreal") {
      return (
        <UnrealViewer
          initialSettings={{
            AutoPlayVideo: true,
            AutoConnect: true,
            ss: "ws://localhost:80",
            StartVideoMuted: true,
            HoveringMouse: true,
            WaitForStreamer: true,
          }}
        />
      );
    } else if (renderer === "omniverse") {
      return (
        <OmniverseViewer
          server={"127.0.0.1"}
          width={1920}
          height={1080}
          fps={60}
        />
      );
    } else {
      console.log(
        "Error, renderer not valid, choose between 'unreal' and 'omniverse'"
      );
      return null;
    }
  }, [renderer]); // Only re-compute when renderer changes

  //Sample flight data for PFD not included in FlightData
  const sampleData = {
    oat: 7,
    transponder: "5537",
    navSource: "VOR 1",
    navCourse: 0,
    time: "23:00:34",
  };

  const flightData = useFlightData();

  return (
    <div className="h-full w-full p-4">
      <h1 className="text-2xl font-bold mb-4">AeroSim Simulator</h1>
      <div className="h-[calc(100vh-8rem)] w-full rounded-lg overflow-hidden border border-border relative">
        <div className="absolute top-0 left-0 z-10">
          <NavBar
            handleReload={handleReload}
            handleCameraButton={() => {
              setCameraState({ ...cameraState, show: !cameraState.show });
              localStorage.setItem("cameraState", JSON.stringify(cameraState));
            }}
            handlePFDButton={() =>
              setPfdState({ ...pfdState, show: !pfdState.show })
            }
          />
        </div>

        <FlightControls />
        {memoizedRenderer}

        {cameraState.show && (
          <PictureInPicture pipState={cameraState} setPipState={setCameraState}>
            <ImageStream />
          </PictureInPicture>
        )}

        {pfdState.show && (
          <PictureInPicture pipState={pfdState} setPipState={setPfdState}>
            <PFD
              airspeed={flightData.airspeed_kts}
              altitude={flightData.altitude_ft}
              heading={flightData.heading_deg}
              pitch={flightData.pitch_deg}
              roll={flightData.roll_deg}
              verticalSpeed={flightData.vertical_speed_fps}
              tas={flightData.true_airspeed_kts}
              oat={sampleData.oat}
              barometer={flightData.altimeter_pressure_setting_inhg}
              transponder={sampleData.transponder}
              navSource={sampleData.navSource}
              navCourse={sampleData.navCourse}
              time={sampleData.time}
            />
          </PictureInPicture>
        )}
      </div>
    </div>
  );
};
