import {CardProperty, Hero, SectionHeading} from "@/components";
import parse from "html-react-parser";
import Head from "next/head";
import {useRouter} from "next/router";
import Script from "next/script";
import {useEffect, useState} from "react";

export default function ThankYou() {
    const router = useRouter();
    const {id} = router.query;

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        fetch(`https://cms.pmgdeals.com/api/public/order/get_order?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                setOrder(data?.order_detail);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        if (!loading && order) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "purchase",
                value: parseInt(order.total_amount) || 0,
                transaction_id: order.order_code,
                u1: "IDR",
                u2: order.property_name,
                u3: order.deals_name,
                send_to: "DC-14661078/sales0/pmgde0+transactions",
            });

            // Optionally trigger gtag for DoubleClick as well
            if (typeof window.gtag === "function") {
                window.gtag("event", "purchase", {
                    allow_custom_scripts: true,
                    value: parseInt(order.total_amount) || 0,
                    transaction_id: order.order_code,
                    u1: "IDR",
                    u2: order.property_name,
                    u3: order.deals_name,
                    send_to: "DC-14661078/sales0/pmgde0+transactions",
                });
            }
        }
    }, [loading, order]);

    return (
        <main>
            <Head>
                <title>Thank You - PMG Deals Bali</title>
                <meta
                    name="description"
                    content="PMG Deals is all about the best limited-time package deals for great savings on room, food and beverage, and spa treatments at Bali Niksoma, The Magani and The Bandha."
                />
                <meta
                    name="keyword"
                    content="pmg, pmg deals, pmg bali, deals pmg, bali hotel deals, the bandha, bali niksoma, the magani, bali hotel, hotel deals, spa deals, restaurant deals, visala spa, hitana restaurant, mozzarella restaurant and bar, mozzarella by the sea."
                />
                <meta property="og:title" content="About Us - PMG Deals Bali" />
                <meta
                    property="og:description"
                    content="PMG Deals is all about the best limited-time package deals for great savings on room, food and beverage, and spa treatments at Bali Niksoma, The Magani and The Bandha."
                />
                <meta
                    property="og:image"
                    content={`https://cms.pmgdeals.com/uploads/og-image.png`}
                />

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
                {/* Google tag (gtag.js) */}
                <Script
                    id="gtag-base"
                    src="https://www.googletagmanager.com/gtag/js?id=DC-14661078"
                    strategy="afterInteractive"
                />
                <Script id="gtag-config" strategy="afterInteractive">
                    {`
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'DC-14661078');
                    `}
                </Script>
            </Head>

            {/* GTM NoScript for <body> */}
            <noscript>
                <iframe
                    src="https://www.googletagmanager.com/ns.html?id=GTM-KXH2TWRV"
                    height="0"
                    width="0"
                    style={{display: "none", visibility: "hidden"}}
                ></iframe>
            </noscript>

            <Hero />
            <div className="py-32">
                <div className="container">
                    <SectionHeading style={{textAlign: "center"}}>
                        Thank You for Your Order!
                    </SectionHeading>

                    <div className="text-center text-[0.875rem] lg:text-[1.25rem]">
                        Your order was successful.
                        <br />
                        We've sent you a confirmation email.
                    </div>

                    {!loading && order && (
                        <>
                            <div className="mt-6 text-center">
                                <strong>Order ID:</strong> {order.order_code}{" "}
                                <br />
                                {/* ...more details... */}
                            </div>
                            {/* DoubleClick noscript pixel */}
                            <noscript>
                                <img
                                    src={`https://ad.doubleclick.net/ddm/activity/src=14661078;type=sales0;cat=pmgde0;qty=1;cost=${
                                        order.total_amount
                                    };u1=IDR;u2=${encodeURIComponent(
                                        order.property_name
                                    )};u3=${encodeURIComponent(
                                        order.deals_name
                                    )};ord=${order.order_code}?`}
                                    width="1"
                                    height="1"
                                    alt=""
                                />
                            </noscript>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}
