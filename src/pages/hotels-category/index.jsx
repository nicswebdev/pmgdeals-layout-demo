import {
  CardProperty,
  Hero,
  PropertyFilter,
  SectionHeading,
} from "@/components";

export default function HotelsCategory() {
  return (
    <main>
      <Hero />
      <div className="py-32">
        <div className="container">
          <div className="pb-20">
            <PropertyFilter />
          </div>
          <div>
            <div className="[&>p]:pb-0 pb-10 lg:pb-16 pl-5 xl:pl-10 flex justify-between max-md:flex-col">
              <SectionHeading>
                Bali Niksoma Boutique Beach Resort
              </SectionHeading>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-1 md:gap-x-3 lg:gap-x-2 gap-y-4">
              {[...Array(5)].map((item) => (
                <CardProperty key={`recommendation-card-property-${item}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
