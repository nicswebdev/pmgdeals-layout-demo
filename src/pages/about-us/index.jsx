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

          <p className="text-center 4xl:text-[2rem] pb-20">
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
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 4xl:grid-cols-3 gap-9">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <CardProperty key={`recommendation-card-property-${item}`} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
