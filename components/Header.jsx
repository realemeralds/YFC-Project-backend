import React, { useState, useRef, useContext, useCallback } from "react";
import Image from "next/image";
import logo from "../public/4klogo.png";
import downChevron from "../public/down-chevron.svg";
import { ScrollContext } from "./ScrollObserver";
import { Parallax } from "react-scroll-parallax";

const Header = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoaded = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const refContainer = useRef(null);
  const { scrollY } = useContext(ScrollContext);
  let progress = 0;

  const { current: elContainer } = refContainer;
  if (elContainer) {
    progress = Math.min(1, scrollY / elContainer.clientHeight);
  }

  return (
    <Parallax translateY={[-50, 50]}>
      <div className="relative">
        <div
          className={`justify-center items-center w-full flex absolute top-1 transition-all duration-1000 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={logo}
            alt="Vanguard logo"
            width={210}
            height={90}
            objectFit="cover"
          />
        </div>
        <div
          className="flex h-screen w-full justify-center items-center flex-col"
          ref={refContainer}
        >
          <div
            className={`justify-center items-center w-full flex absolute bottom-6 transition-all delay-300 duration-1000 ${
              imageLoaded ? "opacity-100" : "opacity-0 -translate-y-10"
            }`}
          >
            <Image
              src={downChevron}
              height={40}
              width={40}
              onLoad={handleImageLoaded}
              alt="down chevron"
            />
          </div>
          <div className="flex h-screen w-full justify-center items-center flex-col">
            <h1 className="font-semibold text-5xl text-[#3b454e] text-center leading-snug z-10 drop-shadow-[0_5px_3px_rgba(0,0,0,0.4)]">
              PRIMA SIGNA
            </h1>
            <h3 className="font-medium text-3xl text-black text-center z-10 drop-shadow-[0_5px_3px_rgba(0,0,0,0.4)]">
              SEEING THROUGH DYSLEXIA
            </h3>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute w-full h-full object-cover"
            >
              <source src="/masthead-bg.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default Header;
