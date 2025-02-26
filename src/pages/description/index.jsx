import {ButtonBasic, ButtonHeart, Hero} from "@/components";

export default function Description() {
    return (
        <main>
            <Hero image="/property.png" />

            <div className="py-32">
                <div className="container">
                    <div className="flex flex-wrap justify-between gap-y-10 py-20">
                        <div className="max-md:basis-full flex gap-4 lg:gap-8 xl:gap-12">
                            {/* Title */}
                            <div>
                                <h2 className="font-medium text-[1.5rem] lg:text-[2.5rem] text-[#660000]">
                                    Splendid 3-Night Package
                                </h2>
                                <p className="font-medium text-[1rem] lg:text-[1.25rem]">
                                    Bali Niksoma Boutique Beach Resort
                                </p>
                            </div>
                            {/* End - Title */}

                            <div className="shrink-0 flex items-center h-[2.25rem] lg:h-[3.75rem]">
                                <ButtonHeart />
                            </div>
                        </div>

                        {/* Price */}
                        <div className="max-md:basis-full flex flex-col items-start">
                            <p className="font-medium text-[1.5rem] lg:text-[2.5rem] text-[#660000]">
                                IDR 7,300,000
                            </p>
                            <p className="relative font-medium text-[1rem] lg:text-[1.25rem] px-2 lg:px-4">
                                <span>IDR 8,536,000</span>
                                <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-[0.0625rem] bg-red"></span>
                            </p>
                        </div>
                        {/* End - Price */}
                    </div>

                    <div className="pb-10">
                        <p className="pb-4 font-bold lg:text-[1.25rem]">
                            Description
                        </p>
                        <p className="font-light lg:text-[1.25rem]">
                            Splendidly hassle-free 3 nights at Bali Niksoma
                            Boutique Beach Resort for 2 persons. Spend less and
                            enjoy more!
                        </p>
                    </div>

                    <div className="pb-10">
                        <h3 className="pb-4 font-bold lg:text-[1.25rem]">
                            Package Inclusions
                        </h3>
                        <ul className="pl-6 list-disc font-light lg:text-[1.25rem]">
                            <li>3-Night Stay at Deluxe Room with Double Bed</li>
                            <li>Daily Breakfast</li>
                            <li>Airport pick-up service</li>
                            <li>One-time minibar</li>
                            <li>One-time 60 minutes Balinese massage</li>
                            <li>Save up to 10% on non-alcoholic beverages</li>
                            <li>Save up to 10% on Visala Spa treatments</li>
                            <li>Welcome drinks upon arrival</li>
                            <li>Wi-Fi in all hotel area</li>
                            <li>Free usage of pool and fitness center</li>
                        </ul>
                    </div>

                    <div className="pb-10">
                        <h3 className="pb-4 font-bold lg:text-[1.25rem]">
                            Voucher Utilization
                        </h3>
                        <ul className="pl-6 list-disc font-light lg:text-[1.25rem]">
                            <li>
                                Voucher utilization is subject to room
                                availability during the requested period
                            </li>
                            <li>
                                The voucher is valid for 6 months starting from
                                the purchase date
                            </li>
                            <li>
                                The voucher cannot be combined with other
                                promotions and is not eligible for loyalty
                                points
                            </li>
                            <li>
                                To redeem the voucher, guests are required to
                                contact the hotel's reservation via phone at +62
                                361 757 688 or email at hello@pmgdeals.com
                            </li>
                            <li>
                                The voucher will be forfeited if it surpasses
                                its expiration date
                            </li>
                            <li>
                                No credit or refund will be given for any unused
                                benefits
                            </li>
                            <li>
                                The benefits are not transferable and cannot be
                                accumulated
                            </li>
                            <li>
                                The benefits can only be used during the stay at
                                the hotel and cannot be cashed out
                            </li>
                            <li>
                                The hotel reserves the right to change any
                                promotion without prior notice
                            </li>
                            <li>
                                For an extension of stay please contact
                                reservation at +62 361 757 688 or hotel website
                                at www.baliniksoma.com
                            </li>
                        </ul>
                    </div>

                    <div className="pb-20">
                        <h3 className="pb-4 font-bold lg:text-[1.25rem]">
                            Room Surcharge:
                        </h3>
                        <ul className="pl-6 list-disc font-light lg:text-[1.25rem]">
                            <li>
                                An additional charge of IDR 450,000
                                nett/room/night is required for stays during
                                the high season between  1st July - 30th
                                September and 22nd December - 27th December
                            </li>
                            <li>
                                An additional charge of IDR 600,000
                                nett/room/night is required for stays during
                                the peak season between 28th December - 4th
                                January
                            </li>
                        </ul>
                    </div>

                    <div className="flex">
                        <div className="w-full max-w-[22.75rem] max-lg:mx-auto lg:ml-auto">
                            <ButtonBasic href="/description-upgrade" rounded>
                                BOOK NOW
                            </ButtonBasic>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
