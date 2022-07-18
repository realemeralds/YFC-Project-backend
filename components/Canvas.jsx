import React, { useRef, useEffect, useState, useContext } from "react";

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
  const breakButtonRef = useRef(null);
  const cancelButtonRef = useRef(null);
  const imgRef = useRef(null);

  // Socket ref for backend implementation
  let socket = useRef("");
  // clearRectArray, for all broken squares
  const [clearRectArray, setClearRectArray] = useState([]);
  let tempArray;

  // States to store the canvases + contexts, as their refs are filled
  let contextSet = false;
  const [canvas, setCanvas] = useState();
  const [canvas2, setCanvas2] = useState();
  const [overlayCanvas, setOverlayCanvas] = useState();
  const [ctx, setCtx] = useState();
  const [ctx2, setCtx2] = useState();
  const [overlayContext, setOverlayContext] = useState();

  // Function + variable to load the image
  const [imgLoad, setImgLoad] = useState();

  // Changed, to trigger a canvas repaint
  const [changed, setChanged] = useState(false);

  // Countdown implementation
  const [countdownText, setCountdownText] = useState(undefined);
  const [canvasDisabled, setCanvasDisabled] = useState(false);
  const [mousedown, onMousedown] = useState(false);
  let breakButton, cancelButton;

  // translate for parallax
  let translate;

  // key variables
  const width = 1002;
  const height = 802;
  const countdownDuration = 30;

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
  }, []);

  useEffect(() => {}, [clearRectArray]);

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
      contextSet = true;

      // Set canvas width
      canvas.width = width;
      canvas.height = height;
      canvas2.width = width;
      canvas2.height = height;
      overlayCanvas.width = width;
      overlayCanvas.height = height;
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
      let triggered = false;

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
          paintCanvas();
          ctx2.drawImage(
            imgRef.current,
            0,
            0,
            canvas.width - 1,
            canvas.height + 2
          );
          setImgLoad(() => {
            1 + 1 === 2;
          });
        }
      };

      // Mount event listeners on load
      if (!triggered) {
        setImgLoad(() => {
          localImgLoad(ctx2, imgRef.current, canvas);
        });
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
      console.log(response.status); // ok
    });
    socket.current.on("canvasUpdate", (...args) => {
      args[0] || clearRectArray ? () => {} : console.log("huh");
      JSON.stringify(args[0]) !== JSON.stringify(clearRectArray)
        ? setClearRectArray(args[0])
        : () => {};
      setChanged(true);
      // fallback
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

export const Waves = () => (
  <div className="-mt-[16.666666666666666666666666666666666667vh] z-10 sm:block hidden">
    <div className="w-full h-auto">
      <Image
        src="/haikei.svg"
        layout="responsive"
        alt="waves"
        width={900}
        height={150}
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

  if (scriptContainer.current && !loaded) {
    setTimeout(() => setLoaded(true), 1000);
  }

  return (
    <>
      <canvas
        ref={daRef}
        className={`z-${zindex} absolute top-1/2 cv:right-[40vw] right-[36vw] -translate-y-[calc(50%+5vh)] max-h-[90vh] w-[57vw] max-w-[112.5vh] ${
          shadow ? styles.shadow : ""
        }`}
        style={{
          pointerEvents: active ? "auto" : "none",
          opacity: loaded || zindex !== 0 ? "1" : "0",
        }}
      />
      <script ref={scriptContainer}></script>
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
          paint on the mural to find out more about dyslexia.
        </p>
        <p className="text-4xl mb-7  hidden cv:block text-center m-auto text-white">
          changes by other users are updated live, and there is a short cooldown
          to add new pixels
        </p>
        <div className="flex flex-col space-y-5 justify-center align-center">
          <div className="flex flex-col cv:flex-row cv:space-y-0 cv:space-x-10 cv:w-auto space-y-5 justify-center items-center">
            <CanvasButton icon={faCheck} text="Break" ref={breakButtonRef} />
            <CanvasButton icon={faXmark} text="Cancel" ref={cancelButtonRef} />
          </div>
          <CanvasCooldown text={countdownText} />
        </div>
      </div>
    </div>
  );
};

export const CanvasButton = React.forwardRef(({ icon, text }, ref) => {
  return (
    <button
      ref={ref}
      className="bg-white shadow-md px-5 py-3 rounded-full disabled:bg-disabled flex flex-row align-center justify-center text-green-600 disabled:text-slate-500"
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
        Oops! Looks like your device is too small to load the mural :/
      </h3>
    </div>
  );
};
