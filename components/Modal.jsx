import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ onClose, children, title, show, daRef, altType = false }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  // create ref for the StyledModalWrapper component
  const modalWrapperRef = React.useRef();

  // check if the user has clickedinside or outside the modal
  const backDropHandler = (e) => {
    if (!modalWrapperRef?.current?.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    setIsBrowser(true);

    // attach event listener to the whole windor with our handler
    window.addEventListener("click", (e) => backDropHandler(e));

    // remove the event listener when the modal is closed
    return () => window.removeEventListener("click", (e) => backDropHandler(e));
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  let modalContent = (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[#0000008F] transition-all duration-1000"
      style={{ opacity: show ? 1 : 0 }}
    >
      <div
        ref={modalWrapperRef}
        className="sm:w-[500px] sm:h-[650px] w-[300px] h-[390px] flex items-center justify-center bg-transparent"
      >
        <div className="bg-white w-[300px] h-[390px] sm:w-[450px] sm:h-[525px] relative rounded-[50px] border border-black shadow-[0_0_20px_10px_rgba(0,0,0,0.24)]">
          <div className="absolute top-5 right-7 text-2xl">
            <a href="#" onClick={handleCloseClick}>
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </a>
          </div>
          <div className="flex justify-center flex-col items-center p-7 pt-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  if (altType) {
    modalContent = (
      <div
        className="fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-[#0000008F] transition-all duration-1000"
        style={{ opacity: show ? 1 : 0 }}
      >
        <div
          ref={modalWrapperRef}
          className="sm:w-[400px] sm:h-[200px] w-[300px] h-[160px] flex items-center justify-center bg-transparent"
        >
          <div className="bg-white z-50 sm:w-[400px] sm:h-[200px] w-[300px] h-[160px] relative rounded-[50px] border border-black shadow-[0_0_20px_10px_rgba(0,0,0,0.24)]">
            <div className="absolute top-5 right-7 text-2xl">
              <a href="#" onClick={handleCloseClick}>
                <FontAwesomeIcon icon={faXmark} size="lg" />
              </a>
            </div>
            <div className="flex justify-center flex-col items-center p-7 pt-5">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

export default Modal;
