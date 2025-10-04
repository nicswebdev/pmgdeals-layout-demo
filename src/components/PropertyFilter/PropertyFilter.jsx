import {PiFlowerLotus, PiConfettiLight} from "react-icons/pi";
import {VscSettings} from "react-icons/vsc";
import {IoRestaurantOutline, IoCloseOutline} from "react-icons/io5";

import {ButtonCategory, CheckBox} from "./_components";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import {use, useEffect, useMemo, useState} from "react";
import {ButtonBasic} from "../ButtonBasic";
import {useRouter} from "next/router";

export default function PropertyFilter({onPriceChange, currency, rates}) {
    const formatter = useMemo(() => new Intl.NumberFormat("en-US"), []);

    const router = useRouter();
    // const {id} = router.query;

    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const path = router.asPath; // Get full path
        if (path === "/") {
            setSelectedCategory(0); // Default to Highlight if on homepage
        } else {
            const match = path.match(/^\/category\/(\d+)$/); // Match `/category/{id}`
            if (match) {
                setSelectedCategory(parseInt(match[1], 10)); // Set selected category from URL
            } else {
                setSelectedCategory(null); // Reset if not in `/category/{id}` or `/`
            }
        }
    }, [router.asPath]);

    const settingButtonClassName =
        "group shrink-0 aspect-square w-12 xl:w-[4.375rem] flex justify-center items-center transition-all duration-300 rounded-full border-[0.0625rem] border-gray-dark hover:bg-gray-dark";

    const iconWrapperClassName =
        "relative w-5 lg:w-8 h-5 lg:h-8 group-[&.button-active]:[&>img:first-child]:opacity-0 group-[&.button-active]:[&>img:last-child]:opacity-100";

    const iconGrayClassName =
        "absolute inset-0 w-full h-full object-contain transition-all duration-300 group-hover:opacity-0";
    const iconWhiteClassName =
        "absolute inset-0 w-full h-full object-contain transition-all duration-300 opacity-0 group-hover:opacity-100";

    const iconClassName =
        "w-5 h-5 transition-all duration-300 text-gray-dark group-hover:text-white group-[&.button-active]:text-white";

    const categories = [
        {
            id: 0,
            label: "Highlight",
            link: "/",
            value: "highlight",
        },
        {
            id: 1,
            label: "Hotel",
            link: "/category/1",
            value: "hotel",
            icon: (
                <div className={iconWrapperClassName}>
                    <img
                        src="/images/icons/hotel-gray.png"
                        alt="Icon"
                        className={iconGrayClassName}
                    />
                    <img
                        src="/images/icons/hotel-white.png"
                        alt="Icon"
                        className={iconWhiteClassName}
                    />
                </div>
            ),
        },
        {
            id: 2,
            label: "Food & Beverage",
            link: "/category/2",
            value: "food_beverage",
            icon: (
                <div className={iconWrapperClassName}>
                    <img
                        src="/images/icons/restaurant-gray.png"
                        alt="Icon"
                        className={iconGrayClassName}
                    />
                    <img
                        src="/images/icons/restaurant-white.png"
                        alt="Icon"
                        className={iconWhiteClassName}
                    />
                </div>
            ),
        },
        {
            id: 3,
            label: "Spa",
            link: "/category/3",
            value: "spa",
            icon: (
                <div className={iconWrapperClassName}>
                    <img
                        src="/images/icons/spa-gray.png"
                        alt="Icon"
                        className={iconGrayClassName}
                    />
                    <img
                        src="/images/icons/spa-white.png"
                        alt="Icon"
                        className={iconWhiteClassName}
                    />
                </div>
            ),
        },
        {
            id: 10,
            label: "Activity",
            link: "/category/10",
            value: "activity",
            icon: (
                <div className={iconWrapperClassName}>
                    <img
                        src="/images/icons/jogging-gray.png"
                        alt="Icon"
                        className={iconGrayClassName}
                    />
                    <img
                        src="/images/icons/jogging-white.png"
                        alt="Icon"
                        className={iconWhiteClassName}
                    />
                </div>
            ),
        },
        {
            id: 11,
            label: "Entertainment",
            link: "/category/11",
            value: "entertainment",
            icon: (
                <div className={iconWrapperClassName}>
                    <img
                        src="/images/icons/confetti-gray.png"
                        alt="Icon"
                        className={iconGrayClassName}
                    />
                    <img
                        src="/images/icons/confetti-white.png"
                        alt="Icon"
                        className={iconWhiteClassName}
                    />
                </div>
            ),
        },
    ];

    const subCategories = [
        {id: 1, label: "Bali Niksoma Boutique Beach Resort"},
        {id: 2, label: "The Magani Hotel and Spa"},
        {id: 3, label: "The Bandha Hotel & Suites"},
    ];

    const baseRangeValue = 500000;
    const [rangeStartValue, setRangeStartValue] = useState(0);
    const [rangeEndValue, setRangeEndValue] = useState(100 * baseRangeValue);

    const handleRangeChange = (value) => {
        const [start, end] = value;
        setRangeStartValue(start * baseRangeValue);
        setRangeEndValue(end * baseRangeValue);
    };

    const [openModal, setOpenModal] = useState(false);

    // Handle click outside the #modalFilter.dialog
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                !event.target.closest("#modalFilterDialog") &&
                !event.target.closest("#openModalFilterMobile") &&
                !event.target.closest("#openModalFilterDesktop")
            ) {
                setOpenModal(false);
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    //   Add overflow-hidden to body
    useEffect(() => {
        if (openModal) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [openModal]);

    const applyPriceFilter = () => {
        onPriceChange(rangeStartValue, rangeEndValue);
        setOpenModal(false);
    };

    const handleReset = () => {
        setRangeStartValue(0);
        setRangeEndValue(100 * baseRangeValue);
    };

    return (
        <>
            <div>
                <div className="flex justify-end max-lg:pb-3">
                    <button
                        id="openModalFilterMobile"
                        className={`lg:hidden ${settingButtonClassName}`}
                        onClick={() => setOpenModal(true)}
                    >
                        <VscSettings className={iconClassName} />
                    </button>
                </div>

                <div className="flex gap-4 overflow-x-auto">
                    <button
                        id="openModalFilterDesktop"
                        className={`max-lg:hidden ${settingButtonClassName}`}
                        onClick={() => setOpenModal(true)}
                    >
                        <VscSettings className={iconClassName} />
                    </button>

                    {categories.map(({id, label, link, icon}) => (
                        <ButtonCategory
                            key={`category-${id}`}
                            id={`filter-category-${id}`}
                            label={label}
                            icon={icon}
                            href={link}
                            isActive={selectedCategory === id}
                            onClick={() => setSelectedCategory(id)}
                        />
                    ))}
                </div>
            </div>

            {/* Modal */}
            <div
                className={`fixed inset-0 z-[120] bg-black/50 flex justify-center items-center ${
                    openModal ? "block" : "hidden"
                }`}
                id="modalFilter"
            >
                <div className="shrink-0 w-full">
                    <div className="container sm:max-w-[39.0625rem]">
                        <div
                            className="relative px-4 lg:px-12 py-6 lg:py-14 rounded-[0.625rem] bg-white"
                            id="modalFilterDialog"
                        >
                            <div className="absolute left-4 top-4">
                                <button
                                    className="w-6 h-6 flex justify-center items-center rounded-full bg-white"
                                    onClick={() => setOpenModal(false)}
                                >
                                    <IoCloseOutline className="w-8 h-8" />
                                </button>
                            </div>
                            <div className="flex justify-end pb-4">
                                <button
                                    onClick={handleReset}
                                    className="font-medium max-lg:text-[0.75rem] text-gray-dark"
                                >
                                    Reset
                                </button>
                            </div>

                            {/* <div className="pb-6">
                                <p className="font-bold max-lg:text-[0.75rem] pb-6">
                                    Category:
                                </p>
                                <div className="flex flex-wrap gap-3 lg:gap-4">
                                    {categories
                                        // Map without highlight
                                        .filter(({id}) => id !== 0)
                                        .map(({id, label, icon, value}) => (
                                            <CheckBox
                                                key={`modal-category-${id}`}
                                                id={`modal-category-${id}`}
                                                label={label}
                                                icon={icon}
                                                value={value}
                                            />
                                        ))}
                                </div>
                            </div> */}

                            {/* <div className="pb-6">
                                <p className="font-bold max-lg:text-[0.75rem] pb-6">
                                    Sub Category:
                                </p>
                                <div className="flex flex-wrap gap-3 lg:gap-4">
                                    {subCategories
                                        // Map without highlight
                                        .filter(({id}) => id !== 0)
                                        .map(({id, label, icon, value}) => (
                                            <CheckBox
                                                id={`modal-subcategory-${id}`}
                                                key={`modal-subcategory-${id}`}
                                                label={label}
                                                icon={icon}
                                                value={value}
                                            />
                                        ))}
                                </div>
                            </div> */}

                            <div className="pb-10">
                                <p className="font-bold max-lg:text-[0.75rem] pb-6">
                                    Budget Range:
                                </p>
                                <div>
                                    <div className="flex justify-between pb-6 text-gray-dark">
                                        <p className="font-medium max-lg:text-[0.75rem]">
                                            From: {currency}{" "}
                                            {formatter.format(
                                                convertToSelectedCurrency(
                                                    rangeStartValue,
                                                    rates,
                                                    currency
                                                )
                                            )}
                                            {/* IDR{" "}
                                            {rangeStartValue.toLocaleString()} */}
                                        </p>
                                        <p className="font-medium max-lg:text-[0.75rem]">
                                            To:
                                            {currency}{" "}
                                            {formatter.format(
                                                convertToSelectedCurrency(
                                                    rangeEndValue,
                                                    rates,
                                                    currency
                                                )
                                            )}
                                            {/* IDR{" "}
                                            {rangeEndValue.toLocaleString()} */}
                                        </p>
                                    </div>

                                    <div className="[&_.range-slider]:h-[0.0625rem] [&_.range-slider\_\_thumb]:!w-4 [&_.range-slider\_\_thumb]:!h-4 [&_.range-slider\_\_thumb]:!bg-primary [&_.range-slider\_\_range]:!bg-primary">
                                        <RangeSlider
                                            className="single-thumb"
                                            defaultValue={[0, 100]}
                                            // thumbsDisabled={[true, false]}
                                            //   rangeSlideDisabled={true}
                                            onInput={handleRangeChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button
                                    onClick={applyPriceFilter}
                                    className="w-full flex justify-center items-center gap-2 md:gap-4 2xl:gap-6 py-3 px-4 xl:px-8 transition-all duration-300 hover:opacity-70 hover:cursor-pointer text-white bg-gray-dark rounded-full"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End - Modal */}
        </>
    );
}

const convertToSelectedCurrency = (amount, rates, currency) => {
    return rates[currency] ? amount * rates[currency] : amount;
};
