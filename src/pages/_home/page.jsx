import Head from "next/head";
import { MonthPicks } from "./_sections/MonthPicks";
import { CardProperty, PropertyFilter } from "@/components";

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
            <p className="font-medium text-[1.25rem] lg:text-[3rem] text-[#645433]">
              Unbeatable PMG Deals!
            </p>
          </div>

          <PropertyFilter />
        </div>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-9">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <CardProperty key={`property-${item}`} />
          ))}
        </div>
      </div>
    </>
  );
}
