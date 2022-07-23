import "../styles/globals.css";
import "../styles/embla.scss";
import "../styles/scrollbar.scss";
import ScrollObserver from "../components/ScrollObserver";
import { ParallaxProvider } from "react-scroll-parallax";

// Font Awesome
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

// Head
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Project Prima</title>
        <meta property="og:title" content="Project Prima" key="title" />
        <link rel="icon" type="image/png" href="icon.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ParallaxProvider>
        <ScrollObserver>
          <Component {...pageProps} />
        </ScrollObserver>
      </ParallaxProvider>
    </>
  );
}

export default MyApp;
