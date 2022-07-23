import React, { useRef, useEffect, useState, useContext } from "react";

import Modal from "../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faL, faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

import styles from "../styles/Canvas.module.css";

import { io } from "socket.io-client";

const backendURL = "wss://yfc-backend.herokuapp.com";

export default function Canvas() {
  // Define the references to key elements
  const mainCanvasRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const breakButtonRef = useRef(null);
  const cancelButtonRef = useRef(null);
  const imgRef = useRef(null);

  // Socket ref for backend implementation
  let socket = useRef("");
  // clearRectArray, for all broken squares
  const [clearRectArray, setClearRectArray] = useState([]);
  const [compareRectArray, setCompareRectArray] = useState([]);
  let tempArray = [];

  // States to store the canvases + contexts, as their refs are filled
  let contextSet = false;
  const [canvas, setCanvas] = useState();
  const [canvas2, setCanvas2] = useState();
  const [overlayCanvas, setOverlayCanvas] = useState();
  const [particleCanvas, setParticleCanvas] = useState();
  const [ctx, setCtx] = useState();
  const [ctx2, setCtx2] = useState();
  const [overlayContext, setOverlayContext] = useState();
  const [particleContext, setParticleContext] = useState();

  // Function + variable to load the image
  const [imgLoad, setImgLoad] = useState();

  // Changed, to trigger a canvas repaint
  const [changed, setChanged] = useState(false);
  let ix, iy;
  const [animateUpdate, setAnimateUpdate] = useState();
  let triggered;

  // Countdown implementation
  const [countdownText, setCountdownText] = useState("loading...");
  const [canvasDisabled, setCanvasDisabled] = useState(false);
  const [mousedown, onMousedown] = useState(false);
  let breakButton, cancelButton;

  // Array for animated particles
  let particleArray;

  // key variables
  const width = 1002;
  const height = 802;
  const countdownDuration = 5;

  // Overlay square position
  var overlaypos = {
    x: undefined,
    y: undefined,
  };

  // selected square position
  var selectpos = {
    x: undefined,
    y: undefined,
  };

  // effect to do countdown recursion
  useEffect(() => {
    let min, sec;
    function countdown(n) {
      if (n === 0) {
        setCountdownText("ready!");
        setCanvasDisabled(false);
        return;
      }
      min = Math.floor(n / 60);
      sec = n % 60;
      if (sec.toString().length < 2) sec = "0" + sec;
      setCountdownText(`${min}:${sec}`);
      setTimeout(() => {
        countdown(n - 1);
      }, 1000);
    }
    if (!canvasDisabled) return;
    countdown(countdownDuration);
  }, [canvasDisabled]);

  // Get canvases from refs
  useEffect(() => {
    setCanvas(mainCanvasRef.current);
    setCanvas2(bgCanvasRef.current);
    setOverlayCanvas(overlayCanvasRef.current);
    setParticleCanvas(particleCanvasRef.current);
  }, []);

  useEffect(() => {
    if (clearRectArray.length - compareRectArray.length == 1) {
      ix = clearRectArray.filter((x) => !compareRectArray.includes(x))[0][0];
      iy = clearRectArray.filter((x) => !compareRectArray.includes(x))[0][1];
      setAnimateUpdate(true);
    }
    setCompareRectArray(clearRectArray.slice());
  }, [clearRectArray]);

  useEffect(() => {
    if (!canvasDisabled) {
      breakButton = breakButtonRef.current;
      cancelButton = cancelButtonRef.current;
      breakButton.disabled = false;
      cancelButton.disabled = false;
    }
    onMousedown(false);
  }, [mousedown, overlaypos.x]);

  // The main function
  useEffect(() => {
    // Get canvases on all rounds
    if (canvas && canvas2 && !contextSet) {
      setCtx(canvas.getContext("2d"));
      setCtx2(canvas2.getContext("2d"));
      setOverlayContext(overlayCanvas.getContext("2d"));
      setParticleContext(particleCanvas.getContext("2d"));
      contextSet = true;

      // Set canvas widths and heights
      canvas.width = width;
      canvas.height = height;
      canvas2.width = width;
      canvas2.height = height;
      overlayCanvas.width = width;
      overlayCanvas.height = height;
      particleCanvas.width = width;
      particleCanvas.height = height;
      triggered = false;
    }
    if (ctx && ctx2) {
      ctx2.fillStyle = "white";
      breakButton = breakButtonRef.current;
      cancelButton = cancelButtonRef.current;

      // Key canvas params
      const pixelSize = 10;
      const padding = 1;

      // Key params for loading the overlays and triggering the event listneers
      var mouseOnCanvas = false;

      // default disabled
      breakButton.disabled = true;
      cancelButton.disabled = true;

      // Create the holes in the canvas based off clearRectArray
      const paintCanvas = (array = clearRectArray, log) => {
        let offset;
        if (array) {
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          // insert clear rectangles
          for (let i = 0; i < array.length; i++) {
            offset = { sx: 0, sy: 0, ex: 0, ey: 0 };
            var clearRectCoords = array[i];
            if (clearRectCoords[0] + pixelSize + padding == width) {
              offset.ex = 1;
            } else if (clearRectCoords[0] - 1 == 0) {
              offset.sx = -1;
              offset.ex = 1;
            }
            if (clearRectCoords[1] + pixelSize + padding == height) {
              offset.ey = 1;
            } else if (clearRectCoords[1] - 1 == 0) {
              offset.sy = -1;
              offset.ey = 1;
            }
            ctx.clearRect(
              clearRectCoords[0] + offset.sx,
              clearRectCoords[1] + offset.sy,
              pixelSize + offset.ex,
              pixelSize + offset.ey
            );
          }
        }
      };

      // helper fn: return mouse positions on canvas
      function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect(), // abs. size of element
          scaleX = canvas.width / rect.width, // relationship bitmap vs. element for x
          scaleY = canvas.height / rect.height; // relationship bitmap vs. element for y
        return {
          x: (evt.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
          y: (evt.clientY - rect.top) * scaleY, // been adjusted to be relative to element
        };
      }

      // paint canvas once array has been changed
      if (changed) {
        paintCanvas(clearRectArray);
        setTimeout(() => setChanged(false), 500);
      }

      // Create a grey box when mousing over boxes
      // @param x: center x-coord of pixel
      // @param y: center y-coord of pixel
      const outlineElement = (x, y) => {
        // Create a grey background
        overlayContext.clearRect(0, 0, canvas.width, canvas.height);
        overlayContext.fillStyle = "#d0d0d0";
        overlayContext.fillRect(x - 1, y - 1, pixelSize + 1, pixelSize + 1);
        overlayContext.beginPath();
        overlayContext.moveTo(x + 3, y - 1);
        overlayContext.lineTo(x - 1, y - 1);
        overlayContext.lineTo(x - 1, y + 3);
        overlayContext.moveTo(x - 1, y + 7);
        overlayContext.lineTo(x - 1, y + 11);
        overlayContext.lineTo(x + 3, y + 11);
        overlayContext.moveTo(x + 7, y + 11);
        overlayContext.lineTo(x + 11, y + 11);
        overlayContext.lineTo(x + 11, y + 7);
        overlayContext.moveTo(x + 11, y + 3);
        overlayContext.lineTo(x + 11, y - 1);
        overlayContext.lineTo(x + 7, y - 1);
        overlayContext.strokeStyle = "rgba(0, 0, 0, 1)";
        overlayContext.lineWidth = 1;
        overlayContext.stroke();
      };

      // create a red box after clicking on one
      const selectedElement = (x, y) => {
        // Create a border of 1 px, length 2 px
        overlayContext.beginPath();
        overlayContext.moveTo(x + 3, y);
        overlayContext.lineTo(x, y);
        overlayContext.lineTo(x, y + 3);
        overlayContext.moveTo(x, y + 7);
        overlayContext.lineTo(x, y + 10);
        overlayContext.lineTo(x + 3, y + 10);
        overlayContext.moveTo(x + 7, y + 10);
        overlayContext.lineTo(x + 10, y + 10);
        overlayContext.lineTo(x + 10, y + 7);
        overlayContext.moveTo(x + 10, y + 3);
        overlayContext.lineTo(x + 10, y);
        overlayContext.lineTo(x + 7, y);
        overlayContext.strokeStyle = "red";
        overlayContext.lineWidth = 1;
        overlayContext.stroke();
      };

      // function to check whether overlays are painted
      var paintOverlays = (e) => {
        const { x, y } = getMousePos(canvas, e);

        if (2 < x && x < canvas.width - 2 && 2 < y && y < canvas.height - 2) {
          overlaypos.x = x - (x % 10) + 1; // +1 to compensate for padding
          overlaypos.y = y - (y % 10) + 1;
          if (
            // if overlay if on a removed rect or canvas is disabled, dont show anything
            (clearRectArray &&
              JSON.stringify(clearRectArray).includes(
                `[${overlaypos.x},${overlaypos.y}]`
              )) ||
            canvasDisabled
          ) {
            removePos(258);
            () => {};
          }
          mouseOnCanvas = true;
        } else {
          removePos(262);
        }
        outlineElement(overlaypos.x, overlaypos.y);
        selectedElement(selectpos.x, selectpos.y);
      };

      // helper function to remove overlay
      const removePos = (origin) => {
        overlaypos.x = undefined;
        overlaypos.y = undefined;
        mouseOnCanvas = false;
      };

      // Set upon click
      const localImgLoad = () => {
        if (ctx2 && imgRef.current) {
          setImgLoad(() => {
            1 + 1 === 2;
          });
        }
      };

      class Particle {
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.size = 5 + 10 * Math.random();
          this.dx = 1.5 * (Math.random() - 0.5);
          this.dy = Math.random() * -1.5;
          this.opacity = 150;
        }
        update() {
          this.x += this.dx;
          this.y += this.dy;
          this.dy += 0.1;
          this.opacity -= 1.5;
        }
        draw() {
          particleContext.fillStyle = `rgba(209, 213, 219, ${
            Math.min(100, Math.max(0, this.opacity)) / 100
          }`;
          particleContext.fillRect(this.x, this.y, this.size, this.size);
        }
      }

      function animate() {
        if (particleArray[0].opacity < 0) return;
        particleContext.clearRect(
          0,
          0,
          particleCanvas.width,
          particleCanvas.height
        );
        particleArray.forEach((element) => {
          element.draw();
          element.update();
        });
        requestAnimationFrame(animate);
      }

      const breakAnimation = (x, y) => {
        particleArray = [];
        for (let i = 0; i < Math.floor(Math.random() * 5) + 4; i++) {
          particleArray.push(new Particle(x, y));
        }
        animate();
      };

      if (animateUpdate) {
        ix = clearRectArray[clearRectArray.length - 1][0];
        iy = clearRectArray[clearRectArray.length - 1][1];
        breakAnimation(ix, iy);
        setAnimateUpdate(false);
      }

      // Mount event listeners on load
      if (!triggered) {
        setImgLoad(() => {
          localImgLoad(ctx2, imgRef.current, canvas);
        });
        ctx2.drawImage(
          imgRef.current,
          0,
          0,
          canvas.width - 1,
          canvas.height + 2
        );
        paintCanvas();
        window.addEventListener("mousemove", (e) => {
          paintOverlays(e, canvas);
        });
        breakButton.addEventListener("click", () => {
          if (!clearRectArray) return;
          tempArray = clearRectArray.slice();
          if (
            JSON.stringify(tempArray) !== JSON.stringify([]) &&
            !JSON.stringify(tempArray).includes(
              JSON.stringify([selectpos.x, selectpos.y])
            )
          ) {
            tempArray.push([selectpos.x, selectpos.y]);
          }
          if (JSON.stringify(tempArray) !== JSON.stringify([]))
            setClearRectArray(tempArray);
          socket.current.emit("canvasChange", selectpos.x, selectpos.y);
          selectpos.x = undefined;
          selectpos.y = undefined;
          breakButton.disabled = true;
          cancelButton.disabled = true;
          setCanvasDisabled(true);
          setChanged(true);
          // paintCanvas(tempArray, "lol");
        });
        window.addEventListener("mousedown", () => {
          if (mouseOnCanvas) {
            selectpos.x = overlaypos.x;
            selectpos.y = overlaypos.y;
            onMousedown(!mousedown);
          }
        });
        cancelButton.addEventListener("click", () => {
          selectpos.x = undefined;
          selectpos.y = undefined;
          breakButton.disabled = true;
          cancelButton.disabled = true;
        });
        triggered = true;
      }

      // TODO: remove debug functions below
      function checkAlignment(ctx, color) {
        const gap = 10;
        const padding = 1;
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;
        for (var x = gap + padding; x <= width + padding; x += gap) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, width + 2 * padding);
          ctx.stroke();
        }
        for (var y = gap + padding; y <= height + padding; y += gap) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(height + 2 * padding, y);
          ctx.stroke();
        }
      }
    }
  }, [canvas, canvas2, ctx, ctx2, changed, canvasDisabled]);

  // Connect to backend
  useEffect(() => {
    socket.current = io(backendURL);
    if (!socket.current) {
      return;
    }
    socket.current.emit("handshake", (response) => {
      setCountdownText("ready!");
    });
    socket.current.on("canvasUpdate", (...args) => {
      args[0] || clearRectArray ? () => {} : console.log("");
      JSON.stringify(args[0]) !== JSON.stringify(clearRectArray)
        ? setClearRectArray(args[0])
        : () => {};
      setChanged(true);
    });
  }, [backendURL]);
  return (
    <div>
      <CanvasContainer>
        <CanvasWrapper>
          <CanvasElement
            zindex={0}
            daRef={bgCanvasRef}
            active={!canvasDisabled}
          />
          <CanvasElement
            zindex={10}
            shadow
            daRef={mainCanvasRef}
            active={!canvasDisabled}
          />
          <CanvasElement
            zindex={20}
            daRef={overlayCanvasRef}
            active={!canvasDisabled}
          />
          <CanvasElement
            zindex={30}
            daRef={particleCanvasRef}
            active={!canvasDisabled}
          />
        </CanvasWrapper>
        <CanvasSidebar
          breakButtonRef={breakButtonRef}
          cancelButtonRef={cancelButtonRef}
          countdownText={countdownText}
        />
      </CanvasContainer>
      <CanvasReplace />
      <ImageLoader daRef={imgRef} imgLoad={imgLoad} />
      <Waves />
    </div>
  );
}

