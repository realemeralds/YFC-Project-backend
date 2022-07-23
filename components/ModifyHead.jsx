import Head from "next/head";

const modHead = () => {
  return (
    <Head>
      <title>Project Prima</title>
      <meta property="og:title" content="Project Prima" key="title" />
      <link rel="icon" type="image/png" href="icon.png" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
};

export default modHead;
