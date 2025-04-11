import React from "react";
import { cn } from "@/lib/utils";

interface AttitudeIndicatorProps {
  pitch: number;
  roll: number;
  heading: number;
  navSource: string;
}

// Utility function to replace reactflow's clamp
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const AttitudeIndicator: React.FC<AttitudeIndicatorProps> = ({
  pitch,
  roll,
  heading,
  navSource,
}) => {
  const pointer = (style: any) => {
    return (
      <div
        className="relative top-[-105px] right-0 left-[2px] w-1 h-1 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[20px] border-b-white"
        style={style}
      ></div>
    );
  };

  const bankAngleMarks = () => {
    const rotation = 0;
    return (
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ transform: `rotate(${rotation}deg) translateY(-35px)` }}
      >
        {/* Bank angle marks */}
        {[0, 10, 20, 30, 45, 60].map((angle) => (
          <React.Fragment key={`bank-${angle}`}>
            <div
              className="absolute left-1/2 w-1 h-4 bg-white "
              style={{
                transform: `rotate(${angle}deg) translateY(${-100 * 1.2}px)`,
              }}
            />
            <div
              className="absolute left-1/2 w-1 h-4 bg-white"
              style={{
                transform: `rotate(${-angle}deg) translateY(${-100 * 1.2}px)`,
              }}
            />
          </React.Fragment>
        ))}

        {/* Arrow at the 0 mark (always points downward) */}
        <div
          className="absolute top-[20px] left-[62px] w-1 h-1 border-l-4 border-r-4 border-b-8 border-transparent border-b-white"
          style={{
            transform: `rotate(180deg) translateY(100px)`, // Counter-rotate to keep it pointing down
          }}
        />
      </div>
    );
  };

  const pitchlines = (pitch: number) => {
    return (
      <div
        className="relative w-full h-full"
        style={{
          width: "400px",
          height: "140px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {[
          -90, -80, -70, -60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50,
          60, 70, 80, 90,
        ].map((pitchValue) => (
          <div
            key={`pitch-${pitchValue}`}
            className="absolute flex items-center justify-center"
            style={{
              top: `calc(50% - ${pitchValue * 2}px)`,
              left: "50%",
              transform: `translateY(${18 + 20 * (clamp(pitch, -90, 90) / 10 - 1)}px)`,
            }}
          >
            <div
              className={cn(
                "w-1 h-1 bg-white mr-1",
                pitchValue === 0 ? "w-2" : ""
              )}
            ></div>
            {pitchValue !== 0 && (
              <>
                <div className="absolute left-1/2 w-16 h-0.5 bg-white transform -translate-x-full"></div>
                <div className="absolute left-1/2 w-16 h-0.5 bg-white transform translate-x-0"></div>
                {pitchValue % 10 === 0 && (
                  <span className="absolute left-1/2 transform -translate-x-[70px] text-white text-xs">
                    {Math.abs(pitchValue)}
                  </span>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Artificial Horizon */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Sky and Ground */}
        <div
          className="absolute w-[500%] h-[500%] transform origin-center transition-transform duration-100 ease-linear"
          style={{
            transform: `rotate(${-roll}deg) translateY(${18 + 20 * (pitch / 10 - 1)}px)`,
          }}
        >
          {/* Sky */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-500 bg-opacity-90"></div>
          {/* Ground */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-amber-700 bg-opacity-80"></div>
        </div>

        {/* Pitch lines */}
        <div
          className="absolute w-[500%] h-[500%] transform origin-center transition-transform duration-100 ease-linear"
          style={{
            transform: `rotate(${-roll}deg)`,
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Generate pitch lines */}
            {pitchlines(pitch)}
            {/* Bank Angle Indicator */}
            <div className="absolute  left-1/2 transform -translate-x-1/2 w-32 h-32">
              <div className="relative top-[25%] w-full h-full">
                {/* Bank angle marks */}
                {bankAngleMarks()}
              </div>
            </div>
          </div>
        </div>

        {/* Bank angle pointer */}
        <div className="absolute">{pointer({})}</div>

        {/* Fixed Aircraft Symbol */}
        <div
          className="absolute pointer-events-none z-10 flex flex-col items-center justify-center"
          style={{
            transform: `rotate(${-roll}deg) translateY(${18 + 20 * (pitch / 10 - 1)}px)`,
          }}
        >
          <div className="relative">
            {/* Aircraft wings */}
            <div className="absolute w-24 h-1 bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            {/* Aircraft nose */}
            <div className="absolute w-1 h-6 bg-white left-1/2 top-1/2 transform -translate-x-1/2 translate-y-1/2"></div>
            {/* Center dot */}
            <div className="absolute w-2 h-2 bg-white rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>

        {/* Flight Path Vector */}
        <div className="absolute w-6 h-6 border-2 border-cyan-400 rounded-full z-10 transform translate-x-4 translate-y-2">
          <div className="absolute w-4 h-0.5 bg-cyan-400 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute w-0.5 h-4 bg-cyan-400 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Nav Source Indicator */}
        <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-green-400 text-sm font-semibold">
          {navSource}
        </div>

        {/* Heading Display */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-white text-2xl font-bold">
          <span className="bg-black bg-opacity-50 px-2 py-1 rounded">
            {heading}°
          </span>
        </div>
      </div>
    </div>
  );
};