export const ModalFunction = ({ daRef }) => {
  // State of the canvas popups
  const [showModal, setShowModal] = useState(false);
  const factList = [
    "Dyslexia affects nearly 10% of the population.",
    "Dyslexia is by far the most common learning disability.",
    "Those with dyslexia use only the right side of the brain to process language, while non-dyslexics use three areas on the left side of the brain to process language.",
    "People with dyslexia are usually more creative and have a higher level of intelligence.",
    "Did you know that Lee Kuan Yew is dyslexic?",
    "Did you know that Tom Cruise is dyslexic? Even after high school, he could barely read through his earliest roles.",
    "Did you know that Winston Churchill is dyslexic? At age 10, he was described by his teachers to be “negligent, slovenly and perpetually late,” and struggled to keep up in school.",
    "The ability to use their right brain better and have a better sense of spatial relationships is prominent in dyslexics.",
    "The excellent comprehension skills dyslexic people are gifted with prove to be an asset in helping them understand stories read or told to them.",
    "Solving puzzles are dyslexic people’s forte.",
    "Dyslexics typically have a large spoken vocabulary for their age.",
    "Many individuals with dyslexia have proven to see things three dimensionally, which can effect how they look at words.",
    "Often dyslexics are thought to be reading backwards because of what is called the “Recency Effect.” In which they pronounce the word using the most recent sound first, like “tap” for “pat.”",
    "Anxiety disorders are more common in dyslexic children.",
    "Areas that dyslexic children are likely to excel in include conceptualisation, reason and abstraction.",
    "Dyslexia is not tied to IQ.",
    "People with dyslexia are more likely to have Attention Deficit Disorder (ADD).",
    "Dyslexics do not see letters backwards.",
  ];
  const [randomNo, setRandomNo] = useState(
    Math.floor(Math.random() * factList.length)
  );
  let probNo;

  return (
    <>
      <Modal
        onClose={() => {
          document.querySelector("body").classList.remove("pause-scroll");
          setShowModal(false);
        }}
        show={showModal}
        altType
      >
        <p className="text-center text-3xl font-semibold leading-5 sm:text-4xl w-4/5 sm:font-bold sm:leading-7 mt-1 mb-1">
          Fun Fact:
        </p>
        <p className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18px] leading-5 w-4/5 mt-5 font-regular sm:leading-5 mb-1">
          {factList[randomNo]}
        </p>
      </Modal>
      <CanvasButton
        icon={faCheck}
        text="Break"
        onClick={() => {
          probNo = Math.random();
          if (probNo < 0.75) return;
          setTimeout(() => {
            document.querySelector("body").classList.add("pause-scroll");
            setShowModal(true);
            setRandomNo(Math.floor(Math.random() * factList.length));
          }, 10);
        }}
        ref={daRef}
      />
    </>
  );
};

