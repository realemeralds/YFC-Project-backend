import "../styles/globals.css";
import "../styles/embla.scss";
import "../styles/scrollbar.scss";
import ScrollObserver from "../components/ScrollObserver";
import { ParallaxProvider } from "react-scroll-parallax";

// Font Awesome
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ParallaxProvider>
        <ScrollObserver>
          <Component {...pageProps} />
        </ScrollObserver>
      </ParallaxProvider>
    </>
  );
}

export default MyApp;
