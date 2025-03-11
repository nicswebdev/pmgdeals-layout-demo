import { FaRegStar, FaStar } from "react-icons/fa6";
import { ButtonHeart } from "../ButtonHeart";
export default function CardProperty({ href }) {
  const randomString = Math.random().toString(36).substring(2, 9);
  // Get random between 1 and 3
  const random = Math.floor(Math.random() * 3) + 1;

  return (
    <div className="relative h-full flex items-stretch">
      <a
        href={href || "#"}
        className="group basis-full flex flex-col mx-2 my-2 px-3 py-4 lg:py-6 shadow-[-0.0625rem_0.0625rem_0.5rem_rgba(0,0,0,0.25)] transition-all duration-300 hover:opacity-70"
      >
        <div className="aspect-video w-full rounded-[1.25rem] overflow-hidden">
          <img
            src={`/images/property/${random}.png`}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="pt-4">
          <p className="pb-2 lg:pb-4 font-medium max-lg:text-[0.75rem]">
            The Bandha Hotel & Suites
          </p>
          <p className="pb-4 font-bold lg:text-[1.5rem]">
            Splendid 3-Night Package
          </p>
          <div className="pb-4 lg:pb-6 flex flex-wrap gap-2">
            <p className="lg:text-[1.5rem]">IDR 6,970,000</p>
            <p className="relative px-2 lg:text-[1.5rem]">
              <span>IDR 8,225,000</span>
              <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-[0.0625rem] bg-red"></span>
            </p>
          </div>
          <div className="flex gap-3">
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
            <p className="font-medium max-lg:text-[0.75rem]">1,922</p>
          </div>
        </div>
      </a>
      <div className="absolute top-6 lg:top-10 right-6 lg:right-10">
        <ButtonHeart />
      </div>
    </div>
  );
}
