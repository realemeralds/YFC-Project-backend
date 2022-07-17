import Navbar from "../components/Navbar";
import Image from "next/image";
import styles from "../styles/Merch.module.css";
import Modal from "../components/Modal";
import { useState } from "react";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar />
      <h1 className="text-center text-5xl text-black font-bold mb-4 mt-5">
        Merchandise
      </h1>
      <p className="text-center text-3xl text-black font-regular px-[20vw]">
        Grab some fashionable merchandise while <u>100%</u> of your purchase
        goes towards supporting dyslexics!
      </p>
      <p className="text-center px-[30vw] text-2xl font-light mb-8">
        click on the panels for more details...
      </p>
      <ShopWrapper />
      <div>
        <button
          onClick={() => {
            setTimeout(() => setShowModal(true), 10);
          }}
        >
          Open Modal
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)} show={showModal}>
            <p className="text-3xl w-4/5 font-bold leading-8 mb-1 self-start">
              when life gives you melons tote bag
            </p>
            <p className="text-lg text-[#A49F9B] self-start mb-4">
              by [name], [class]
            </p>
            <div className="w-96">
              <div
                className={`rounded-[50px] py-7 mx-8 mb-4 px-12 ${styles.radialGradient}`}
              >
                <Image
                  src="/tote (1).png"
                  layout="responsive"
                  height={200}
                  width={200}
                  className="max-h-[233px] max-w-[233px]"
                />
              </div>
            </div>
            <a href="#">
              <h1 className="text-4xl font-bold text-black text-center">
                $19.99
              </h1>
              <p className="text-xl text-center hover:translate-x-1 duration-500 underline underline-offset-2">
                → order via google form
              </p>
            </a>
          </Modal>
        )}
      </div>
    </>
  );
};

export const ShopWrapper = () => {
  return (
    <div className="flex flex-col space-y-6 w-3/4 m-auto">
      <div className="flex flex-row space-x-6">
        <div className="w-full border border-black rounded-3xl flex flex-col bg-white overflow-hidden shadow-panel hover:shadow-panelActive transition-all duration-500 hover:-translate-x-[5px] hover:-translate-y-[2px]">
          <div className="">
            <div className={`pb-2 pt-2 ${styles.gradient}`}>
              <Image
                src="/tote (1).png"
                layout="responsive"
                height={200}
                width={200}
                className="max-h-60"
                priority
              />
            </div>
          </div>
          <div className="flex flex-col border-t border-t-black p-2 pl-3">
            <p className="text-xl font-medium leading-tight">
              when life gives you melons totebag
            </p>
            <p className="text-md text-shopFaded -mt-1 mb-2">
              by Heather, LE510
            </p>
            <p className="font-semibold text-xl">$19.99</p>
          </div>
        </div>
        <div className="w-full border border-black rounded-3xl flex flex-col bg-white overflow-hidden shadow-panel hover:shadow-panelActive transition-all duration-500 hover:-translate-x-[5px] hover:-translate-y-[2px]">
          <div className={`pb-2 pt-2 ${styles.gradient} `}>
            <Image
              src="/tote (2).png"
              layout="responsive"
              height={200}
              width={200}
              className="max-h-60 "
              priority
            />
          </div>
          <div className="flex flex-col border-t border-t-black p-2 pl-3">
            <p className="text-xl font-medium leading-tight">
              prima signa totebag
            </p>
            <p className="text-md text-shopFaded -mt-1 mb-2">
              by Olivia, MN518
            </p>
            <p className="font-semibold text-xl">$19.99</p>
          </div>
        </div>
        <div className="w-full border border-black rounded-3xl flex flex-col bg-white overflow-hidden shadow-panel hover:shadow-panelActive transition-all duration-500 hover:-translate-x-[5px] hover:-translate-y-[2px]">
          <div className={`pb-2 pt-2 ${styles.gradient} `}>
            <Image
              src="/tote (3).png"
              layout="responsive"
              height={200}
              width={200}
              priority
              className="max-h-60"
            />
          </div>
          <div className="flex flex-col border-t border-t-black p-2 pl-3">
            <p className="text-xl font-medium leading-tight">
              seeing through dyslexia totebag
            </p>
            <p className="text-md text-shopFaded -mt-1 mb-2">
              by Clement, MN517
            </p>
            <p className="font-semibold text-xl">$19.99</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row space-x-6">
        <div className="w-full border border-black rounded-3xl flex flex-col bg-white overflow-hidden shadow-panel hover:shadow-panelActive transition-all duration-500 hover:-translate-x-[5px] hover:-translate-y-[2px]">
          <div className={`pb-2 pt-2 ${styles.gradient} `}>
            <Image
              src="/editedStickerA.png"
              layout="responsive"
              width={1}
              height={1}
              className=""
            />
          </div>
          <div className="flex flex-col border-t border-t-black p-2 pl-3">
            <p className="text-xl font-medium leading-tight">
              sticker collection A
            </p>
            <p className="text-md text-shopFaded -mt-1 mb-2">
              by Alyssa, ML511
            </p>
            <p className="font-semibold text-xl">$19.99</p>
          </div>
        </div>
        <div className="w-full border border-black rounded-3xl flex flex-col bg-white overflow-hidden shadow-panel hover:shadow-panelActive transition-all duration-500 hover:-translate-x-[5px] hover:-translate-y-[2px]">
          <div className={`pb-2 pt-2 ${styles.gradient} `}>
            <Image
              src="/tote (4).png"
              layout="responsive"
              height={200}
              width={200}
              className="max-h-60"
            />
          </div>
          <div className="flex flex-col border-t border-t-black p-2 pl-3">
            <p className="text-xl font-medium leading-tight">
              misconceptions totebag
            </p>
            <p className="text-md text-shopFaded -mt-1 mb-2">
              by Darren, MN518
            </p>
            <p className="font-semibold text-xl">$19.99</p>
          </div>
        </div>
        <div className="w-full border border-black rounded-3xl flex flex-col bg-white overflow-hidden shadow-panel hover:shadow-panelActive transition-all duration-500 hover:-translate-x-[5px] hover:-translate-y-[2px]">
          <div className={`pb-2 pt-2 ${styles.gradient} `}>
            <Image
              src="/editedStickerB.png"
              layout="responsive"
              height={2480}
              width={2480}
              className="max-h-60"
            />
          </div>
          <div className="flex flex-col border-t border-t-black p-2 pl-3">
            <p className="text-xl font-medium leading-tight">
              sticker collection B
            </p>
            <p className="text-md text-shopFaded -mt-1 mb-2">
              by Various Artists
            </p>
            <p className="font-semibold text-xl">$19.99</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
