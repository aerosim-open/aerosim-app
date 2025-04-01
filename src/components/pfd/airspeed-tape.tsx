import React from "react";
import { cn } from "@/lib/utils";

interface AirspeedTapeProps {
  airspeed: number;
  tas?: number;
}

export const AirspeedTape: React.FC<AirspeedTapeProps> = ({
  airspeed,
  tas,
}) => {
  const speedMarks = () => {
    const marks = [];
    const baseSpeed = Math.floor(airspeed / 10) * 10;

    for (let i = -5; i <= 5; i++) {
      const speed = baseSpeed - i * 10;

      if (speed < 0) continue;

      const offset = i * 30 + (airspeed % 10) * 2;

      marks.push(
        <div
          key={`speed-${speed}`}
          className="absolute flex items-center h-6"
          style={{ transform: `translateY(${offset}px)` }}
        >
          <div
            className={cn(
              "w-10 h-1 bg-white mr-4",
              speed % 10 === 0 ? "w-5 h-[3px]" : ""
            )}
          ></div>
          {speed % 10 === 0 && (
            <span className="text-white text-xl font-medium">{speed}</span>
          )}
        </div>
      );
    }

    return marks;
  };

  return (
    <div className="absolute left-0 top-0 h-full w-20">
      <div className="relative h-full w-full flex flex-col items-start justify-center">
        {/* Airspeed Box */}
        <div className="absolute left-20 top-1/2 transform -translate-y-1/2 w-full">
          <div className="relative bg-black bg-opacity-70 border border-white rounded-r-md py-2 px-1">
            {/* Current Airspeed */}
            <div className="text-center text-3xl font-bold text-white">
              {Math.round(airspeed)}
            </div>
          </div>
        </div>

        {/* Speed Tape */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-64 w-full">
          <div className="relative h-full overflow-hidden">
            {/* Speed Marks Container */}
            <div className="absolute left top-1/2 bg-black bg-opacity-70 transform -translate-y-1/2 h-full w-full flex flex-col items-start justify-center border-2 border-white">
              {/* Generate speed marks */}
              {speedMarks()}
            </div>

            {/* Speed Bug */}
            {
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3">
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-r-[10px] border-r-yellow-400 border-b-[6px] border-b-transparent"></div>
              </div>
            }

            {/* Speed Trend Vector */}
            {/*<div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-green-500 to-transparent"></div>*/}
          </div>
        </div>

        <div className="relative top-[147px] w-[80px] bg-black bg-opacity-70 border border-white rounded-r-md py-2 px-1">
          {/* TAS Display */}
          {tas && (
            <div className="mt-1 text-center text-xs font-medium">
              <span className="text-gray-400">TAS</span>
              <span className="ml-1 text-white">{tas}</span>
            </div>
          )}
        </div>

        {/* Speed Limits */}
        <div className="absolute left-0 h-full w-1">
          {/* Red line for max speed */}
          {/*<div className="absolute top-1/4 w-full h-1/4 bg-red-500"></div>*/}
          {/* Yellow caution range */}
          {/*<div className="absolute top-[45%] w-full h-[10%] bg-yellow-500"></div>*/}
        </div>
      </div>
    </div>
  );
};