export const Waves = () => (
  <div className="-mt-[16.666666666666666666666666666666666667vh] z-10 sm:block hidden">
    <div className="w-full h-auto">
      <Image
        src="/haikei.svg"
        layout="responsive"
        alt="waves"
        width={900}
        height={150}
        priority
      />
    </div>
  </div>
);

export const CanvasContainer = ({ children }) => {
  return (
    <div className="sm:h-[120vh]  justify-center items-center bg-firstAccent relative flex-row h-0 sm:flex hidden">
      {children}
    </div>
  );
};

export const CanvasWrapper = ({ children }) => {
  return (
    <div className="w-[calc(752px+3vw)] sm:block h-screen basis-4/5 flex justify-center">
      {children}
    </div>
  );
};

export const CanvasElement = ({ shadow, zindex, daRef, active, onLoad }) => {
  const [loaded, setLoaded] = useState(false);
  const scriptContainer = useRef(null);
  const dimenRef = useRef(null);
  let width, transform, maxHeight, maxWidth, top;

  if (scriptContainer.current && !loaded) {
    setTimeout(() => setLoaded(true), 1000);
  }

  return (
    <>
      <canvas
        ref={daRef}
        className={`z-${zindex} absolute top-1/2 cv:right-[40vw] right-[36vw]  max-h-[90vh] w-[57vw] max-w-[112.5vh] ${
          shadow ? styles.shadow : ""
        } -translate-y-[calc(50%+5vh)]`}
        style={{
          pointerEvents: active ? "auto" : "none",
          opacity: loaded || zindex !== 0 ? "1" : "0",
          width,
          transform,
          maxHeight,
          maxWidth,
          // top,
        }}
      />
      {zindex === 30 && (
        <canvas
          ref={dimenRef}
          className={`-z-10 absolute top-1/2 cv:right-[40vw] right-[36vw]  max-h-[90vh] w-[57vw] max-w-[112.5vh] ${
            shadow ? styles.shadow : ""
          } -translate-y-[calc(50%+5vh)]`}
          style={{
            pointerEvents: "none",
            opacity: loaded || zindex !== 0 ? "1" : "0",
            width,
            transform,
            maxHeight,
            maxWidth,
          }}
        />
      )}
      <script ref={scriptContainer} className="z-30"></script>
    </>
  );
};

