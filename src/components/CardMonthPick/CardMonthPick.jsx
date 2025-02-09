import { FaRegStar, FaStar } from "react-icons/fa6";
import { ButtonHeart } from "../ButtonHeart";
export default function CardMonthPick({ href }) {
  const randomString = Math.random().toString(36).substring(2, 9);

  return (
    <div className="relative">
      <a
        href={href}
        className="group flex flex-col transition-all duration-300 hover:opacity-70"
      >
        {/* TODO: Add image and scale on hover */}
        <div className="aspect-[1.85/1] w-full rounded-[1.25rem] bg-gray-600"></div>
        <div className="pt-4 text-white">
          <p className="pb-3 xl:pb-8 font-medium max-lg:text-[0.75rem]">
            Hitana Restaurant
          </p>
          <p className="pb-4 xl:pb-6 font-bold lg:text-[1.5rem]">
            Drag Queen Show
          </p>
          <div className="pb-4 xl:pb-12 flex gap-2">
            <p className="lg:tw-text-[1.5rem]">IDR 223,000</p>
            <p className="relative px-2 lg:tw-text-[1.5rem]">
              <span>IDR 250,000</span>
              <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-[0.0625rem] bg-red"></span>
            </p>
          </div>
          {/* Rates here */}
          <div className="flex items-center">
            {[1, 2, 3, 4].map((item) => (
              <FaStar
                className="w-3 lg:w-5 h-3 lg:h-5"
                key={`month-pick-star-${randomString}-${item}`}
                color="#DBA527"
              />
            ))}
            <FaRegStar className="w-3 lg:w-5 h-3 lg:h-5" color="#DBA527" />
          </div>
        </div>
      </a>
      <div className="absolute top-3 lg:top-6 right-3 lg:right-6">
        <ButtonHeart />
      </div>
    </div>
  );
}
