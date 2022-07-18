import Navbar from "../components/Navbar";
import Image from "next/image";
import styles from "../styles/Merch.module.css";
import Modal from "../components/Modal";
import React, { useState } from "react";

const Home = () => {
  return (
    <>
      <Navbar />
      <h1 className="text-center text-4xl md:text-5xl text-black font-bold mb-4 mt-5">
        Merchandise
      </h1>
      <p className="text-center text-2xl md:text-3xl text-black font-regular px-[20vw]">
        Grab some fashionable merchandise while <u>100%</u> of your purchase
        goes towards supporting dyslexics!
      </p>
      <p className="text-center px-[30vw] text-2xl font-light mb-8">
        click on the panels for more details...
      </p>
      <ShopWrapper />
    </>
  );
};

export const ModalFunction = ({
  index,
  heading,
  author,
  src,
  price,
  link,
  children,
  showModal,
  setShowModal,
  maxW,
}) => {
  return (
    <>
      {showModal[index] && (
        <Modal
          onClose={() => {
            let tempArray = showModal.splice();
            tempArray[index] = false;
            setShowModal(tempArray);
          }}
          show={showModal[index]}
        >
          <p className="text-3xl w-4/5 font-bold leading-8 mb-1 self-start">
            {heading}
          </p>
          <p className="text-lg text-[#A49F9B] self-start mb-4">{author}</p>
          <div className="w-96">
            <div
              className={`rounded-[50px] py-7 mx-8 mb-4 px-12 ${styles.radialGradient}`}
            >
              <Image
                src={src}
                layout="responsive"
                height={200}
                width={200}
                className="max-h-[233px] max-w-[233px]"
                alt={heading}
              />
            </div>
          </div>
          <a href={link}>
            <h1 className="text-4xl font-bold text-black text-center">
              {price}
            </h1>
            <p className="text-xl text-center hover:translate-x-1 duration-500 underline underline-offset-2">
              → order via google form
            </p>
          </a>
        </Modal>
      )}
      <button
        className={`w-full border min-w-[${250}px] border-black rounded-3xl flex flex-col bg-white overflow-hidden shadow-panel hover:shadow-panelActive transition-all duration-500 hover:-translate-x-[5px] hover:-translate-y-[2px]`}
        onClick={() => {
          setTimeout(() => {
            let tempArray = showModal.splice();
            tempArray[index] = true;
            setShowModal(tempArray);
          }, 10);
        }}
      >
        {children}
      </button>
    </>
  );
};

