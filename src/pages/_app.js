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

                        {/* GTM Script for <head> */}
                        <Script id="gtm-head" strategy="afterInteractive">
                            {`
                      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                      })(window,document,'script','dataLayer','GTM-KXH2TWRV');
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
