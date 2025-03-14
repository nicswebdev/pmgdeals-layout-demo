import {ButtonBasic, Hero, SectionHeading} from "@/components";
import axios from "axios";
import {signIn, useSession} from "next-auth/react";
import Head from "next/head";
import {useRouter} from "next/router";
import {useEffect, useMemo, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {FaCheck} from "react-icons/fa6";
import {FcGoogle} from "react-icons/fc";

const initValues = {
    email: "",
};

const initState = {values: initValues};

export default function Forgot({homepageDeals}) {
    const formatter = useMemo(() => new Intl.NumberFormat("en-US"), []);

    const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const [state, setState] = useState(initState);
    const {values, isLoading, error, success} = state;

    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = async (data) => {
        setState((prev) => ({
            ...prev,
            isLoading: true,
        }));

        try {
            const response = await axios.post(
                "https://cms.pmgdeals.com/api/public/forgot",
                {
                    email: data.email,
                }
            );
            // Handle success here. The API should return a success message.
            setState((prev) => ({
                ...prev,
                isLoading: false,
                success: response.data.message,
                error: null, // Clear any previous errors
            }));
        } catch (error) {
            let errorMessage = "Failed to reset password. Please try again.";
            if (error.response && error.response.data) {
                // Use the error message from the response (if available)
                errorMessage = error.response.data.message || errorMessage;
            }

            setState((prev) => ({
                ...prev,
                isLoading: false,
                error: errorMessage,
            }));
        }
    };

    return (
        <main>
            <Head>
                <title>{homepageDeals.homepage.homepage_seo_title}</title>
                <meta
                    name="description"
                    content={homepageDeals.homepage.homepage_seo_descriptions}
                />
                <meta
                    name="keyword"
                    content={homepageDeals.homepage.homepage_seo_keyword}
                />
                <meta
                    property="og:title"
                    content={homepageDeals.homepage.homepage_seo_title}
                />
                <meta
                    property="og:description"
                    content={homepageDeals.homepage.homepage_seo_descriptions}
                />
                <meta
                    property="og:image"
                    content={`https://cms.pmgdeals.com/uploads/og-image.png`}
                />
            </Head>
            <Hero />
            <div className="py-32">
                <div className="container">
                    <div className="pb-10">
                        <SectionHeading style={{textAlign: "center"}}>
                            Forgot Password ?
                        </SectionHeading>
                    </div>
                </div>

                <div className="container sm:max-w-[37.5rem]">
                    <div className="rounded-lg shadow-[0_8px_20px_rgba(0,0,0,0.1)]">
                        <div className="px-8 sm:px-10 py-8 sm:py-10 rounded-lg shadow-[0_80px_50px_rgba(0,0,0,0.1)] w-full">
                            <p className="font-semibold mt-4 mb-6 text-center">
                                We will send you a link to set a new password
                                using the registered email address
                            </p>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-col gap-10">
                                    <div className="flex flex-col gap-10">
                                        <Controller
                                            control={control}
                                            name="email"
                                            rules={{
                                                required: "E-mail is required.",
                                                pattern: {
                                                    value: EMAIL_REGEX,
                                                    message:
                                                        "Wrong e-mail format.",
                                                },
                                            }}
                                            render={({
                                                field: {
                                                    value,
                                                    onChange,
                                                    onBlur,
                                                },
                                                fieldState: {error},
                                            }) => (
                                                <>
                                                    <input
                                                        type="text"
                                                        value={value}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        placeholder="E-mail"
                                                        className=" lg:h-12 focus:outline-none lg:text-[1.5rem] placeholder:lg:text-[1.5rem]  border-b border-gray-dark"
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

                                    <div className="flex flex-col gap-4  lg:max-w-[60%] mx-auto">
                                        {error && (
                                            <div className="text-[#eb4034] mt-2 text-center">
                                                {error}
                                            </div>
                                        )}
                                        {success && (
                                            <div className="text-[#28a745] mt-2 text-center">
                                                {success}
                                            </div>
                                        )}
                                        <button
                                            type="submit"
                                            class="w-full flex justify-center items-center gap-2 md:gap-4 2xl:gap-6 py-3 px-4 xl:px-8 transition-all duration-300 hover:opacity-70 hover:cursor-pointer text-white bg-primary rounded-full"
                                        >
                                            {isLoading
                                                ? "LOADING..."
                                                : "SUBMIT"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export async function getServerSideProps() {
    const homepageDeals = await fetch(
        `https://cms.pmgdeals.com/api/public/homepage`
    ).then((res) => res.json());

    return {
        props: {
            homepageDeals,
        },
    };
}
