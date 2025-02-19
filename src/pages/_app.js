import "@/styles/globals.css";
import { Inter, Open_Sans } from "next/font/google";

import { Footer, Header } from "@/components";

const inter = Inter({ subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });

function MyApp({ Component, pageProps }) {
  return (
    <div className={`${inter.className} ${openSans.className}`}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
