import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Problems from "../components/problems";

const Home = () => {
  return (
    <>
      <Header />
      <Problems />
      <Header />
    </>
  );
};

export default Home;
