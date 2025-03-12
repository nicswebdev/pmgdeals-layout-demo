import {AccordionBasic, CardProperty, Hero, SectionHeading} from "@/components";
import Head from "next/head";
import {useEffect, useState} from "react";

export default function Faq({
    homepageDeals,
    staticPage,
    defaultImage,
    randomDeals1,
    randomDeals2,
    randomDeals3,
    randomDeals4,
}) {
    const faqs = [
        {
            question: "1. When will I receive my PMG Deals Voucher?",
            answer: "You will receive an email along with your voucher within 5 minutes after making the booking via pmgdeals.com.",
        },
        {
            question: "2. What happens if I forgot my username and password?",
            answer: "If you forget your password, you can reset it by selecting Forgot Password and following the provided instructions. Alternatively, you can email us at hello@pmgdeals.com, and we will send you your login details.",
        },
        {
            question: "3. Does my PMG Deals Voucher have an expiry date?",
            answer: "Yes, PMG Deals Vouchers do have expiration dates. Each voucher is valid for up to 6 months from the date of issue. The expiry date and terms of use are included in the voucher email.",
        },
        {
            question: "4. Can I give my PMG Deals voucher to someone else?",
            answer: "Yes, you can give your PMG Deals voucher to someone else. However, it is important to provide their details when confirming the booking. <br /> <br /> Additionally, we require identification for both yourself and the recipient of the voucher to verify the booking. Please ensure that you enter the correct guest’s details when making your booking. Note that you are fully responsible for the booking. To make a booking for your family and friends, please email us at hello@pmgdeals.com.",
        },
        {
            question:
                "5. What is the refund policy for PMG Deals? Does this policy apply to all packages purchased through PMG Deals?",
            answer: "The voucher is non-refundable, non-transferable, and cannot be exchanged for cash. Any unutilized portion of the voucher will be forfeited and will not be subject to a refund.",
        },
        {
            question: "6. Can I change my confirmed booking?",
            answer: "Your booking is non-refundable and cannot be changed to other dates once you have confirmed the date with our reservation team, except in specific cases like force majeure, according to the hotel`s policy. If the hotel does allow you to amend your booking, you must re-book (subject to availability). Please note that even in this case, the booking remains non-refundable.",
        },
        {
            question: "7. How can I pay for my booking?",
            answer: "",
        },
    ];

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
                <title>{staticPage.content.faq_seo_title}</title>
                <meta
                    name="description"
                    content={staticPage.content.faq_seo_descriptions}
                />
                <meta
                    name="keyword"
                    content={staticPage.content.faq_seo_keyword}
                />
                <meta
                    property="og:title"
                    content={staticPage.content.faq_seo_title}
                />
                <meta
                    property="og:description"
                    content={staticPage.content.faq_seo_descriptions}
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
                        FAQ
                    </SectionHeading>

                    <div className="pb-20">
                        {faqs.map((faq, index) => (
                            <AccordionBasic
                                key={`faq-accordion-basic-${index}`}
                                title={
                                    <p className="xl:text-[1.25rem]">
                                        {faq.question}
                                    </p>
                                }
                                description={
                                    <p className="xl:text-[1.25rem]">
                                        {faq.answer}
                                    </p>
                                }
                            />
                        ))}
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
    const staticPage = await fetch(
        `https://cms.pmgdeals.com/api/public/content?page=faq`
    ).then((res) => res.json());

    const defaultImage = await fetch(
        `https://cms.pmgdeals.com/api/public/image`
    ).then((res) => res.json());

    const homepageDeals = await fetch(
        `https://cms.pmgdeals.com/api/public/homepage`
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
            staticPage,
            defaultImage,
            homepageDeals,
            randomDeals1,
            randomDeals2,
            randomDeals3,
            randomDeals4,
        },
    };
}
