import {
  ButtonCurrency,
  ButtonHamburger,
  MenuDesktop,
  MenuMobile,
  SearchBar,
} from "./_components";
import { ButtonBasic } from "../ButtonBasic";
import { FaUser } from "react-icons/fa6";
import { ButtonHeart } from "../ButtonHeart";
import { useEffect, useState } from "react";

export default function Header() {
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
      <div className="pt-9 xl:pt-20 pb-6 xl:pb-14 bg-gray-dark">
        <div className="container xl:max-w-[95vw] 2xl:max-w-[90vw] 4xl:max-w-[82.05vw]">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <img
              src="/logo-white.png"
              alt="Logo"
              className="max-sm:w-12 w-20 xl:w-[8rem] 2xl:w-[10rem] 4xl:w-[11.875rem]"
            />

            <div className="xl:mt-3 4xl:mt-6 flex items-center gap-4 xl:gap-6 4xl:gap-14 xl:order-last">
              {/* Currency Button */}
              <div className="xl:order-last">
                <ButtonCurrency />
              </div>

              <div className="flex items-center gap-6 4xl:gap-8">
                {/* Heart Button */}
                <ButtonHeart />

                <div className="hidden xl:flex items-center gap-3">
                  {/* Login Button */}
                  <ButtonBasic href="/login" variant="white" rounded>
                    <FaUser size={20} />
                    <span>LOGIN</span>
                  </ButtonBasic>

                  {/* Sign Up Button */}
                  <ButtonBasic href="/sign-up" rounded>
                    SIGN UP
                  </ButtonBasic>
                </div>
              </div>

              {/* Hamburger Button */}
              <div className="xl:hidden">
                <ButtonHamburger onClick={() => setOpenMobileMenu(true)} />
              </div>
            </div>

            <div className="mt-3 4xl:mt-4 px-6 w-full xl:w-[50%] 2xl:w-1/2 4xl:w-[53rem]">
              <SearchBar />

              <div className="max-xl:hidden">
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
