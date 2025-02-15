import {
  Hero,
  PropertyFilter,
  SectionHeading,
  SwiperPropertyList,
} from "@/components";

export default function Activity() {
  return (
    <main>
      <Hero />
      <div className="py-32">
        <div className="container">
          <div className="pb-20">
            <PropertyFilter />
          </div>

          <div>
            <div className="[&>p]:pb-0 pb-10 4xl:pb-16 pl-5 xl:pl-10 flex justify-between max-md:flex-col">
              <SectionHeading>PMG Deals Activity</SectionHeading>
            </div>
            <SwiperPropertyList numberOfProperties={6} />
          </div>
        </div>
      </div>
    </main>
  );
}
