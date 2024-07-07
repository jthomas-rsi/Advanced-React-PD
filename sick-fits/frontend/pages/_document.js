import Document, { Html, Head, Main, NextScript } from 'next/document';

// Custom Document to globally add custom html, head and body tags to the application

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
