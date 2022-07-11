import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Problems from "../components/Problems";
import Canvas from "../components/Canvas";

const Home = () => {
  return (
    <>
      <Header />
      <Problems />
      <Canvas />
      <Header />
    </>
  );
};

export default Home;