export const CanvasSidebar = ({
  breakButtonRef,
  cancelButtonRef,
  countdownText,
}) => {
  return (
    <div className="cv:w-[38vw] overflow-hidden hidden sm:block cv:flex justify-center items-center -mt-[10vh] basis-[50%]">
      <div className="cv:max-w-[600px] cv:min-w-[350px] cv:pl-6 pr-10">
        <p className="text-4xl mb-5 hidden cv:block text-center m-auto text-white">
          break the barrier to reveal the mural, and find out more about
          dyslexia with fun facts.
        </p>
        <p className="text-4xl mb-7  hidden cv:block text-center m-auto text-white">
          changes by other users are updated live, and there is a short cooldown
          to add new pixels
        </p>
        <div className="flex flex-col space-y-5 justify-center align-center">
          <div className="flex flex-col cv:flex-row cv:space-y-0 cv:space-x-10 cv:w-auto space-y-5 justify-center items-center">
            <ModalFunction
              fact='Often dyslexics are thought to be reading backwards because of what is called the "Recency Effect." In which they pronounce the word using the most recent sound first, like "tap" for "pat.'
              daRef={breakButtonRef}
            />
            <CanvasButton icon={faXmark} text="Cancel" ref={cancelButtonRef} />
          </div>
          <CanvasCooldown text={countdownText} />
        </div>
      </div>
    </div>
  );
};

