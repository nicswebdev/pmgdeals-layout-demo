import {
    AccordionCheckout,
    ButtonBasic,
    ButtonHeart,
    Hero,
    NumberCounter,
} from "@/components";
import Head from "next/head";
import {useMemo, useState, useEffect, useRef} from "react";
import {FaCheck} from "react-icons/fa";
import {GoChevronDown, GoChevronRight} from "react-icons/go";
import parse from "html-react-parser";
import {useCurrency} from "@/context/CurrencyContext";
import {useRouter} from "next/router";
import {useForm, Controller} from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import {useSession} from "next-auth/react";

const initValues = {
    salutation: "",
    firstname: "",
    lastname: "",
    note: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipcode: "",
    country: "",
    other_firstname: "",
    other_lastname: "",
    other_email: "",
    other_phone: "",
};

const initState = {values: initValues};

export default function Description({
    dealsData,
    dealsAddonCategoryData,
    dealsAddonData,
    staticPage,
}) {
    const submitRef = useRef(null);

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

    // Create state to store the selected extras.
    const [selectedExtras, setSelectedExtras] = useState([]);

    // Base price from deals data.
    const basePrice = Number(dealsData.deals_detail.deals_promo_price);
    // Sum of extra items (each extra: price * quantity).
    const extrasTotal = selectedExtras.reduce(
        (acc, extra) => acc + extra.price * extra.quantity,
        0
    );
    const totalPrice = basePrice + extrasTotal;

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
            <div className="py-32 max-md:py-8 bg-white">
                <div className="container">
                    <div className="pb-10">
                        <a
                            href={`/details/${dealsData.deals_detail.deals_id}`}
                            className="underline text-[#660000]"
                        >
                            Back to details
                        </a>
                    </div>

                    <div className="flex flex-col xl:flex-row w-full max-lg:space-y-16">
                        <div className="xl:w-2/3 xl:pr-20">
                            {dealsAddonCategoryData.addon_category.length >
                                0 && (
                                <UpgradingExtras
                                    dealsAddonCategoryData={
                                        dealsAddonCategoryData
                                    }
                                    dealsAddonData={dealsAddonData}
                                    selectedExtras={selectedExtras}
                                    setSelectedExtras={setSelectedExtras}
                                />
                            )}
                            <Form
                                submitRef={submitRef}
                                dealsData={dealsData}
                                selectedExtras={selectedExtras}
                                totalPrice={totalPrice}
                            />
                        </div>

                        <div className="xl:w-1/3">
                            <PaymentSummary
                                dealsData={dealsData}
                                selectedExtras={selectedExtras}
                                setSelectedExtras={setSelectedExtras}
                                totalPrice={totalPrice}
                                submitRef={submitRef}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function UpgradingExtras({
    dealsAddonCategoryData,
    dealsAddonData,
    selectedExtras,
    setSelectedExtras,
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

    // For radio (max one extra per category).
    const handleRadioSelect = (categoryId, addon) => {
        setSelectedExtras((prev) => {
            const newExtras = prev.filter((e) => e.categoryId !== categoryId);
            return [
                ...newExtras,
                {
                    addonId: addon.deals_addon_id,
                    categoryId,
                    name: addon.deals_addon_name,
                    desc: addon.deals_addon_descriptions,
                    price: Number(addon.deals_addon_price),
                    quantity: 1,
                },
            ];
        });
    };

    // For checkboxes (toggle extra on/off).
    const handleCheckboxChange = (categoryId, addon, checked) => {
        if (checked) {
            setSelectedExtras((prev) => {
                if (prev.some((e) => e.addonId === addon.deals_addon_id))
                    return prev;
                return [
                    ...prev,
                    {
                        addonId: addon.deals_addon_id,
                        categoryId,
                        name: addon.deals_addon_name,
                        desc: addon.deals_addon_descriptions,
                        price: Number(addon.deals_addon_price),
                        quantity: 1,
                    },
                ];
            });
        } else {
            setSelectedExtras((prev) =>
                prev.filter((e) => e.addonId !== addon.deals_addon_id)
            );
        }
    };

    // For number counter (update quantity).
    const handleCounterChange = (categoryId, addon, newValue) => {
        setSelectedExtras((prev) => {
            if (newValue <= 0) {
                return prev.filter((e) => e.addonId !== addon.deals_addon_id);
            }
            const exists = prev.find((e) => e.addonId === addon.deals_addon_id);
            if (exists) {
                return prev.map((e) =>
                    e.addonId === addon.deals_addon_id
                        ? {...e, quantity: newValue}
                        : e
                );
            } else {
                return [
                    ...prev,
                    {
                        addonId: addon.deals_addon_id,
                        categoryId,
                        name: addon.deals_addon_name,
                        desc: addon.deals_addon_descriptions,
                        price: Number(addon.deals_addon_price),
                        quantity: newValue,
                    },
                ];
            }
        });
    };

    return (
        <div className="pb-20">
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
                        defaultOpen={index === 0 ? true : false}
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
                            .map((addon, index2) => (
                                <div
                                    key={`room-${index2}`}
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
                                        {item.deals_addon_max_selected_items ===
                                        "One" ? (
                                            <input
                                                type="radio"
                                                name={`extra_${item.deals_addon_category_id}`}
                                                onChange={() =>
                                                    handleRadioSelect(
                                                        item.deals_addon_category_id,
                                                        addon
                                                    )
                                                }
                                                checked={selectedExtras.some(
                                                    (e) =>
                                                        e.addonId ===
                                                        addon.deals_addon_id
                                                )}
                                                className="mr-2"
                                            />
                                        ) : (
                                            <>
                                                {addon.deals_addon_qty_type ===
                                                "Single" ? (
                                                    <input
                                                        type="checkbox"
                                                        name={`extra_${item.deals_addon_category_id}`}
                                                        onChange={(e) =>
                                                            handleCheckboxChange(
                                                                item.deals_addon_category_id,
                                                                addon,
                                                                e.target.checked
                                                            )
                                                        }
                                                        checked={selectedExtras.some(
                                                            (e) =>
                                                                e.addonId ===
                                                                addon.deals_addon_id
                                                        )}
                                                        className="mr-2"
                                                    />
                                                ) : (
                                                    <NumberCounter
                                                        name={`extraCount_${addon.deals_addon_id}`}
                                                        value={
                                                            selectedExtras.find(
                                                                (e) =>
                                                                    e.addonId ===
                                                                    addon.deals_addon_id
                                                            )?.quantity || 0
                                                        }
                                                        onChange={(newValue) =>
                                                            handleCounterChange(
                                                                item.deals_addon_category_id,
                                                                addon,
                                                                newValue
                                                            )
                                                        }
                                                    />
                                                )}
                                            </>
                                        )}

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

function PaymentSummary({
    dealsData,
    selectedExtras,
    setSelectedExtras,
    totalPrice,
    submitRef,
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

    const handleRemoveExtra = (addonId) => {
        setSelectedExtras((prev) => prev.filter((e) => e.addonId !== addonId));
    };

    // const handleSubmitClick = () => {
    //     if (submitRef.current) {
    //         console.log("Submitting form:", submitRef.current); // Debugging
    //         submitRef.current.requestSubmit();
    //     } else {
    //         console.error("submitRef is not assigned yet!");
    //     }
    // };

    const handleSubmitClick = () => {
        if (submitRef.current) {
            const event = new Event("submit", {
                bubbles: true,
                cancelable: true,
            });
            submitRef.current.dispatchEvent(event);
        } else {
            console.error("submitRef is not assigned yet!");
        }
    };

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
                        Selected Upgrading & Extras
                    </p>
                    {selectedExtras.length === 0 ? (
                        <p className="font-light">No extras selected</p>
                    ) : (
                        selectedExtras.map((extra) => (
                            <>
                                {/* <div
                                    key={extra.addonId}
                                    className="flex max-sm:flex-col justify-between gap-4 mb-4"
                                >
                                    <div>
                                        <p className="font-medium lg:text-[1.5rem]">
                                            {extra.name}{" "}
                                            {extra.quantity > 1 &&
                                                `| ${extra.quantity} pcs`}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold text-[#660000]">
                                            {currency === "IDR"
                                                ? `IDR ${idrFormatter.format(
                                                      rates[currency]
                                                          ? (
                                                                extra.price *
                                                                rates[currency]
                                                            ).toFixed(2)
                                                          : extra.price
                                                  )}`
                                                : `${currency} ${formatter.format(
                                                      rates[currency]
                                                          ? (
                                                                extra.price *
                                                                rates[currency]
                                                            ).toFixed(2)
                                                          : extra.price
                                                  )}`}
                                        </p>
                                        <button
                                            onClick={() =>
                                                handleRemoveExtra(extra.addonId)
                                            }
                                            className="font-medium text-[0.75rem]"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div> */}

                                <div key={extra.addonId}>
                                    <div className="flex max-sm:flex-col justify-between sm:items-center gap-4">
                                        <div className="">
                                            <p className="font-medium lg:text-[1.5rem]">
                                                {extra.name}{" "}
                                                {extra.quantity > 1 &&
                                                    `| ${extra.quantity} pcs`}
                                            </p>
                                        </div>
                                        <p className="font-bold text-[#660000]">
                                            {currency === "IDR"
                                                ? `IDR ${idrFormatter.format(
                                                      rates[currency]
                                                          ? (
                                                                extra.price *
                                                                extra.quantity *
                                                                rates[currency]
                                                            ).toFixed(2)
                                                          : extra.price *
                                                                extra.quantity
                                                  )}`
                                                : `${currency} ${formatter.format(
                                                      rates[currency]
                                                          ? (
                                                                extra.price *
                                                                extra.quantity *
                                                                rates[currency]
                                                            ).toFixed(2)
                                                          : extra.price *
                                                                extra.quantity
                                                  )}`}
                                        </p>
                                    </div>

                                    <div className="">
                                        <AccordionDetail>
                                            <div>
                                                <div className="list-disc pl-5 font-light">
                                                    {parse(extra.desc)}
                                                </div>
                                            </div>
                                        </AccordionDetail>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleRemoveExtra(extra.addonId)
                                        }
                                        className="font-medium text-[0.75rem] pt-3 lg:pt-6"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </>
                        ))
                    )}
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
                                ? `${currency} ${idrFormatter.format(
                                      rates[currency]
                                          ? (
                                                totalPrice * rates[currency]
                                            ).toFixed(2)
                                          : totalPrice
                                  )}`
                                : `${currency} ${formatter.format(
                                      rates[currency]
                                          ? (
                                                totalPrice * rates[currency]
                                            ).toFixed(2)
                                          : totalPrice
                                  )}`}
                        </p>
                    </div>

                    <div className="pt-10 lg:pt-20 flex items-center justify-center mb-4">
                        <label className="flex items-center gap-4 cursor-pointer">
                            <span className="text-[0.75rem]">
                                By confirming this registrations i am agreeing
                                to the{" "}
                                <a
                                    href="/terms-conditions"
                                    className="font-bold tracking-[1%] text-[#4A4A4A] transition-all duration-300 underline hover:no-underline"
                                >
                                    Terms & Conditions
                                </a>{" "}
                                and{" "}
                                <a
                                    href="/refund-policy"
                                    className="font-bold tracking-[1%] text-[#4A4A4A] transition-all duration-300 underline hover:no-underline"
                                >
                                    Refund Policy
                                </a>
                            </span>
                        </label>
                    </div>

                    <div className="pt-10">
                        <p className="text-center font-light italic pb-3">
                            Payment will be processed in IDR
                        </p>

                        <button
                            type="submit"
                            onClick={handleSubmitClick}
                            className="w-full flex justify-center items-center gap-2 md:gap-4 2xl:gap-6 py-3 px-4 xl:px-8 transition-all duration-300 hover:opacity-70 hover:cursor-pointer text-white bg-primary rounded-full"
                        >
                            Continue to Payment
                        </button>
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

function Form({dealsData, selectedExtras, totalPrice, submitRef}) {
    const {data: session} = useSession();

    const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const [state, setState] = useState(initState);
    const {values, isLoading, error, success} = state;

    const key = "6Ldt0ycpAAAAAJMNUgQfmilcJxBe4GGifNSglOtE";
    // const key = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
    const [captchaIsDone, setCaptchaIsDone] = useState(false);

    function onChange() {
        setCaptchaIsDone(true);
    }

    const [bookingForOthers, setBookingForOthers] = useState(false);

    const {
        control,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm();

    useEffect(() => {
        // Check if user is logged in
        if (session && session.user) {
            // Use setValue from react-hook-form to set the values
            setValue("salutation", session.user.member_salutation || "Mr.");
            setValue("firstname", session.user.member_firstname || "");
            setValue("lastname", session.user.member_lastname || "");
            setValue("email", session.user.member_email || "");
            setValue("phone", session.user.member_phone || "");
            console.log("Form values set from session:", session.user);
        }
    }, [session, setValue]);

    const [checkoutData, setCheckoutData] = useState({
        addons: selectedExtras,
        dealsId: dealsData.deals_detail.deals_id,
        totalPrice: totalPrice,
    });

    useEffect(() => {
        setCheckoutData({
            addons: selectedExtras,
            totalPrice: totalPrice,
            dealsId: dealsData.deals_detail.deals_id,
        });
    }, [selectedExtras, totalPrice]);

    console.log("Checkout", checkoutData);

    const onSubmit = async (data) => {
        console.log("Form submitted:", data);
        if (captchaIsDone) {
            setState((prev) => ({
                ...prev,
                isLoading: true,
            }));

            const orderData = {...data, bookingForOthers: bookingForOthers};

            if (bookingForOthers) {
                orderData.other_firstname = data.other_firstname;
                orderData.other_lastname = data.other_lastname;
                orderData.other_email = data.other_email;
                orderData.other_phone = data.other_phone;
            }

            orderData.member_id =
                session && session.user ? session.user.member_id : null;

            const payload = {
                orderData: orderData,
                checkoutData: checkoutData,
            };

            console.log(payload);

            try {
                const response = await fetch(
                    "https://cms.pmgdeals.com/api/public/order",
                    {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify(payload),
                    }
                );

                console.log("Fetch response:", response);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // const result = await response.json();
                const responseText = await response.text();
                let result = {};
                try {
                    result = responseText ? JSON.parse(responseText) : {};
                } catch (err) {
                    console.error("Failed to parse JSON:", err, responseText);
                    setState((prev) => ({
                        ...prev,
                        isLoading: false,
                        error: "Failed to parse response from the server.",
                    }));
                    return;
                }

                console.log("Fetch result:", result);

                // Check if the response body has the payment_url
                if (result && result.payment_url) {
                    // Redirect to the payment URL
                    window.location.href = result.payment_url;
                } else {
                    // Handle the scenario where payment_url is not present
                    console.error("No payment_url in response:", result);
                    setState((prev) => ({
                        ...prev,
                        isLoading: false,
                        error: "No payment URL provided.",
                    }));
                }
            } catch (error) {
                console.error("Submission error:", error);
                alert("An error occurred during submission");
                setState((prev) => ({
                    ...prev,
                    isLoading: false,
                    error: error.message,
                }));
            }
        } else {
            console.error("Captcha not completed");
            setState((prev) => ({
                ...prev,
                error: "Please complete the captcha.",
            }));
        }
    };

    useEffect(() => {
        if (submitRef && submitRef.current) {
            console.log("submitRef assigned:", submitRef.current);
        } else {
            console.log("submitRef is still undefined!");
        }
    }, [submitRef]);

    return (
        <form ref={submitRef} onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-lg font-semibold mb-4">
                Who are you booking for?
            </h2>
            <div className="flex flex-col gap-4 lg:gap-6">
                <label className="flex items-center">
                    <input
                        type="radio"
                        name="bookingFor"
                        checked={!bookingForOthers}
                        onChange={() => setBookingForOthers(false)}
                        className="mr-2"
                    />
                    I'm the main guest
                </label>
                <label className="flex items-center">
                    <input
                        type="radio"
                        name="bookingFor"
                        checked={bookingForOthers}
                        onChange={() => setBookingForOthers(true)}
                        className="mr-2"
                    />
                    I'm booking for someone else
                </label>
            </div>

            <div className="pt-20">
                <div className="flex flex-col gap-6 lg:gap-8 pb-10">
                    <div className="grid grid-cols-12 gap-4 gap-y-3">
                        <div className="col-span-12 lg:col-span-2 flex items-center">
                            <label className="font-light lg:text-[1.25rem]">
                                Salutation*
                            </label>
                        </div>

                        <div className="col-span-12 lg:col-span-10">
                            <Controller
                                control={control}
                                name="salutation"
                                rules={{
                                    required: "Salutation is required.",
                                }}
                                defaultValue={
                                    session?.user?.member_salutation || "Mr."
                                }
                                render={({
                                    field: {value, onChange, onBlur},
                                    fieldState: {error},
                                }) => (
                                    <>
                                        <div className="relative">
                                            <select
                                                value={value}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                className="appearance-none w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                                            >
                                                <option value="Mr." selected>
                                                    Mr.
                                                </option>
                                                <option value="Mrs.">
                                                    Mrs.
                                                </option>
                                                <option value="Ms.">Ms.</option>
                                            </select>
                                            <GoChevronDown className="absolute top-1/2 -translate-y-1/2 right-0 w-5 h-5 fill-gray-dark" />
                                        </div>
                                        {error && (
                                            <p className="text-[#eb4034]">
                                                {error.message || "Error"}
                                            </p>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 gap-y-3">
                        <div className="col-span-12 lg:col-span-2 flex items-center">
                            <label className="font-light lg:text-[1.25rem]">
                                First Name*
                            </label>
                        </div>

                        <div className="col-span-12 lg:col-span-10">
                            <Controller
                                control={control}
                                name="firstname"
                                rules={{
                                    required: "First Name is required.",
                                }}
                                render={({
                                    field: {value, onChange, onBlur},
                                    fieldState: {error},
                                }) => (
                                    <>
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            placeholder="First Name"
                                            className="block w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                                        />
                                        {error && (
                                            <p className="text-[#eb4034]">
                                                {error.message || "Error"}
                                            </p>
                                        )}
                                    </>
                                )}
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
                            <Controller
                                control={control}
                                name="lastname"
                                rules={{
                                    required: "Last Name is required.",
                                }}
                                render={({
                                    field: {value, onChange, onBlur},
                                    fieldState: {error},
                                }) => (
                                    <>
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            placeholder="Last Name"
                                            className="block w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                                        />
                                        {error && (
                                            <p className="text-[#eb4034]">
                                                {error.message || "Error"}
                                            </p>
                                        )}
                                    </>
                                )}
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
                            <Controller
                                control={control}
                                name="email"
                                rules={{
                                    required: "E-mail is required.",
                                    pattern: {
                                        value: EMAIL_REGEX,
                                        message: "Wrong e-mail format.",
                                    },
                                }}
                                render={({
                                    field: {value, onChange, onBlur},
                                    fieldState: {error},
                                }) => (
                                    <>
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            placeholder="E-mail"
                                            className="block w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                                        />
                                        {error && (
                                            <p className="text-[#eb4034]">
                                                {error.message || "Error"}
                                            </p>
                                        )}
                                    </>
                                )}
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
                            <Controller
                                control={control}
                                name="phone"
                                rules={{
                                    required: "Phone is required.",
                                }}
                                render={({
                                    field: {value, onChange, onBlur},
                                    fieldState: {error},
                                }) => (
                                    <>
                                        <input
                                            type="number"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            placeholder="Phone"
                                            className="block w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                                        />
                                        {error && (
                                            <p className="text-[#eb4034]">
                                                {error.message || "Error"}
                                            </p>
                                        )}
                                    </>
                                )}
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
                            <Controller
                                control={control}
                                name="address"
                                rules={{
                                    required: "Address is required.",
                                }}
                                render={({
                                    field: {value, onChange, onBlur},
                                    fieldState: {error},
                                }) => (
                                    <>
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            placeholder="Address"
                                            className="block w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                                        />
                                        {error && (
                                            <p className="text-[#eb4034]">
                                                {error.message || "Error"}
                                            </p>
                                        )}
                                    </>
                                )}
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
                            <Controller
                                control={control}
                                name="city"
                                rules={{
                                    required: "City is required.",
                                }}
                                render={({
                                    field: {value, onChange, onBlur},
                                    fieldState: {error},
                                }) => (
                                    <>
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            placeholder="City"
                                            className="block w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                                        />
                                        {error && (
                                            <p className="text-[#eb4034]">
                                                {error.message || "Error"}
                                            </p>
                                        )}
                                    </>
                                )}
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
                            <Controller
                                control={control}
                                name="zipcode"
                                rules={{
                                    required: "Zipcode is required.",
                                }}
                                render={({
                                    field: {value, onChange, onBlur},
                                    fieldState: {error},
                                }) => (
                                    <>
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            placeholder="Zipcode"
                                            className="block w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                                        />
                                        {error && (
                                            <p className="text-[#eb4034]">
                                                {error.message || "Error"}
                                            </p>
                                        )}
                                    </>
                                )}
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
                            <Controller
                                control={control}
                                name="country"
                                rules={{
                                    required: "Country is required.",
                                }}
                                render={({
                                    field: {value, onChange, onBlur},
                                    fieldState: {error},
                                }) => (
                                    <>
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            placeholder="Country"
                                            className="block w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                                        />
                                        {error && (
                                            <p className="text-[#eb4034]">
                                                {error.message || "Error"}
                                            </p>
                                        )}
                                    </>
                                )}
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
                            <Controller
                                control={control}
                                name="note"
                                rules={{}}
                                defaultValue={""}
                                render={({
                                    field: {value, onChange, onBlur},
                                    fieldState: {error},
                                }) => (
                                    <>
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            placeholder="Note"
                                            className="block w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                                        />
                                        {error && (
                                            <p className="text-[#eb4034]">
                                                {error.message || "Error"}
                                            </p>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                    </div>
                </div>

                {bookingForOthers && (
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
                                    <Controller
                                        control={control}
                                        name="other_firstname"
                                        rules={{
                                            required: "First Name is required.",
                                        }}
                                        render={({
                                            field: {value, onChange, onBlur},
                                            fieldState: {error},
                                        }) => (
                                            <>
                                                <input
                                                    type="text"
                                                    value={value}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    placeholder="First Name"
                                                    className="block w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                                                />
                                                {error && (
                                                    <p className="text-[#eb4034]">
                                                        {error.message ||
                                                            "Error"}
                                                    </p>
                                                )}
                                            </>
                                        )}
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
                                    <Controller
                                        control={control}
                                        name="other_lastname"
                                        rules={{
                                            required: "Last Name is required.",
                                        }}
                                        render={({
                                            field: {value, onChange, onBlur},
                                            fieldState: {error},
                                        }) => (
                                            <>
                                                <input
                                                    type="text"
                                                    value={value}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    placeholder="Last Name"
                                                    className="block w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                                                />
                                                {error && (
                                                    <p className="text-[#eb4034]">
                                                        {error.message ||
                                                            "Error"}
                                                    </p>
                                                )}
                                            </>
                                        )}
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
                                    <Controller
                                        control={control}
                                        name="other_email"
                                        rules={{
                                            required: "E-mail is required.",
                                            pattern: {
                                                value: EMAIL_REGEX,
                                                message: "Wrong e-mail format.",
                                            },
                                        }}
                                        render={({
                                            field: {value, onChange, onBlur},
                                            fieldState: {error},
                                        }) => (
                                            <>
                                                <input
                                                    type="text"
                                                    value={value}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    placeholder="E-mail"
                                                    className="block w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                                                />
                                                {error && (
                                                    <p className="text-[#eb4034]">
                                                        {error.message ||
                                                            "Error"}
                                                    </p>
                                                )}
                                            </>
                                        )}
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
                                    <Controller
                                        control={control}
                                        name="other_phone"
                                        rules={{
                                            required: "Phone is required.",
                                        }}
                                        render={({
                                            field: {value, onChange, onBlur},
                                            fieldState: {error},
                                        }) => (
                                            <>
                                                <input
                                                    type="text"
                                                    value={value}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    placeholder="Phone"
                                                    className="block w-full lg:h-10 focus:outline-none font-light lg:text-[1.25rem] placeholder:lg:text-[1.25rem] border-b border-gray-dark"
                                                />
                                                {error && (
                                                    <p className="text-[#eb4034]">
                                                        {error.message ||
                                                            "Error"}
                                                    </p>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="mt-4">
                    <ReCAPTCHA sitekey={key} onChange={onChange} />
                </div>
            </div>
        </form>
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
