import { BsChevronLeft } from "react-icons/bs";

export default function SwiperButtonPrevious({ onClick, disabled }) {
  return (
    <button
      className="max-md:hidden absolute left-4 top-1/2 -translate-y-1/2 z-[10] disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex justify-center items-center w-14 4xl:w-[4.375rem] aspect-square rounded-full bg-white/80">
        <BsChevronLeft className="w-5 h-5" color="#000" />
      </div>
    </button>
  );
}
