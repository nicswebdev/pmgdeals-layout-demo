import {CardProperty, Hero, PropertyFilter, SectionHeading} from "@/components";
import Head from "next/head";
import {useState} from "react";

export default function HotelsCategory({
    dealsData,
    categoryData,
    propertyData,
    defaultImage,
}) {
    const showToast = (message, type = "default") => {
        switch (type) {
            case "success":
                toast.success(message);
                break;
            case "error":
                toast.error(message);
                break;
            default:
                toast(message);
        }
    };

    const [filteredDeals, setFilteredDeals] = useState(dealsData.deals);
    const [priceRange, setPriceRange] = useState({min: 0, max: 50000000});

    const filterDealsByPrice = (minPrice, maxPrice) => {
        const filtered = dealsData.deals.filter((deal) => {
            const dealPrice = parseInt(deal.deals_promo_price, 10);
            return dealPrice >= minPrice && dealPrice <= maxPrice;
        });
        setFilteredDeals(filtered);
    };

    const handlePriceRangeChange = (minPrice, maxPrice) => {
        setPriceRange({min: minPrice, max: maxPrice});
        filterDealsByPrice(minPrice, maxPrice);
    };
    return (
        <main>
            <Head>
                <title>{propertyData.property_detail.property_seo_title}</title>
                <meta
                    name="description"
                    content={
                        propertyData.property_detail.property_seo_descriptions
                    }
                />
                <meta
                    name="keyword"
                    content={propertyData.property_detail.property_seo_keyword}
                />
                <meta
                    property="og:title"
                    content={propertyData.property_detail.property_seo_title}
                />
                <meta
                    property="og:description"
                    content={
                        propertyData.property_detail.property_seo_descriptions
                    }
                />
                <meta
                    property="og:image"
                    content={`https://cms.pmgdeals.com/uploads/og-image.png`}
                />
            </Head>
            <Hero />
            <div className="py-32">
                <div className="container">
                    <div className="pb-20">
                        <PropertyFilter />
                    </div>
                    <div>
                        <div className="[&>p]:pb-0 pb-10 lg:pb-16 pl-5 xl:pl-10 flex justify-between max-md:flex-col">
                            <SectionHeading>
                                {propertyData.property_detail.property_name}
                            </SectionHeading>
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

export async function getServerSideProps({params}) {
    const currentCategoryId = params.id;

    const dealsData = await fetch(
        `https://cms.pmgdeals.com/api/public/deals/property?id=` +
            currentCategoryId
    ).then((res) => res.json());

    const categoryData = await fetch(
        `https://cms.pmgdeals.com/api/public/category`
    ).then((res) => res.json());

    const propertyData = await fetch(
        `https://cms.pmgdeals.com/api/public/property/detail?id=` +
            currentCategoryId
    ).then((res) => res.json());

    const defaultImage = await fetch(
        `https://cms.pmgdeals.com/api/public/image`
    ).then((res) => res.json());

    return {
        props: {
            dealsData,
            categoryData,
            propertyData,
            defaultImage,
        },
    };
}
