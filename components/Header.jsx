import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import logo from "../public/4klogo.png";
import downChevron from "../public/down-chevron.svg";

const Header = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoaded = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <div>
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
        <h1 className="font-semibold text-5xl text-black text-center leading-snug">
          PRIMA SIGNA
        </h1>
        <h3 className="font-medium text-3xl text-black text-center">
          SEEING THROUGH DYSLEXIA
        </h3>
      </div>
    </div>
  );
};

export default Header;
