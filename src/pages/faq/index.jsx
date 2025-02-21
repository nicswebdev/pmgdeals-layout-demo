import {
  AccordionBasic,
  CardProperty,
  Hero,
  SectionHeading,
} from "@/components";

export default function Faq() {
  const faqs = [
    {
      question: "1. When will I receive my PMG Deals Voucher?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eleifend ex a eros bibendum, eget mattis mauris auctor. Suspendisse lobortis nibh nisi, quis rhoncus mauris consequat sit amet. Proin vitae purus commodo, ullamcorper ante at, tristique lacus. Vivamus nulla nisl, fringilla convallis facilisis quis, commodo a erat. In ut posuere nisl. Vivamus vitae vestibulum enim, sed porta justo. Pellentesque euismod luctus ipsum, a porta diam bibendum nec. Proin quis dolor non est viverra fermentum. Nunc ut purus suscipit nisi scelerisque lacinia sit amet in nunc. Nulla posuere nulla sit amet pellentesque tempus. In fermentum semper nibh a efficitur. Nunc posuere, sapien a dictum laoreet, massa massa tincidunt justo, in semper ipsum felis sit amet turpis. Vestibulum hendrerit imperdiet sem non tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      question: "2. What happens if I forgot my username and password?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eleifend ex a eros bibendum, eget mattis mauris auctor. Suspendisse lobortis nibh nisi, quis rhoncus mauris consequat sit amet. Proin vitae purus commodo, ullamcorper ante at, tristique lacus. Vivamus nulla nisl, fringilla convallis facilisis quis, commodo a erat. In ut posuere nisl. Vivamus vitae vestibulum enim, sed porta justo. Pellentesque euismod luctus ipsum, a porta diam bibendum nec. Proin quis dolor non est viverra fermentum. Nunc ut purus suscipit nisi scelerisque lacinia sit amet in nunc. Nulla posuere nulla sit amet pellentesque tempus. In fermentum semper nibh a efficitur. Nunc posuere, sapien a dictum laoreet, massa massa tincidunt justo, in semper ipsum felis sit amet turpis. Vestibulum hendrerit imperdiet sem non tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      question: "3. Does my PMG Deals Voucher have an expiry date?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eleifend ex a eros bibendum, eget mattis mauris auctor. Suspendisse lobortis nibh nisi, quis rhoncus mauris consequat sit amet. Proin vitae purus commodo, ullamcorper ante at, tristique lacus. Vivamus nulla nisl, fringilla convallis facilisis quis, commodo a erat. In ut posuere nisl. Vivamus vitae vestibulum enim, sed porta justo. Pellentesque euismod luctus ipsum, a porta diam bibendum nec. Proin quis dolor non est viverra fermentum. Nunc ut purus suscipit nisi scelerisque lacinia sit amet in nunc. Nulla posuere nulla sit amet pellentesque tempus. In fermentum semper nibh a efficitur. Nunc posuere, sapien a dictum laoreet, massa massa tincidunt justo, in semper ipsum felis sit amet turpis. Vestibulum hendrerit imperdiet sem non tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      question: "4. Can I give my PMG Deals voucher to someone else?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eleifend ex a eros bibendum, eget mattis mauris auctor. Suspendisse lobortis nibh nisi, quis rhoncus mauris consequat sit amet. Proin vitae purus commodo, ullamcorper ante at, tristique lacus. Vivamus nulla nisl, fringilla convallis facilisis quis, commodo a erat. In ut posuere nisl. Vivamus vitae vestibulum enim, sed porta justo. Pellentesque euismod luctus ipsum, a porta diam bibendum nec. Proin quis dolor non est viverra fermentum. Nunc ut purus suscipit nisi scelerisque lacinia sit amet in nunc. Nulla posuere nulla sit amet pellentesque tempus. In fermentum semper nibh a efficitur. Nunc posuere, sapien a dictum laoreet, massa massa tincidunt justo, in semper ipsum felis sit amet turpis. Vestibulum hendrerit imperdiet sem non tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      question:
        "5. What is the refund policy for PMG Deals? Does this policy apply to all packages purchased through PMG Deals?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eleifend ex a eros bibendum, eget mattis mauris auctor. Suspendisse lobortis nibh nisi, quis rhoncus mauris consequat sit amet. Proin vitae purus commodo, ullamcorper ante at, tristique lacus. Vivamus nulla nisl, fringilla convallis facilisis quis, commodo a erat. In ut posuere nisl. Vivamus vitae vestibulum enim, sed porta justo. Pellentesque euismod luctus ipsum, a porta diam bibendum nec. Proin quis dolor non est viverra fermentum. Nunc ut purus suscipit nisi scelerisque lacinia sit amet in nunc. Nulla posuere nulla sit amet pellentesque tempus. In fermentum semper nibh a efficitur. Nunc posuere, sapien a dictum laoreet, massa massa tincidunt justo, in semper ipsum felis sit amet turpis. Vestibulum hendrerit imperdiet sem non tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      question: "6. Can I change my confirmed booking?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eleifend ex a eros bibendum, eget mattis mauris auctor. Suspendisse lobortis nibh nisi, quis rhoncus mauris consequat sit amet. Proin vitae purus commodo, ullamcorper ante at, tristique lacus. Vivamus nulla nisl, fringilla convallis facilisis quis, commodo a erat. In ut posuere nisl. Vivamus vitae vestibulum enim, sed porta justo. Pellentesque euismod luctus ipsum, a porta diam bibendum nec. Proin quis dolor non est viverra fermentum. Nunc ut purus suscipit nisi scelerisque lacinia sit amet in nunc. Nulla posuere nulla sit amet pellentesque tempus. In fermentum semper nibh a efficitur. Nunc posuere, sapien a dictum laoreet, massa massa tincidunt justo, in semper ipsum felis sit amet turpis. Vestibulum hendrerit imperdiet sem non tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      question: "7. How can I pay for my booking?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eleifend ex a eros bibendum, eget mattis mauris auctor. Suspendisse lobortis nibh nisi, quis rhoncus mauris consequat sit amet. Proin vitae purus commodo, ullamcorper ante at, tristique lacus. Vivamus nulla nisl, fringilla convallis facilisis quis, commodo a erat. In ut posuere nisl. Vivamus vitae vestibulum enim, sed porta justo. Pellentesque euismod luctus ipsum, a porta diam bibendum nec. Proin quis dolor non est viverra fermentum. Nunc ut purus suscipit nisi scelerisque lacinia sit amet in nunc. Nulla posuere nulla sit amet pellentesque tempus. In fermentum semper nibh a efficitur. Nunc posuere, sapien a dictum laoreet, massa massa tincidunt justo, in semper ipsum felis sit amet turpis. Vestibulum hendrerit imperdiet sem non tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  return (
    <main>
      <Hero />
      <div className="py-32">
        <div className="container">
          <SectionHeading style={{ textAlign: "center" }}>FAQ</SectionHeading>

          <div className="pb-20">
            {faqs.map((faq, index) => (
              <AccordionBasic
                key={`faq-accordion-basic-${index}`}
                title={<p className="xl:text-[1.25rem]">{faq.question}</p>}
                description={<p className="xl:text-[1.25rem]">{faq.answer}</p>}
              />
            ))}
          </div>

          <div>
            <SectionHeading>Our Recommendations</SectionHeading>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-1 md:gap-x-3 lg:gap-x-2 gap-y-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <CardProperty
                  key={`faq-recommendation-card-property-${item}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
