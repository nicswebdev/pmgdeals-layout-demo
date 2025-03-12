import {CardProperty, Hero, SectionHeading} from "@/components";
import parse from "html-react-parser";
import Head from "next/head";
import {useEffect, useState} from "react";

export default function Privacy({staticPage, defaultImage}) {
    return (
        <main>
            <Head>
                <title>{staticPage.content.privacy_seo_title}</title>
                <meta
                    name="description"
                    content={staticPage.content.privacy_seo_descriptions}
                />
                <meta
                    name="keyword"
                    content={staticPage.content.privacy_seo_keyword}
                />
                <meta
                    property="og:title"
                    content={staticPage.content.privacy_seo_title}
                />
                <meta
                    property="og:description"
                    content={staticPage.content.privacy_seo_descriptions}
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
                        {staticPage.content.privacy_title}
                    </SectionHeading>

                    <div className="text-left text-[0.875rem] lg:text-[1.25rem] pb-20 details">
                        {parse(staticPage.content.privacy_content)}
                    </div>
                </div>
            </div>
        </main>
    );
}

export async function getServerSideProps() {
    const staticPage = await fetch(
        `https://cms.pmgdeals.com/api/public/content?page=privacy`
    ).then((res) => res.json());

    const defaultImage = await fetch(
        `https://cms.pmgdeals.com/api/public/image`
    ).then((res) => res.json());

    return {
        props: {
            staticPage,
            defaultImage,
        },
    };
}
