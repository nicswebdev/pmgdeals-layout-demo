import { CardMonthPick } from "@/components";
import Head from "next/head";

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
              <CardMonthPick key={`card-month-pick-${item}`} href="#" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
