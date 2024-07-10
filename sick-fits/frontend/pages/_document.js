import { Html, Head, Main, NextScript } from 'next/document';

// Custom Document to globally add custom html, head and body tags to the application

const Document = () => {
  <Html lang="en-US">
    <Head />
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>;
};

export default Document;
