import {ButtonBasic, Hero, SectionHeading} from "@/components";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {FaCheck} from "react-icons/fa6";
import {FcGoogle} from "react-icons/fc";
import {GoChevronDown} from "react-icons/go";
export default function Register() {
    const {data: session, status} = useSession();

    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/"); // Redirect to homepage if the user is already signed in
        }
    }, [status, router]);

    const handleGoogleSignIn = async () => {
        await signIn("google", {callbackUrl: "/"});
    };
    return (
        <main>
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
                            <div className="flex flex-col gap-10 4xl:gap-20">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-10 4xl:gap-x-52">
                                    <div className="relative">
                                        <select
                                            name=""
                                            className="appearance-none w-full lg:h-12 focus:outline-none lg:text-[1.5rem] placeholder:lg:text-[1.5rem]  border-b border-gray-dark"
                                        >
                                            <option value="" selected>
                                                Mr.
                                            </option>
                                            <option value="">Mrs.</option>
                                            <option value="">Ms.</option>
                                        </select>
                                        <GoChevronDown className="absolute top-1/2 -translate-y-1/2 right-0 w-5 4xl:w-8 h-5 4xl:h-8 fill-gray-dark" />
                                    </div>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        className=" lg:h-12 focus:outline-none lg:text-[1.5rem] placeholder:lg:text-[1.5rem]  border-b border-gray-dark"
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        className=" lg:h-12 focus:outline-none lg:text-[1.5rem] placeholder:lg:text-[1.5rem]  border-b border-gray-dark"
                                    />
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Phone"
                                        className=" lg:h-12 focus:outline-none lg:text-[1.5rem] placeholder:lg:text-[1.5rem]  border-b border-gray-dark"
                                    />
                                    <input
                                        type="text"
                                        name="dateOfBirth"
                                        placeholder="Date Of Birth"
                                        className=" lg:h-12 focus:outline-none lg:text-[1.5rem] placeholder:lg:text-[1.5rem]  border-b border-gray-dark"
                                    />
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        className=" lg:h-12 focus:outline-none lg:text-[1.5rem] placeholder:lg:text-[1.5rem]  border-b border-gray-dark"
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        className=" lg:h-12 focus:outline-none lg:text-[1.5rem] placeholder:lg:text-[1.5rem]  border-b border-gray-dark"
                                    />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        className=" lg:h-12 focus:outline-none lg:text-[1.5rem] placeholder:lg:text-[1.5rem]  border-b border-gray-dark"
                                    />
                                </div>

                                <div className="flex items-center justify-center mb-4">
                                    <label className="flex items-center gap-4 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="peer hidden"
                                        />
                                        <span className="relative shrink-0 w-4 h-4 bg-[#D9D9D9] fill-[#D9D9D9] peer-checked:!fill-primary">
                                            <FaCheck className="absolute w-4 h-4 fill-[inherit]" />
                                        </span>
                                        <span className="4xl:text-[1.5rem]">
                                            By confirming this registrations i
                                            am agreeing to the{" "}
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
                            </div>

                            <div className="flex flex-col gap-4 4xl:gap-6 w-full max-w-[46.25rem] mx-auto">
                                <ButtonBasic element="button" rounded>
                                    SIGN-UP
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
                                    // onClick={handleGoogleSignIn}
                                >
                                    <FcGoogle className="w-5 h-5" />
                                    <span>LOGIN WITH GOOGLE</span>
                                </button>
                            </div>
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
