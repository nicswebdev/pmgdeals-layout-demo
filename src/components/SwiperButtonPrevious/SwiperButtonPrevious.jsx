import {BsChevronLeft} from "react-icons/bs";

export default function SwiperButtonPrevious({onClick, disabled}) {
    return (
        <button
            className="max-md:hidden absolute left-4 top-[38.5%] z-[10] disabled:opacity-50"
            onClick={onClick}
            disabled={disabled}
        >
            <div className="flex justify-center items-center w-10 lg:w-16 aspect-square bg-black/60">
                <BsChevronLeft className="w-3 lg:w-5 h-3 lg:h-5" color="#FFF" />
            </div>
        </button>
    );
}
