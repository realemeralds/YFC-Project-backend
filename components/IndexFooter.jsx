import Image from "next/image";

export const Footer = () => {
  return (
    <div className="flex flex-col mx-auto w-[70vw] mr-[15vw]">
      <div className="flex flex-row space-x-[10vw]">
        <div className="bg-fadedWhite rounded-xl border-1 border-borderWhite w-full">
          <div className="w-full h-auto">
            <Image
              src="/placeholder.png"
              layout="responsive"
              width={6000}
              height={6000}
            />
          </div>
        </div>
        <div className="bg-fadedWhite rounded-xl border-1 border-borderWhite w-full">
          <div className="w-full h-auto">
            <Image
              src="/placeholder.png"
              layout="responsive"
              width={6000}
              height={6000}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row space-x-5">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Footer;
