import "../styles/globals.css";
import "../styles/embla.scss";
import "../styles/scrollbar.scss";
import Navbar from "../components/Navbar";
import ScrollObserver from "../components/ScrollObserver";

// Font Awesome
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ScrollObserver>
        <Component {...pageProps} />
      </ScrollObserver>
    </>
  );
}

export default MyApp;
