import {AccordionCheckout, ButtonBasic, ButtonHeart, Hero} from "@/components";
import Head from "next/head";
import {useMemo, useState} from "react";
import {FaCheck} from "react-icons/fa";
import {GoChevronDown, GoChevronRight} from "react-icons/go";
import parse from "html-react-parser";
import {useCurrency} from "@/context/CurrencyContext";
import {useRouter} from "next/router";

export default function Description({
    dealsData,
    dealsAddonCategoryData,
    dealsAddonData,
    staticPage,
}) {
    const formatter = useMemo(
        () =>
            new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }),
        []
    );

    const idrFormatter = useMemo(() => new Intl.NumberFormat("en-US"), []);

    const {currency, rates} = useCurrency();

    const router = useRouter();

    return (
        <main className="pt-28 sm:pt-40 lg:pt-56 bg-gray-dark">
            <Head>
                <title>{staticPage.content.checkout_seo_title}</title>
                <meta
                    name="description"
                    content={staticPage.content.checkout_seo_descriptions}
                />
                <meta
                    name="keyword"
                    content={staticPage.content.checkout_seo_keyword}
                />
                <meta
                    property="og:title"
                    content={staticPage.content.checkout_seo_title}
                />
                <meta
                    property="og:description"
                    content={staticPage.content.checkout_seo_descriptions}
                />
                <meta
                    property="og:image"
                    content={`https://cms.pmgdeals.com/uploads/og-image.png`}
                />
            </Head>
            <div className="py-32 bg-white">
                <div className="container">
                    <div className="flex flex-col xl:flex-row w-full max-lg:space-y-16">
                        <div className="xl:w-2/3 xl:pr-20">
                            {dealsAddonCategoryData.addon_category.length >
                                0 && (
                                <UpgradingExtras
                                    dealsAddonCategoryData={
                                        dealsAddonCategoryData
                                    }
                                    dealsAddonData={dealsAddonData}
                                />
                            )}
                            <Form />
                        </div>

                        <div className="xl:w-1/3">
                            <PaymentSummary dealsData={dealsData} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function UpgradingExtras({dealsAddonCategoryData, dealsAddonData}) {
    const formatter = useMemo(
        () =>
            new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }),
        []
    );

    const idrFormatter = useMemo(() => new Intl.NumberFormat("en-US"), []);

    const {currency, rates} = useCurrency();

    const router = useRouter();

    return (
        <div>
            <p className="text-2xl font-bold mb-4">Upgrading & Extras</p>
            <div>
                {dealsAddonCategoryData.addon_category.map((item, index) => (
                    <AccordionCheckout
                        title={
                            <p className="font-bold lg:text-[1.5rem]">
                                {item.deals_addon_category_name}
                            </p>
                        }
                        style={{borderTop: "0px"}}
                        key={`accordion-${index}`}
                    >
                        {dealsAddonData.addon
                            .filter(
                                (addon) =>
                                    addon.deals_addon_category ===
                                    item.deals_addon_category_id
                            )
                            .sort((a, b) =>
                                a.deals_addon_price === "0" &&
                                b.deals_addon_price !== "0"
                                    ? -1
                                    : a.deals_addon_price !== "0" &&
                                      b.deals_addon_price === "0"
                                    ? 1
                                    : 0
                            )
                            .map((addon, index) => (
                                <div
                                    key={`room-${index}`}
                                    className="flex max-md:flex-col md:items-center py-4 first:pt-0 last:pb-0 border-b-[0.0625rem] last:border-none border-gray-dark"
                                >
                                    <div className="max-md:w-full w-32 aspect-[2/1] mr-4 overflow-hidden">
                                        <img
                                            src={`https://cms.pmgdeals.com/uploads/addon/${addon.deals_addon_image}`}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold">
                                            {addon.deals_addon_name}
                                        </h3>
                                        <div className="text-sm text-gray-600">
                                            {parse(
                                                addon.deals_addon_descriptions
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            name="roomUpgrade"
                                            className="mr-2"
                                        />
                                        <span className="text-gray-700">
                                            {addon.deals_addon_price === "0"
                                                ? "FREE"
                                                : currency === "IDR"
                                                ? `+ ${currency} ${idrFormatter.format(
                                                      Number(
                                                          rates[currency]
                                                              ? (
                                                                    addon.deals_addon_price *
                                                                    rates[
                                                                        currency
                                                                    ]
                                                                ).toFixed(2)
                                                              : addon.deals_addon_price
                                                      )
                                                  )}`
                                                : `+ ${currency} ${formatter.format(
                                                      Number(
                                                          rates[currency]
                                                              ? (
                                                                    addon.deals_addon_price *
                                                                    rates[
                                                                        currency
                                                                    ]
                                                                ).toFixed(2)
                                                              : addon.deals_addon_price
                                                      )
                                                  )}`}
                                        </span>
                                    </div>
                                </div>
                            ))}
                    </AccordionCheckout>
                ))}
            </div>
        </div>
    );
}

function PaymentSummary({dealsData}) {
    const formatter = useMemo(
        () =>
            new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }),
        []
    );

    const idrFormatter = useMemo(() => new Intl.NumberFormat("en-US"), []);

    const {currency, rates} = useCurrency();

    const router = useRouter();

    return (
        <>
            <div className="border-[0.0625rem] border-gray-dark">
                <div className="aspect-[1.35/1] overflow-hidden">
                    <img
                        src={`https://cms.pmgdeals.com/uploads/deals/${dealsData.deals_detail.deals_image}`}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="px-4 lg:px-10 py-6 lg:py-16 border-b border-dashed border-gray-dark">
                    <div className="flex max-sm:flex-col justify-between">
                        <div className="">
                            <p className="font-medium lg:text-[1.5rem]">
                                {dealsData.deals_detail.deals_name}
                            </p>
                            <p className="font-light">
                                {dealsData.deals_detail.property_name}
                            </p>
                        </div>
                        <p className="font-bold lg:text-[1.25rem] text-[#660000]">
                            {currency}{" "}
                            {currency === "IDR"
                                ? idrFormatter.format(
                                      rates[currency]
                                          ? (
                                                dealsData.deals_detail
                                                    .deals_promo_price *
                                                rates[currency]
                                            ).toFixed(2)
                                          : dealsData.deals_detail
                                                .deals_promo_price
                                  )
                                : formatter.format(
                                      rates[currency]
                                          ? (
                                                dealsData.deals_detail
                                                    .deals_promo_price *
                                                rates[currency]
                                            ).toFixed(2)
                                          : dealsData.deals_detail
                                                .deals_promo_price
                                  )}
                        </p>
                    </div>

                    <div className="details">
                        <AccordionDetail>
                            <div className="pb-6 lg:pb-10">
                                <p className="font-bold text-[1.25rem]">
                                    Description
                                </p>
                                <div className="font-light">
                                    {parse(
                                        dealsData.deals_detail
                                            .deals_descriptions
                                    )}
                                </div>
                            </div>

                            <div>
                                <p className="font-bold text-[1.25rem]">
                                    Package Inclusions
                                </p>
                                <div className="pl-5 font-light">
                                    {parse(
                                        dealsData.deals_detail.deals_inclusions
                                    )}
                                </div>
                            </div>
                        </AccordionDetail>
                    </div>
                </div>

                <div className="px-4 lg:px-10 py-6 lg:py-16 border-b border-dashed border-gray-dark">
                    <p className="font-bold text-[1.5rem] pb-10 lg:pb-16">
                        Upgrading & Extras
                    </p>
                    <div>
                        <div className="flex max-sm:flex-col justify-between gap-4">
                            <div className="">
                                <p className="font-medium lg:text-[1.5rem]">
                                    Buy One Get One FREE Cocktail
                                </p>
                            </div>
                            <p className="font-bold text-[#660000]">
                                IDR 1,050,000
                            </p>
                        </div>

                        <div className="">
                            <AccordionDetail>
                                <div>
                                    <ul className="list-disc pl-5 font-light">
                                        <li>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit, sed do
                                            eiusmod tempor{" "}
                                        </li>
                                        <li>
                                            incididunt ut labore et dolore magna
                                            aliqua. Ut enim ad minim veniam,
                                            quis nostrud exercitation ullamc
                                        </li>
                                        <li>
                                            incididunt ut labore et dolore magna
                                            aliqua. Ut enim ad minim veniam,
                                            quis nostrud exercitation ullamc
                                        </li>
                                    </ul>
                                </div>
                            </AccordionDetail>
                        </div>
                        <button className="font-medium text-[0.75rem] pt-3 lg:pt-6">
                            Remove
                        </button>
                    </div>
                    <div>
                        <div className="flex max-sm:flex-col justify-between gap-4">
                            <div className="">
                                <p className="font-medium lg:text-[1.5rem]">
                                    Drag Queen Show | 1 Person
                                </p>
                            </div>
                            <p className="font-bold text-[#660000]">
                                IDR 1,050,000
                            </p>
                        </div>

                        <div className="">
                            <AccordionDetail>
                                <div>
                                    <ul className="list-disc pl-5 font-light">
                                        <li>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit, sed do
                                            eiusmod tempor{" "}
                                        </li>
                                        <li>
                                            incididunt ut labore et dolore magna
                                            aliqua. Ut enim ad minim veniam,
                                            quis nostrud exercitation ullamc
                                        </li>
                                        <li>
                                            incididunt ut labore et dolore magna
                                            aliqua. Ut enim ad minim veniam,
                                            quis nostrud exercitation ullamc
                                        </li>
                                    </ul>
                                </div>
                            </AccordionDetail>
                        </div>
                        <button className="font-medium text-[0.75rem] pt-3 lg:pt-6">
                            Remove
                        </button>
                    </div>
                </div>
                <div className="px-4 lg:px-10 py-6 lg:py-16">
                    <div className="flex max-sm:flex-col justify-between">
                        <div className="">
                            <p className="font-medium lg:text-[1.5rem]">
                                Total
                            </p>
                            <p className="font-light">
                                Including Taxes & Service
                            </p>
                        </div>
                        <p className="font-bold lg:text-[1.25rem] text-[#660000]">
                            {currency === "IDR"
                                ? `${currency}
                                                ${idrFormatter.format(
                                                    rates[currency]
                                                        ? (
                                                              dealsData
                                                                  .deals_detail
                                                                  .deals_promo_price *
                                                              rates[currency]
                                                          ).toFixed(2)
                                                        : dealsData.deals_detail
                                                              .deals_promo_price
                                                )}`
                                : `${currency}
                                                ${formatter.format(
                                                    rates[currency]
                                                        ? (
                                                              dealsData
                                                                  .deals_detail
                                                                  .deals_promo_price *
                                                              rates[currency]
                                                          ).toFixed(2)
                                                        : dealsData.deals_detail
                                                              .deals_promo_price
                                                )}`}
                        </p>
                    </div>

                    <div className="pt-10 lg:pt-20 flex items-center justify-center mb-4">
                        <label className="flex items-center gap-4 cursor-pointer">
                            <input type="checkbox" className="peer hidden" />
                            <span className="relative shrink-0 w-4 h-4 bg-[#D9D9D9] fill-[#D9D9D9] peer-checked:!fill-primary">
                                <FaCheck className="absolute w-4 h-4 fill-[inherit]" />
                            </span>
                            <span className="text-[0.75rem]">
                                By confirming this registrations i am agreeing
                                to the{" "}
                                <a
                                    href=""
                                    className="font-bold tracking-[1%] text-[#4A4A4A] transition-all duration-300 underline hover:no-underline"
                                >
                                    Terms & Conditions
                                </a>{" "}
                                and{" "}
                                <a
                                    href=""
                                    className="font-bold tracking-[1%] text-[#4A4A4A] transition-all duration-300 underline hover:no-underline"
                                >
                                    Privacy Policy
                                </a>
                            </span>
                        </label>
                    </div>

                    <div className="pt-10">
                        <p className="text-center font-light italic pb-3">
                            Payment will be processed in IDR
                        </p>

                        <ButtonBasic element="button" rounded>
                            Continue to Checkout
                        </ButtonBasic>
                    </div>
                </div>
            </div>
        </>
    );
}

