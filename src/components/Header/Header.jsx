import {
    ButtonCurrency,
    ButtonHamburger,
    MenuDesktop,
    MenuMobile,
    SearchBar,
} from "./_components";
import {ButtonBasic} from "../ButtonBasic";
import {FaUser} from "react-icons/fa6";
import {useEffect, useState} from "react";
import {LuHeart} from "react-icons/lu";
import {MdLogout} from "react-icons/md";
import {FaUserCog} from "react-icons/fa";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import Link from "next/link";

export default function Header() {
    const {data: session, status} = useSession();

    const router = useRouter();
    // Check on scroll
    // useEffect(() => {
    //     const handleScroll = () => {
    //         const header = document.querySelector("#header");
    //         if (window.scrollY > 0) {
    //             header.classList.add("active-scroll");
    //         } else {
    //             header.classList.remove("active-scroll");
    //         }
    //     };

    //     window.addEventListener("scroll", handleScroll);

    //     return () => {
    //         window.removeEventListener("scroll", handleScroll);
    //     };
    // }, []);

    const [openMobileMenu, setOpenMobileMenu] = useState(false);

    useEffect(() => {
        if (openMobileMenu) {
            // Add css class to body
            document.body.classList.add("max-xl:overflow-hidden");
        } else {
            // Remove css class from body
            document.body.classList.remove("max-xl:overflow-hidden");
        }
    }, [openMobileMenu]);

    return (
        <>
            <div
                className="group bg-white [&.active-scroll]:lg:pt-10 [&.active-scroll]:lg:pb-10"
                id="header"
            >
                {/* Background white */}
                <span className="absolute inset-0 transition-all duration-500 -translate-y-[120%] group-[.active-scroll]:translate-y-0 bg-[#660000]"></span>

                <div className="relative container h-[10vh]">
                    <div className="h-full flex flex-wrap justify-between items-start gap-4">
                        <div className="h-full relative max-sm:w-12 w-20 xl:w-[11.875rem]">
                            <div className="h-full inset-0">
                                <Link href={`/`}>
                                    <img
                                        src="/deals-logo-brown.png"
                                        alt="Logo"
                                        className="transition-all duration-300 w-full h-full object-cover"
                                    />
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center h-full lg:order-last">
                            {/* Currency Button */}
                            <div className="lg:order-last h-full bg-[#f4f4f4] px-4">
                                <ButtonCurrency />
                            </div>

                            <div className="h-full flex items-center">
                                {/* Heart Button */}
                                <div className="group-[.active-scroll_a]:bg-gray-dark h-full">
                                    <a
                                        href="/favorite"
                                        className="h-full flex justify-center items-center aspect-square w-8 lg:w-16 transition-all duration-300 hover:opacity-70 bg-primary"
                                    >
                                        <div className="shrink-0">
                                            <LuHeart
                                                className="w-3 lg:w-5 h-3 lg:h-5"
                                                color="white"
                                            />
                                        </div>
                                    </a>
                                </div>

                                {!session ? (
                                    <div className="hidden h-full lg:flex items-center max-lg:[&_a:first-child]:border-[0.0625rem] [&_a:first-child]:border-transparent group-[.active-scroll_a:first-child]:border-gray-dark group-[.active-scroll_a]:bg-gray-dark group-[.active-scroll_a]:text-white">
                                        {/* Login Button */}
                                        <ButtonBasic
                                            href="/login"
                                            variant="orange"
                                        >
                                            {/* <FaUser className="w-4 h-4" /> */}
                                            <span className="shrink-0">
                                                LOGIN
                                            </span>
                                        </ButtonBasic>

                                        {/* Sign Up Button */}
                                        <ButtonBasic
                                            href="/register"
                                            variant="brown"
                                        >
                                            <span className="shrink-0">
                                                SIGN UP
                                            </span>
                                        </ButtonBasic>
                                    </div>
                                ) : (
                                    <div className="hidden lg:flex items-center gap-3 max-lg:[&_a:first-child]:border-[0.0625rem] [&_a:first-child]:border-transparent group-[.active-scroll_a:first-child]:border-gray-dark group-[.active-scroll_a]:bg-gray-dark group-[.active-scroll_a]:text-white">
                                        {/* Sign Up Button */}
                                        <div className="group-[.active-scroll_a]:bg-gray-dark">
                                            <a
                                                href="/dashboard"
                                                className="flex justify-center items-center cursor-pointer aspect-square w-8 lg:w-16 rounded-full transition-all duration-300 hover:opacity-70 bg-primary"
                                            >
                                                <div className="shrink-0">
                                                    <FaUserCog
                                                        className="w-3 lg:w-5 h-3 lg:h-5"
                                                        color="white"
                                                    />
                                                </div>
                                            </a>
                                        </div>
                                        <div className="group-[.active-scroll_a]:bg-gray-dark">
                                            <a
                                                onClick={() => {
                                                    signOut({redirect: false});
                                                    router.push("/");
                                                }}
                                                className="flex justify-center items-center cursor-pointer aspect-square w-8 lg:w-16 rounded-full transition-all duration-300 hover:opacity-70 bg-primary"
                                            >
                                                <div className="shrink-0">
                                                    <MdLogout
                                                        className="w-3 lg:w-5 h-3 lg:h-5"
                                                        color="white"
                                                    />
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Hamburger Button */}
                            <div className="lg:hidden">
                                <ButtonHamburger
                                    onClick={() => setOpenMobileMenu(true)}
                                />
                            </div>
                        </div>

                        <div className=" px-6 w-full h-full lg:w-1/2 xl:w-[42rem]">
                            {/* <SearchBar /> */}

                            <div className="max-lg:hidden h-full">
                                <MenuDesktop />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <MenuMobile
                isOpen={openMobileMenu}
                close={() => setOpenMobileMenu(false)}
            />
        </>
    );
}
