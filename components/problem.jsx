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
      className="flex flex-grow w-full lg:items-center justify-center h-screen"
      style={{ transform: `translateY(${translateY}px)` }}
    >
      <div className="w-full mx-24 pt-10 lg:pt-0 px-10 md:px-0">{children}</div>
    </div>
  );
};

export const ChangingText = () => {
  const paraRef = useRef(null);
  const text = `Everyday tasks are excruciatingly frustrating, with text being
  substituted, reversed, inserted, omitted and even combined, 
  at the same time. Even dyslexics who
  can read decently well may experience severe headache minutes into
  reading.`;
  let displayedWords = text.split(/\s+/);
  let originalWords = text.split(/\s+/);
  let changeCheck = [];
  let running = 0;
  let dict = "qwertyuiopasdfghjklzxcvbnm";
  let para;

  useEffect(() => {
    for (var i = 0; i < displayedWords.length; i++) {
      changeCheck.push(false);
      console.log("triggered", i);
    }
    console.log(displayedWords);
    messUpWord(getRandomInt(displayedWords.length));
    messUpWord(getRandomInt(displayedWords.length), 4);
    messUpWord(getRandomInt(displayedWords.length), 4);
    messUpWord(getRandomInt(displayedWords.length), 4);
    messUpWord(getRandomInt(displayedWords.length), 4);
    messUpWord(getRandomInt(displayedWords.length), 4);
    messUpWord(getRandomInt(displayedWords.length), 4);
    messUpWord(getRandomInt(displayedWords.length), 4);
    messUpWord(getRandomInt(displayedWords.length), 4);
  }, []);

  useEffect(() => {
    if (paraRef && running < 1) {
      para = paraRef.current;
      messUpWords(para);
      running += 1;
      console.log(`running: ${running}`);
    }
  }, [paraRef]);

  /*one
  petty to pretty (insertion) 3
  saw to was (reversal)
  
  two
  fog to dog (substitution) 1
  plain to pain (omission) 2
  swapping of positions 
  Substitution of vowels (a e i o u) */

  function messUpWord(index, mode = getRandomInt(2) + 1) {
    let displayedWord = displayedWords[index];
    if (!displayedWord) {
      console.log("returning");
      return;
    }
    let punctuation = "";
    if (changeCheck.includes(index)) {
      displayedWord = originalWords[index];
      return;
    }
    if (displayedWord.includes(",")) {
      punctuation = ",";
    } else if (displayedWord.includes(".")) {
      punctuation = ".";
    }
    let randomChar = dict.charAt(getRandomInt(26));
    if (mode === 1 || mode === 2 || mode === 3) {
      // substitution or omission
      let randomIndex = getRandomInt(displayedWord.length - 1) + 1; // keep the front
      let before = displayedWord.slice(0, randomIndex);
      let after = displayedWord.slice(randomIndex + 1);
      if (mode === 3) {
        after = displayedWord.slice(randomIndex);
      }
      console.log(`original: ${displayedWord}`);
      mode === 2
        ? (displayedWord =
            before +
            after.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, "") +
            punctuation)
        : (displayedWord =
            before +
            randomChar +
            after.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, "") +
            punctuation);

      console.log(`final: ${displayedWord}, ${mode}`);
    } else if (mode == 4) {
      displayedWord =
        displayedWord
          .split("")
          .reverse()
          .join("")
          .replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, "") + punctuation;
    }

    displayedWords[index] = displayedWord;
    console.log(displayedWords);
  }

  function messUpWords(p) {
    console.log("messing up words");
    if (p) {
      if (running > 1) {
        return;
      }
      for (var i = 0; i < displayedWords.length && Math.random() < 0.1; i++) {
        messUpFunctionArray[getRandomInt(messUpFunctionArray.length)](i);
      }
      p.innerHTML = displayedWords.join(" ");
      console.log(running);
      // setTimeout(messUpWords(p), 1000);
    }
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  return (
    <>
      <div className="p-7 bg-thirdAccent flex justify-center items-center flex-col rounded-3xl">
        <p ref={paraRef} className="text-3xl">
          Everyday tasks are excruciatingly frustrating, with text being
          substituted, reversed, inserted, omitted and even combined, at the
          same time. Even dyslexics who can read decently well may experience
          severe headaches minutes into reading.
        </p>
      </div>
      <div className="space-x-4 flex justify-center align-center">
        <div className="bg-secondary text-white text-xl font-medium px-5 py-3 rounded-3xl">
          PAUSE
        </div>
        <div className="bg-secondary text-white text-xl font-medium px-5 py-3 rounded-3xl">
          RESET
        </div>
      </div>
    </>
  );
};
