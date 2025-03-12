import {
    CardProperty,
    Hero,
    SectionHeading,
    SwiperPropertyList,
} from "@/components";
import Fuse from "fuse.js";
import {useSession} from "next-auth/react";
import Head from "next/head";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function Search({homepageDeals, dealsData, defaultImage}) {
    const router = useRouter();

    const {query} = router.query;
    const [filteredDeals, setFilteredDeals] = useState([]);

    useEffect(() => {
        if (dealsData && dealsData.deals) {
            const options = {
                includeScore: true,
                threshold: 0.3, // Adjust this value as needed
                // distance: 800, // Adjust this value as needed
                minMatchCharLength: 4, // Adjust this value as needed
                ignoreLocation: true,
                keys: [
                    "deals_name",
                    "deals_excerpt",
                    "deals_descriptions",
                    "deals_inclusions",
                    "tags",
                    "property_name",
                    "voucher_util",
                    "deals_seo_title",
                    "property_seo_title",
                    "deals_seo_descriptions",
                ],
                // Add more options as needed
            };
            const fuse = new Fuse(dealsData.deals, options);

            if (query) {
                const results = fuse.search(query).map((result) => result.item);
                setFilteredDeals(results);
            } else {
                setFilteredDeals(dealsData.deals);
            }
        }
    }, [query, dealsData]);
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
                    <div>
                        <div className="[&>p]:pb-0 pb-10 lg:pb-16 pl-5 xl:pl-10 flex justify-between max-md:flex-col">
                            <SectionHeading>Search result</SectionHeading>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-1 md:gap-x-3 lg:gap-x-2 gap-y-4">
                            {filteredDeals.map((item) => (
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

    const dealsData = await fetch(
        `https://cms.pmgdeals.com/api/public/deals/searchdeals`
    ).then((res) => res.json());

    const defaultImage = await fetch(
        `https://cms.pmgdeals.com/api/public/image`
    ).then((res) => res.json());

    return {
        props: {
            homepageDeals,
            dealsData,
            defaultImage,
        },
    };
}
