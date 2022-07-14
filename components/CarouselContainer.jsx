import React, { useEffect, useCallback, useState } from "react";
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

  return (
    <div className="w-full flex pt-[5vh] items-center justify-center h-screen">
      <div className="embla w-4/5 bg-slate-300 rounded-3xl">
        <div class="embla__viewport overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex h-[420px] items-center">
            <div className="embla__slide">
              <div className="embla__slide__inner">
                <div className="h-[500px] w-[80vw] px-8 flex-row items-center justify-center flex">
                  <div className="max-w-[40%] max-h-[500px] lg:block hidden">
                    <Image
                      src="/cookie.png"
                      layout="intrinsic"
                      width={1000}
                      height={1000}
                    />
                  </div>
                  <div className="h-[480px] flex flex-col justify-center flex-grow lg:pl-10 pl-4 -mt-5">
                    <p className="font-futuraLight text-center project:text-[48px] mb-3 text-4xl">
                      boba and cookies day
                    </p>
                    <p className="font-medium text-center text-2xl relative twoxsm:left-5 mb-4">
                      11 - 12th August{" "}
                      <span className="twoxsm:inline-block hidden relative rotate-[-30deg] bottom-3 ">
                        📅
                      </span>
                    </p>
                    <p className="text-[20px] tracking-tight leading-tight mb-3 project:block hidden">
                      There are many foods students love, but they are sadly not
                      sold in SJI :(
                    </p>
                    <p className="text-[20px] tracking-tight leading-tight">
                      <span className="project:block hidden">Thankfully,</span>{" "}
                      Project Vanguard will be selling [item 1], [item 2] and
                      [item 3] on <b>August 11th and 12th!</b>{" "}
                      <span className="xsm:block hidden">
                        Place an order with the link below by <b>August 7th</b>,
                        and food will be delivered <u>right to your class.</u>
                      </span>{" "}
                    </p>
                    <button className="bg-white rounded-3xl items-start px-6 py-3 project:w-[80%] w-full mt-5">
                      <p className="text-start text-2xl text-firstAccent font-medium mb-1">
                        Link to Google Form →
                      </p>
                      <p className="text-start font-light tracking-tight text-sm leading-[1.15]">
                        All proceeds will go to the Dyslexia{" "}
                        <span className="xsm:block hidden"></span>
                        Association of Singapore (DAS)
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="embla__slide relative">
              <div className="embla__slide__inner">
                <div className="h-[500px] w-[80vw] px-8 pt-5 flex-row items-center justify-center flex">
                  <div className="max-w-[48%] max-h-[500px] md:block hidden">
                    <Image
                      src="/clay_edited.png"
                      layout="intrinsic"
                      width={1000}
                      height={1000}
                    />
                  </div>
                  <div className="h-[480px] flex flex-col justify-center flex-grow md:pl-10 pl-3 -mt-5">
                    <p className="font-futuraLight text-center text-3xl xsm:text-[48px] mb-3">
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
                <div className="h-[500px] w-[80vw] px-12 pt-5 flex-row items-center justify-center flex">
                  <div className="max-w-[40%] max-h-[500px] lg:block hidden">
                    <Image
                      src="/guitar.png"
                      layout="intrinsic"
                      width={1598}
                      height={1396}
                    />
                  </div>
                  <div className="h-[480px] flex flex-col justify-center flex-grow lg:pl-8 pl-2 -mt-5 -mr-3">
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
                    <p className="xsm:text-[20px] text-[16px] tracking-tight leading-tight mb-3">
                      If you are a student from St. Joseph’s Institution (SJI),
                      come down for our <u>in-school busking sessions</u> held
                      on July <b>25th, 26th, and 28th.</b>
                    </p>
                    <p className="xsm:text-[20px] text-[17px] tracking-tight leading-tight mb-3">
                      <span className="xsm:block hidden">
                        Our student bands have been practising hard, and are
                        passionate to showcase their musical talent for a worthy
                        cause.
                      </span>
                      The <u>set list includes:</u> [epic song 1 by someone],
                      [epic song 2 by someone] and [epic song 3 by someone]
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
                <h1 className="text-6xl leading-tight">Coming soon!</h1>
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
    className="embla__button embla__button--prev"
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
    className="embla__button embla__button--next"
    onClick={onClick}
    disabled={!enabled}
  >
    <svg className="embla__button__svg" viewBox="0 0 238.003 238.003">
      <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
    </svg>
  </button>
);

export default CarouselContainer;
