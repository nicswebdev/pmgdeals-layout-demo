import { PiFlowerLotus, PiConfettiLight } from "react-icons/pi";
import { VscSettings } from "react-icons/vsc";
import { IoRestaurantOutline, IoCloseOutline } from "react-icons/io5";

import { CheckBox } from "./_components";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { use, useEffect, useState } from "react";
import { ButtonBasic } from "../ButtonBasic";

export default function PropertyFilter() {
  const settingButtonClassName =
    "group aspect-square w-10 4xl:w-[4.375rem] flex justify-center items-center transition-all duration-300 rounded-full border-[0.0625rem] border-gray-dark hover:bg-gray-dark";

  const iconWrapperClassName =
    "relative w-5 h-5 peer-has-[:checked]:[&>img:first-child]:opacity-0 peer-has-[:checked]:[&>img:last-child]:opacity-100";

  const iconGrayClassName =
    "absolute inset-0 w-full h-full object-contain transition-all duration-300 group-hover:opacity-0";
  const iconWhiteClassName =
    "absolute inset-0 w-full h-full object-contain transition-all duration-300 opacity-0 group-hover:opacity-100";

  const iconClassName =
    "w-5 h-5 transition-all duration-300 text-gray-dark group-hover:text-white peer-has-[:checked]:text-white";

  const categories = [
    {
      id: 0,
      label: "Highlight",
      value: "highlight",
    },
    {
      id: 1,
      label: "Hotel",
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
      id: 4,
      label: "Activity",
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
      id: 5,
      label: "Entertainment",
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
    { id: 1, label: "Bali Niksoma Boutique Beach Resort" },
    { id: 2, label: "The Magani Hotel and Spa" },
    { id: 3, label: "The Bandha Hotel & Suites" },
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

        <div className="flex gap-3 lg:gap-4 overflow-x-auto">
          <button
            id="openModalFilterDesktop"
            className={`max-lg:hidden ${settingButtonClassName}`}
            onClick={() => setOpenModal(true)}
          >
            <VscSettings className={iconClassName} />
          </button>

          {categories.map(({ id, label, icon, value }) => (
            <CheckBox
              key={`category-${id}`}
              id={`filter-category-${id}`}
              label={label}
              icon={icon}
              value={value}
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
                  className="w-6 h-6 flex justify-center items-center rounded-full bg-gray-dark"
                  onClick={() => setOpenModal(false)}
                >
                  <IoCloseOutline className="w-4 h-4" />
                </button>
              </div>
              <div className="flex justify-end pb-4">
                <a
                  href="#"
                  className="font-medium max-lg:text-[0.75rem] text-gray-dark"
                >
                  Reset
                </a>
              </div>

              <div className="pb-6">
                <p className="font-bold max-lg:text-[0.75rem] pb-6">
                  Category:
                </p>
                <div className="flex flex-wrap gap-3 lg:gap-4">
                  {categories
                    // Map without highlight
                    .filter(({ id }) => id !== 0)
                    .map(({ id, label, icon, value }) => (
                      <CheckBox
                        key={`modal-category-${id}`}
                        id={`modal-category-${id}`}
                        label={label}
                        icon={icon}
                        value={value}
                      />
                    ))}
                </div>
              </div>

              <div className="pb-6">
                <p className="font-bold max-lg:text-[0.75rem] pb-6">
                  Sub Category:
                </p>
                <div className="flex flex-wrap gap-3 lg:gap-4">
                  {subCategories
                    // Map without highlight
                    .filter(({ id }) => id !== 0)
                    .map(({ id, label, icon, value }) => (
                      <CheckBox
                        id={`modal-subcategory-${id}`}
                        key={`modal-subcategory-${id}`}
                        label={label}
                        icon={icon}
                        value={value}
                      />
                    ))}
                </div>
              </div>

              <div className="pb-10">
                <p className="font-bold max-lg:text-[0.75rem] pb-6">
                  Budget Range:
                </p>
                <div>
                  <div className="flex justify-between pb-6 text-gray-dark">
                    <p className="font-medium max-lg:text-[0.75rem]">
                      From: IDR {rangeStartValue.toLocaleString()}
                    </p>
                    <p className="font-medium max-lg:text-[0.75rem]">
                      To: IDR {rangeEndValue.toLocaleString()}
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
                <ButtonBasic element="button" variant="gray" rounded>
                  Apply
                </ButtonBasic>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End - Modal */}
    </>
  );
}
