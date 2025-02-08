import { HiMagnifyingGlass } from "react-icons/hi2";
export default function SearchBar() {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search for special offers....."
        className="flex w-full max-sm:h-8 h-12 4xl:h-16 px-5 lg:x-10 rounded-full font-inter font-light text-[0.625rem] lg:text-[1.25rem] text-white placeholder:text-white bg-white/50 appearance-none outline-none"
      />
      <HiMagnifyingGlass
        color="white"
        className="absolute top-1/2 -translate-y-1/2 right-10 w-2 md:w-5 h-2 md:h-5"
      />
    </div>
  );
}
