import { CardProperty, Hero, SectionHeading } from "@/components";

export default function AboutUs() {
  return (
    <main>
      <Hero />
      <div className="py-32">
        <div className="container">
          <SectionHeading style={{ textAlign: "center" }}>
            About PMG Deals
          </SectionHeading>

          <p className="text-center text-[0.875rem] lg:text-[1.25rem] pb-20">
            PMG Deals presents an exclusive opportunity with limited-time
            package deals at Bali Niksoma Boutique Beach Resort, The Magani
            Hotel and Spa, and The Bandha Hotel & Suites. Enjoy great savings on
            rooms, delectable food & beverages, engaging activities, and
            rejuvenating treatments at Visala Spa. We are providing everything
            you need for a memorable Bali holiday. Purchase your voucher now and
            reap the benefits!
          </p>

          <div>
            <SectionHeading>Our Recommendations</SectionHeading>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-1 md:gap-x-3 lg:gap-x-2 gap-y-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <CardProperty key={`recommendation-card-property-${item}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
