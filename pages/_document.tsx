import { Html, Head, Main, NextScript } from "next/document";
import { inter, openSans } from "../src/lib/fonts";

export default function Document() {
  return (
    <Html className={`${inter.variable} ${openSans.variable}`}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
