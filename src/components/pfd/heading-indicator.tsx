import React from "react";
import { cn } from "@/lib/utils";

interface HeadingIndicatorProps {
  heading: number;
  needleHeading: number
  deviation: number;
  navCourse: number;
}
export const HeadingBox = ({ heading }: { heading: number }) =>
{
  return (
    <div className="absolute"
    style={{transform:"translateX(-10px)"}}>
      <div className="relative bg-black bg-opacity-70 border border-white rounded-sm py-[-1px] px-1">
        {/* Current Altitude */}
        <div className="text-left text-3xl font-bold text-white">
          {`${heading < 10 && heading != 0 ? "00" + Number(Math.round(heading)).toString() :
              heading >= 10 && heading < 100 ? "0" + Number(Math.round(heading)).toString() :
              heading == 0 ? "360":
              Number(Math.round(heading)).toString()
          }`}
        </div>
      </div>
    </div>
  );
}
export const SelectorArrow = () =>
{
  return <div style={{...arrowstyles.arrowSelector,} as React.CSSProperties}></div>
}

export const ExteriorHSI = () =>
{
  const squareCount = 3;

  const radius = 185;

  const squareSizeX = 9;
  const squareSizeY = 25;

  const squares = Array.from({ length: squareCount }, (_, index) => {
    const angle = ((index * 135) / squareCount) + -45;
    const radians = (angle * Math.PI) / 180;

    const x = radius + radius * Math.cos(radians) - squareSizeX / 2 + -170;
    const y = radius + radius * Math.sin(radians) - squareSizeY / 2 + -75;

    return { x, y, angle, index };
  });

  const singleCircularSquare = Array.from({ length: 1 }, (_, index) => {
    const angle = ((index * 135) / 1) + -70;
    const radians = (angle * Math.PI) / 180;

    const x = radius + radius * Math.cos(radians) - squareSizeX / 2 + -170;
    const y = radius + radius * Math.sin(radians) - squareSizeY / 2 + -75;

    return { x, y, angle, index };
  });
  return (
    <div style={{
      ...styles.container,
      transform: "translateX(-224px) translateY(111px)"
     } as React.CSSProperties}>
      {squares.map((item) => (
          <>
            <div
              key={`square-${item.index}`}
              style={
                {
                  ...styles.square,
                  width: squareSizeX,
                  height: squareSizeY,
                  left: `${item.x}px`,
                  top: `${item.y}px`,
                  transform: `rotate(${item.angle + 90}deg)`,
                  transformOrigin: "center",
                } as React.CSSProperties
              }
            />
          </>
      ))}
      {squares.map((item) => (
          <>
            <div
              key={`square-${item.index}`}
              style={
                {
                  ...styles.square,
                  width: squareSizeX,
                  height: squareSizeY,
                  left: `${-item.x}px`,
                  top: `${item.y}px`,
                  transform: `rotate(${-item.angle + 90}deg)`,
                  transformOrigin: "center",
                } as React.CSSProperties
              }
            />
          </>
      ))}
      {singleCircularSquare.map((item) => (
          <>
            <div
              key={`square-${item.index}`}
              style={
                {
                  ...styles.square,
                  width: squareSizeX,
                  height: squareSizeY,
                  left: `${item.x + 1}px`,
                  top: `${item.y + -3}px`,
                  transform: `rotate(${-item.angle + -225}deg)`,
                  transformOrigin: "center",
                } as React.CSSProperties
              }
            />
          </>
      ))}
      {singleCircularSquare.map((item) => (
          <>
            <div
              key={`square-${item.index}`}
              style={
                {
                  ...styles.square,
                  width: squareSizeX,
                  height: squareSizeY,
                  left: `${-item.x + 1}px`,
                  top: `${item.y + -3}px`,
                  transform: `rotate(${item.angle + 45}deg)`,
                  transformOrigin: "center",
                } as React.CSSProperties
              }
            />
          </>
        ))}
    </div>
  );
}

const Arrow = ({ deviation, needleHeading, navCourse }: { deviation: number, needleHeading: number, navCourse: number }) => {
  
  const indices = [-8, -4, 4, 8];

  return (
    <div style={{
      ...arrowstyles.arrowContainer,
      transform: `rotate(${needleHeading - 90}deg)`,
     } as React.CSSProperties}>
      <div style={{
        ...arrowstyles.arrowEnd,
        backgroundColor: `rgba${navCourse == 1 ? "(15, 199, 23, 100)" :
          navCourse == 2 ? "(15, 199, 23, 0)" :
          "(199, 44, 171, 1)"
          }`,
        border: `3px solid ${navCourse == 2 ? "rgba(15, 199, 23, 1)" :
           "transparent"
         }`,
       } as React.CSSProperties}></div>

      <div>
      {indices.map((index) => (
        <div
          key={index}
          style={{
            ...arrowstyles.arrowCircles,
            transform: `translate(167px, ${index * 10 - 15}px)`
          } as React.CSSProperties}
        ></div>
      ))}
    </div>

      
      <div
        style={
          {
            ...arrowstyles.arrowMiddle,
            top: `${deviation * 10}px`,
            backgroundColor: `rgba${navCourse == 1 ? "(15, 199, 23, 1)" :
              navCourse == 2 ? "(15, 199, 23, 0)" :
              "(199, 44, 171, 1)"
              }`,
            border: `3px solid ${navCourse == 2 ? "rgba(15, 199, 23, 1)" :
           "transparent"
            }`,
          } as React.CSSProperties
        }
      ></div>

      <div style={{
        ...arrowstyles.arrowTop,
         backgroundColor: `rgba${navCourse == 1 ? "(15, 199, 23, 100)" :
          navCourse == 2 ? "(15, 199, 23, 0)" :
          "(199, 44, 171, 1)"
          }`,
         border: `3px solid ${navCourse == 2 ? "rgba(15, 199, 23, 1)" :
           "transparent"
         }`,
       } as React.CSSProperties}></div>

      
      <div style={{
          ...arrowstyles.arrowPointerOutline,
          borderTop: `28px solid ${navCourse == 2 ? "rgba(15, 199, 23, 1)" :
           "transparent"
         }`,
        } as React.CSSProperties}>
          <div style={{
          ...arrowstyles.arrowPointer,
          borderTop: `20px solid rgba${navCourse == 1 ? "(15, 199, 23, 1)" :
            navCourse == 2 ? "(19, 18, 32, 1)" :
            "(199, 44, 171, 1)"
            }`,
          } as React.CSSProperties}>
          </div></div>  
      </div>
  );
};

