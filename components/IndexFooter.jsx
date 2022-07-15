import Image from "next/image";

export const Footer = () => {
  return (
    <FooterWrapper>
      <PanelWrapper>
        <Image src="/placeholder.png" layout="fixed" width={150} height={150} />
        <p className="font-semibold text-lg tracking-tight mb-1 mt-4">
          Projects →
        </p>
        <p className="font-regular text-[#6E7F7D] text-md tracking-tight leading-tight">
          Learn more about the projects you can participate in.
        </p>
      </PanelWrapper>
      <PanelWrapper>
        <Image src="/placeholder.png" layout="fixed" width={150} height={150} />
        <p className="font-semibold text-lg tracking-tight mb-1 mt-4">
          Merch →
        </p>
        <p className="font-regular text-[#6E7F7D] text-md tracking-tight leading-tight">
          Buy merchanise while contributing to a good cause!
        </p>
      </PanelWrapper>
      <PanelWrapper>
        <Image src="/placeholder.png" layout="fixed" width={150} height={150} />
        <p className="font-semibold text-lg tracking-tight mb-1 mt-4">
          Our Team →
        </p>
        <p className="font-regular text-[#6E7F7D] text-md tracking-tight leading-tight">
          Learn more about the team leading the effort.
        </p>
      </PanelWrapper>
    </FooterWrapper>
  );
};

export const PanelWrapper = ({ children }) => {
  return (
    <div className="bg-fadedWhite rounded-xl border-1 border-borderWhite w-full">
      <div className="w-full h-auto border-borderWhite border rounded-xl p-3 shadow-cards hover:shadow-cardsActive relative hover:-translate-y-[6px] transition-all duration-500">
        {children}
      </div>
    </div>
  );
};

export const FooterWrapper = ({ children }) => {
  return (
    <div className="flex flex-col mx-auto w-[81vw] mr-[9.5vw]">
      <div className="flex flex-row space-x-[4vw] py-10">{children}</div>
    </div>
  );
};

export default Footer;
