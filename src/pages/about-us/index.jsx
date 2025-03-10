import {CardProperty, Hero, SectionHeading} from "@/components";
import parse from "html-react-parser";
import Head from "next/head";
import {useEffect, useState} from "react";

export default function AboutUs({
    homepageDeals,
    aboutPage,
    defaultImage,
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
        <main>
            <Head>
                <title>{aboutPage.content.about_seo_title}</title>
                <meta
                    name="description"
                    content={aboutPage.content.about_seo_descriptions}
                />
                <meta
                    name="keyword"
                    content={aboutPage.content.about_seo_keyword}
                />
                <meta
                    property="og:title"
                    content={aboutPage.content.about_seo_title}
                />
                <meta
                    property="og:description"
                    content={aboutPage.content.about_seo_descriptions}
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
                        {aboutPage.content.about_title}
                    </SectionHeading>

                    <div className="text-center text-[0.875rem] lg:text-[1.25rem] pb-20">
                        {parse(aboutPage.content.about_content)}
                    </div>

                    <div>
                        <SectionHeading>Our Recommendations</SectionHeading>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-1 md:gap-x-3 lg:gap-x-2 gap-y-4">
                            {filteredSection1Deals.map((item) => (
                                <CardProperty
                                    key={`recommendation-card-property-${item}`}
                                    deals={item}
                                />
                            ))}
                        </div>
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

    const aboutPage = await fetch(
        `https://cms.pmgdeals.com/api/public/content?page=about`
    ).then((res) => res.json());

    const defaultImage = await fetch(
        `https://cms.pmgdeals.com/api/public/image`
    ).then((res) => res.json());

    const randomDeals1 = await fetch(
        `https://cms.pmgdeals.com/api/public/deals/randomdealsone`
    ).then((res) => res.json());

    const randomDeals2 = await fetch(
        `https://cms.pmgdeals.com/api/public/deals/randomdealstwo`
    ).then((res) => res.json());

    const randomDeals3 = await fetch(
        `https://cms.pmgdeals.com/api/public/deals/randomdealsthree`
    ).then((res) => res.json());

    const randomDeals4 = await fetch(
        `https://cms.pmgdeals.com/api/public/deals/randomdealshighlight`
    ).then((res) => res.json());

    return {
        props: {
            homepageDeals,
            aboutPage,
            defaultImage,
            randomDeals1,
            randomDeals2,
            randomDeals3,
            randomDeals4,
        },
    };
}
