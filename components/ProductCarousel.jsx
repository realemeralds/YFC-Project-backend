import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "../styles/Merch.module.css";
import Image from "next/image";

const ProductCarousel = ({ slides, i }) => {
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
  // const [scrollSnaps, setScrollSnaps] = useState([]);
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: "keepSnaps",
    selectedClass: "",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!embla || !emblaThumbs) return;
      if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
    },
    [embla, emblaThumbs]
  );

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
    emblaThumbs.scrollTo(embla.selectedScrollSnap());
  }, [embla, emblaThumbs, setSelectedIndex]);

  const scrollPrev = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [emblaThumbs]);

  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [emblaThumbs]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
  }, [embla, onSelect]);

  const sourceArray = [
    [
      "/editedStickerA.png",
      "/setB_1.png",
      "/setB_2.png",
      "/setB_3.png",
      "/setB_4.png",
      "/setB_5.png",
      "/setB_6.png",
    ],
    [
      "/editedStickerB.png",
      "/setA_1.png",
      "/setA_2.png",
      "/setA_3.png",
      "/setA_4.png",
      "/setA_5.png",
      "/setA_6.png",
    ],
    [
      "/setB_1.png",
      "/setB_2.png",
      "/setB_3.png",
      "/setB_4.png",
      "/setB_5.png",
      "/setB_6.png",
      "/setA_1.png",
      "/setA_2.png",
      "/setA_3.png",
      "/setA_4.png",
      "/setA_5.png",
      "/setA_6.png",
    ],
  ];

  return (
    <div className="ProductCarousel">
      <div className="embla w-64 sm:w-96">
        <div className="embla__viewport" ref={mainViewportRef}>
          <div className="embla__container">
            {slides.map((index) => (
              <div className="embla__slide relative" key={index}>
                <div
                  className={`rounded-[50px] px-8 sm:py-7 sm:mb-4 sm:px-12 sm:mx-8 mx-auto sm:ml-11 ${styles.radialGradient} box-content max-h-[170px] max-w-[170px] sm:max-h-[200px] sm:max-w-[200px]`}
                >
                  <Image
                    src={
                      i === 3
                        ? sourceArray[0][index]
                        : 1 === 5
                        ? sourceArray[1][index]
                        : sourceArray[2][index]
                    }
                    layout="responsive"
                    height={180}
                    width={180}
                    className="max-h-[200px] max-w-[200px]"
                    alt={"epic"}
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      </div>
      <div className="embla embla--thumb px-5 -mt-0 sm:-mt-3">
        <div className="embla__viewport" ref={thumbViewportRef}>
          <div className="embla__container embla__container--thumb">
            {slides.map((index) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                imgSrc={
                  i === 3
                    ? sourceArray[0][index]
                    : 1 === 5
                    ? sourceArray[1][index]
                    : sourceArray[2][index]
                }
                key={index}
                className="border-4 border-black"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Thumb = ({ selected, onClick, imgSrc }) => (
  <div
    className={`embla__slide embla__slide--thumb ${
      selected ? "is-selected" : ""
    }`}
  >
    <button
      onClick={onClick}
      className="embla__slide__inner embla__slide__inner--thumb"
      type="button"
    >
      <Image
        alt="thumbnail image"
        className="embla__slide__thumbnail"
        src={imgSrc}
        layout="fill"
        objectFit="contain"
        priority
      />
    </button>
  </div>
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

export default ProductCarousel;
