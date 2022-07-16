import Image from "next/image";

export const Solution = () => {
  return (
    <div className="-translate-y-14">
      <div className="w-full h-auto">
        <Image
          src="/haikei transparent.svg"
          layout="responsive"
          alt="waves"
          width={1000}
          height={142.76}
        />
      </div>
      <div className="bg-slate-100 relative h-[250vh]">
        <div className="absolute bg-cardBG px-8 py-5 rounded-xl mx-24 w-[45vw] left-4 top-[10vh] hover:cards-rotation hover:shadow-xl transition-all duration-300">
          <p className="text-4xl font-regular text-start mb-3">Our Programs</p>
          <p className="text-2xl font-light text-start leading-tight tracking-tight">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi
            laudantium impedit ullam alias quaerat deserunt sunt quod
            reprehenderit, vel veniam quae excepturi animi, nesciunt nam
            sapiente laborum reiciendis, neque aut?
          </p>
        </div>
        <div className="absolute bg-cardBG px-8 py-5 rounded-xl mx-24 w-[45vw] right-4 top-[60vh] hover:-cards-rotation hover:shadow-xl transition-all duration-300">
          <p className="text-4xl font-regular text-start mb-3">Our Programs</p>
          <p className="text-2xl font-light text-start leading-tight tracking-tight">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi
            laudantium impedit ullam alias quaerat deserunt sunt quod
            reprehenderit, vel veniam quae excepturi animi, nesciunt nam
            sapiente laborum reiciendis, neque aut?
          </p>
        </div>
        <div className="absolute bg-cardBG px-8 py-5 rounded-xl mx-24 w-[45vw] left-4 top-[110vh] hover:cards-rotation hover:shadow-xl transition-all duration-300">
          <p className="text-4xl font-regular text-start mb-3">Our Programs</p>
          <p className="text-2xl font-light text-start leading-tight tracking-tight">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi
            laudantium impedit ullam alias quaerat deserunt sunt quod
            reprehenderit, vel veniam quae excepturi animi, nesciunt nam
            sapiente laborum reiciendis, neque aut?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Solution;
