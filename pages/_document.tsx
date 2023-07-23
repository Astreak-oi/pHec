import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="We'll analyze your idea and provide ratings, feedback and suggestions."
          />
          <meta property="og:site_name" content="pHec.io" />
          <meta
            property="og:description"
            content="We'll analyze your idea and provide ratings, feedback and suggestions."
          />
          <meta property="og:title" content="Get Idea Rating & Feedback By AI - That Takes Your Startup to the Next Level" />
          <meta name="pHec:card" content="summary_large_image" />
          <meta name="pHec:title" content="Get Idea Rating & Feedback By AI - That Takes Your Startup to the Next Level" />
          <meta
            name="pHec:description"
            content="We'll analyze your idea and provide ratings, feedback and suggestions."
          />
          <meta
            property="og:image"
            content="https://ph-ec.io/images/og-image.png"
          />
          <meta
            name="pHec:image"
            content="https://ph-ec.io/images/og-image.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
