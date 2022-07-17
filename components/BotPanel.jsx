import Image from "next/image";

export const BotPanel = () => {
  return (
    <div className="flex flex-row justify-between w-full h-full bg-[#222222] sm:-my-0  -my-3 py-1 px-5 ">
      <p className="text-white font-medium text-xl text-start w-max">
        Designed by Matt C.
      </p>
      <div className="relative right-3 ">
        <div className="flex flex-row justify-end items-center space-x-3">
          <p className="text-white font-light text-lg sm:visible invisible -mr-1">
            contact me:
          </p>
          <a href="https://t.me/asleepatthewheel" className="flex items-center">
            <Image
              src="/telegram.svg"
              width={16}
              height={16}
              layout="fixed"
              alt="link to telegram"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/matthew-aaron-chan"
            className="flex items-center"
          >
            <Image
              src="/linkedin.svg"
              width={16}
              height={16}
              layout="fixed"
              alt="link to linkedin"
            />
          </a>
          <a
            href="https://github.com/realemeralds"
            className="flex items-center"
          >
            <Image
              src="/github.svg"
              width={16}
              height={16}
              layout="fixed"
              alt="link to github"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BotPanel;
