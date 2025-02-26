import {useEffect, useState} from "react";
import {GoChevronDown} from "react-icons/go";

export default function ButtonCurrency() {
    const currencies = [
        {
            label: "IDR",
            icon: (
                <img
                    src="/images/flags/id.svg"
                    className="w-full h-full object-cover"
                />
            ),
        },
        {
            label: "AUD",
            icon: (
                <img
                    src="/images/flags/au.svg"
                    className="w-full h-full object-cover"
                />
            ),
        },
        {
            label: "USD",
            icon: (
                <img
                    src="/images/flags/us.svg"
                    className="w-full h-full object-cover"
                />
            ),
        },
        {
            label: "SGD",
            icon: (
                <img
                    src="/images/flags/sg.svg"
                    className="w-full h-full object-cover"
                />
            ),
        },
        {
            label: "GBP",
            icon: (
                <img
                    src="/images/flags/gb.svg"
                    className="w-full h-full object-cover"
                />
            ),
        },
    ];
    const [selected, setSelected] = useState(currencies[0]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Handle click outside the dropdown
        const handleOutsideClick = (event) => {
            if (!event.target.closest("#currencyOptions")) {
                setOpen(false);
            }
        };

        if (typeof document !== "undefined") {
            document.addEventListener("click", handleOutsideClick);
        }
    }, []);

    return (
        <div className="relative" id="currencyOptions">
            <button
                className="flex items-center gap-2 sm:gap-4 text-white transition-all duration-300"
                onClick={() => setOpen(!open)}
            >
                <div className="shrink-0 grow-0 w-4 lg:w-8 aspect-square rounded-full overflow-hidden">
                    {selected.icon}
                </div>
                <span className="font-inter font-semibold text-[0.75rem] lg:text-[1rem]">
                    {selected.label}
                </span>
                <GoChevronDown className="w-3 lg:w-4 h-3 lg:h-4" />
            </button>
            {open && (
                <div className="absolute z-20 mt-2 w-24 lg:w-32 rounded-md shadow-md border border-gray-300 bg-white">
                    {currencies.map((currency) => (
                        <button
                            key={currency.label}
                            className="flex items-center gap-2 lg:gap-4 w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                                setSelected(currency);
                                setOpen(false);
                            }}
                        >
                            <div className="shrink-0 grow-0 w-4 lg:w-8 h-4 lg:h-8 rounded-full overflow-hidden">
                                {currency.icon}
                            </div>
                            {currency.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
