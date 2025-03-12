import {CardProperty, Hero, SectionHeading} from "@/components";
import {useCurrency} from "@/context/CurrencyContext";
import {useSession} from "next-auth/react";
import Head from "next/head";
import {useRouter} from "next/router";
import {useEffect, useMemo, useState} from "react";

export default function Dashboard({homepageDeals, defaultImage}) {
    const formatter = useMemo(() => new Intl.NumberFormat("en-US"), []);

    const {currency, rates} = useCurrency();

    const {data: session, status} = useSession();
    const [dealsData, setDealsData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login"); // Redirect to login if not authenticated
        }
    }, [status, router]);

    useEffect(() => {
        if (session) {
            const memberId = session.user.member_id;
            fetch(
                `https://cms.pmgdeals.com/api/public/dashboard?id=` + memberId
            )
                .then((res) => res.json())
                .then((data) => setDealsData(data))
                .catch((error) =>
                    console.error("Error fetching favorites:", error)
                );
        }
    }, [session]);

    const handleDownload = async (orderId, code) => {
        try {
            const response = await fetch(
                `https://cms.pmgdeals.com/api/public/voucher?id=${orderId}`,
                {
                    // Add any necessary headers, like authentication tokens
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = "Voucher-#" + code + ".pdf"; // You can specify a name for the downloaded file
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        } catch (error) {
            console.error("Error downloading the file:", error);
        }
    };
    return (
        <main>
            <Head>
                <title>{homepageDeals.homepage.homepage_seo_title}</title>
                <meta
                    name="description"
                    content={homepageDeals.homepage.homepage_seo_descriptions}
                />
                <meta
                    name="keyword"
                    content={homepageDeals.homepage.homepage_seo_keyword}
                />
                <meta
                    property="og:title"
                    content={homepageDeals.homepage.homepage_seo_title}
                />
                <meta
                    property="og:description"
                    content={homepageDeals.homepage.homepage_seo_descriptions}
                />
                <meta
                    property="og:image"
                    content={`https://cms.pmgdeals.com/uploads/og-image.png`}
                />
            </Head>
            <Hero />
            <div className="py-32">
                <div className="container">
                    <SectionHeading>Dashboard</SectionHeading>

                    <div className="overflow-y-auto">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    {[
                                        "Purchase Code",
                                        "Package Name",
                                        "Purchase Date",
                                        "Total Amount",
                                        "Payment Status",
                                        "Usage Status",
                                        "Voucher ",
                                    ].map((heading, index) => (
                                        <th
                                            className="px-4 py-2 xl:py-4 font-normal whitespace-nowrap text-left text-white bg-primary"
                                            key={`table-heading-${index}`}
                                        >
                                            {heading}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {dealsData &&
                                    dealsData.deals.map((item, index) => (
                                        <tr
                                            className="bg-gray-300 even:bg-gray-100"
                                            key={`row-${index}`}
                                        >
                                            <td className="px-4 py-2 xl:py-4">
                                                {deal.order_code}
                                            </td>
                                            <td className="px-4 py-2 xl:py-4">
                                                {deal.deals_name}
                                            </td>
                                            <td className="px-4 py-2 xl:py-4">
                                                {deal.created}
                                            </td>
                                            <td className="px-4 py-2 xl:py-4">
                                                {currency}{" "}
                                                {formatter.format(
                                                    rates[currency]
                                                        ? deal.total_amount *
                                                              rates[currency]
                                                        : deal.total_amount
                                                )}
                                            </td>
                                            <td className="px-4 py-2 xl:py-4">
                                                {deal.status}
                                            </td>
                                            <td className="px-4 py-2 xl:py-4">
                                                {deal.usage_status}
                                            </td>
                                            <td className="px-4 py-2 xl:py-4">
                                                {deal.status === "PAID" ? (
                                                    <button
                                                        onClick={() =>
                                                            handleDownload(
                                                                deal.order_id,
                                                                deal.order_code
                                                            )
                                                        }
                                                        className="px-2 py-1 bg-[#dba628] text-white rounded-md"
                                                    >
                                                        Download
                                                    </button>
                                                ) : (
                                                    "-"
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}

export async function getServerSideProps() {
    const homepageDeals = await fetch(
        `https://cms.pmgdeals.com/api/public/homepage`
    ).then((res) => res.json());

    const defaultImage = await fetch(
        `https://cms.pmgdeals.com/api/public/image`
    ).then((res) => res.json());

    return {
        props: {
            homepageDeals,
            defaultImage,
        },
    };
}
