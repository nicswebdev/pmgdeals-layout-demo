import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {LuHeart, LuHeartOff} from "react-icons/lu";

export default function ButtonHeart({filled = false, dealsId}) {
    const [liked, setLiked] = useState(filled);

    const handleOnClick = () => {
        setLiked(!liked);
    };

    const {data: session} = useSession();

    const [favorites, setFavorites] = useState([]);

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

    const isFavorite = favorites.some((fav) => fav.deals_id === dealsId);

    const handleFavoriteClick = () => {
        if (!session) {
            // Redirect to login if not authenticated
            signIn();
        } else {
            // Send API request to mark as favorite
            if (isFavorite) {
                // Logic to remove from favorites
                removeAsFavorite(dealsId);
            } else {
                // Logic to add to favorites (existing markAsFavorite function)
                markAsFavorite(dealsId);
            }
        }
    };

    const markAsFavorite = async (dealsId) => {
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
                        dealId: dealsId,
                        memberId: session.user.member_id,
                        type: "add",
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Error marking deal as favorite");
            }

            // showToast("Deal added to favorites!", "success");
            setFavorites((prevFavorites) => [
                ...prevFavorites,
                {deals_id: dealsId},
            ]);

            // Handle the response as needed
        } catch (error) {
            console.error("Failed to mark as favorite:", error);
            // showToast("Failed to add deal to favorites.", "error");
        }
    };

    const removeAsFavorite = async (dealsId) => {
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
                        dealId: dealsId,
                        memberId: session.user.member_id,
                        type: "remove",
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Error marking deal as favorite");
            }

            // showToast("Deal removed from favorites!", "success");

            setFavorites((prevFavorites) =>
                prevFavorites.filter((fav) => fav.deals_id !== dealsId)
            );

            // Handle the response as needed
        } catch (error) {
            console.error("Failed to mark as favorite:", error);
            // showToast("Failed to remove deal from favorites.", "error");
        }
    };

    return (
        <button
            className="flex justify-center items-center aspect-square w-8 lg:w-16 rounded-full transition-all duration-300 hover:opacity-70 bg-[#705f4d]"
            onClick={handleFavoriteClick}
        >
            <div className="shrink-0">
                {isFavorite ? (
                    <LuHeartOff
                        className="w-3 lg:w-5 h-3 lg:h-5"
                        color="white"
                    />
                ) : (
                    <LuHeart className="w-3 lg:w-5 h-3 lg:h-5" color="white" />
                )}
            </div>
        </button>
    );
}
