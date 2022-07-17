import { useCallback, useEffect, useRef, useState } from "react";

export const ProblemContainer = ({ children }) => (
  <div className="grid grid-cols-1 lg:grid-cols-layout w-fill min-h-screen">
    {children}
  </div>
);

export const ProblemBackground = () => (
  <div className="grid grid-cols-1 lg:grid-cols-layout w-fill min-h-screen top-0 sticky">
    <div className="bg-black h-[30vh] lg:h-auto"></div>
    <div className="bg-white h-[70vh] lg:min-h-screen"></div>
  </div>
);

export const ProblemBackgroundContainer = ({ children }) => (
  <div className="absolute h-full w-full">{children}</div>
);

export const ProblemLeft = ({ children, progress }) => {
  const [displayedChildren, setDisplayedChildren] = useState();
  let translateY = Math.max(0, 50 - progress * 3 * 50);
  if (progress > 0.85) translateY = Math.max(-50, -(progress - 0.85) * 100);
  useEffect(() => {
    if (children) {
      setDisplayedChildren(children);
    }
  }, [children]);

  return (
    <div
      className="flex flex-col items-center justify-center text-3xl lg:text-3xl h-[30vh] lg:h-auto"
      style={{ transform: `translateY(${translateY}px)` }}
    >
      <div className="leading-10">{children}</div>
    </div>
  );
};

export const ProblemRight = ({ children, progress }) => {
  const [displayedChildren, setDisplayedChildren] = useState();
  let translateY = Math.max(-50, -(progress - 0.5) * 50);
  useEffect(() => {
    if (children) {
      setDisplayedChildren(children);
    }
  }, [children]);
  return (
    <div
      className="flex flex-grow w-full lg:items-center justify-center h-screen z-10"
      style={{ transform: `translateY(${translateY}px)` }}
    >
      <div className="w-full mx-3 sm:mx-10 changingText:mx-24 lg:pt-0 px-4 md:px-0 lg:h-auto h-[70vh]">
        {children}
      </div>
    </div>
  );
};
