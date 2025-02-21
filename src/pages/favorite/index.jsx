import { Hero, SectionHeading, SwiperPropertyList } from "@/components";

export default function Favorite() {
  return (
    <main>
      <Hero />
      <div className="py-32">
        <div className="container">
          <div>
            <div className="[&>p]:pb-0 pb-10 lg:pb-16 pl-5 xl:pl-10 flex justify-between max-md:flex-col">
              <SectionHeading>Favorite List</SectionHeading>
            </div>
            <SwiperPropertyList numberOfProperties={6} />
          </div>
        </div>
      </div>
    </main>
  );
}
