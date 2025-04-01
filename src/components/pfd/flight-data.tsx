import React from 'react';

interface FlightDataProps {
  oat?: number;
  transponder?: string;
  time?: string;
}

export const FlightData: React.FC<FlightDataProps> = ({
  oat = 0,
  transponder = '1200',
  time = '00:00:00',
}) => {
  return (
    <div className="absolute bottom-0 left-0 w-full flex justify-between items-center px-2 py-1 bg-black bg-opacity-50">
      {/* OAT (Outside Air Temperature) */}
      <div className="flex items-center">
        <span className="text-white text-xs">OAT</span>
        <span className="ml-1 text-white text-xs font-medium">
          {oat}°c
        </span>
      </div>

      {/* Transponder Code */}
      <div className="flex items-center">
        <span className="text-white text-xs">XPDR</span>
        <span className="ml-1 text-white text-xs font-medium">
          {transponder}
        </span>
        <span className="ml-2 text-green-500 text-xs">IDNT</span>
      </div>

      {/* Time */}
      <div className="flex items-center">
        <span className="text-white text-xs font-medium">{time}</span>
      </div>
    </div>
  );
};
