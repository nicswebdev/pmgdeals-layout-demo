import {
  Hero,
  PropertyFilter,
  SectionHeading,
  SwiperPropertyList,
} from "@/components";
import { useEffect } from "react";

export default function FoodBeverage() {
  return (
    <main>
      <Hero />
      <div className="py-32">
        <div className="container">
          <div className="pb-20">
            <PropertyFilter />
          </div>

          <div className="pb-20">
            <div className="[&>p]:pb-0 pb-10 4xl:pb-16 pl-5 xl:pl-10 flex justify-between max-md:flex-col">
              <SectionHeading>Hitana Restaurant</SectionHeading>
            </div>
            <SwiperPropertyList numberOfProperties={1} />
          </div>

          <div className="pb-20">
            <div className="[&>p]:pb-0 pb-10 4xl:pb-16 pl-5 xl:pl-10 flex justify-between max-md:flex-col">
              <SectionHeading>Mozzarella by The Sea</SectionHeading>
            </div>
            <SwiperPropertyList numberOfProperties={1} />
          </div>

          <div>
            <div className="[&>p]:pb-0 pb-10 4xl:pb-16 pl-5 xl:pl-10 flex justify-between max-md:flex-col">
              <SectionHeading>Mozzarella Restaurant & Bar</SectionHeading>
            </div>
            <SwiperPropertyList numberOfProperties={1} />
          </div>
        </div>
      </div>
    </main>
  );
}
