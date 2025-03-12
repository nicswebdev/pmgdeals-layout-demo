import {
    ButtonViewAll,
    Hero,
    PropertyFilter,
    SectionHeading,
    SwiperPropertyList,
} from "@/components";
import {useCurrency} from "@/context/CurrencyContext";
import Head from "next/head";
import {useEffect, useState} from "react";

export default function Hotels({
    dealsData,
    propertyData,
    categoryData,
    categoryDetailData,
    currentCategoryId,
    defaultImage,
}) {
    const {currency, rates} = useCurrency();

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

    useEffect(() => {
        setFilteredDeals(dealsData.deals); // Update with the new category's deals
        applyPriceFilter(priceRange.min, priceRange.max); // Reapply the current price filter
    }, [dealsData.deals, priceRange]);

    const handlePriceRangeChange = (minPrice, maxPrice) => {
        setPriceRange({min: minPrice, max: maxPrice});
        applyPriceFilter(minPrice, maxPrice);
    };

    const applyPriceFilter = (minPrice, maxPrice) => {
        const newFilteredDeals = dealsData.deals.filter((deal) => {
            const dealPrice = parseInt(deal.deals_promo_price, 10);
            return dealPrice >= minPrice && dealPrice <= maxPrice;
        });

        setFilteredDeals(newFilteredDeals);
    };
    return (
        <main>
            <Head>
                <title>
                    {categoryDetailData.category.deals_category_seo_title}
                </title>
                <meta
                    name="description"
                    content={
                        categoryDetailData.category
                            .deals_category_seo_descriptions
                    }
                />
                <meta
                    name="keyword"
                    content={
                        categoryDetailData.category.deals_category_seo_keyword
                    }
                />
                <meta
                    property="og:title"
                    content={
                        categoryDetailData.category.deals_category_seo_title
                    }
                />
                <meta
                    property="og:description"
                    content={
                        categoryDetailData.category
                            .deals_category_seo_descriptions
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
                        <PropertyFilter
                            currency={currency}
                            rates={rates}
                            onPriceChange={handlePriceRangeChange}
                        />
                    </div>

                    {propertyData.property.map((propertyItem, index) => {
                        // Filter deals for the current property
                        const propertyDeals = filteredDeals.filter(
                            (deal) => deal.property === propertyItem.property_id
                        );

                        // If there are no deals for this property, don't render anything for this property
                        if (propertyDeals.length === 0) {
                            return null;
                        }

                        return (
                            <div className="pb-20">
                                <div className="[&>p]:pb-0 pb-10 lg:pb-16 pl-5 xl:pl-10 flex justify-between max-md:flex-col">
                                    <SectionHeading>
                                        {propertyItem.property_name}
                                    </SectionHeading>

                                    <ButtonViewAll
                                        href={`/property/${propertyItem.property_id}`}
                                    />
                                </div>
                                <SwiperPropertyList deals={propertyDeals} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}

export async function getServerSideProps({params}) {
    const currentCategoryId = params.id;

    const dealsData = await fetch(
        `https://cms.pmgdeals.com/api/public/deals/category?id=` +
            currentCategoryId
    ).then((res) => res.json());

    const propertyData = await fetch(
        `https://cms.pmgdeals.com/api/public/property`
    ).then((res) => res.json());

    const categoryData = await fetch(
        `https://cms.pmgdeals.com/api/public/category`
    ).then((res) => res.json());

    const categoryDetailData = await fetch(
        `https://cms.pmgdeals.com/api/public/category/detail?id=` +
            currentCategoryId
    ).then((res) => res.json());

    const defaultImage = await fetch(
        `https://cms.pmgdeals.com/api/public/image`
    ).then((res) => res.json());

    return {
        props: {
            dealsData,
            propertyData,
            categoryData,
            currentCategoryId,
            categoryDetailData,
            defaultImage,
        },
    };
}
