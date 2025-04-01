import React from "react";

interface AltitudeTapeProps {
  altitude: number;
  barometer?: number;
}

export const AltitudeTape: React.FC<AltitudeTapeProps> = ({
  altitude,
  barometer = 29.92,
}) => {
  const altitudeMarks = () => {
    const marks = [];
    const baseAlt = Math.floor(altitude / 100) * 100;

    for (let i = -10; i <= 10; i++) {
      const alt = baseAlt + i * 100;
      if (alt < 0) continue;

      const offset = i * 30 - (altitude % 100) / 10;
      const isMajor = alt % 500 === 0;

      marks.push(
        <div
          key={`alt-${alt}`}
          className="absolute flex items-center h-6"
          style={{ transform: `translateY(${-offset}px)` }}
        >
          {isMajor ? (
            <>
              <span className="text-white text-xl font-medium mr-2">
                {Math.abs(alt / 1)}
              </span>
              <div className="w-4 h-1 bg-white"></div>
            </>
          ) : (
            <>
              <span className="text-white text-xm font-medium mr-3">
                {Math.abs(alt / 1)}
              </span>
              <div className="w-3 h-0.5 bg-white"></div>
            </>
          )}
        </div>
      );
    }

    return marks;
  };

  return (
    <div className="absolute right-0 top-0 h-full w-24">
      <div className="relative h-full w-full flex flex-col items-end justify-center">
        {/* Altitude Tape */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-64 w-full">
          <div className="relative right-[33px] w-[80px] h-full overflow-hidden">
            {/* Altitude Marks Container */}
            <div className="absolute bg-black bg-opacity-70 border-2 border-white right-0 top-1/2 transform -translate-y-1/2 h-full w-full flex flex-col items-end justify-center">
              {/* Generate altitude marks */}
              {altitudeMarks()}
            </div>
            {/* Altitude Bug */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3">
              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-cyan-400 border-b-[6px] border-b-transparent"></div>
            </div>
            {/* Altitude Trend Vector */}
            {/*<div className="absolute right-1/2 top-1/2 transform translate-x-1/2 w-1 h-16 bg-gradient-to-b from-green-500 to-transparent"></div>*/}
          </div>
        </div>

        {/* Altitude Limits */}
        <div className="absolute right-0 h-full w-1">
          {/* Transition altitude indicator */}
          <div className="absolute top-1/3 w-full h-[2px] bg-yellow-500"></div>
        </div>

        {/* Altitude Alert */}
        <div className="relative w-[80px] right-[50px] top-[-150px] bg-black bg-opacity-70 border-2 border-white rounded-sm px-2 py-1">
          <span className="text-center text-2xl font-bold text-white">
            1500
          </span>
        </div>
      </div>
      {/* Altitude Box */}
      <div className="absolute right-[130px] top-1/2 transform -translate-y-1/2 w-full">
        <div className="relative bg-black bg-opacity-70 border border-white rounded-l-md py-2 px-1">
          {/* Current Altitude */}
          <div className="text-center text-3xl font-bold text-white">
            {Math.round(altitude)}
          </div>
        </div>
        {/* Barometer Setting */}
        <div className="absolute right-[-80px] top-[150px] w-[80px] mt-1 text-center bg-black bg-opacity-70 border-[1px] rounded-sm border-white text-xs font-medium">
          <span className="text-white">
            {barometer.toFixed(2)}
            <span className="text-gray-400">in</span>
          </span>
        </div>
      </div>
    </div>
  );
};
