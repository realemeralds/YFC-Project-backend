import Navbar from "../components/Navbar";
import Logo from "../components/Logo";
import ProjectHeader from "../components/ProjectHeader";
import CarouselContainer from "../components/CarouselContainer";
import BotPanel from "../components/BotPanel";

const Home = () => {
  return (
    <>
      <Navbar menuVisible={false} />
      {/* <Logo /> */}
      <ProjectHeader />
      <CarouselContainer />
      <BotPanel />
    </>
  );
};

export default Home;
