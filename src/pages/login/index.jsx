import { ButtonBasic, Hero, SectionHeading } from "@/components";
import { FaCheck } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
export default function Login() {
  return (
    <main>
      <Hero />
      <div className="py-32">
        <div className="container">
          <div className="pb-20">
            <SectionHeading style={{ textAlign: "center" }}>
              Member Login
            </SectionHeading>
          </div>
        </div>

        <div className="container xl:max-w-[68.125rem]">
          <div className="rounded-lg shadow-[0_8px_20px_rgba(0,0,0,0.1)]">
            <div className="px-4 lg:px-10 4xl:px-36 py-10 4xl:py-20 rounded-lg shadow-[0_80px_50px_rgba(0,0,0,0.1)] w-full">
              <div className="max-w-[50%] 4xl:max-w-[15.625rem] mx-auto mb-6">
                <img src="/logo.png" alt="Logo" className="relative w-full" />
              </div>

              <div className="flex flex-col gap-20 4xl:gap-40">
                <div className="flex flex-col gap-10 4xl:gap-20">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className=" 4xl:h-16 focus:outline-none 4xl:text-[2.25rem] placeholder:4xl:text-[2.25rem] text-gray-700 border-b border-gray-400"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className=" 4xl:h-16 focus:outline-none 4xl:text-[2.25rem] placeholder:4xl:text-[2.25rem] text-gray-700 border-b border-gray-400"
                  />

                  <div className="flex items-center justify-between mb-4">
                    <label className="flex items-center gap-4 cursor-pointer">
                      <input type="checkbox" className="peer hidden" />
                      <span className="relative w-4 h-4 bg-[#D9D9D9] fill-[#D9D9D9] peer-checked:!fill-primary">
                        <FaCheck className="absolute w-4 h-4 fill-[inherit]" />
                      </span>
                      <span className="4xl:text-[1.5rem]">
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

                <div className="flex flex-col gap-4 4xl:gap-6">
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
                Not a member?{" "}
                <a
                  href="#"
                  className="font-bold tracking-[1%] text-[#4A4A4A] transition-all duration-300 underline hover:no-underline"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
