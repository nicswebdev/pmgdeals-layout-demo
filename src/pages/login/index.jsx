import {ButtonBasic, Hero, SectionHeading} from "@/components";
import {signIn, useSession} from "next-auth/react";
import Head from "next/head";
import {useRouter} from "next/router";
import {useEffect, useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {FaCheck} from "react-icons/fa6";
import {FcGoogle} from "react-icons/fc";

const initValues = {
    email: "",
    password: "",
};

const initState = {values: initValues};

export default function Login({homepageDeals}) {
    const {data: session, status} = useSession();

    const formatter = useMemo(() => new Intl.NumberFormat("en-US"), []);

    const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const [state, setState] = useState(initState);
    const {values, isLoading, error, success} = state;

    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/"); // Redirect to homepage if the user is already signed in
        }
    }, [status, router]);

    const handleGoogleSignIn = async () => {
        await signIn("google", {callbackUrl: "/"});
    };

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

        const loginData = {...data};

        const {email, password} = data;

        try {
            const result = await signIn("credentials", {
                redirect: false, // Prevents automatic redirection after sign in
                email, // Pass username
                password, // Pass password
                callbackUrl: "/", // URL to redirect to after sign in
            });

            // Handle response, e.g., check if sign-in was successful
            if (!result.error) {
                window.location.href = "/";
            } else {
                let errorMessage = "Login Failed. Something Wrong.";
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
        } catch (error) {
            let errorMessage = "Login Failed. Something Wrong.";
            if (error.response && error.response.data) {
                // Use the error message from the response (if available)
                errorMessage = error.response.data.message || errorMessage;
            }

            setState((prev) => ({
                ...prev,
                isLoading: false,
                error: errorMessage,
            }));
        } finally {
            // Update state to indicate loading is complete
            setState((prev) => ({
                ...prev,
                isLoading: false,
            }));
        }

        // signIn("credentials", {email, password, callbackUrl: "/"});
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
                            Member Login
                        </SectionHeading>
                    </div>
                </div>

                <div className="container sm:max-w-[37.5rem]">
                    <div className="rounded-lg shadow-[0_8px_20px_rgba(0,0,0,0.1)]">
                        <div className="px-8 sm:px-10 py-8 sm:py-10 rounded-lg shadow-[0_80px_50px_rgba(0,0,0,0.1)] w-full">
                            <div className="max-w-[40%] md:max-w-[25%]  mx-auto mb-6">
                                <img
                                    src="/logo.png"
                                    alt="Logo"
                                    className="relative w-full"
                                />
                            </div>

                            <div className="flex flex-col gap-10">
                                <div className="flex flex-col gap-10">
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Full Name"
                                        className=" lg:h-12 focus:outline-none lg:text-[1.5rem] placeholder:lg:text-[1.5rem]  border-b border-gray-dark"
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        className=" lg:h-12 focus:outline-none lg:text-[1.5rem] placeholder:lg:text-[1.5rem]  border-b border-gray-dark"
                                    />

                                    <div className="flex flex-wrap items-center justify-between gap-y-4 mb-4">
                                        <label className="flex items-center gap-4 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="peer hidden"
                                            />
                                            <span className="relative w-4 h-4 bg-[#D9D9D9] fill-[#D9D9D9] peer-checked:!fill-primary">
                                                <FaCheck className="absolute w-4 h-4 fill-[inherit]" />
                                            </span>
                                            <span className="">
                                                Keep me logged in
                                            </span>
                                        </label>

                                        <a
                                            href="#"
                                            className="transition-all duration-300 hover:underline text-[#7F7F7F]"
                                        >
                                            Forgot Password?
                                        </a>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4  lg:max-w-[60%] mx-auto">
                                    <ButtonBasic element="button" rounded>
                                        LOGIN
                                    </ButtonBasic>

                                    <div className="flex justify-center items-center">
                                        {/* <div className="flex-1 border-t border-gray-300"></div> */}
                                        <span className="px-2 text-gray-600">
                                            Or
                                        </span>
                                        {/* <div className="flex-1 border-t border-gray-300"></div> */}
                                    </div>
                                    <button
                                        class="w-full flex justify-center items-center gap-2 md:gap-4 2xl:gap-6 py-3 px-4 xl:px-8 transition-all duration-300 hover:opacity-70 hover:cursor-pointer bg-[#D9D9D9] rounded-full"
                                        onClick={handleGoogleSignIn}
                                    >
                                        <FcGoogle className="w-5 h-5" />
                                        <span>LOGIN WITH GOOGLE</span>
                                    </button>
                                </div>
                            </div>

                            <p className="text-center text-sm text-gray-600 mt-4">
                                Have an account already?{" "}
                                <a
                                    href="#"
                                    className="font-bold tracking-[1%] text-[#4A4A4A] transition-all duration-300 underline hover:no-underline"
                                >
                                    Login
                                </a>
                            </p>
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