export const CanvasButton = React.forwardRef(({ icon, text, onClick }, ref) => {
  return (
    <button
      ref={ref}
      className="bg-white shadow-md px-5 py-3 rounded-full disabled:bg-disabled flex flex-row align-center justify-center text-green-600 disabled:text-slate-500 z-40"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} size="lg" className="relative top-[7px]" />
      <span className="text-2xl whitespace-pre ml-3">{text}</span>
    </button>
  );
});

export const CanvasCooldown = ({ text }) => {
  let expired = false;
  let exampleText;
  exampleText = text;

  return (
    <div className="min-w-[86px] px-4 py-2 bg-white rounded-full m-auto flex align-center justify-center">
      <p
        className={` text-xl font-semibold ${
          expired ? "text-green-600" : "text-black"
        }`}
      >
        {exampleText}
      </p>
    </div>
  );
};

export const ImageLoader = ({ daRef, imgLoad }) => {
  return (
    <div style={{ display: "none" }}>
      <img
        ref={daRef}
        src="/finalpixelart.jpg"
        onLoad={imgLoad}
        width={750}
        height={600}
        className="z-20"
        alt="nothing to see here."
      />
    </div>
  );
};

export const CanvasReplace = () => {
  return (
    <div className="bg-black py-10 sm:hidden block">
      <h3 className="font-semibold text-3xl text-white text-center px-4">
        Oops! Looks like you need to rotate your device to load the mural :/
      </h3>
    </div>
  );
};