const arrowstyles = {
  arrowContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    position: "absolute",
    width: "400px",
    height: "500px",
    backgroundColor: "Transparent",
    overflow: "hidden",
    zIndex: 200,
  },
  arrowEnd: {
    position: "relative",
    width: "20px",
    height: "10px",
    left: "51px",
    zIndex: 200,
  },
  arrowTop: {
    position: "relative",
    width: "50px",
    height: "10px",
    left: "45px",
    zIndex: 200,
  },
  arrowMiddle: {
    position: "relative",
    width: "200px",
    height: "10px",
    left: "50px",
    zIndex: 200,
  },
  arrowPointer: {
    position: "relative",
    width: "1",
    height: "1",
    top: '-28px',
    left: '-20px',
    borderLeft: "20px solid transparent",
    borderRight: "20px solid transparent",
    right: "-38px",
    transform: "rotate(0deg)",
    zIndex: 200,
  },
  arrowPointerOutline: {
    content: "''",
    position: 'relative',
    top: '0px',
    left: '30px',
    width: '0',
    height: '0',
    borderLeft: '28px solid transparent',
    borderRight: '28px solid transparent',
    transform: 'rotate(-90deg)', 
    zIndex: 100,
  },
  arrowSelector: {
    position: "relative",
    width: "0",
    height: "0",
    top: '30px',
    left: '-210px',
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderBottom: "20px solid white",
    right: "-0px",
    transform: "rotate(180deg)",
    zIndex: 201,
  },
  arrowCircles: {
    position: "absolute",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "transparent",
    border: "3px solid white",
    zIndex: 210,
  },
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    backgroundColor: "rgba(19, 18, 32, 1)",
    position: "relative",
    zIndex: 100,
    border: "2px solid white",
  },
  square: {
    width: "4px",
    height: "10px",
    backgroundColor: "rgb(223, 223, 223)",
    position: "absolute",
    zIndex: 101,
    transformOrigin: "center",
  },
  letter: {
    fontSize: "25px",
    fontWeight: "bold",
    color: "white",
    position: "absolute",
    zIndex: 102,
    transformOrigin: "center",
  },
};



export const HeadingCompassIndicator: React.FC<HeadingIndicatorProps> = ({
  heading,
  deviation,
  needleHeading,
  navCourse
}) => {

  const squareCount = 36;

  const radius = 185;

  const squareSizeX = 5;
  const squareSizeY = 15;
  const thickSquareSizeX = squareSizeX * 1.5;
  const thickSquareSizeY = squareSizeY * 1.5;

  const letters = [
    "E",
    "12",
    "15",
    "S",
    "21",
    "24",
    "W",
    "30",
    "33",
    "N",
    "3",
    "6",
  ];

  const squaresAndText = Array.from({ length: squareCount }, (_, index) => {
    const angle = (index * 360) / squareCount;
    const radians = (angle * Math.PI) / 180;

    const x = radius + radius * Math.cos(radians) - squareSizeX / 2 + 11;
    const y = radius + radius * Math.sin(radians) - squareSizeY / 2 + 10;

    const isSpecial = index % 3 === 0;

    const letter = index % 3 === 0 ? letters[Math.floor(index / 3)] : null;

    return { x, y, angle, index, isSpecial, letter };
  });
  
  return (
    <div style={{ ...styles.container, transform: `translateY(220px) rotate(${-heading}deg) scale(0.9, 0.9)`} as React.CSSProperties}>
      <div style={{ ...arrowstyles } as React.CSSProperties} />
      <Arrow deviation={deviation} needleHeading={needleHeading} navCourse={navCourse}/>

      <div style={{ ...styles.circle } as React.CSSProperties}>
        {squaresAndText.map((item) => (
          <>
            <div
              key={`square-${item.index}`}
              style={
                {
                  ...styles.square,
                  width: item.isSpecial ? thickSquareSizeX : squareSizeX,
                  height: item.isSpecial ? thickSquareSizeY : squareSizeY,
                  left: `${item.x}px`,
                  top: `${item.y}px`,
                  transform: `rotate(${item.angle + 90}deg)`,
                  transformOrigin: "center",
                } as React.CSSProperties
              }
            />
            {item.letter && (
              <div
                key={`letter-${item.index}`}
                style={
                  {
                    ...styles.letter,
                    left: `${item.x * 0.88 + 17}px`,
                    top: `${item.y * 0.88 + 17}px`,
                    transform: `rotate(${item.angle + 90}deg)`,
                    transformOrigin: "center",
                  } as React.CSSProperties
                }
              >
                {item.letter}
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default HeadingCompassIndicator;

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
            className={cn("h-2 w-0.5 bg-white mb-1", isMajor ? "h-3" : "")}
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
  };

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