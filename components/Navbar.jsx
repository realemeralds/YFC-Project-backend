import icon from "../public/hamburger.svg";
import Image from "next/image";
import { useRef, useContext, useEffect, useState } from "react";
import { ScrollContext } from "./ScrollObserver";
import Link from "next/link";

export default function Navbar({ hidden, menuVisible }) {
  const [opacity, setOpacity] = useState();
  const [displayed, setDisplayed] = useState(false);
  const { scrollY } = useContext(ScrollContext);
  const refContainer = useRef(null);
  let display = "none";
  let width, height, top, right, textOpacity, pointerEvents, transition;

  useEffect(() => {
    const screenH = window.innerHeight;
    const percentY = scrollY / screenH;
    if (!menuVisible) {
      setOpacity(0);
    } else if (percentY > 0.85) {
      setOpacity(Math.max(0, (1 - percentY) * 4));
    } else if (percentY < 0.85) {
      setOpacity(1);
    }
  }, [scrollY, menuVisible]); // might be an issue

  const buttonClick = () => {
    setDisplayed(!displayed);
  };

  if (displayed) {
    width = 160;
    height = 216;
    top = 12;
    right = 16;
    display = "flex";
    textOpacity = 1;
    pointerEvents = undefined;
    transition = undefined;
  } else {
    display = "none";
    textOpacity = 0;
    pointerEvents = "none";
    transition = "none";
  }
  return (
    <>
      <div
        className="fixed flex-row flex items-end justify-end w-full pr-8 top-6 z-[2000]"
        ref={refContainer}
      >
        {!hidden ? (
          <p
            className={`font-light text-xl text-right mr-4 self-center`}
            style={{ opacity }}
          >
            menu
          </p>
        ) : (
          <></>
        )}
        <div>
          <button
            ref={refContainer}
            onClick={buttonClick}
            className="flex items-end justify-end"
          >
            <Image
              src={icon}
              width={30}
              height={30}
              alt="menu hamburger icon"
            />
          </button>
        </div>
      </div>
      <div
        className="top-[18px] z-[1998] right-[26px] fixed w-[42px] h-[42px] bg-stone-200 opacity-70 rounded-lg transition-all duration-500"
        style={{ width, height, top, right }}
      ></div>
      <div
        className="top-4 right-4 pr-4 pl-4 pt-11 pb-4 flex-col fixed rounded-3xl z-[1999] space-y-2"
        style={{
          display: "flex",
          opacity: textOpacity,
        }}
      >
        <Link href="/">
          <a
            className={`text-end text-2xl transition-opacity duration-300 opacity-0 delay-300`}
            style={{
              opacity: textOpacity,
              transition,
              pointerEvents,
            }}
          >
            Home
          </a>
        </Link>

        <Link href="/projects">
          <a
            className="text-end text-2xl transition-opacity duration-300 opacity-0 delay-[0.6s]"
            href=""
            style={{
              opacity: textOpacity,
              transition,
              pointerEvents,
            }}
          >
            Our Projects
          </a>
        </Link>
        <Link href="/merch">
          <a
            className="text-end text-2xl transition-opacity duration-300 opacity-0 delay-[0.9s]"
            href=""
            style={{
              opacity: textOpacity,
              transition,
              pointerEvents,
            }}
          >
            Merch
          </a>
        </Link>
        <Link href="/team">
          <a
            className="text-end text-2xl transition-opacity duration-300 opacity-0 delay-[1.2s]"
            href=""
            style={{
              opacity: textOpacity,
              transition,
              pointerEvents,
            }}
          >
            Our Team
          </a>
        </Link>
      </div>
    </>
  );
}
