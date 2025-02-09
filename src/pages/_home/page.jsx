import Head from "next/head";
import { MonthPicks } from "./_sections/MonthPicks";
import { CardProperty } from "@/components";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <MonthPicks />

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
