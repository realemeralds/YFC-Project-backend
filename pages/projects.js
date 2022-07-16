import Navbar from "../components/Navbar";
import Logo from "../components/Logo";
import ProjectHeader from "../components/ProjectHeader";
import CarouselContainer from "../components/CarouselContainer";

const Home = () => {
  return (
    <>
      <Navbar menuVisible={false} />
      {/* <Logo /> */}
      <ProjectHeader />
      <CarouselContainer />
    </>
  );
};

export default Home;
