import { BsChevronRight } from "react-icons/bs";
export default function ButtonViewAll({ href }) {
  return (
    <a
      className="flex items-center gap-8 transition-all duration-300 hover:opacity-70"
      href={href}
    >
      <span className="font-medium 4xl:text-[1.25rem] text-[#DBA527]">
        View all
      </span>
      <BsChevronRight className="w-4 4xl:w-6 h-4 4xl:h-6 fill-[#DBA527]" />
    </a>
  );
}
