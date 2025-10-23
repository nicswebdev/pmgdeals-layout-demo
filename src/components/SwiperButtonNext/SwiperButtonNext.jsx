import {BsChevronRight} from "react-icons/bs";

export default function SwiperButtonNext({onClick, disabled}) {
    return (
        <button
            className="max-md:hidden absolute right-4 top-[38.5%] z-[10] disabled:opacity-50"
            onClick={onClick}
            disabled={disabled}
        >
            <div className="flex justify-center items-center w-10 lg:w-16 aspect-square bg-black/60">
                <BsChevronRight
                    className="w-3 lg:w-5 h-3 lg:h-5"
                    color="#FFF"
                />
            </div>
        </button>
    );
}
