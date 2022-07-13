import Image from "next/image";
import logo from "../public/4klogo.png";
import { useState, useCallback } from "react";

const Logo = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoaded = useCallback(() => {
    setImageLoaded(true);
  }, []);
  return (
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
        onLoad={handleImageLoaded}
      />
    </div>
  );
};

export default Logo;
