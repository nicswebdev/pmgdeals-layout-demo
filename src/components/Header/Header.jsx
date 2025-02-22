import {
  ButtonCurrency,
  ButtonHamburger,
  MenuDesktop,
  MenuMobile,
  SearchBar,
} from "./_components";
import { ButtonBasic } from "../ButtonBasic";
import { FaUser } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { LuHeart } from "react-icons/lu";

export default function Header() {
  // Check on scroll
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("#header");
      if (window.scrollY > 100) {
        header.classList.add("active-scroll");
      } else {
        header.classList.remove("active-scroll");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        className="group fixed top-0 inset-x-0 z-[100] transition-all duration-300 pt-4 lg:pt-10 pb-4 lg:pb-10 [&.active-scroll]:lg:pt-10 [&.active-scroll]:lg:pb-10"
        id="header"
      >
        {/* Background white */}
        <span className="absolute inset-0 transition-all duration-500 -translate-y-[120%] group-[.active-scroll]:translate-y-0 bg-white"></span>

        <div className="relative container xl:max-w-[82.05vw]">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div className="relative max-sm:w-12 w-20 xl:w-[11.875rem]">
              <img
                src="/logo-gray.png"
                alt="Logo"
                className="relative opacity-0 group-[.active-scroll]:opacity-100 transition-all duration-300 w-full"
              />
              <div className="absolute inset-0">
                <img
                  src="/logo-white.png"
                  alt="Logo"
                  className="group-[.active-scroll]:opacity-0 transition-all duration-300 w-full"
                />
              </div>
            </div>

            <div className="xl:mt-3 flex items-center gap-4 lg:gap-6 lg:order-last">
              {/* Currency Button */}
              <div className="lg:order-last">
                <ButtonCurrency />
              </div>

              <div className="flex items-center gap-6 xl:gap-8">
                {/* Heart Button */}
                <div className="group-[.active-scroll_a]:bg-gray-dark">
                  <a
                    href=""
                    className="flex justify-center items-center aspect-square w-8 lg:w-16 rounded-full transition-all duration-300 hover:opacity-70 bg-primary"
                  >
                    <div className="shrink-0">
                      <LuHeart
                        className="w-3 lg:w-5 h-3 lg:h-5"
                        color="white"
                      />
                    </div>
                  </a>
                </div>

                <div className="hidden lg:flex items-center gap-3 max-lg:[&_a:first-child]:border-[0.0625rem] [&_a:first-child]:border-transparent group-[.active-scroll_a:first-child]:border-gray-dark group-[.active-scroll_a:last-child]:bg-gray-dark">
                  {/* Login Button */}
                  <ButtonBasic href="/login" variant="white" rounded>
                    <FaUser className="w-4 h-4" />
                    <span className="shrink-0">LOGIN</span>
                  </ButtonBasic>

                  {/* Sign Up Button */}
                  <ButtonBasic href="/sign-up" rounded>
                    <span className="shrink-0">SIGN UP</span>
                  </ButtonBasic>
                </div>
              </div>

              {/* Hamburger Button */}
              <div className="lg:hidden">
                <ButtonHamburger onClick={() => setOpenMobileMenu(true)} />
              </div>
            </div>

            <div className="lg:mt-3 xl:mt-4 px-6 w-full lg:w-1/2 xl:w-[45rem]">
              <SearchBar />

              <div className="max-lg:hidden">
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
