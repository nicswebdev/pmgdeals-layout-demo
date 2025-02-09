import { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";

export default function ButtonCurrency() {
  const currencies = ["IDR", "USD", "EUR", "JPY"];
  const [selected, setSelected] = useState("IDR");
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
        className="flex items-center gap-2 sm:gap-4 text-white group-[.active-scroll]:text-primary transition-all duration-300"
        onClick={() => setOpen(!open)}
      >
        <span className="font-inter font-semibold text-[0.75rem] lg:text-[1rem]">
          {selected}
        </span>
        <GoChevronDown className="w-3 lg:w-4 h-3 lg:h-4" />
      </button>
      {open && (
        <div className="absolute z-20 mt-2 w-16 rounded-md shadow-md border border-gray-300 bg-white">
          {currencies.map((currency) => (
            <button
              key={currency}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setSelected(currency);
                setOpen(false);
              }}
            >
              {currency}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
