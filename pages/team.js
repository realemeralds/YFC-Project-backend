import Navbar from "../components/Navbar";
import Image from "next/image";
import { useEffect, useState } from "react";

const Home = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-8 flex-col">
        <h1 className="font-bold text-4xl text-center mb-6">Our Team</h1>
        <p className="xl:text-2xl xsm:text-xl text-md text-center mx-[20vw] mb-8">
          <span className="font-bold">Welcome!</span> We are a group of students
          from St Joseph’s institution, participating in the YMCA
          Youth-for-Causes competition! Our names are Aidan, Aysha, Bilquis and
          Darren.
        </p>
        {/* <p className="xl:text-2xl text-xl text-center mx-[20vw] mb-8">
          Our chosen organisation is the Dyslexia Association of Singapore
          (DAS). We hope that with the help of our supporters, we will be able
          to make a difference in the way Singaporean society perceives dyslexic
          youth.
        </p> */}

        <div className="flex project:flex-row flex-col project:space-x-[9vw] mx-auto justify-center items-start w-[43vw] project:min-w-[550px] box-border">
          <div className="w-full project:mb-[10vh] mb-16">
            <div className="w-full project:h-[21vw] project:min-h-[275px]">
              <Image
                layout="responsive"
                className="my-auto"
                width={1000}
                height={1207.21}
                src="/aidan.png"
                alt="mugshot of aidan"
              />
            </div>
            <div className="pl-4 mt-5 border-l-black border-l-4 overflow-hidden">
              <div
                className={`w-full transition-all duration-700 flex flex-col justify-center items-start  ${
                  loaded ? "translate-x-0" : "-translate-x-[calc(125%)]"
                }`}
              >
                <h2 className="xl:text-4xl text-3xl text-center mb-3 font-semibold">
                  Aidan
                </h2>
                <p className="text-start tracking-tight leading-[1.1] mt-1 text-lg font-medium">
                  Head of Logistics
                </p>
                <p className="text-start tracking-tight leading-[1.1] mt-1 text-lg font-medium">
                  Head of Communications
                </p>
              </div>
            </div>
          </div>
          <div className="w-full project:mb-[10vh]  mb-16 flex flex-col justify-start items-start">
            <div className="w-full project:h-[21vw] project:min-h-[275px] project:relative project:top-[1.59195vw] top-4">
              <Image
                layout="responsive"
                width={1000}
                height={1082.45}
                src="/bil.png"
                alt="mugshot of bilquis"
              />
            </div>
            <div className="pl-4 mt-5 border-l-black border-l-4 overflow-hidden">
              <div
                className={`w-full transition-all duration-700 flex flex-col justify-center items-start delay-[300ms] ${
                  loaded ? "translate-x-0" : "-translate-x-[calc(125%)]"
                }`}
              >
                <h2
                  className={`xl:text-4xl text-3xl text-center mb-3 font-semibold`}
                >
                  Bilquis
                </h2>
                <p className="text-start tracking-tight leading-[1.1] mt-1 text-lg font-medium">
                  Head of Outreach
                </p>
                <p className="text-start tracking-tight leading-[1.1] mt-1 text-lg font-medium">
                  Head of Performance <br></br> and HR
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex project:flex-row flex-col project:space-x-[9vw] mx-auto justify-center items-start w-[43vw] project:min-w-[550px] box-border">
          <div className="w-full project:mb-[10vh] mb-16">
            <div className="w-full project:h-[21vw] project:min-h-[275px]">
              <Image
                layout="responsive"
                width={1000}
                height={1241.13}
                src="/aysha.png"
                alt="mugshot of aysha"
              />
            </div>
            <div className="pl-4 mt-5 border-l-black border-l-4 overflow-hidden">
              <div
                className={`w-full transition-all duration-700 flex flex-col justify-center items-start delay-[600ms] ${
                  loaded ? "translate-x-0" : "-translate-x-[calc(125%)]"
                }`}
              >
                <h2 className="xl:text-4xl text-3xl text-center mb-3 font-semibold">
                  Aysha
                </h2>
                <p className="text-start tracking-tight leading-[1.1] mt-1 text-lg font-medium">
                  Head of Publicity
                </p>
              </div>
            </div>
          </div>
          <div className="w-full mb-16 lg:mb-[10vh]">
            <div className="w-full project:h-[21vw] project:min-h-[275px] relative top-[1.05vw]">
              <Image
                layout="responsive"
                width={1000}
                height={1147.54}
                src="/darren.png"
                alt="mugshot of darren"
              />
            </div>
            <div className="pl-4 mt-5 border-l-black border-l-4 overflow-hidden">
              <div
                className={`w-full transition-all duration-700 flex flex-col justify-center items-start delay-[900ms] ${
                  loaded ? "translate-x-0" : "-translate-x-[calc(125%)]"
                }`}
              >
                <h2 className="xl:text-4xl text-3xl text-center mb-3 font-semibold">
                  Darren
                </h2>
                <p className="text-start tracking-tight leading-[1.1] mt-1 text-lg font-medium">
                  Head of Events
                </p>
                <p className="text-start tracking-tight leading-[1.1] mt-1 text-lg font-medium">
                  Head of Finance
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center -mt-3">
          <div className="w-full">
            <div className="project:w-2/5 w-3/5 m-auto">
              <Image
                layout="responsive"
                width={2000}
                height={2000}
                src="/group.png"
                alt="photo of YFC group"
              />
            </div>

            <h1 className="text-center font-medium text-2xl project:text-4xl mb-2 px-5">
              Thanks for checking out the website!
            </h1>
            <h3 className="text-center text-lg px-3 project:text-2xl">
              Follow our Instagram for more updates and volunteer opportunites!
            </h3>
            <a href="https://www.instagram.com/projprima/">
              <div className="flex-row flex items-center justify-center space-x-6 px-10 py-8">
                <Image
                  src="/insta.png"
                  width={100}
                  height={100}
                  layout="fixed"
                  alt="instagram icon"
                />
                <p className="font-thin xl:text-5xl md:text-4xl text-3xl">
                  @projprima
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
      {/* <BotPanel /> */}
    </>
  );
};

export default Home;
