import icon from "../public/hamburger.svg";
import Image from "next/image";

export default function Navbar({ hidden }) {
  return (
    <div className="absolute flex-row flex items-center right-8 top-6">
      {!hidden ? (
        <p className="font-light text-xl text-right mr-4">menu</p>
      ) : (
        <></>
      )}
      <Image src={icon} width={30} height={30} />
    </div>
  );
}
