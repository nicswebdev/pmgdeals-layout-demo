import {
    Hero,
    PropertyFilter,
    SectionHeading,
    SwiperPropertyList,
} from "@/components";

export default function Spa() {
    return (
        <main>
            <Hero />
            <div className="py-32">
                <div className="container">
                    <div className="pb-20">
                        <PropertyFilter />
                    </div>

                    <div className="pb-20">
                        <div className="[&>p]:pb-0 pb-10 lg:pb-16 pl-5 xl:pl-10 flex justify-between max-md:flex-col">
                            <SectionHeading>
                                Visala Spa at Bali Niksoma
                            </SectionHeading>
                        </div>
                        {/* <SwiperPropertyList numberOfProperties={6} /> */}
                    </div>

                    <div className="pb-20">
                        <div className="[&>p]:pb-0 pb-10 lg:pb-16 pl-5 xl:pl-10 flex justify-between max-md:flex-col">
                            <SectionHeading>
                                Visala Spa at The Magani
                            </SectionHeading>
                        </div>
                        {/* <SwiperPropertyList numberOfProperties={6} /> */}
                    </div>

                    <div>
                        <div className="[&>p]:pb-0 pb-10 lg:pb-16 pl-5 xl:pl-10 flex justify-between max-md:flex-col">
                            <SectionHeading>
                                Visala Spa at The Bandha
                            </SectionHeading>
                        </div>
                        {/* <SwiperPropertyList numberOfProperties={6} /> */}
                    </div>
                </div>
            </div>
        </main>
    );
}
