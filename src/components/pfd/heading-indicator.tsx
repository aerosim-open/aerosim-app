import React from 'react';
import { cn } from '@/lib/utils';

interface HeadingIndicatorProps {
  heading: number;
  navCourse: number;
}

export const HeadingIndicator: React.FC<HeadingIndicatorProps> = ({
  heading,
  navCourse,
}) => {

  const headingMarks = () => {
    const marks = [];

    for (let i = 0; i < 36; i++) {
      const hdg = i * 10;
      const isMajor = hdg % 30 === 0;
      const offset = ((hdg - heading + 540) % 360) - 180;

      // Only show marks within view
      if (Math.abs(offset) > 60) continue;

      marks.push(
        <div
          key={`hdg-${hdg}`}
          className="absolute bottom-0 transform -translate-x-1/2"
          style={{ left: `calc(50% + ${offset * 2}px)` }}
        >
          <div
            className={cn(
              "h-2 w-0.5 bg-white mb-1",
              isMajor ? "h-3" : ""
            )}
          ></div>

          {isMajor && (
            <div className="text-white text-xs font-medium">
              {hdg === 0
                ? "N"
                : hdg === 90
                  ? "E"
                  : hdg === 180
                    ? "S"
                    : hdg === 270
                      ? "W"
                      : hdg / 10}
            </div>
          )}
        </div>
      );
    }

    return marks;
  }

  return (
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-32">
      <div className="relative w-full h-full flex flex-col items-center">
        {/* Heading Rose */}
        <div className="absolute bottom-0 w-full h-16 overflow-hidden rounded-t-full bg-black bg-opacity-70 border border-white">
          <div className="relative w-full h-full">
            {/* Heading Marks */}
            <div className="absolute bottom-0 w-full h-full">
              {/* Generate heading marks */}
              {headingMarks()}
            </div>

            {/* Current Heading Indicator */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[10px] border-b-white"></div>
            </div>

            {/* Heading Bug */}
            <div
              className="absolute bottom-6 transform -translate-x-1/2"
              style={{
                left: `calc(50% + ${(((navCourse - heading + 540) % 360) - 180) * 2}px)`,
              }}
            >
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Current Heading Display */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 border border-white rounded-md px-3 py-1">
          <span className="text-white text-lg font-bold">
            {Math.round(heading)}°
          </span>
        </div>
      </div>
    </div>
  );
};
