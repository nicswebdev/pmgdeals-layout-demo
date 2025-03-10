import {CardProperty, Hero, SectionHeading} from "@/components";
import parse from "html-react-parser";
import Head from "next/head";

export default function AboutUs({homepageDeals, aboutPage, defaultImage}) {
    return (
        <main>
            <Head>
                <title>{aboutPage.content.about_seo_title}</title>
                <meta
                    name="description"
                    content={aboutPage.content.about_seo_descriptions}
                />
                <meta
                    name="keyword"
                    content={aboutPage.content.about_seo_keyword}
                />
                <meta
                    property="og:title"
                    content={aboutPage.content.about_seo_title}
                />
                <meta
                    property="og:description"
                    content={aboutPage.content.about_seo_descriptions}
                />
                <meta
                    property="og:image"
                    content={`https://cms.pmgdeals.com/uploads/og-image.png`}
                />
            </Head>
            <Hero />
            <div className="py-32">
                <div className="container">
                    <SectionHeading style={{textAlign: "center"}}>
                        {aboutPage.content.about_title}
                    </SectionHeading>

                    <div className="text-center text-[0.875rem] lg:text-[1.25rem] pb-20">
                        {parse(aboutPage.content.about_content)}
                    </div>

                    <div>
                        <SectionHeading>Our Recommendations</SectionHeading>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-1 md:gap-x-3 lg:gap-x-2 gap-y-4">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <CardProperty
                                    key={`recommendation-card-property-${item}`}
                                />
                            ))}
                        </div>
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

    const aboutPage = await fetch(
        `https://cms.pmgdeals.com/api/public/content?page=about`
    ).then((res) => res.json());

    const defaultImage = await fetch(
        `https://cms.pmgdeals.com/api/public/image`
    ).then((res) => res.json());

    return {
        props: {
            homepageDeals,
            aboutPage,
            defaultImage,
        },
    };
}
