import React from "react";
import { cn } from "@/lib/utils";
import { AirspeedTape } from "./airspeed-tape";
import { AltitudeTape } from "./altitude-tape";
import { AttitudeIndicator } from "./attitude-indicator";
import { HeadingIndicator } from "./heading-indicator";
import { VerticalSpeedIndicator } from "./vertical-speed-indicator";
import { FlightData } from "./flight-data";

export interface PFDConfig {
  showAirspeedTape?: boolean;
  showAltitudeTape?: boolean;
  showAttitudeIndicator?: boolean;
  showHeadingIndicator?: boolean;
  showVerticalSpeedIndicator?: boolean;
  showFlightData?: boolean;
  theme?: {
    backgroundColor?: string;
    primaryColor?: string;
    secondaryColor?: string;
    warningColor?: string;
    dangerColor?: string;
    textColor?: string;
  };
}

export interface PFDProps {
  config?: PFDConfig;
  className?: string;
  // Flight data
  airspeed?: number;
  altitude?: number;
  heading?: number;
  pitch?: number;
  roll?: number;
  verticalSpeed?: number;
  // Additional data
  tas?: number;
  oat?: number;
  barometer?: number;
  transponder?: string;
  navSource?: string;
  navCourse?: number;
  time?: string;
}

const defaultConfig: PFDConfig = {
  showAirspeedTape: true,
  showAltitudeTape: true,
  showAttitudeIndicator: true,
  showHeadingIndicator: true,
  showVerticalSpeedIndicator: true,
  showFlightData: true,
  theme: {
    backgroundColor: "bg-black",
    primaryColor: "text-white",
    secondaryColor: "text-blue-500",
    warningColor: "text-yellow-500",
    dangerColor: "text-red-500",
    textColor: "text-white",
  },
};

export const PFD: React.FC<PFDProps> = ({
  config = defaultConfig,
  className,
  airspeed = 120,
  altitude = 5000,
  heading = 270,
  pitch = 0,
  roll = 0,
  verticalSpeed = 0,
  tas = 126,
  oat = 7,
  barometer = 29.92,
  transponder = "5537",
  navSource = "VOR 1",
  navCourse = 0,
  time = "23:00:34",
}) => {
  const mergedConfig = { ...defaultConfig, ...config };
  const { theme } = mergedConfig;

  heading = parseFloat(heading.toFixed(2))
  tas = parseFloat(tas.toFixed(2))

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden",
        theme?.backgroundColor || "bg-black",
        theme?.textColor || "text-white",
        className
      )}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Attitude Indicator (center) */}
        {mergedConfig.showAttitudeIndicator && (
          <AttitudeIndicator
            pitch={pitch}
            roll={roll}
            heading={heading}
            navSource={navSource}
          />
        )}

        {/* Airspeed Tape (left) */}
        {mergedConfig.showAirspeedTape && (
          <AirspeedTape
            airspeed={airspeed}
            tas={tas}
          />
        )}

        {/* Altitude Tape (right) */}
        {mergedConfig.showAltitudeTape && (
          <AltitudeTape
            altitude={altitude}
            barometer={barometer}
          />
        )}

        {/* Heading Indicator (bottom) */}
        {mergedConfig.showHeadingIndicator && (
          <HeadingIndicator
            heading={heading}
            navCourse={navCourse}
          />
        )}

        {/* Vertical Speed Indicator (right of altitude) */}
        {mergedConfig.showVerticalSpeedIndicator && (
          <VerticalSpeedIndicator
          verticalSpeed={verticalSpeed}
          />
        )}

        {/* Flight Data (bottom) */}
        {mergedConfig.showFlightData && (
          <FlightData
            oat={oat}
            transponder={transponder}
            time={time}
          />
        )}
      </div>
    </div>
  );
};

export default PFD;
