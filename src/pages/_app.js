import "@/styles/globals.css";
import {Inter, Open_Sans} from "next/font/google";

import {Footer, Header} from "@/components";

import {CurrencyProvider} from "@/context/CurrencyContext";
import {SessionProvider} from "next-auth/react";

const inter = Inter({subsets: ["latin"]});
const openSans = Open_Sans({subsets: ["latin"]});

function MyApp({Component, pageProps: {session, ...pageProps}}) {
    return (
        <div className={`${inter.className} ${openSans.className}`}>
            <SessionProvider session={session}>
                <CurrencyProvider>
                    <Header />
                    <Component {...pageProps} />
                    <Footer />
                </CurrencyProvider>
            </SessionProvider>
        </div>
    );
}

export default MyApp;
