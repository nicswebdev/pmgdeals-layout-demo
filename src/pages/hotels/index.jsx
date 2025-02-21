import {
  ButtonViewAll,
  Hero,
  PropertyFilter,
  SectionHeading,
  SwiperPropertyList,
} from "@/components";

export default function Hotels() {
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
                Bali Niksoma Boutique Beach Resort
              </SectionHeading>

              <ButtonViewAll href="#" />
            </div>
            <SwiperPropertyList />
          </div>

          <div className="pb-20">
            <div className="[&>p]:pb-0 pb-10 lg:pb-16 pl-5 xl:pl-10 flex justify-between max-md:flex-col">
              <SectionHeading>The Magani Hotel and Spa</SectionHeading>
              <ButtonViewAll href="#" />
            </div>
            <SwiperPropertyList />
          </div>

          <div className="pb-20">
            <div className="[&>p]:pb-0 pb-10 lg:pb-16 pl-5 xl:pl-10 flex justify-between max-md:flex-col">
              <SectionHeading>The Bandha Hotel & Suites</SectionHeading>
              <ButtonViewAll href="#" />
            </div>
            <SwiperPropertyList />
          </div>

          <div>
            <div className="[&>p]:pb-0 pb-10 lg:pb-16 pl-5 xl:pl-10 flex justify-between max-md:flex-col">
              <SectionHeading>Royal Suites at The Bandha</SectionHeading>
              <ButtonViewAll href="#" />
            </div>
            <SwiperPropertyList numberOfProperties={2} />
          </div>
        </div>
      </div>
    </main>
  );
}
