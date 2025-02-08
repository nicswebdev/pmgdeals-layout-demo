import "@/styles/globals.css";
import { Inter } from "next/font/google";

import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }) {
  return (
    <div className={inter.className}>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
