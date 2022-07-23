import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <title>Project Prima</title>
        <meta property="og:title" content="Project Prima" key="title" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="modal-root" className="z-50"></div>
      </body>
    </Html>
  );
}
