import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Gift thinker for any occasion" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/gift_32.png" />
      </Head>
      <body className="p-4 text-xl flex justify-center">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
