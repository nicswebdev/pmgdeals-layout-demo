import {AccordionBasic, CardProperty, Hero, SectionHeading} from "@/components";

export default function Faq() {
    const faqs = [
        {
            question: "1. When will I receive my PMG Deals Voucher?",
            answer: "You will receive an email along with your voucher within 5 minutes after making the booking via pmgdeals.com.",
        },
        {
            question: "2. What happens if I forgot my username and password?",
            answer: "If you forget your password, you can reset it by selecting Forgot Password and following the provided instructions. Alternatively, you can email us at hello@pmgdeals.com, and we will send you your login details.",
        },
        {
            question: "3. Does my PMG Deals Voucher have an expiry date?",
            answer: "Yes, PMG Deals Vouchers do have expiration dates. Each voucher is valid for up to 6 months from the date of issue. The expiry date and terms of use are included in the voucher email.",
        },
        {
            question: "4. Can I give my PMG Deals voucher to someone else?",
            answer: "Yes, you can give your PMG Deals voucher to someone else. However, it is important to provide their details when confirming the booking. <br /> <br /> Additionally, we require identification for both yourself and the recipient of the voucher to verify the booking. Please ensure that you enter the correct guest’s details when making your booking. Note that you are fully responsible for the booking. To make a booking for your family and friends, please email us at hello@pmgdeals.com.",
        },
        {
            question:
                "5. What is the refund policy for PMG Deals? Does this policy apply to all packages purchased through PMG Deals?",
            answer: "The voucher is non-refundable, non-transferable, and cannot be exchanged for cash. Any unutilized portion of the voucher will be forfeited and will not be subject to a refund.",
        },
        {
            question: "6. Can I change my confirmed booking?",
            answer: "Your booking is non-refundable and cannot be changed to other dates once you have confirmed the date with our reservation team, except in specific cases like force majeure, according to the hotel`s policy. If the hotel does allow you to amend your booking, you must re-book (subject to availability). Please note that even in this case, the booking remains non-refundable.",
        },
        {
            question: "7. How can I pay for my booking?",
            answer: "",
        },
    ];

    return (
        <main>
            <Hero />
            <div className="py-32">
                <div className="container">
                    <SectionHeading style={{textAlign: "center"}}>
                        FAQ
                    </SectionHeading>

                    <div className="pb-20">
                        {faqs.map((faq, index) => (
                            <AccordionBasic
                                key={`faq-accordion-basic-${index}`}
                                title={
                                    <p className="xl:text-[1.25rem]">
                                        {faq.question}
                                    </p>
                                }
                                description={
                                    <p className="xl:text-[1.25rem]">
                                        {faq.answer}
                                    </p>
                                }
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

export async function getServerSideProps() {
    const staticPage = await fetch(
        `https://cms.pmgdeals.com/api/public/content?page=faq`
    ).then((res) => res.json());

    const defaultImage = await fetch(
        `https://cms.pmgdeals.com/api/public/image`
    ).then((res) => res.json());

    return {
        props: {
            staticPage,
            defaultImage,
        },
    };
}
