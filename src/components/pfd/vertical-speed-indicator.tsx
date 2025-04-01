import React from "react";

interface VerticalSpeedIndicatorProps {
  verticalSpeed: number;
  className?: string;
}

export const VerticalSpeedIndicator: React.FC<VerticalSpeedIndicatorProps> = ({
  verticalSpeed,
}) => {
  return (
    <div className="absolute w-[52px] h-[240px] right-0 top-1/2 transform -translate-y-1/2 h-64 w-8">
      <div className="relative bg-black bg-opacity-70 border-2 border-white h-full w-full flex flex-col items-center justify-center">
        {/* VSI Scale */}
        <div className="absolute h-full w-full">
          <div className="relative h-full w-full flex flex-col items-center">
            {/* Center line (0 fpm) */}
            <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-white"></div>

            {/* Up marks */}
            <div className="absolute top-[35%] transform -translate-y-1/2 w-1/2 h-0.5 bg-white"></div>
            <div className="absolute top-[20.0%] transform -translate-y-1/2 w-1/4 h-0.5 bg-white"></div>
            <div className="absolute top-[5%] transform -translate-y-1/2 w-1/2 h-0.5 bg-white"></div>

            {/* Down marks */}
            <div className="absolute top-[65%] transform -translate-y-1/2 w-1/2 h-0.5 bg-white"></div>
            <div className="absolute top-[80.0%] transform -translate-y-1/2 w-1/4 h-0.5 bg-white"></div>
            <div className="absolute top-[95%] transform -translate-y-1/2 w-1/2 h-0.5 bg-white"></div>

            {/* Labels */}
            <div className="absolute top-[5%] right-[18%] transform -translate-y-1/2 translate-x-full text-xs text-white">
              2
            </div>
            <div className="absolute top-[35%] right-[18%] transform -translate-y-1/2 translate-x-full text-xs text-white">
              1
            </div>
            <div className="absolute top-[65%] right-[18%] transform -translate-y-1/2 translate-x-full text-xs text-white">
              1
            </div>
            <div className="absolute top-[95%] right-[18%] transform -translate-y-1/2 translate-x-full text-xs text-white">
              2
            </div>
          </div>
        </div>

        {/* VSI Indicator */}
        <div
          className="absolute left-0 w-full h-0 flex items-center"
          style={{
            top: `${(() => {
              // Clamp vertical speed between -2000 and 2000 fpm for display purposes
              const clampedVS = Math.max(-2000, Math.min(2000, verticalSpeed));
              // Convert to a percentage for positioning (0% = -2000fpm, 50% = 0fpm, 100% = 2000fpm)
              return 50 - clampedVS / 40; // 40 is a scaling factor to make the movement appropriate
            })()}%`,
          }}
        >
          <div className="w-full h-0.5 bg-white"></div>
          <div className="absolute right-0 w-3 h-3 bg-white transform translate-x-1/2 rotate-45"></div>
        </div>
      </div>
    </div>
  );
};