export const ShopWrapper = () => {
  const [showModal, setShowModal] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  return (
    <div className="flex flex-col space-y-6 w-3/4 m-auto mb-20">
      <div className="flex flex-row space-x-6">
        <ModalFunction
          index={0}
          heading={"when life gives you melons totebag"}
          author="by Heather, LE510"
          src="/tote (1).png"
          price="$9.99"
          link="#"
          showModal={showModal}
          setShowModal={setShowModal}
        >
          <div className="w-full h-full">
            <div className={`pb-2 pt-2 ${styles.gradient}`}>
              <Image
                src="/tote (1).png"
                layout="responsive"
                height={200}
                width={200}
                className="max-h-60"
                priority
                alt="when life gives you melons totebag"
              />
            </div>
            <div className="flex flex-col border-t border-t-black p-2 pl-3">
              <p className="text-start text-xl font-medium leading-5 mb-1">
                when life gives you melons totebag
              </p>
              <p className="text-md text-start text-shopFaded -mt-1 mb-1 leading-tight">
                by Heather, LE510
              </p>
              <p className="font-semibold text-xl text-start">$9.99</p>
            </div>
          </div>
        </ModalFunction>
        <ModalFunction
          index={1}
          heading={"prima signa totebag"}
          author="by Olivia, MN518"
          src="/tote (2).png"
          price="$9.99"
          link="#"
          showModal={showModal}
          setShowModal={setShowModal}
        >
          <div className="w-full h-full">
            <div className={`pb-2 pt-2 ${styles.gradient} `}>
              <Image
                src="/tote (2).png"
                layout="responsive"
                height={200}
                width={200}
                className="max-h-60"
                priority
                alt="prima signa totebag"
              />
            </div>
            <div className="flex flex-col border-t border-t-black p-2 pl-3">
              <p className="text-xl text-start font-medium leading-5 mb-1">
                prima signa totebag
              </p>
              <p className="text-md text-start text-shopFaded -mt-1 mb-1 leading-tight">
                by Olivia, MN518
              </p>
              <p className="font-semibold text-start text-xl">$9.99</p>
            </div>
          </div>
        </ModalFunction>
        <ModalFunction
          index={2}
          heading="seeing through dyslexia totebag"
          author="by Clement, MN517"
          src="/tote (3).png"
          price="$9.99"
          link="#"
          showModal={showModal}
          setShowModal={setShowModal}
        >
          <div className="w-full h-full">
            <div className={`pb-2 pt-2 ${styles.gradient} `}>
              <Image
                src="/tote (3).png"
                layout="responsive"
                height={200}
                width={200}
                priority
                className="max-h-60"
                alt="seeing through dyslexia totebag"
              />
            </div>
            <div className="flex flex-col border-t border-t-black p-2 pl-3">
              <p className="text-xl font-medium leading-5 mb-1 text-start">
                seeing through dyslexia totebag
              </p>
              <p className="text-md text-shopFaded -mt-1 mb-1 leading-tight text-start">
                by Clement, MN517
              </p>
              <p className="font-semibold text-xl text-start">$9.99</p>
            </div>
          </div>
        </ModalFunction>
      </div>
      <div className="flex flex-row space-x-6">
        <ModalFunction
          index={3}
          heading="sticker collection A"
          author="by Alyssa, ML511"
          src="/editedStickerA.png"
          price="$9.99"
          link="#"
          showModal={showModal}
          setShowModal={setShowModal}
        >
          <div className="w-full h-full">
            <div className={`pb-2 pt-2 ${styles.gradient} `}>
              <Image
                src="/editedStickerA.png"
                layout="responsive"
                width={1}
                height={1}
                alt="sticker collection A"
              />
            </div>
            <div className="flex flex-col border-t border-t-black p-2 pl-3">
              <p className="text-xl font-medium leading-5 mb-1 text-start">
                sticker collection A
              </p>
              <p className="text-md text-shopFaded -mt-1 mb-1 leading-tight text-start">
                by Alyssa, ML511
              </p>
              <p className="font-semibold text-xl text-start">$9.99</p>
            </div>
          </div>
        </ModalFunction>
        <ModalFunction
          index={4}
          heading="misconceptions totebag"
          author="by Darren, MN518"
          src="/tote (4).png"
          price="$9.99"
          link="#"
          showModal={showModal}
          setShowModal={setShowModal}
        >
          <div className="w-full h-full">
            <div className={`pb-2 pt-2 ${styles.gradient} `}>
              <Image
                src="/tote (4).png"
                layout="responsive"
                height={200}
                width={200}
                className="max-h-60"
                alt="misconceptions totebag"
              />
            </div>
            <div className="flex flex-col border-t border-t-black p-2 pl-3">
              <p className="text-xl font-medium leading-5 mb-1 text-start">
                misconceptions totebag
              </p>
              <p className="text-md text-shopFaded -mt-1 mb-1 leading-tight text-start">
                by Darren, MN518
              </p>
              <p className="font-semibold text-xl text-start">$9.99</p>
            </div>
          </div>
        </ModalFunction>
        <ModalFunction
          index={5}
          heading="sticker collection B"
          author="by Darren, MN518"
          src="/editedStickerB.png"
          price="$9.99"
          link="#"
          showModal={showModal}
          setShowModal={setShowModal}
        >
          <div className="h-full w-full">
            <div className={`pb-2 pt-2 ${styles.gradient} `}>
              <Image
                src="/editedStickerB.png"
                layout="responsive"
                height={2480}
                width={2480}
                className="max-h-60"
                alt="sticker collection B"
              />
            </div>
            <div className="flex flex-col border-t border-t-black p-2 pl-3">
              <p className="text-xl font-medium leading-5 mb-1 text-start">
                sticker collection B
              </p>
              <p className="text-md text-shopFaded -mt-1 mb-1 leading-tight text-start">
                by Various Artists
              </p>
              <p className="font-semibold text-xl text-start">$9.99</p>
            </div>
          </div>
        </ModalFunction>
      </div>
    </div>
  );
};

export default Home;
