import Head from "next/head";
import { MonthPicks } from "./_sections/MonthPicks";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <MonthPicks />
    </>
  );
}
