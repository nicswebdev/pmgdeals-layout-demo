import { ButtonHeart } from "@/components";
import Head from "next/head";
import { FaRegStar, FaStar } from "react-icons/fa6";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <div className="pb-14 xl:pb-20 xl:pt-20 bg-gray-dark">
        <div className="container">
          <h1 className="pb-6 xl:pb-20 xl:text-[3rem] text-white">
            <span className="font-bold italic">Most Popular Picks </span>
            <span>This Month</span>
          </h1>
        </div>
        <div className="container 4xl:max-w-[131.875rem]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 4xl:gap-12">
            {[1, 2, 3].map((item) => (
              <div className="relative" key={`card-show-${item}`}>
                <a
                  href="#"
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
                          key={`star-${item}`}
                          color="#DBA527"
                        />
                      ))}
                      <FaRegStar
                        className="w-3 lg:w-5 h-3 lg:h-5"
                        color="#DBA527"
                      />
                    </div>
                  </div>
                </a>
                <div className="absolute top-3 lg:top-6 right-3 lg:right-6">
                  <ButtonHeart />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
