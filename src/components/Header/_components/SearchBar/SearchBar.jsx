import { HiMagnifyingGlass } from "react-icons/hi2";
export default function SearchBar() {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search for special offers....."
        className="flex w-full max-sm:h-8 h-12 xl:h-16 px-6 lg:px-12 rounded-full font-inter font-light text-[0.625rem] lg:text-[1.25rem] text-white group-[.active-scroll]:text-[#660000] placeholder:text-white group-[.active-scroll]:placeholder:text-[#660000] bg-white/50 group-[.active-scroll]:bg-white border-[0.0625rem] border-transparent group-[.active-scroll]:border-primary transition-all duration-300 appearance-none outline-none"
      />
      <HiMagnifyingGlass className="absolute top-1/2 -translate-y-1/2 right-10 w-2 md:w-5 h-2 md:h-5 fill-white group-[.active-scroll]:fill-primary" />
    </div>
  );
}
