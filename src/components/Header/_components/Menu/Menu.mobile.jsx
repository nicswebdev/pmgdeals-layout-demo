import { ButtonBasic } from "@/components/ButtonBasic";
import { menuItems } from "./Menu.const";
import { FaUser } from "react-icons/fa6";
import { useEffect } from "react";

export default function MenuMobile({ isOpen, close }) {
  useEffect(() => {
    // Handle click outside the menu
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest("#menuMobile") &&
        !event.target.closest("#menuHamburger")
      ) {
        close();
      }
    };

    if (typeof document !== "undefined") {
      document.addEventListener("click", handleOutsideClick);
    }
  }, []);
  return (
    <div
      id="menuMobile"
      className={`lg:hidden fixed right-0 inset-y-0 w-screen sm:w-[25rem] max-w-[100vw] z-[100] duration-300 bg-white shadow-[-4px_0_16px_rgba(0,0,0,0.3)] translate-x-full [&.active]:translate-x-0 ${
        isOpen ? "active" : ""
      }`}
    >
      <button
        className="absolute top-10 right-10 w-6 h-6 cursor-pointer"
        onClick={close}
      >
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-[0.0625rem] -rotate-45 bg-primary"></span>
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-[0.0625rem] rotate-45 bg-primary"></span>
      </button>

      <div className="px-10 py-20 w-full h-full overflow-y-auto">
        <ul className="flex flex-col gap-6 4xl:gap-9">
          {menuItems.map((item) => (
            <li key={`menu-mobile-${item.id}`}>
              <a
                href={item.url}
                className="font-bold text-[1rem] transition-all duration-300 hover:opacity-70 text-primary"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-4 pt-10 max-w-48 mx-auto">
          {/* Login Button */}
          <ButtonBasic href="/login" variant="primary-outline" rounded>
            <FaUser size={20} />
            <span>LOGIN</span>
          </ButtonBasic>
          {/* Sign Up Button */}
          <ButtonBasic href="/sign-up" rounded>
            <span>SIGN UP</span>
          </ButtonBasic>
        </div>
      </div>
    </div>
  );
}
