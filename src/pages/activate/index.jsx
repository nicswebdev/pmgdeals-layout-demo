import {CardProperty, Hero, SectionHeading} from "@/components";
import parse from "html-react-parser";
import Head from "next/head";
import {useRouter} from "next/router";
import Script from "next/script";
import {useEffect, useState} from "react";

export default function Activate() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const token = router.query.token;
        if (token) {
            activateAccount(token);
        } else {
            setLoading(false);
        }
    }, [router.query]);

    const activateAccount = async (token) => {
        try {
            const response = await fetch(
                "https://cms.pmgdeals.com/api/public/activate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({token}),
                }
            );
            const data = await response.json();

            setLoading(false);

            if (response.ok) {
                router.push("/login");
            } else {
                setErrorMessage(
                    data.message || "Activation failed. Please try again."
                );
            }
        } catch (error) {
            setLoading(false);
            setErrorMessage("An error occurred while activating your account.");
        }
    };

    return (
        <main>
            <Head>
                <title>Member Activation - PMG Deals Bali</title>
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
            </Head>
            <Hero />
            <div className="py-32">
                <div className="container">
                    <SectionHeading style={{textAlign: "center"}}>
                        Member Activation
                    </SectionHeading>

                    {loading ? (
                        <div className="text-center text-[0.875rem] lg:text-[1.25rem]">
                            Activating your account..
                        </div>
                    ) : (
                        <div className="text-center text-[0.875rem] lg:text-[1.25rem]">
                            Please wait...
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
