import { ButtonBasic, Hero, SectionHeading } from "@/components";
import { FaCheck } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
export default function Login() {
  return (
    <main>
      <Hero />
      <div className="py-32">
        <div className="container">
          <div className="pb-10">
            <SectionHeading style={{ textAlign: "center" }}>
              Member Login
            </SectionHeading>
          </div>
        </div>

        <div className="container sm:max-w-[37.5rem]">
          <div className="rounded-lg shadow-[0_8px_20px_rgba(0,0,0,0.1)]">
            <div className="px-8 sm:px-10 py-8 sm:py-10 rounded-lg shadow-[0_80px_50px_rgba(0,0,0,0.1)] w-full">
              <div className="max-w-[40%] md:max-w-[25%]  mx-auto mb-6">
                <img src="/logo.png" alt="Logo" className="relative w-full" />
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
                      <input type="checkbox" className="peer hidden" />
                      <span className="relative w-4 h-4 bg-[#D9D9D9] fill-[#D9D9D9] peer-checked:!fill-primary">
                        <FaCheck className="absolute w-4 h-4 fill-[inherit]" />
                      </span>
                      <span className="">Keep me logged in</span>
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
                    <span className="px-2 text-gray-600">Or</span>
                    {/* <div className="flex-1 border-t border-gray-300"></div> */}
                  </div>
                  <ButtonBasic href="/login" variant="gray-light" rounded>
                    <FcGoogle className="w-5 h-5" />
                    <span>LOGIN WITH GOOGLE</span>
                  </ButtonBasic>
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
