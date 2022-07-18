import Image from "next/image";
import { Parallax } from "react-scroll-parallax";

import styles from "../styles/Parallax.module.css";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export const Solution = () => {
  const divContainer = useRef(null);
  const mdMinWidth = 768;
  const [mdBroken, setMdBroken] = useState(false);
  let elContainer;
  let lastOffsetTop;
  let lastOffsetHeight;
  let lastBottom = 1300;
  let height;
  const [clicked, setClicked] = useState(true);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();
    if (localStorage.getItem("cards") === null) {
      setClicked(false);
    }

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (divContainer) elContainer = divContainer.current;
    handleWindowResize();
  }, [divContainer]);

  const handleWindowResize = () => {
    if (!elContainer) return;
    lastOffsetTop = elContainer.offsetTop;
    lastOffsetHeight = elContainer.offsetHeight;
    // console.log("!!", lastOffsetTop, lastOffsetHeight);
    lastBottom = lastOffsetHeight + lastOffsetTop + 1000;
    // console.log("!!", lastBottom);
    if (window.innerWidth < mdMinWidth) {
      setMdBroken(true);
      height = lastBottom;
    } else {
      setMdBroken(false);
      height = 2400;
    }
  };

  const paraRef = useRef(null);

  return (
    <>
      <div
        className={`bg-slate-100 relative min-h-max md:h-[2400px] z-0 overflow-hidden flex flex-col`}
        style={{ height }}
        onMouseDown={() => {
          setClicked(true);
          localStorage.setItem("cards", true);
        }}
      >
        <Parallax
          speed={5}
          rootMargin={{ top: -350, right: 0, bottom: 536, left: 0 }}
          disabled={mdBroken}
        >
          <div className="block mt-6 md:absolute md:w-[750px] w-[80vw] mx-[10vw] p-5 md:p-8 pr-6 md:pr-12 bg-cardBG rounded-[30px] border border-black md:left-24 md:top-[300px] shadow-cards hover:cards-rotation hover:shadow-xl hover:shadow-[rgba(0,0,0,0.3)] transition-all duration-300">
            <div className="border-l-black border-l-[3px] md:border-l-[5px] pl-4 pt-1 pb-2 pr-4">
              <p className="md:text-[40px] text-2xl font-regular text-start mb-2 leading-tight">
                What are we doing?
              </p>
              <p className="md:text-[28px] text-md font-regular text-start leading-tight tracking-tight ">
                With the help of the Dyslexia Association of Singapore (
                <b>DAS</b>
                ), <b>Project Prima Signa</b> aims to debunk harmful stereotypes
                about dyslexia, secure funding for DAS programs and ultimately,{" "}
                <span className="underline underline-offset-2">
                  create a more inclusive society.
                </span>
              </p>
            </div>
          </div>
        </Parallax>
        <Parallax
          speed={20}
          rootMargin={{ top: -500, right: 0, bottom: 434, left: 0 }}
          disabled={mdBroken}
        >
          <div className="w-[calc(26vw+20px)] right-8 xl:right-24 max-w-96 md:top-[300px] absolute hidden lg:block">
            <Image
              width={459}
              height={400}
              layout="intrinsic"
              src="/das logo.png"
              alt="Dylesxia Association of Singapore logo"
            />
          </div>
        </Parallax>
        <Parallax
          speed={12}
          rootMargin={{ top: -820, right: 0, bottom: 1080, left: 0 }}
          // onEnter={() => console.log("entered")}
          disabled={mdBroken}
        >
          <div className="block mt-10 md:translate-y-0 md:absolute md:w-[660px] w-[80vw] mx-[10vw] p-5 md:p-8 pr-4 md:pr-8 bg-cardBG pl-0 rounded-[30px] border border-black md:right-40 md:top-[700px] shadow-cards hover:-cards-rotation hover:shadow-xl hover:shadow-[rgba(0,0,0,0.3)] transition-all duration-300">
            <div className="border-r-black border-r-[3px] sm:border-r-[5px] pr-5 sm:pr-6 pt-1 pb-2 pl-5">
              <p className="md:text-[40px] text-2xl font-regular text-end mb-3 leading-tight">
                <b>(1)</b> On stereotypes:
              </p>
              <p className="md:text-[28px] text-md font-regular text-end leading-tight tracking-tight md:pl-12 pl-6 mb-3 md:mb-5">
                Stereotypes can be deterimental to creating an inclusive
                society, where people are{" "}
                <span className="underline underline-offset-2">
                  free of labelling from misunderstood challenges.
                </span>
              </p>
              <p className="md:text-[28px] text-md font-regular text-end leading-tight tracking-tight mb-4">
                We aim to raise awareness and debunk these through our{" "}
                <span className="underline underline-offset-2">
                  video series
                </span>{" "}
                and{" "}
                <span className="underline underline-offset-2">
                  Instagram page.
                </span>
              </p>
              <a href="#">
                <p className="md:text-3xl text-xl text-link text-right font-light hover:translate-x-4 duration-300">
                  {" "}
                  → video series
                </p>
              </a>
              <a href="https://www.instagram.com/projprima/">
                <p className="md:text-3xl text-xl text-link text-right font-light hover:translate-x-4 duration-300">
                  {" "}
                  → insta page! (@projprima)
                </p>
              </a>
            </div>
          </div>
        </Parallax>
        <Parallax
          speed={20}
          rootMargin={{ top: -950, right: 0, bottom: 970, left: 0 }}
          disabled={mdBroken}
        >
          <div className="w-[calc(23vw+20px)] max-w-[400px] left-8 xl:left-24 md:top-[750px] absolute hidden lg:block">
            <Image
              width={400}
              height={400}
              layout="intrinsic"
              src="/studying.png"
              alt="photo of kid studying"
            />
          </div>
        </Parallax>

        <Parallax
          speed={7}
          rootMargin={{ top: -1350, right: 0, bottom: 1630, left: 0 }}
          // onEnter={() => console.log("entered")}
          disabled={mdBroken}
        >
          <div className="block mt-10 md:translate-y-0 md:absolute md:w-[750px] w-[80vw] mx-[10vw] p-5 md:p-8 pr-6 md:pr-12 bg-cardBG rounded-[30px] border border-black md:left-0 md:top-[1300px] shadow-cards hover:cards-rotation hover:shadow-xl hover:shadow-[rgba(0,0,0,0.3)] transition-all duration-300">
            <div className="border-l-black sm:border-l-[5px] border-l-[3px] pl-4 pt-1 pb-2 pr-4">
              <p className="md:text-[40px] text-2xl font-regular text-start mb-2 leading-tight">
                <b>(2)</b> Raising funds
              </p>
              <p className="md:text-[28px] text-md font-regular text-start leading-tight tracking-tight mb-3">
                We aim to raise funds for invaluable DAS programs through our
                engaging projects.
              </p>
              <p className="md:text-[28px] text-md font-regular text-start leading-tight tracking-tight mb-4">
                These include{" "}
                <span className="underline underline-offset-2">busking</span>,{" "}
                <span className="underline underline-offset-2">
                  a boba and cookies day
                </span>
                ,{" "}
                <span className="underline underline-offset-2">
                  custom-made merchandise
                </span>{" "}
                and{" "}
                <span className="underline underline-offset-2">
                  a soccer match!
                </span>
              </p>
              <Link href="/projects">
                <a>
                  <p className="md:text-3xl text-xl text-link text-left font-light hover:translate-x-4 duration-300">
                    {" "}
                    → more details on projects!
                  </p>
                </a>
              </Link>
              <Link href="/merch">
                <a>
                  <p className="md:text-3xl text-xl text-link text-left font-light hover:translate-x-4 duration-300">
                    {" "}
                    → check out our merch!
                  </p>
                </a>
              </Link>
            </div>
          </div>
        </Parallax>
        <Parallax
          speed={20}
          rootMargin={{ top: -1450, right: 0, bottom: 1530, left: 0 }}
        >
          <div className="w-[calc(26vw+20px)] right-8 xl:right-24 max-w-96 md:top-[1300px]  absolute hidden lg:block">
            <Image
              width={400}
              height={400}
              layout="intrinsic"
              src="/donating.png"
              alt="kid donating money"
            />
          </div>
        </Parallax>

        <div
          ref={divContainer}
          className="block mt-10 md:translate-y-0 md:absolute md:w-[660px] w-[80vw] mx-[10vw] p-5 md:p-8 pr-4 md:pr-8 bg-cardBG pl-0 rounded-[30px] border border-black md:right-8 md:top-[1800px] shadow-cards hover:-cards-rotation hover:shadow-xl hover:shadow-[rgba(0,0,0,0.3)] transition-all duration-300 mb-6"
        >
          <div className="border-r-black border-r-[3px] sm:border-r-[5px] pr-6 pt-1 pb-2 sm:pl-0 pl-4">
            <p className="md:text-[40px] text-2xl font-regular text-end mb-3 leading-tight">
              <b>(3)</b> Programs for dyslexic youths:
            </p>
            <p className="md:text-[28px] text-md font-regular text-end leading-tight tracking-tight md:pl-12 pl-6 mb-3 md:mb-5">
              We are also organising a clay workshop of our own to encourage
              creativity amongst dyslexic youth!
            </p>
            <p className="md:text-[28px] text-md font-regular text-end leading-tight tracking-tight pl-6">
              Through this, we hope to provide youths with the opportunity to
              express their creative talent through sculpting, a non-writing
              medium.
            </p>
          </div>
        </div>
        <Parallax
          speed={20}
          rootMargin={{ top: -2000, right: 0, bottom: 2080, left: 0 }}
          disabled={mdBroken}
        >
          <div className="w-[calc(23vw+20px)] max-w-[400px] left-8 xl:left-40 md:top-[1850px] absolute hidden lg:block">
            <Image
              width={400}
              height={400}
              layout="intrinsic"
              src="/reading.png"
              alt="photo of kid reading"
            />
          </div>
        </Parallax>
        <p
          className="opacity-100 transition-opacity delay-200 duration-700 sm:text-3xl text-2xl font-semibold leading-[1.1] text-center mt-3 peer order-[-1] sm:hidden block"
          ref={paraRef}
          style={{ opacity: clicked ? "0" : "1" }}
        >
          click and interact with the cards!
        </p>
      </div>
    </>
  );
};

export default Solution;
