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
            <div className="[&>p]:pb-0 pb-10 4xl:pb-16 pl-5 xl:pl-10 flex justify-between max-md:flex-col">
              <SectionHeading>
                Bali Niksoma Boutique Beach Resort
              </SectionHeading>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 4xl:grid-cols-3 gap-9">
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
