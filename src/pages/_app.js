import "@/styles/globals.css";
import {Inter, Open_Sans} from "next/font/google";

import {Footer, Header} from "@/components";

import {CurrencyProvider} from "@/context/CurrencyContext";
import {SessionProvider} from "next-auth/react";
import Script from "next/script";

const inter = Inter({subsets: ["latin"]});
const openSans = Open_Sans({subsets: ["latin"]});

function MyApp({Component, pageProps: {session, ...pageProps}}) {
    return (
        <>
            <div className={`${inter.className} ${openSans.className}`}>
                <SessionProvider session={session}>
                    <CurrencyProvider>
                        {/* Google Analytics: G-5LJ54LKV6B */}
                        <Script
                            src="https://www.googletagmanager.com/gtag/js?id=G-5LJ54LKV6B"
                            strategy="afterInteractive"
                        />
                        <Script id="ga-gtag" strategy="afterInteractive">
                            {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-5LJ54LKV6B');
                            `}
                        </Script>
                        <Header />
                        <Component {...pageProps} />
                        <Footer />
                    </CurrencyProvider>
                </SessionProvider>
            </div>
        </>
    );
}

export default MyApp;
