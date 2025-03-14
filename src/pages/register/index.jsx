import {ButtonBasic, Hero, SectionHeading} from "@/components";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {useEffect, useMemo, useState} from "react";
import {FaCheck} from "react-icons/fa6";
import {FcGoogle} from "react-icons/fc";
import {GoChevronDown} from "react-icons/go";

import {useForm, Controller} from "react-hook-form";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ReCAPTCHA from "react-google-recaptcha";
import Head from "next/head";
import axios from "axios";

const initValues = {
    salutation: "",
    firstname: "",
    lastname: "",
    dob: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
};

const initState = {values: initValues};

export default function Register({homepageDeals}) {
    const {data: session, status} = useSession();

    const formatter = useMemo(() => new Intl.NumberFormat("en-US"), []);

    const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const [state, setState] = useState(initState);
    const {values, isLoading, error, success} = state;

    const key = "6Ldt0ycpAAAAAJMNUgQfmilcJxBe4GGifNSglOtE";
    // const key = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
    const [captchaIsDone, setCaptchaIsDone] = useState(false);
    const [textMessage, setTextMessage] = useState(false);

    function onChange() {
        setCaptchaIsDone(true);
    }

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
        watch,
        formState: {errors},
        // trigger,
        reset,
    } = useForm();

    const newPassword = watch("password");

    // useEffect(() => {
    //     // Trigger validation for confirmpassword field
    //     trigger("confirmpassword");
    // }, [newPassword, trigger]);

    const formatDate = (date) => {
        const d = new Date(date);
        let month = "" + (d.getMonth() + 1);
        let day = "" + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    };

    const onSubmit = async (data) => {
        if (captchaIsDone) {
            setTextMessage(true);

            setState((prev) => ({
                ...prev,
                isLoading: true,
            }));

            if (data.dob) {
                data.dob = formatDate(data.dob);
            }

            const registerData = {...data};

            const payload = {
                registerData,
            };

            try {
                const response = await axios.post(
                    "https://cms.pmgdeals.com/api/public/register",
                    payload
                );

                // console.log(response);

                // Check if the response was successful
                setState((prev) => ({
                    ...prev,
                    isLoading: false,
                    success: true,
                }));

                reset(initValues);
                // if (response.status === 200) {
                //     window.location.href = "/login"; // Redirect to the login page
                // }
            } catch (error) {
                // Handle errors from Axios
                let errorMessage =
                    "Registration Failed. \nPossible E-mail Already Exists or Something Wrong.";
                if (error.response) {
                    // Log the entire error response from the server
                    console.error("Server Error Response:", error.response);

                    // Use the error message from the response (if available)
                    errorMessage = error.response.data.message || errorMessage;
                } else {
                    // Log error if response is not available
                    console.error("Error:", error);
                }

                setState((prev) => ({
                    ...prev,
                    isLoading: false,
                    error: errorMessage,
                }));

                reset(initValues);
            }
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
                <div className="container xl:max-2xl:max-w-[61.25rem]">
                    <div className="pb-20">
                        <SectionHeading style={{textAlign: "center"}}>
                            Member Register
                        </SectionHeading>
                    </div>
                    <div className="">
                        <div className="flex flex-col gap-20 4xl:gap-40">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-col gap-10 4xl:gap-20">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-10 4xl:gap-x-52">
                                        <div className="relative">
                                            <Controller
                                                control={control}
                                                name="salutation"
                                                rules={{
                                                    required:
                                                        "Salutation is required.",
                                                }}
                                                defaultValue={"Mr."}
                                                render={({
                                                    field: {
                                                        value,
                                                        onChange,
                                                        onBlur,
                                                    },
                                                    fieldState: {error},
                                                }) => (
                                                    <>
                                                        <select
                                                            value={value}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            className="appearance-none w-full lg:h-12 focus:outline-none lg:text-[1.5rem] placeholder:lg:text-[1.5rem]  border-b border-gray-dark"
                                                        >
                                                            <option
                                                                value="Mr."
                                                                selected
                                                            >
                                                                Mr.
                                                            </option>
                                                            <option value="Mrs.">
                                                                Mrs.
                                                            </option>
                                                            <option value="Ms.">
                                                                Ms.
                                                            </option>
                                                        </select>
                                                        <GoChevronDown className="absolute top-1/2 -translate-y-1/2 right-0 w-5 4xl:w-8 h-5 4xl:h-8 fill-gray-dark" />
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
                                        <div>
                                            <Controller
                                                control={control}
                                                name="firstname"
                                                rules={{
                                                    required:
                                                        "First Name is required.",
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
                                                            placeholder="First Name"
                                                            className="w-full lg:h-12 focus:outline-none lg:text-[1.5rem] placeholder:lg:text-[1.5rem]  border-b border-gray-dark"
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

                                        <div>
                                            <Controller
                                                control={control}
                                                name="lastname"
                                                rules={{
                                                    required:
                                                        "Last Name is required.",
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
                                                            placeholder="Last Name"
                                                            className="w-full lg:h-12 focus:outline-none lg:text-[1.5rem] placeholder:lg:text-[1.5rem]  border-b border-gray-dark"
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

                                        <div>
                                            <Controller
                                                control={control}
                                                name="phone"
                                                rules={{
                                                    required:
                                                        "Phone is required.",
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
                                                            type="number"
                                                            value={value}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            placeholder="Phone"
                                                            className="w-full lg:h-12 focus:outline-none lg:text-[1.5rem] placeholder:lg:text-[1.5rem]  border-b border-gray-dark"
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

                                        <div className="relative">
                                            <Controller
                                                control={control}
                                                name="dob"
                                                rules={{
                                                    required:
                                                        "Date of Birth is required.",
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
                                                        <DatePicker
                                                            wrapperClassName="react-datepicker-wrapper"
                                                            className="lg:h-12 w-full focus:outline-none lg:text-[1.5rem] placeholder:lg:text-[1.5rem]  border-b border-gray-dark"
                                                            dateFormat="yyyy-MM-dd"
                                                            selected={
                                                                value
                                                                    ? new Date(
                                                                          value
                                                                      )
                                                                    : null
                                                            }
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            placeholderText="Date of Birth"
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
                                        {/* <input
                                        type="text"
                                        name="dateOfBirth"
                                        placeholder="Date Of Birth"
                                        className=" lg:h-12 focus:outline-none lg:text-[1.5rem] placeholder:lg:text-[1.5rem]  border-b border-gray-dark"
                                    /> */}

                                        <div>
                                            <Controller
                                                control={control}
                                                name="email"
                                                rules={{
                                                    required:
                                                        "E-mail is required.",
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
                                                            placeholder="Email"
                                                            className="w-full lg:h-12 focus:outline-none lg:text-[1.5rem] placeholder:lg:text-[1.5rem]  border-b border-gray-dark"
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

                                        <div>
                                            <Controller
                                                control={control}
                                                name="password"
                                                rules={{
                                                    required:
                                                        "Password is required.",
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
                                                            type="password"
                                                            value={value}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            placeholder="Password"
                                                            className="w-full lg:h-12 focus:outline-none lg:text-[1.5rem] placeholder:lg:text-[1.5rem]  border-b border-gray-dark"
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

                                        <div>
                                            <Controller
                                                control={control}
                                                name="confirmpassword"
                                                rules={{
                                                    required:
                                                        "Confirm password is required.",
                                                    validate: (value) =>
                                                        value === newPassword ||
                                                        "The passwords doesn't match.",
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
                                                            type="password"
                                                            value={value}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            placeholder="Confirm Password"
                                                            className="w-full lg:h-12 focus:outline-none lg:text-[1.5rem] placeholder:lg:text-[1.5rem]  border-b border-gray-dark"
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
                                    <ReCAPTCHA
                                        sitekey={key}
                                        onChange={onChange}
                                    />
                                    <div className="flex items-center justify-center mb-4">
                                        <label className="flex items-center gap-4 cursor-pointer">
                                            <span className="4xl:text-[1.5rem]">
                                                By confirming this registrations
                                                i am agreeing to the{" "}
                                                <a
                                                    href="/terms-conditions"
                                                    className="font-bold tracking-[1%] text-[#4A4A4A] transition-all duration-300 underline hover:no-underline"
                                                >
                                                    Terms & Conditions
                                                </a>{" "}
                                                and{" "}
                                                <a
                                                    href="/privacy"
                                                    className="font-bold tracking-[1%] text-[#4A4A4A] transition-all duration-300 underline hover:no-underline"
                                                >
                                                    Privacy Policy
                                                </a>
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 4xl:gap-6 w-full max-w-[46.25rem] mx-auto">
                                    {error && (
                                        <div className="text-[#eb4034] text-center mt-2">
                                            {error}
                                        </div>
                                    )}
                                    {textMessage && (
                                        <p className="font-semibold mt-6 text-center text-green-500">
                                            We have sent you the verification
                                            link via email to complete the
                                            registration.
                                        </p>
                                    )}
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center items-center gap-2 md:gap-4 2xl:gap-6 py-3 px-4 xl:px-8 transition-all duration-300 hover:opacity-70 hover:cursor-pointer text-white bg-primary rounded-full"
                                    >
                                        {isLoading ? "LOADING..." : "SIGN-UP"}
                                    </button>

                                    <div className="flex justify-center items-center">
                                        {/* <div className="flex-1 border-t border-gray-300"></div> */}
                                        <span className="px-2 text-gray-600">
                                            Or
                                        </span>
                                        {/* <div className="flex-1 border-t border-gray-300"></div> */}
                                    </div>
                                    <button
                                        type="button"
                                        className="w-full flex justify-center items-center gap-2 md:gap-4 2xl:gap-6 py-3 px-4 xl:px-8 transition-all duration-300 hover:opacity-70 hover:cursor-pointer bg-[#D9D9D9] rounded-full"
                                        onClick={handleGoogleSignIn}
                                    >
                                        <FcGoogle className="w-5 h-5" />
                                        <span>LOGIN WITH GOOGLE</span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        <p className="text-center text-sm text-gray-600 mt-4">
                            Have an account already?{" "}
                            <a
                                href="/login"
                                className="font-bold tracking-[1%] text-[#4A4A4A] transition-all duration-300 underline hover:no-underline"
                            >
                                Login
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export async function getServerSideProps() {
    const categoryData = await fetch(
        `https://cms.pmgdeals.com/api/public/category`
    ).then((res) => res.json());

    const homepageDeals = await fetch(
        `https://cms.pmgdeals.com/api/public/homepage`
    ).then((res) => res.json());

    return {
        props: {
            categoryData,
            homepageDeals,
        },
    };
}
