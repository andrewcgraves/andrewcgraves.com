import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { Inter, Open_Sans } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} ${openSans.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
