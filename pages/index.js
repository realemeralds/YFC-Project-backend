import Header from "../components/Header";
import Footer from "../components/IndexFooter";
import Problems from "../components/problems";
import Canvas from "../components/Canvas";
import Navbar from "../components/Navbar";
import Solution from "../components/ParallaxSolution";
import BotPanel from "../components/BotPanel";

const Home = () => {
  return (
    <>
      <Navbar menuVisible={true} />
      <Header />
      <Problems />
      <Canvas />
      <Solution />
      <Footer />
      <BotPanel />
    </>
  );
};

export default Home;
