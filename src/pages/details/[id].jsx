import {ButtonBasic, ButtonHeart, Hero} from "@/components";
import {useCurrency} from "@/context/CurrencyContext";
import {useSession} from "next-auth/react";
import Head from "next/head";
import {useEffect, useMemo, useState} from "react";
import parse from "html-react-parser";

export default function Description({
    dealsData,
    dealsAddonCategoryData,
    dealsAddonData,
}) {
    const formatter = useMemo(
        () =>
            new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }),
        []
    );

    const idrFormatter = useMemo(() => new Intl.NumberFormat("en-US"), []);

    const {data: session} = useSession();

    const [favorites, setFavorites] = useState([]);

    const {currency, rates} = useCurrency();

    useEffect(() => {
        const fetchFavorites = async () => {
            if (session) {
                try {
                    const response = await fetch(
                        "https://cms.pmgdeals.com/api/public/favourite/all?member_id=" +
                            session.user.member_id,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                // Add Authorization header if your API requires it
                            },
                        }
                    );

                    if (!response.ok) {
                        throw new Error("Failed to fetch favorites");
                    }

                    const data = await response.json();
                    setFavorites(data.favourites);
                } catch (error) {
                    console.error("Error fetching favorites:", error);
                }
            }
        };

        fetchFavorites();
    }, [session]);

    const isFavorite = favorites.some(
        (fav) => fav.deals_id === dealsData.deals_detail.deals_id
    );

    const handleFavoriteClick = () => {
        if (!session) {
            // Redirect to login if not authenticated
            signIn();
        } else {
            // Send API request to mark as favorite
            if (isFavorite) {
                // Logic to remove from favorites
                removeAsFavorite(dealsData.deals_detail);
            } else {
                // Logic to add to favorites (existing markAsFavorite function)
                markAsFavorite(dealsData.deals_detail);
            }
        }
    };

    const markAsFavorite = async (deal) => {
        try {
            // Replace with your API call logic
            // Assuming your API requires user's token which is stored in session
            const response = await fetch(
                "https://cms.pmgdeals.com/api/public/favourite",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // or however your token is stored
                    },
                    body: JSON.stringify({
                        dealId: dealsData.deals_detail.deals_id,
                        memberId: session.user.member_id,
                        type: "add",
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Error marking deal as favorite");
            }

            showToast("Deal added to favorites!", "success");
            setFavorites((prevFavorites) => [
                ...prevFavorites,
                {deals_id: dealsData.deals_detail.deals_id},
            ]);

            // Handle the response as needed
        } catch (error) {
            console.error("Failed to mark as favorite:", error);
            showToast("Failed to add deal to favorites.", "error");
        }
    };

    const removeAsFavorite = async (deal) => {
        try {
            // Replace with your API call logic
            // Assuming your API requires user's token which is stored in session
            const response = await fetch(
                "https://cms.pmgdeals.com/api/public/favourite",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // or however your token is stored
                    },
                    body: JSON.stringify({
                        dealId: dealsData.deals_detail.deals_id,
                        memberId: session.user.member_id,
                        type: "remove",
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Error marking deal as favorite");
            }

            showToast("Deal removed from favorites!", "success");

            setFavorites((prevFavorites) =>
                prevFavorites.filter(
                    (fav) => fav.deals_id !== dealsData.deals_detail.deals_id
                )
            );

            // Handle the response as needed
        } catch (error) {
            console.error("Failed to mark as favorite:", error);
            showToast("Failed to remove deal from favorites.", "error");
        }
    };

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

    return (
        <main>
            <Head>
                <title>{dealsData.deals_detail.deals_seo_title}</title>
                <meta
                    name="description"
                    content={dealsData.deals_detail.deals_seo_descriptions}
                />
                <meta
                    name="keyword"
                    content={dealsData.deals_detail.deals_seo_keyword}
                />
                <meta
                    property="og:title"
                    content={dealsData.deals_detail.deals_seo_title}
                />
                <meta
                    property="og:description"
                    content={dealsData.deals_detail.deals_seo_descriptions}
                />
                <meta
                    property="og:image"
                    content={`https://cms.pmgdeals.com/uploads/deals/${dealsData.deals_detail.deals_image}`}
                />
            </Head>
            <Hero
                image={`https://cms.pmgdeals.com/uploads/deals/${dealsData.deals_detail.deals_image}`}
            />

            <div className="py-32 details">
                <div className="container">
                    <div className="flex flex-wrap justify-between gap-y-10 py-20">
                        <div className="max-md:basis-full flex gap-4 lg:gap-8 xl:gap-12">
                            {/* Title */}
                            <div>
                                <h2 className="font-medium text-[1.5rem] lg:text-[2.5rem] text-[#660000]">
                                    {dealsData.deals_detail.deals_name}
                                </h2>
                                <p className="font-medium text-[1rem] lg:text-[1.25rem]">
                                    {dealsData.deals_detail.property_name}
                                </p>
                            </div>
                            {/* End - Title */}

                            <div className="shrink-0 flex items-center h-[2.25rem] lg:h-[3.75rem]">
                                <ButtonHeart
                                    dealsId={dealsData.deals_detail.deals_id}
                                />
                            </div>
                        </div>

                        {/* Price */}
                        <div className="max-md:basis-full flex flex-col items-start">
                            <p className="font-medium text-[1.5rem] lg:text-[2.5rem] text-[#660000]">
                                {currency === "IDR"
                                    ? `${currency}
                                                ${idrFormatter.format(
                                                    rates[currency]
                                                        ? (
                                                              dealsData
                                                                  .deals_detail
                                                                  .deals_promo_price *
                                                              rates[currency]
                                                          ).toFixed(2)
                                                        : dealsData.deals_detail
                                                              .deals_promo_price
                                                )}`
                                    : `${currency}
                                                ${formatter.format(
                                                    rates[currency]
                                                        ? (
                                                              dealsData
                                                                  .deals_detail
                                                                  .deals_promo_price *
                                                              rates[currency]
                                                          ).toFixed(2)
                                                        : dealsData.deals_detail
                                                              .deals_promo_price
                                                )}`}
                            </p>
                            <p className="relative font-medium text-[1rem] lg:text-[1.25rem] px-2 lg:px-4">
                                <span>
                                    {dealsData.deals_detail
                                        .deals_base_price && (
                                        <span>
                                            {currency === "IDR"
                                                ? `${currency}
                                                    ${idrFormatter.format(
                                                        rates[currency]
                                                            ? (
                                                                  dealsData
                                                                      .deals_detail
                                                                      .deals_base_price *
                                                                  rates[
                                                                      currency
                                                                  ]
                                                              ).toFixed(2)
                                                            : dealsData
                                                                  .deals_detail
                                                                  .deals_base_price
                                                    )}`
                                                : `${currency}
                                                    ${formatter.format(
                                                        rates[currency]
                                                            ? (
                                                                  dealsData
                                                                      .deals_detail
                                                                      .deals_base_price *
                                                                  rates[
                                                                      currency
                                                                  ]
                                                              ).toFixed(2)
                                                            : dealsData
                                                                  .deals_detail
                                                                  .deals_base_price
                                                    )}`}
                                        </span>
                                    )}
                                </span>
                                <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-[0.0625rem] bg-red"></span>
                            </p>
                        </div>
                        {/* End - Price */}
                    </div>

                    <div className="pb-10">
                        <p className="pb-4 font-bold lg:text-[1.25rem]">
                            Description
                        </p>
                        <div className="font-light lg:text-[1.25rem]">
                            {parse(dealsData.deals_detail.deals_descriptions)}
                        </div>
                    </div>

                    <div className="pb-10">
                        <h3 className="pb-4 font-bold lg:text-[1.25rem]">
                            Package Inclusions
                        </h3>
                        <div className="font-light lg:text-[1.25rem]">
                            {parse(dealsData.deals_detail.deals_inclusions)}
                        </div>
                    </div>

                    <div className="pb-10">
                        <h3 className="pb-4 font-bold lg:text-[1.25rem]">
                            Voucher Utilization
                        </h3>
                        <div className="font-light lg:text-[1.25rem]">
                            {parse(dealsData.deals_detail.voucher_util)}
                        </div>
                    </div>

                    <div className="flex">
                        <div className="w-full max-w-[22.75rem] max-lg:mx-auto lg:ml-auto">
                            <ButtonBasic
                                href={`/checkout/${dealsData.deals_detail.deals_id}`}
                                rounded
                            >
                                BOOK NOW
                            </ButtonBasic>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export async function getServerSideProps({params}) {
    const id = params.id;

    const dealsData = await fetch(
        `https://cms.pmgdeals.com/api/public/deals/detail?id=` + id
    ).then((res) => res.json());

    const dealsAddonCategoryData = await fetch(
        `https://cms.pmgdeals.com/api/public/deals/addoncategory?id=` + id
    ).then((res) => res.json());

    const dealsAddonData = await fetch(
        `https://cms.pmgdeals.com/api/public/deals/addon?id=` + id
    ).then((res) => res.json());

    return {
        props: {
            dealsData,
            dealsAddonCategoryData,
            dealsAddonData,
        },
    };
}
