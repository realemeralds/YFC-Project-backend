import React, { useEffect, useCallback, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

const CarouselContainer = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    // loop: true,
    skipSnaps: false,
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  const paraRef = useRef(null);
  const [clicked, setClicked] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("clicked") === null) {
      setClicked(false);
    }
  }, []);

  return (
    <div className="w-full flex pt-[2vh] items-center justify-center h-screen flex-col-reverse CarouselContainer">
      <div
        className="embla w-10/12 sm:w-4/5 bg-slate-300 rounded-3xl peer"
        onMouseDown={() => {
          setClicked(true);
          localStorage.setItem("clicked", true);
        }}
      >
        <div className="embla__viewport overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex sm:h-[440px] h-[380px] items-center">
            {/* <div className="embla__slide">
              <div className="embla__slide__inner">
                <div className="h-[500px] w-[90vw] sm:px-8 flex-row items-center justify-center flex">
                  <div className="max-w-[40%] max-h-[500px] lg:block hidden pr-10">
                    <Image
                      src="/cookie.png"
                      layout="intrinsic"
                      width={1000}
                      height={1000}
                      priority
                      alt="cookie icon"
                    />
                  </div>
                  <div className="h-[480px] flex flex-col justify-center flex-grow lg:pl-10 pl-4 -mt-5">
                    <p className="font-futuraLight text-center project:text-[48px] text-4xl mb-3 ">
                      boba and cookies day
                    </p>
                    <p className="font-medium text-center text-xl xsm:text-2xl relative left-5 mb-4">
                      2 September{" "}
                      <span className="inline-block relative rotate-[-30deg] bottom-3 ">
                        📅
                      </span>
                    </p>
                    <p className="text-[20px] tracking-tight leading-tight mb-2 project:block hidden">
                      Want to buy something special for your teachers and
                      friends? Well we have the perfect gift for you!
                    </p>
                    <p className="text-[20px] tracking-tight leading-tight">
                      Project Vanguard will be selling boba, cookies and other
                      items on <b>2 September!</b>{" "}
                      <span className="xsm:inline-block hidden my-2 xsm:mb-2 ">
                        The goods are in <u>limited stock</u>, so do check your
                        email for confirmation and collection details!
                      </span>{" "}
                    </p>
                    <i>Check back here soon for the order form!</i>
                    <a>
                      <button className="bg-white rounded-3xl items-start px-6 py-3 project:w-[80%] w-full mt-3 hidden">
                        <p className="text-start text-xl sm:text-2xl text-firstAccent font-medium mb-1">
                          → link to google form
                        </p>
                        <p className="text-start font-light tracking-tight text-sm leading-[1.15]">
                          All proceeds will go to the Dyslexia{" "}
                          <span className="xsm:block hidden"></span>
                          Association of Singapore (DAS)
                        </p>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="embla__slide relative">
              <div className="embla__slide__inner">
                <div className="h-[500px] w-[90vw] sm:px-8 pt-5 flex-row items-center justify-center flex">
                  <div className="max-w-[48%] max-h-[500px] md:block hidden">
                    <Image
                      src="/clay_edited.png"
                      layout="intrinsic"
                      width={1000}
                      height={1000}
                      alt="hands moulding clay"
                    />
                  </div>
                  <div className="h-[480px] flex flex-col justify-center flex-grow md:pl-10 pl-3 -mt-5">
                    <p className="font-futuraLight text-center text-4xl xsm:text-[48px] mb-3">
                      clay workshop
                    </p>
                    <p className="font-medium text-center text-xl xsm:text-2xl relative left-3 mb-4">
                      13th August{" "}
                      <span className="relative rotate-[-30deg] bottom-3 inline-block">
                        📅
                      </span>
                    </p>
                    <p className="xsm:text-[20px] text-[19px] tracking-tight leading-tight mb-3">
                      Our Clay Workshop, happening on <b>August 13th,</b> will
                      give dyslexic youth the opportunity to{" "}
                      <u>express their creative talent</u> through sculpting, a
                      non-writing medium.
                    </p>
                    <p className="xsm:text-[20px] text-[19px] tracking-tight leading-tight">
                      Participants will learn to manipulate clay in small groups{" "}
                      <u>alongside their parents or guardians,</u> who are also
                      welcome to attend.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="embla__slide relative">
              <div className="embla__slide__inner">
                <div className="h-[500px] w-[90vw] sm:px-8 px-0 pt-5 sm:flex-row flex-col items-center justify-center flex">
                  <div className="max-w-[40%] max-h-[500px] lg:block hidden pr-10">
                    <Image
                      src="/Football.png"
                      layout="intrinsic"
                      width={1598}
                      height={1598}
                      alt="a football (the right kind)"
                    />
                  </div>
                  <div className="h-[480px] flex flex-col justify-center flex-grow lg:pl-8 pl-2 -mt-5 -mr-3">
                    <p className="font-futuraLight text-center text-4xl project:text-[48px] mb-3">
                      football match
                    </p>
                    <p className="font-medium text-center text-[20px] project:text-2xl relative project:left-4 -mt-1 mb-2 xsm:mb-4">
                      24th July{" "}
                      <span className="relative rotate-[-30deg] bottom-3 inline-block">
                        📅
                      </span>
                    </p>
                    <p className="xsm:text-[20px] text-[19px] tracking-tight leading-tight mb-4 sm:inline-block hidden">
                      At the upcoming Lion City Sailors vs Tampines Rovers match
                      on <b>July 24th</b>, we will be setting up a booth!
                    </p>
                    <p className="xsm:text-[20px] text-[19px] tracking-tight leading-tight">
                      <span className="sm:hidden inline-block pr-4">
                        During the upcoming match between Lion City Sailors and
                        Tampines Rovers, we will be selling merch and having a
                        board to showcase our programs.
                      </span>{" "}
                      <span className="sm:hidden inline-block pr-4 mt-2 xsm:mt-0">
                        <u>All proceeds</u> from the ticket sales to the match{" "}
                        <u>will be donated to DAS.</u>
                      </span>
                      <span className="sm:inline-block hidden pr-4">
                        We will be selling merch and having a board to showcase
                        our programs, and <u>all proceeds</u> from the ticket
                        sales to the match <u>will be donated to DAS.</u>
                      </span>
                    </p>
                    {/* <a href="https://www.sistic.com.sg/events/lcs2022"> */}
                    <button
                      className="bg-stone-200 rounded-3xl items-start px-6 py-3 project:w-[80%] mt-5"
                      disabled
                    >
                      <p className="text-start text-xl sm:text-2xl text-firstAccent font-medium mb-1">
                        <strike> → buy tickets from sistic</strike>
                      </p>
                      <p className="text-start font-light tracking-tight text-sm leading-[1.15]">
                        sadly, the match day has passed :(
                      </p>
                    </button>
                    {/* </a> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="embla__slide relative">
              <div className="embla__slide__inner">
                <div className="h-[500px] w-[90vw] sm:px-8 px-0 pt-5 sm:flex-row flex-col items-center justify-center flex">
                  <div className="max-w-[40%] max-h-[500px] lg:block hidden pr-10">
                    <Image
                      src="/guitar.png"
                      layout="intrinsic"
                      width={1598}
                      height={1396}
                      alt="an acoustic guitar"
                    />
                  </div>
                  <div className="h-[480px] flex flex-col justify-center flex-grow lg:pl-8 pl-2 -mt-5 lg:-mr-3 ">
                    <p className="font-futuraLight text-center text-4xl project:text-[48px] mb-2">
                      busking
                    </p>
                    <p className="font-medium text-center text-[20px] project:text-2xl relative project:left-4 -mt-1">
                      25th, 26th and 28th July{" "}
                      <span className="relative rotate-[-30deg] bottom-3 project:inline-block hidden">
                        📅
                      </span>
                    </p>
                    <p className="font-medium text-center text-[20px] project:text-2xl relative mb-4">
                      20th August
                    </p>
                    <p className="xsm:text-[20px] text-[18px] tracking-tight leading-tight mb-3">
                      If you are a student from St. Joseph’s Institution (SJI),
                      come down for our <u>in-school busking sessions</u> held
                      on <b>July 25th, 26th, and 28th.</b>
                    </p>
                    <p className="xsm:text-[20px] text-[18px] tracking-tight leading-tight mb-3">
                      Our student bands have been practising hard, and are
                      passionate to showcase their musical talent for a worthy
                      cause.
                    </p>
                    <p className="text-[20px] tracking-tight leading-tight project:block hidden">
                      Consider donating if you enjoy their music!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="embla__slide relative">
              <div className="embla__slide__inner">
                <div className="h-[500px] w-[90vw] sm:px-8 px-0 pt-5 sm:flex-row flex-col items-center justify-center flex">
                  <div className="max-w-[40%] max-h-[500px] lg:block hidden pr-10">
                    <Image
                      src="/camera.png"
                      layout="intrinsic"
                      width={4620}
                      height={3100}
                      alt="a football (the right kind)"
                    />
                  </div>
                  <div className="h-[480px] flex flex-col justify-center flex-grow lg:pl-8 pl-2 -mt-5 -mr-3">
                    <p className="font-futuraLight text-center text-4xl project:text-[48px] mb-3">
                      video series
                    </p>
                    <p className="font-medium text-center text-[20px] project:text-2xl relative project:left-4 -mt-1 mb-4">
                      5th September{" "}
                      <span className="relative rotate-[-30deg] bottom-3 inline-block">
                        📅
                      </span>
                    </p>
                    <p className="xsm:text-[20px] text-[18px] tracking-tight leading-tight mb-4 mx-4">
                      Premiering on <b>5 September</b>, this video series is
                      aimed to inform and educate the public about dyslexia, so
                      as to debunk stereotypes about dyslexia and raise
                      awareness about dyslexia (as well as the issues dyslexics
                      face).
                    </p>
                    <p className="xsm:text-[20px] text-[18px] tracking-tight leading-tight mb-4 mx-4 hidden xsm:block">
                      We will be releasing informational videos where we debunk
                      stereotypes, as well as videos interviewing specialists
                      from DAS. Additionally, we have a rap video (!) about
                      dyslexia.
                    </p>
                    <a href="https://www.youtube.com/channel/UCfycy0CegyPHXTHACnpXWdA/">
                      <button className="bg-white rounded-3xl items-start px-6 py-3 project:w-[80%]">
                        <p className="text-start text-xl sm:text-2xl text-firstAccent font-medium hover:translate-x-2 transition-all duration-300">
                          → check out the series!
                        </p>
                        <p className="text-start font-light tracking-tight text-sm leading-[1.15]"></p>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
      <p
        ref={paraRef}
        className="opacity-100 transition-opacity delay-200 duration-700 sm:text-2xl text-center text-lg font-medium mb-3 leading-[1.1]"
        style={{ opacity: clicked ? "0" : "1" }}
      >
        click and drag on the <br className="sm:hidden block" /> carousel to
        browse events!
      </p>
    </div>
  );
};

export const DotButton = ({ selected, onClick }) => (
  <button
    className={`embla__dot ${selected ? "is-selected" : ""}`}
    type="button"
    onClick={onClick}
  />
);

export const PrevButton = ({ enabled, onClick }) => (
  <button
    className="embla__button embla__button--prev sm:block hidden"
    onClick={onClick}
    disabled={!enabled}
  >
    <svg className="embla__button__svg" viewBox="137.718 -1.001 366.563 644">
      <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
    </svg>
  </button>
);

export const NextButton = ({ enabled, onClick }) => (
  <button
    className="embla__button embla__button--next sm:block hidden"
    onClick={onClick}
    disabled={!enabled}
  >
    <svg className="embla__button__svg" viewBox="0 0 238.003 238.003">
      <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
    </svg>
  </button>
);

export default CarouselContainer;
