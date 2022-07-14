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
      <div className="w-full mx-24 pt-10 lg:pt-0 px-10 md:px-0">{children}</div>
    </div>
  );
};

export const ChangingText = ({ progress }) => {
  const paraRef = useRef(null);
  const text = `Everyday tasks are excruciatingly frustrating, with text being
  substituted, reversed, inserted, omitted and even combined, 
  at the same time. Even dyslexics who
  can read decently well may experience severe headaches minutes into
  reading.`;
  let displayedWords = text.split(/\s+/);
  let originalWords = text.split(/\s+/);
  let changeCheck = [];
  let running = 0;
  let dict = "qwertyuiopasdfghjklzxcvbnm";
  let para;
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    for (var i = 0; i < displayedWords.length; i++) {
      changeCheck.push(false);
    }
    console.log(displayedWords);
    messUpWords();
  }, []);

  useEffect(() => {
    console.log(progress);
  }, [progress]);

  useEffect(() => {
    // if (paraRef && running < 1) {
    //   para = paraRef.current;
    //   // messUpWords(para);
    //   running += 1;
    //   console.log(`running: ${running}`);
    // }
  }, [paraRef]);

  useEffect(() => {
    console.log(paused);
  }, [paused]);

  function messUpWord(p, index, mode = getRandomInt(5) + 1) {
    if (changeCheck.includes(index)) {
      displayedWords[index] = originalWords[index];
      // console.log(`reverted ${displayedWords[index]}`);
      changeCheck.splice(changeCheck.indexOf(index), 1);
      p.innerHTML = displayedWords.join(" ");
      return;
    }

    let displayedWord = displayedWords[index];
    if (!displayedWord) {
      console.log("uh oh"); // TODO: remove
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
      // substitution (1) or omission (2) or insertion (3)
      let randomIndex = getRandomInt(displayedWord.length - 1) + 1; // keep the front
      let before = displayedWord.slice(0, randomIndex);
      let after = displayedWord.slice(randomIndex + 1);
      if (mode === 3) {
        after = displayedWord.slice(randomIndex);
      }
      // console.log(`original: ${displayedWord}`);
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

      // console.log(`final: ${displayedWord}, ${mode}`);
    } else if (mode === 4) {
      displayedWord =
        displayedWord
          .split("")
          .reverse()
          .join("")
          .replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, "") + punctuation;
    } else if (mode === 5) {
      let wordArray = displayedWord.split("");
      let randomIndex = getRandomInt(displayedWord.length - 2) + 1;
      let temp = wordArray[randomIndex + 1];
      wordArray[randomIndex + 1] = wordArray[randomIndex];
      wordArray[randomIndex] = temp;
      displayedWord =
        wordArray.join("").replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, "") +
        punctuation;
    }
    displayedWords[index] = displayedWord;
    p.innerHTML = displayedWords.join(" ");
    changeCheck.push(index);
  }

  function messUpWords() {
    if (!paraRef.current || paused) return;
    para = paraRef.current;
    // console.log("messing up words");
    if (para) {
      if (running > 1) {
        return;
      }
      for (var i = 0; i < displayedWords.length; i++) {
        if (Math.random() < 0.1) messUpWord(para, i);
      }
      // console.log(running);
      // console.log(paused);
      setTimeout(messUpWords, 1000);
    }
  }

  function resetWords() {
    if (!paraRef.current) return;
    para = paraRef.current;
    displayedWords = originalWords;
    para.innerHTML = displayedWords.join(" ");
    changeCheck = [];
    console.log("words reset");
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  return (
    <>
      <div className="p-7 bg-thirdAccent flex justify-center items-center flex-col rounded-3xl z-[3000]">
        <p ref={paraRef} className="text-3xl">
          Everyday tasks are excruciatingly frustrating, with text being
          substituted, reversed, inserted, omitted and even combined, at the
          same time. Even dyslexics who can read decently well may experience
          severe headaches minutes into reading.
        </p>
      </div>
      <div className="space-x-4 flex justify-center align-center z-[2999]">
        <button
          onClick={() => {
            setPaused(!paused);
          }}
          className="bg-secondary text-white text-xl font-medium px-5 py-3 rounded-3xl"
        >
          PAUSE
        </button>
        <button
          onClick={resetWords}
          className="bg-secondary text-white text-xl font-medium px-5 py-3 rounded-3xl relative z-[3000]"
        >
          RESET
        </button>
      </div>
    </>
  );
};
