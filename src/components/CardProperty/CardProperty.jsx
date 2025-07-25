import {FaRegStar, FaStar} from "react-icons/fa6";
import {ButtonHeart} from "../ButtonHeart";
import {useEffect, useMemo, useState} from "react";
import {useSession} from "next-auth/react";
import {useCurrency} from "@/context/CurrencyContext";
import he from "he";
import Link from "next/link";
export default function CardProperty({deals}) {
    const randomString = Math.random().toString(36).substring(2, 9);
    // Get random between 1 and 3
    const random = Math.floor(Math.random() * 3) + 1;

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

    const isFavorite = favorites.some((fav) => fav.deals_id === deals.deals_id);

    const handleFavoriteClick = () => {
        if (!session) {
            // Redirect to login if not authenticated
            signIn();
        } else {
            // Send API request to mark as favorite
            if (isFavorite) {
                // Logic to remove from favorites
                removeAsFavorite(deals);
            } else {
                // Logic to add to favorites (existing markAsFavorite function)
                markAsFavorite(deals);
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
                        dealId: deal.deals_id,
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
                {deals_id: deal.deals_id},
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
                        dealId: deal.deals_id,
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
                prevFavorites.filter((fav) => fav.deals_id !== deal.deals_id)
            );

            // Handle the response as needed
        } catch (error) {
            console.error("Failed to mark as favorite:", error);
            showToast("Failed to remove deal from favorites.", "error");
        }
    };

    let decodedHtml = "";

    // Check if deals.badge exists and is not an empty string
    if (deals && deals.badge) {
        decodedHtml = he.decode(deals.badge);
    }

    return (
        <div className="relative h-full flex items-stretch">
            <a
                href={`/details/${deals.deals_id}`}
                className="group flex flex-col mx-2 my-2 px-3 py-4 lg:py-6 shadow-[-0.0625rem_0.0625rem_0.5rem_rgba(0,0,0,0.25)] transition-all duration-300 hover:opacity-70 "
            >
                <div className="aspect-video w-full rounded-[1.25rem] overflow-hidden">
                    <img
                        src={`https://cms.pmgdeals.com/uploads/deals/${deals.deals_image}`}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="pt-4">
                    <p className="pb-2 lg:pb-4 font-medium max-lg:text-[0.75rem]">
                        {deals.property_name}
                    </p>
                    <p className="pb-4 font-bold lg:text-[1.5rem] min-h-[4rem] lg:min-h-[5.5rem]">
                        {deals.deals_name}
                    </p>
                    <div className="pb-4 lg:pb-6 flex flex-wrap gap-2">
                        <p className="lg:text-[1.5rem]">
                            {currency}{" "}
                            {currency === "IDR"
                                ? idrFormatter.format(
                                      rates[currency]
                                          ? (
                                                deals.deals_promo_price *
                                                rates[currency]
                                            ).toFixed(2)
                                          : deals.deals_promo_price
                                  )
                                : formatter.format(
                                      rates[currency]
                                          ? (
                                                deals.deals_promo_price *
                                                rates[currency]
                                            ).toFixed(2)
                                          : deals.deals_promo_price
                                  )}
                        </p>
                        <p className="relative px-2 lg:text-[1.5rem]">
                            <span>
                                {deals.deals_base_price && (
                                    <span>
                                        {currency}{" "}
                                        {currency === "IDR"
                                            ? idrFormatter.format(
                                                  rates[currency]
                                                      ? (
                                                            deals.deals_base_price *
                                                            rates[currency]
                                                        ).toFixed(2)
                                                      : deals.deals_base_price
                                              )
                                            : formatter.format(
                                                  rates[currency]
                                                      ? (
                                                            deals.deals_base_price *
                                                            rates[currency]
                                                        ).toFixed(2)
                                                      : deals.deals_base_price
                                              )}
                                    </span>
                                )}
                            </span>
                            <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-[0.0625rem] bg-red"></span>
                        </p>
                    </div>
                    <div className="flex gap-3">
                        {deals.widget_icon ? (
                            <>
                                {deals.widget_link ? (
                                    <Link
                                        href={deals.widget_link}
                                        target="_blank"
                                    >
                                        <img
                                            src={`https://cms.pmgdeals.com/uploads/widget/${deals.widget_icon}`}
                                            alt="tripadvisor"
                                            className="w-[7rem] lg:w-[8.7rem] object-contain"
                                        />
                                    </Link>
                                ) : (
                                    <img
                                        src={`https://cms.pmgdeals.com/uploads/widget/${deals.widget_icon}`}
                                        alt="tripadvisor"
                                        className="w-[7rem] lg:w-[8.7rem] object-contain"
                                    />
                                )}
                            </>
                        ) : (
                            <>
                                {deals.badge && (
                                    <>
                                        {decodedHtml && (
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: decodedHtml,
                                                }}
                                            />
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* <div className="pt-4">
                    <p className="pb-2 lg:pb-4 font-medium max-lg:text-[0.75rem]">
                        {deals.property_name}
                    </p>
                    <div className="grid grid-rows-[auto_auto]">
                        <p className="font-bold lg:text-[1.5rem] min-h-[5.5rem] flex items-start">
                            {deals.deals_name}
                        </p>
                        <div className="flex flex-col gap-0">
                            <div className="pb-4 lg:pb-1 flex flex-wrap gap-2">
                                <p className="lg:text-[1.5rem]">
                                    {currency}{" "}
                                    {currency === "IDR"
                                        ? idrFormatter.format(
                                              rates[currency]
                                                  ? (
                                                        deals.deals_promo_price *
                                                        rates[currency]
                                                    ).toFixed(2)
                                                  : deals.deals_promo_price
                                          )
                                        : formatter.format(
                                              rates[currency]
                                                  ? (
                                                        deals.deals_promo_price *
                                                        rates[currency]
                                                    ).toFixed(2)
                                                  : deals.deals_promo_price
                                          )}
                                </p>
                                <p className="relative px-2 lg:text-[1.5rem]">
                                    <span>
                                        {deals.deals_base_price && (
                                            <span>
                                                {currency}{" "}
                                                {currency === "IDR"
                                                    ? idrFormatter.format(
                                                          rates[currency]
                                                              ? (
                                                                    deals.deals_base_price *
                                                                    rates[
                                                                        currency
                                                                    ]
                                                                ).toFixed(2)
                                                              : deals.deals_base_price
                                                      )
                                                    : formatter.format(
                                                          rates[currency]
                                                              ? (
                                                                    deals.deals_base_price *
                                                                    rates[
                                                                        currency
                                                                    ]
                                                                ).toFixed(2)
                                                              : deals.deals_base_price
                                                      )}
                                            </span>
                                        )}
                                    </span>
                                    <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-[0.0625rem] bg-red"></span>
                                </p>
                            </div>
                            <div className="flex gap-3">
                                {deals.widget_icon ? (
                                    <>
                                        {deals.widget_link ? (
                                            <Link
                                                href={deals.widget_link}
                                                target="_blank"
                                            >
                                                <img
                                                    src={`https://cms.pmgdeals.com/uploads/widget/${deals.widget_icon}`}
                                                    alt="tripadvisor"
                                                    className="w-[7rem] lg:w-[8.7rem] object-contain"
                                                />
                                            </Link>
                                        ) : (
                                            <img
                                                src={`https://cms.pmgdeals.com/uploads/widget/${deals.widget_icon}`}
                                                alt="tripadvisor"
                                                className="w-[7rem] lg:w-[8.7rem] object-contain"
                                            />
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {deals.badge && (
                                            <>
                                                {decodedHtml && (
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: decodedHtml,
                                                        }}
                                                    />
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div> */}
            </a>
            <div className="absolute top-6 lg:top-10 right-6 lg:right-10">
                <ButtonHeart dealsId={deals.deals_id} />
            </div>
        </div>
    );
}
