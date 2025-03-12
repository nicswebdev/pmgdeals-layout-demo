import {Hero, SectionHeading, SwiperPropertyList} from "@/components";
import {useSession} from "next-auth/react";
import Head from "next/head";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function Favorite({homepageDeals, defaultImage}) {
    const {data: session, status} = useSession();
    const [dealsData, setDealsData] = useState(null);
    const router = useRouter();

    // console.log("sgefwef", status);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login"); // Redirect to login if not authenticated
        }
    }, [status, router]);

    useEffect(() => {
        if (session) {
            const memberId = session.user.member_id;
            fetch(
                `https://cms.pmgdeals.com/api/public/favourite/listall?member_id=` +
                    memberId
            )
                .then((res) => res.json())
                .then((data) => setDealsData(data))
                .catch((error) =>
                    console.error("Error fetching favorites:", error)
                );
        }
    }, [session]);
    return (
        <main>
            <Head>
                <title>{homepageDeals.homepage.homepage_seo_title}</title>
                <meta
                    name="description"
                    content={homepageDeals.homepage.homepage_seo_descriptions}
                />
                <meta
                    name="keyword"
                    content={homepageDeals.homepage.homepage_seo_keyword}
                />
                <meta
                    property="og:title"
                    content={homepageDeals.homepage.homepage_seo_title}
                />
                <meta
                    property="og:description"
                    content={homepageDeals.homepage.homepage_seo_descriptions}
                />
                <meta
                    property="og:image"
                    content={`https://cms.pmgdeals.com/uploads/og-image.png`}
                />
            </Head>
            <Hero />
            <div className="py-32">
                <div className="container">
                    <div>
                        <div className="[&>p]:pb-0 pb-10 lg:pb-16 pl-5 xl:pl-10 flex justify-between max-md:flex-col">
                            <SectionHeading>Favorite List</SectionHeading>
                        </div>
                        {dealsData && (
                            <SwiperPropertyList deals={dealsData.deals} />
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export async function getServerSideProps() {
    const homepageDeals = await fetch(
        `https://cms.pmgdeals.com/api/public/homepage`
    ).then((res) => res.json());

    const defaultImage = await fetch(
        `https://cms.pmgdeals.com/api/public/image`
    ).then((res) => res.json());

    return {
        props: {
            homepageDeals,
            defaultImage,
        },
    };
}
