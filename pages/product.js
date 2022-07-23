import ProductCarousel from "../components/ProductCarousel";

const Home = () => {
  const SLIDE_COUNT = 10;
  const slides = Array.from(Array(SLIDE_COUNT).keys());

  return <ProductCarousel slides={slides} />;
};

export default Home;