function AccordionDetail({children, defaultOpen = false}) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className={`group ${open ? "active" : ""}`}>
            <button
                className="w-full pt-3 lg:pt-6 flex items-center"
                onClick={() => setOpen(!open)}
            >
                <p className="font-light text-[12px] leading-none">details</p>
                <GoChevronRight className="w-4 h-4 transition-all duration-300 group-[.active]:rotate-90" />
            </button>
            <div className="max-h-0 overflow-hidden transition-all duration-300 group-[.active]:max-h-screen">
                <div>{children}</div>
            </div>
        </div>
    );
}

function Form() {
    const [isBookingForSomeoneElse, setIsBookingForSomeoneElse] =
        useState(false);

    return (
        <div className="pt-20">
            <h2 className="text-lg font-semibold mb-4">
                Who are you booking for?
            </h2>
            <div className="flex flex-col gap-4 lg:gap-6">
                <label className="flex items-center">
                    <input
                        type="radio"
                        name="bookingFor"
                        checked={!isBookingForSomeoneElse}
                        onChange={() => setIsBookingForSomeoneElse(false)}
                        className="mr-2"
                    />
                    I’m the main guest
                </label>
                <label className="flex items-center">
                    <input
                        type="radio"
                        name="bookingFor"
                        checked={isBookingForSomeoneElse}
                        onChange={() => setIsBookingForSomeoneElse(true)}
                        className="mr-2"
                    />
                    I’m booking for someone else
                </label>
            </div>

            <form className="pt-20">
                <div className="flex flex-col gap-6 lg:gap-8 pb-20">
                    <div className="grid grid-cols-12 gap-4 gap-y-3">
                        <div className="col-span-12 lg:col-span-2 flex items-center">
                            <label className="font-light lg:text-[1.25rem]">
                                Salutation*
                            </label>
                        </div>

                        <div className="col-span-12 lg:col-span-10">
                            <div className="relative">
                                <select
                                    name=""
                                    className="appearance-none w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                                >
                                    <option value="Mr">Mr.</option>
                                    <option value="Mrs">Mrs.</option>
                                    <option value="Ms">Ms.</option>
                                </select>
                                <GoChevronDown className="absolute top-1/2 -translate-y-1/2 right-0 w-5 h-5 fill-gray-dark" />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 gap-y-3">
                        <div className="col-span-12 lg:col-span-2 flex items-center">
                            <label className="font-light lg:text-[1.25rem]">
                                First Name*
                            </label>
                        </div>

                        <div className="col-span-12 lg:col-span-10">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                className="block w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 gap-y-3">
                        <div className="col-span-12 lg:col-span-2 flex items-center">
                            <label className="font-light lg:text-[1.25rem]">
                                Last Name*
                            </label>
                        </div>

                        <div className="col-span-12 lg:col-span-10">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Last Name"
                                className="block w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 gap-y-3">
                        <div className="col-span-12 lg:col-span-2 flex items-center">
                            <label className="font-light lg:text-[1.25rem]">
                                E-mail*
                            </label>
                        </div>

                        <div className="col-span-12 lg:col-span-10">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="E-mail"
                                className="block w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 gap-y-3">
                        <div className="col-span-12 lg:col-span-2 flex items-center">
                            <label className="font-light lg:text-[1.25rem]">
                                Phone*
                            </label>
                        </div>

                        <div className="col-span-12 lg:col-span-10">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Phone"
                                className="block w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 gap-y-3">
                        <div className="col-span-12 lg:col-span-2 flex items-center">
                            <label className="font-light lg:text-[1.25rem]">
                                Address*
                            </label>
                        </div>

                        <div className="col-span-12 lg:col-span-10">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Address"
                                className="block w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 gap-y-3">
                        <div className="col-span-12 lg:col-span-2 flex items-center">
                            <label className="font-light lg:text-[1.25rem]">
                                City*
                            </label>
                        </div>

                        <div className="col-span-12 lg:col-span-10">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="City"
                                className="block w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 gap-y-3">
                        <div className="col-span-12 lg:col-span-2 flex items-center">
                            <label className="font-light lg:text-[1.25rem]">
                                Zipcode*
                            </label>
                        </div>

                        <div className="col-span-12 lg:col-span-10">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Zipcode"
                                className="block w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 gap-y-3">
                        <div className="col-span-12 lg:col-span-2 flex items-center">
                            <label className="font-light lg:text-[1.25rem]">
                                Country*
                            </label>
                        </div>

                        <div className="col-span-12 lg:col-span-10">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Country"
                                className="block w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 gap-y-3">
                        <div className="col-span-12 lg:col-span-2 flex items-center">
                            <label className="font-light lg:text-[1.25rem]">
                                Note
                            </label>
                        </div>

                        <div className="col-span-12 lg:col-span-10">
                            <textarea
                                name="note"
                                placeholder="Note"
                                className="block w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                            />
                        </div>
                    </div>
                </div>

                {isBookingForSomeoneElse && (
                    <div>
                        <p className="font-semibold lg:text-[1.5rem] pb-10">
                            Give as a gift
                        </p>
                        <div className="flex flex-col gap-4 lg:gap-8">
                            <div className="grid grid-cols-12 gap-4 gap-y-3">
                                <div className="col-span-12 lg:col-span-2 flex items-center">
                                    <label className="font-light lg:text-[1.25rem]">
                                        First Name*
                                    </label>
                                </div>
                                <div className="col-span-12 lg:col-span-10">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        className="block w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 gap-y-3">
                                <div className="col-span-12 lg:col-span-2 flex items-center">
                                    <label className="font-light lg:text-[1.25rem]">
                                        Last Name*
                                    </label>
                                </div>
                                <div className="col-span-12 lg:col-span-10">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="Last Name"
                                        className="block w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 gap-y-3">
                                <div className="col-span-12 lg:col-span-2 flex items-center">
                                    <label className="font-light lg:text-[1.25rem]">
                                        E-mail*
                                    </label>
                                </div>
                                <div className="col-span-12 lg:col-span-10">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="E-mail"
                                        className="block w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 gap-y-3">
                                <div className="col-span-12 lg:col-span-2 flex items-center">
                                    <label className="font-light lg:text-[1.25rem]">
                                        Phone*
                                    </label>
                                </div>
                                <div className="col-span-12 lg:col-span-10">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="Phone"
                                        className="block w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

export async function getServerSideProps({params}) {
    const id = params.id;

    const staticPage = await fetch(
        `https://cms.pmgdeals.com/api/public/content?page=checkout`
    ).then((res) => res.json());

    const dealsData = await fetch(
        `https://cms.pmgdeals.com/api/public/deals/detail?id=` + id
    ).then((res) => res.json());

    const dealsAddonCategoryData = await fetch(
        `https://cms.pmgdeals.com/api/public/deals/addoncategory?id=` + id
    ).then((res) => res.json());

    const dealsAddonData = await fetch(
        `https://cms.pmgdeals.com/api/public/deals/addon?id=` + id
    ).then((res) => res.json());

    return {
        props: {
            dealsData,
            dealsAddonCategoryData,
            dealsAddonData,
            staticPage,
        },
    };
}
