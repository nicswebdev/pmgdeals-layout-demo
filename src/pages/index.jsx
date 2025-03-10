import {default as Home} from "./_home/page";

export default Home;

export async function getServerSideProps() {
    const categoryData = await fetch(
        `https://cms.pmgdeals.com/api/public/category`
    ).then((res) => res.json());

    const homepageDeals = await fetch(
        `https://cms.pmgdeals.com/api/public/homepage`
    ).then((res) => res.json());

    const randomDeals1 = await fetch(
        `https://cms.pmgdeals.com/api/public/deals/randomdealsone`
    ).then((res) => res.json());

    const randomDeals2 = await fetch(
        `https://cms.pmgdeals.com/api/public/deals/randomdealstwo`
    ).then((res) => res.json());

    const randomDeals3 = await fetch(
        `https://cms.pmgdeals.com/api/public/deals/randomdealsthree`
    ).then((res) => res.json());

    const randomDeals4 = await fetch(
        `https://cms.pmgdeals.com/api/public/deals/randomdealshighlight`
    ).then((res) => res.json());

    return {
        props: {
            categoryData,
            homepageDeals,
            randomDeals1,
            randomDeals2,
            randomDeals3,
            randomDeals4,
        },
    };
}
