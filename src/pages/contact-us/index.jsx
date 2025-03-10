import {Hero, SectionHeading} from "@/components";

export default function ContactUs({staticPage, defaultImage}) {
    return (
        <main>
            <Head>
                <title>{staticPage.content.contact_seo_title}</title>
                <meta
                    name="description"
                    content={staticPage.content.contact_seo_descriptions}
                />
                <meta
                    name="keyword"
                    content={staticPage.content.contact_seo_keyword}
                />
                <meta
                    property="og:title"
                    content={staticPage.content.contact_seo_title}
                />
                <meta
                    property="og:description"
                    content={staticPage.content.contact_seo_descriptions}
                />
                <meta
                    property="og:image"
                    content={`https://cms.pmgdeals.com/uploads/og-image.png`}
                />
            </Head>
            <Hero />
            <div className="py-32">
                <div className="container">
                    <div className="pb-20">
                        <ContactForm />
                    </div>
                </div>

                <div className="w-full aspect-[2/1]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.888488275756!2d115.1628188753963!3d-8.70213878867446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2471fa80ae167%3A0xf68778249d80ca74!2sPMG%20Hotels%20%26%20Resorts!5e0!3m2!1sen!2sid!4v1739596042184!5m2!1sen!2sid"
                        style={{
                            border: "0",
                        }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                    ></iframe>
                </div>
            </div>
        </main>
    );
}

import {useState} from "react";
// import { Mail, Send, Whatsapp } from "lucide-react";
// simport { RiWhatsappFill } from "react-icons/ri";
import {IoLogoWhatsapp, IoMdSend} from "react-icons/io";
import {FaEnvelope} from "react-icons/fa6";
import Head from "next/head";
function ContactForm() {
    const [form, setForm] = useState({fullName: "", email: "", message: ""});

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted", form);
    };

    return (
        <div className="flex flex-col lg:flex-row w-full max-lg:space-y-16">
            <div className="lg:w-1/3 flex flex-col">
                <div>
                    <h2 className="font-inter font-medium text-[2rem] lg:text-[3rem] text-[#660000]">
                        Let's talk
                    </h2>
                    <p className="pb-10 xl:pb-20 font-medium text-[1.25rem]">
                        Ask us anything or just say hi.....
                    </p>
                </div>
                <div className="flex flex-col items-start gap-2 my-auto">
                    {[
                        {
                            icon: (
                                <IoLogoWhatsapp className="w-5 h-5 text-red-900 mr-2 fill-primary" />
                            ),
                            text: "+62 815 1044 9090",
                            href: "tel:+6281510449090",
                        },
                        {
                            icon: (
                                <FaEnvelope className="w-5 h-5 text-red-900 mr-2 fill-primary" />
                            ),
                            text: "hello@pmgdeals.com",
                            href: "mailto:hello@pmgdeals.com",
                        },
                    ].map((item, index) => (
                        <a
                            key={`contact-info-${index}`}
                            href={item.href}
                            className="group flex items-center"
                        >
                            {item.icon}
                            <span className="font-open-sans font-semibold lg:text-[1.25rem] underline group-hover:no-underline transition-all duration-300">
                                {item.text}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
            <form
                onSubmit={handleSubmit}
                className="lg:w-2/3 lg:pl-32 space-y-6 lg:space-y-32"
            >
                <p className="font-medium text-[1.5rem] lg:text-[2rem] text-[#660000]">
                    Contact Us
                </p>
                <div className="flex max-lg:flex-col gap-6 lg:gap-x-16 lg:gap-y-32">
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        className="w-full lg:w-1/2 lg:h-12 focus:outline-none lg:text-[1.5rem] placeholder:lg:text-[1.5rem]  border-b border-gray-dark"
                        value={form.fullName}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full lg:w-1/2 lg:h-12 focus:outline-none lg:text-[1.5rem] placeholder:lg:text-[1.5rem]  border-b border-gray-dark"
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>

                <textarea
                    name="message"
                    placeholder="Message"
                    className="w-full xl:min-h-40 focus:outline-none lg:text-[1.5rem] placeholder:lg:text-[1.5rem]  border-b border-gray-dark"
                    rows="3"
                    value={form.message}
                    onChange={handleChange}
                ></textarea>
                <button
                    type="submit"
                    className="leading-none lg:text-[1.25rem] text-white px-6 py-3 lg:py-4 flex items-center space-x-2 bg-primary"
                >
                    <span>SEND</span>
                    <IoMdSend className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
}

export async function getServerSideProps() {
    const staticPage = await fetch(
        `https://cms.pmgdeals.com/api/public/content?page=contact`
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
