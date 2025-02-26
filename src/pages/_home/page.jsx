import Head from "next/head";
import { PropertyFilter, SwiperPropertyList } from "@/components";
import MonthPicks from "./_sections/MonthPicks";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <MonthPicks />

      <div className="py-20">
        <div className="container">
          <div className="pb-10">
            <p className="font-medium text-[1.25rem] lg:text-[3rem] text-[#660000]">
              Unbeatable PMG Deals!
            </p>
          </div>

          <PropertyFilter />
        </div>
      </div>

      <div className="pb-10">
        <div className="container">
          <p className="pl-5 xl:pl-10 pb-5 font-medium text-[1.125rem] lg:text-[2.25rem] text-[#660000]">
            Best Stay Packages
          </p>
        </div>
        <SwiperPropertyList />
      </div>

      <div className="pb-10">
        <div className="container">
          <p className="pl-5 xl:pl-10 pb-5 font-medium text-[1.125rem] lg:text-[2.25rem] text-[#660000]">
            Our Recommendations
          </p>
        </div>
        <SwiperPropertyList />
      </div>

      <div className="pb-14 xl:pb-20">
        <div className="container">
          <div className="pb-10">
            <p className="font-medium text-[1.25rem] lg:text-[2.25rem] text-[#660000]">
              Why Choose PMG Deals?
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 md:max-lg:max-w-[40rem] md:max-lg:mx-auto">
            {[
              {
                id: 1,
                icon: "/images/home/why-choose-pmg-deals/1.png",
                label:
                  "Easy access to savings on exclusive\n offers from PMG Hotels & Suites",
              },
              {
                id: 2,
                icon: "/images/home/why-choose-pmg-deals/2.png",
                label:
                  "Discover unbeatable savings\n with our exclusive offers",
              },
              {
                id: 3,
                icon: "/images/home/why-choose-pmg-deals/3.png",
                label:
                  "Find deals from all three of our\n properties in one place",
              },
            ].map(({ id, icon, label }) => (
              <div
                key={`card-deal-${id}`}
                className="flex flex-col items-center justify-center gap-6 my-2 mx-2 px-4 xl:px-10 py-6 xl:py-14 rounded-[1.25rem] shadow-[0px_4px_6.7px_rgba(0,0,0,0.25)] bg-white"
              >
                <div className="w-[6.25rem] aspect-square">
                  <img src={icon} alt="Icon" className="w-full" />
                </div>

                <p
                  className="font-medium text-[0.875rem] lg:text-[1.25rem] text-center text-[#660000]"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
