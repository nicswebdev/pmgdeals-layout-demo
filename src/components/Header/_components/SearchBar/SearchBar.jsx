import {useRouter} from "next/router";
import {useState} from "react";
import {HiMagnifyingGlass} from "react-icons/hi2";
export default function SearchBar() {
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    };
    return (
        <div className="relative lg:mx-12">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for special offers....."
                    className="flex w-full max-sm:h-8 h-12 xl:h-16 px-6 lg:px-8 rounded-full font-inter font-light text-[0.625rem] lg:text-[1.25rem] text-white group-[.active-scroll]:text-[#660000] placeholder:text-white group-[.active-scroll]:placeholder:text-[#660000] bg-white/50 group-[.active-scroll]:bg-white border-[0.0625rem] border-transparent group-[.active-scroll]:border-primary transition-all duration-300 appearance-none outline-none"
                />
                <button
                    type="submit"
                    className="absolute top-1/2 -translate-y-1/2 right-10"
                >
                    <HiMagnifyingGlass
                        type="submit"
                        className="absolute top-1/2 -translate-y-1/2 right-0 w-2 md:w-5 h-2 md:h-5 fill-white group-[.active-scroll]:fill-primary"
                    />
                </button>
            </form>
        </div>
    );
}
