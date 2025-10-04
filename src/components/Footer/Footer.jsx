import {FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok} from "react-icons/fa";

import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import {useResponsiveWidth} from "@/hooks";
import {useState} from "react";

export default function Footer() {
    const {screenSizes} = useResponsiveWidth();
    const brands = [
        {
            href: "https://baliniksoma.com",
            image: "/images/footer/logo/niksomae-logo-white.png",
        },
        {
            href: "https://themagani.com",
            image: "/images/footer/logo/themagani-logo-white.png",
        },
        {
            href: "https://thebandha.com",
            image: "/images/footer/logo/thebandha-logo-white.png",
        },
        {
            href: "https://royalsuitesatthebandha.com",
            image: "/images/footer/logo/royal-suite-logo-white.png",
        },
        {
            href: "https://visalaspa.com",
            image: "/images/footer/logo/visalaspa-logo-white.png",
        },
        {
            href: "https://mozzarella-resto.com",
            image: "/images/footer/logo/mozzarellarestandbar-logo-white.png",
        },
        {
            href: "https://mozzarella-resto.com",
            image: "/images/footer/logo/mozzarellabythesea-logo-white.png",
        },
        {
            href: "https://hitanarestaurant.com",
            image: "/images/footer/logo/logo-hitana-white.png",
        },
    ];

    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState("");

    const subscribe = async (e) => {
        e.preventDefault();

        setStatus("sending");

        setMessage("");

        try {
            const response = await fetch("/api/mailchimp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    tags: ["PMG Deals Website Subscriber"], // Add your tag(s) here
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setStatus("success");
                setMessage(
                    data.message || "Successfully subscribed to the newsletter."
                );
            } else {
                const errorData = await response.json();
                setStatus("error");
                setMessage(
                    errorData.error || "Something went wrong. Please try again."
                );
            }
        } catch (error) {
            setStatus("error");
            setMessage("An unexpected error occurred.");
        }
    };

    return (
        <footer className="pt-0 lg:pt-20 bg-gray-dark text-white ">
            <div className="container 4xl:max-w-[126.875rem]">
                <div className="flex max-lg:flex-col gap-4 pb-10">
                    <div className="shrink-0 grow-0 basis-full lg:basis-8/12">
                        <div className="flex max-lg:flex-col max-lg:items-center lg:gap-20">
                            {/* <div className="max-w-[11.25rem] 4xl:max-w-[23.75rem]">
                                <img
                                    src="/images/footer/logo.png"
                                    alt="Logo"
                                    className="w-full"
                                />
                            </div> */}

                            <div className="max-lg:pb-8 max-md:pt-8">
                                <div className="max-lg:text-center">
                                    <p className="pb-4 lg:pb-6 font-open-sans font-bold lg:text-[2rem]">
                                        GET IN TOUCH
                                    </p>
                                    <p className="pb-0 lg:pb-0 font-open-sans lg:text-[1.375rem]">
                                        PMG Hotels & Resorts
                                    </p>
                                    <p className="pb-4 lg:pb-6 font-open-sans text-[0.75rem] lg:text-[1.375rem]">
                                        Jalan Padma Utara, Legian Kaja
                                        <br />
                                        Bali 80361 - Indonesia
                                    </p>
                                    <p className="pb-4 lg:pb-6 font-open-sans text-[0.75rem] lg:text-[1.375rem]">
                                        Phone: 
                                        <a
                                            href="tel:+62361757688"
                                            className="underline"
                                        >
                                            +62 361 757 688
                                        </a>
                                        <br />
                                        Fax: +62 361 4752 979
                                        <br />
                                        WhatsApp: 
                                        <a
                                            href="https://wa.me/+6281510449090"
                                            className="underline"
                                        >
                                            +62 815 1044 9090
                                        </a>
                                        <br />
                                        E-mail: 
                                        <a
                                            href="mailto:hello@pmgdeals.com"
                                            className="underline"
                                        >
                                            hello@pmgdeals.com
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div className="max-lg:pb-8">
                                <div className="max-lg:text-center">
                                    {/* <p className="pb-4 lg:pb-6 font-open-sans font-bold lg:text-[2rem]">
                                        HELP
                                    </p> */}

                                    <ul className="flex flex-col gap-1 lg:gap-4">
                                        {[
                                            {
                                                href: "/about-us",
                                                label: "About us",
                                            },
                                            {
                                                href: "/contact-us",
                                                label: "Contact Us",
                                            },
                                            {
                                                href: "/terms-conditions",
                                                label: "Terms & Conditions",
                                            },
                                            {
                                                href: "/privacy",
                                                label: "Privacy & Policy",
                                            },
                                            {
                                                href: "/refund-policy",
                                                label: "Refund Policy",
                                            },
                                        ].map((item, index) => (
                                            <li
                                                key={`social-${index}`}
                                                className="leading-none"
                                            >
                                                <a
                                                    href={item.href}
                                                    className="font-open-sans text-[0.75rem] lg:text-[1.375rem]"
                                                >
                                                    {item.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="shrink-0 grow-0 basis-full lg:basis-4/12">
                        <div className="max-lg:text-center">
                            <p className="pb-4 lg:pb-6 font-open-sans font-bold lg:text-[2rem]">
                                NEWSLETTER
                            </p>
                            <p className="pb-4 lg:pb-6 font-open-sans text-[0.75rem] lg:text-[1.375rem]">
                                Receive our latest stories direct to your inbox.
                            </p>
                            <form onSubmit={subscribe}>
                                <div className="flex">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="E-mail Address"
                                        className="px-4 py-2 w-full font-open-sans text-[0.75rem] lg:text-[1.375rem] placeholder:font-open-sans placeholder:text-[0.75rem] placeholder:lg:text-[1.375rem] placeholder:text-[#A3A3A3] bg-[#D9D9D9] text-black focus:outline-none"
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 font-open-sans text-white bg-primary"
                                    >
                                        SUBSCRIBE
                                    </button>
                                </div>
                                {status === "sending" && (
                                    <div style={{color: "white"}}>
                                        sending...
                                    </div>
                                )}
                                {status === "error" && (
                                    <div
                                        style={{color: "white"}}
                                        dangerouslySetInnerHTML={{
                                            __html: message,
                                        }}
                                    />
                                )}
                                {status === "success" && (
                                    <div
                                        style={{color: "white"}}
                                        dangerouslySetInnerHTML={{
                                            __html: message,
                                        }}
                                    />
                                )}
                            </form>

                            <ul className="mt-8 flex max-lg:justify-center items-center gap-4">
                                {[
                                    {
                                        href: "https://www.facebook.com/pmghotelsresorts/",
                                        icon: (
                                            <FaFacebookF className="w-6 lg:w-8 h-6 lg:h-8" />
                                        ),
                                    },
                                    {
                                        href: "https://www.instagram.com/pmghotelsresortsbali/",
                                        icon: (
                                            <FaInstagram className="w-6 lg:w-8 h-6 lg:h-8" />
                                        ),
                                    },
                                    {
                                        href: "https://wa.me/6281510449090",
                                        icon: (
                                            <FaWhatsapp className="w-6 lg:w-8 h-6 lg:h-8" />
                                        ),
                                    },
                                ].map((item, index) => (
                                    <li key={`social-${index}`}>
                                        <a href={item.href} target="_blank">
                                            {item.icon}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-10 lg:py-20">
                <div className="w-full flex items-center pb-20">
                    <div className="flex-grow border-t border-[#BCBCBC]"></div>
                    <span className="px-4 font-open-sans lg:text-[2rem] uppercase">
                        Explore Our Brands
                    </span>
                    <div className="flex-grow border-t border-[#BCBCBC]"></div>
                </div>

                <div className="container 4xl:max-w-[126.875rem]">
                    <ul className="flex flex-wrap justify-center gap-y-8">
                        {brands.map((item, index) => (
                            <li
                                key={`footer-brand-${index}`}
                                className="flex items-center justify-center basis-6/12 md:basis-4/12 xl:basis-3/12"
                            >
                                <a
                                    href={item.href}
                                    target="_blank"
                                    className="flex items-center justify-center"
                                >
                                    <img
                                        src={item.image}
                                        alt=""
                                        className="w-[75%]"
                                    />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="pt-6 pb-9 border-t border-[#BCBCBC]">
                <p className="text-center font-open-sans text-[0.75rem] lg:text-[1.25rem]">
                    ©{new Date().getFullYear()} PMG Hotels & Resorts. All Rights
                    Reserved
                </p>
            </div>
        </footer>
    );
}
