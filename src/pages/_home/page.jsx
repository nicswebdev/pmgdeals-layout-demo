import Head from "next/head";
import {PropertyFilter, SwiperPropertyList} from "@/components";
import MonthPicks from "./_sections/MonthPicks";
import {useEffect, useState} from "react";

export default function Home({
    categoryData,
    homepageDeals,
    randomDeals1,
    randomDeals2,
    randomDeals3,
    randomDeals4,
}) {
    const [filteredSection1Deals, setFilteredSection1Deals] = useState([]);
    const [filteredSection2Deals, setFilteredSection2Deals] = useState([]);
    const [filteredSection3Deals, setFilteredSection3Deals] = useState([]);
    const [filteredHighlightDeals, setFilteredHighlightDeals] = useState([]);

    useEffect(() => {
        // Check if section deals are empty and set states accordingly
        setFilteredSection1Deals(
            homepageDeals.homepage.section1_deals.length > 0
                ? homepageDeals.homepage.section1_deals
                : randomDeals1.deals
        );

        setFilteredSection2Deals(
            homepageDeals.homepage.section2_deals.length > 0
                ? homepageDeals.homepage.section2_deals
                : randomDeals2.deals
        );

        setFilteredSection3Deals(
            homepageDeals.homepage.section3_deals.length > 0
                ? homepageDeals.homepage.section3_deals
                : randomDeals3.deals
        );

        setFilteredHighlightDeals(
            homepageDeals.homepage.highlight_deals.length > 0
                ? homepageDeals.homepage.highlight_deals
                : randomDeals4.deals
        );
    }, [homepageDeals, randomDeals1, randomDeals2, randomDeals3, randomDeals4]);

    // Function to filter deals based on selected price range
    const filterDeals = (deals, minPrice, maxPrice) => {
        return deals.filter((deal) => {
            const price = parseInt(deal.deals_promo_price);
            return price >= minPrice && price <= maxPrice;
        });
    };

    // Callback function to handle price range changes from RangeSlider
    const handlePriceRangeChange = (minPrice, maxPrice) => {
        const getFilteredDealsOrRandom1 = (sectionDeals) => {
            // If section deals exist, filter them; otherwise, use random deals
            return sectionDeals.length > 0
                ? filterDeals(sectionDeals, minPrice, maxPrice)
                : filterDeals(randomDeals1.deals, minPrice, maxPrice);
        };

        const getFilteredDealsOrRandom2 = (sectionDeals) => {
            // If section deals exist, filter them; otherwise, use random deals
            return sectionDeals.length > 0
                ? filterDeals(sectionDeals, minPrice, maxPrice)
                : filterDeals(randomDeals2.deals, minPrice, maxPrice);
        };

        const getFilteredDealsOrRandom3 = (sectionDeals) => {
            // If section deals exist, filter them; otherwise, use random deals
            return sectionDeals.length > 0
                ? filterDeals(sectionDeals, minPrice, maxPrice)
                : filterDeals(randomDeals3.deals, minPrice, maxPrice);
        };

        setFilteredSection1Deals(
            getFilteredDealsOrRandom1(homepageDeals.homepage.section1_deals)
        );
        setFilteredSection2Deals(
            getFilteredDealsOrRandom2(homepageDeals.homepage.section2_deals)
        );
        setFilteredSection3Deals(
            getFilteredDealsOrRandom3(homepageDeals.homepage.section3_deals)
        );
    };

    return (
        <>
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

            <MonthPicks deals={filteredHighlightDeals} />

            <div className="py-20">
                <div className="container">
                    <div className="pb-10">
                        <p className="font-medium text-[1.25rem] lg:text-[3rem] text-[#660000]">
                            Unbeatable PMG Deals!
                        </p>
                    </div>

                    <PropertyFilter />
                </div>
            </div>

            <div className="pb-10">
                <div className="container">
                    <p className="pl-5 xl:pl-10 pb-5 font-medium text-[1.125rem] lg:text-[2.25rem] text-[#660000]">
                        {homepageDeals.homepage.section1_title}
                    </p>
                </div>
                <SwiperPropertyList deals={filteredSection1Deals} />
            </div>

            <div className="pb-10">
                <div className="container">
                    <p className="pl-5 xl:pl-10 pb-5 font-medium text-[1.125rem] lg:text-[2.25rem] text-[#660000]">
                        {homepageDeals.homepage.section2_title}
                    </p>
                </div>
                <SwiperPropertyList deals={filteredSection2Deals} />
            </div>

            <div className="pb-14 xl:pb-20">
                <div className="container">
                    <div className="pb-10">
                        <p className="font-medium text-[1.25rem] lg:text-[2.25rem] text-[#660000]">
                            Why Choose PMG Deals?
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 md:max-lg:max-w-[40rem] md:max-lg:mx-auto">
                        {[
                            {
                                id: 1,
                                icon: "/images/home/why-choose-pmg-deals/1.png",
                                label: "Easy access to savings on exclusive\n offers from PMG Hotels & Suites",
                            },
                            {
                                id: 2,
                                icon: "/images/home/why-choose-pmg-deals/2.png",
                                label: "Discover unbeatable savings\n with our exclusive offers",
                            },
                            {
                                id: 3,
                                icon: "/images/home/why-choose-pmg-deals/3.png",
                                label: "Find deals from all three of our\n properties in one place",
                            },
                        ].map(({id, icon, label}) => (
                            <div
                                key={`card-deal-${id}`}
                                className="flex flex-col items-center justify-center gap-6 my-2 mx-2 px-4 xl:px-10 py-6 xl:py-14 rounded-[1.25rem] shadow-[0px_4px_6.7px_rgba(0,0,0,0.25)] bg-white"
                            >
                                <div className="w-[6.25rem] aspect-square">
                                    <img
                                        src={icon}
                                        alt="Icon"
                                        className="w-full"
                                    />
                                </div>

                                <p
                                    className="font-medium text-[0.875rem] lg:text-[1.25rem] text-center text-[#660000]"
                                    style={{whiteSpace: "pre-line"}}
                                >
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
