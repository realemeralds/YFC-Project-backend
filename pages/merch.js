import Navbar from "../components/Navbar";
import Image from "next/image";
import styles from "../styles/Merch.module.css";
import Modal from "../components/Modal";
import React, { useState } from "react";

const Home = () => {
  return (
    <>
      {/* <Head>
        <title>Project Prima</title>
        <meta property="og:title" content="Project Prima" key="title" />
        <link rel="icon" type="image/png" href="icon.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head> */}
      <Navbar />
      <h1 className="text-center text-4xl md:text-5xl text-black font-bold mb-4 mt-5">
        Merchandise
      </h1>
      <p className="text-center text-2xl md:text-3xl text-black font-regular px-6 sm:px-[14vw] lg:px-[20vw]">
        Grab some fashionable merchandise while <u>100%</u> of your purchase
        goes towards supporting DAS&#39; programs for dyslexics!
      </p>
      <p className="text-center px-10 sm:px-[28vw] mt-4 md:mt-4 text-2xl font-light mb-8 leading-6">
        click on the panels for more details, and check back here soon when the
        order form is made public!
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
}) => {
  return (
    <>
      {showModal[index] && (
        <Modal
          onClose={() => {
            let tempArray = showModal.splice();
            tempArray[index] = false;
            document.querySelector("body").classList.remove("pause-scroll");
            setShowModal(tempArray);
          }}
          show={showModal[index]}
        >
          <p className="text-start text-xl font-semibold leading-5 sm:text-3xl w-4/5 sm:font-bold sm:leading-7 mb-1 self-start">
            {heading}
          </p>
          <p className="text-sm sm:text-[18px] text-[#A49F9B] self-start mb-2">
            {author}
          </p>
          <div className="w-64 sm:w-96">
            <div
              className={`rounded-[50px] px-8  sm:py-7 sm:mb-4 ${
                index === 3 || index === 5 ? "sm:px-12 sm:mx-8" : "sm:px-20"
              } ${styles.radialGradient}`}
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
          {/* <a href={link}> */}
          <h1 className="text-3xl sm:text-4xl mt-4 sm:mt-0 font-bold text-black text-center">
            {price}
          </h1>
          <p className="text-lg sm:text-xl italic text-center hover:translate-x-1 sm:mt-1 duration-500 underline underline-offset-2">
            ordering coming soon!
          </p>
          {/* </a> */}
        </Modal>
      )}
      <button
        className={`w-full border min-w-[${250}px] border-black rounded-3xl flex flex-col bg-white overflow-hidden shadow-panel hover:shadow-panelActive transition-all duration-500 hover:-translate-x-[5px] hover:-translate-y-[2px]`}
        onClick={() => {
          setTimeout(() => {
            let tempArray = showModal.splice();
            tempArray[index] = true;
            document.querySelector("body").classList.add("pause-scroll");
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
    // <div className="flex flex-col space-y-6 w-3/4 m-auto mb-20">
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-3/4 m-auto gap-6 mb-10">
      <ModalFunction
        index={0}
        heading={"when life gives you melons totebag"}
        author="by Heather, 17"
        src="/newtote (1).png"
        price="$6.99"
        link="#"
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <div className="w-full h-full">
          <div className={`pb-2 pt-2 ${styles.gradient}`}>
            <Image
              src="/newtote (1).png"
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
              by Heather, 17
            </p>
            <p className="font-semibold text-xl text-start">$6.99</p>
          </div>
        </div>
      </ModalFunction>
      <ModalFunction
        index={1}
        heading={"prima signa totebag"}
        author="by Olivia, 17"
        src="/newtote (2).png"
        price="$6.99"
        link="#"
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <div className="w-full h-full">
          <div className={`pb-2 pt-2 ${styles.gradient} `}>
            <Image
              src="/newtote (2).png"
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
              by Olivia, 17
            </p>
            <p className="font-semibold text-start text-xl">$6.99</p>
          </div>
        </div>
      </ModalFunction>
      <ModalFunction
        index={2}
        heading="seeing through dyslexia totebag"
        author="by Clement, 18"
        src="/newtote (3).png"
        price="$6.99"
        link="#"
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <div className="w-full h-full">
          <div className={`pb-2 pt-2 ${styles.gradient} `}>
            <Image
              src="/newtote (3).png"
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
              by Clement, 18
            </p>
            <p className="font-semibold text-xl text-start">$6.99</p>
          </div>
        </div>
      </ModalFunction>
      <ModalFunction
        index={3}
        heading="sticker collection A"
        author="by Alyssa, 17"
        src="/editedStickerA.png"
        price="price - TBC"
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
              by Alyssa, 17
            </p>
            <p className="font-semibold text-xl text-start">price - TBC</p>
          </div>
        </div>
      </ModalFunction>
      <ModalFunction
        index={4}
        heading="misconceptions totebag"
        author="by Faith, 14"
        src="/newtote (4).png"
        price="$6.99"
        link="#"
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <div className="w-full h-full">
          <div className={`pb-2 pt-2 ${styles.gradient} `}>
            <Image
              src="/newtote (4).png"
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
              by Faith, 14
            </p>
            <p className="font-semibold text-xl text-start">$6.99</p>
          </div>
        </div>
      </ModalFunction>
      <ModalFunction
        index={5}
        heading="sticker collection B"
        author="by Various Artists"
        src="/editedStickerB.png"
        price="price - TBC"
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
            <p className="font-semibold text-xl text-start">price - TBC</p>
          </div>
        </div>
      </ModalFunction>
    </div>
  );
};

export default Home;
