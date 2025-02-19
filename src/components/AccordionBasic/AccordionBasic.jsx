import { useState } from "react";
import { GoChevronDown } from "react-icons/go";

export default function AccordionBasic({
  title,
  description,
  defaultOpen = false,
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={`border-[0.0625rem] border-gray-dark [&:not(:first-child)]:border-t-0 group ${
        open ? "active" : ""
      }`}
    >
      <button
        className="w-full text-left px-4 4xl:px-9 py-3 4xl:py-6 flex justify-between items-start"
        onClick={() => setOpen(!open)}
      >
        {title}

        <div className="shrink-0 h-6 4xl:h-[2.625rem] flex justify-center items-center">
          <GoChevronDown className="w-5 4xl:w-8 h-5 4xl:h-8 transition-all duration-300 group-[.active]:rotate-180" />
        </div>
      </button>
      <div className="max-h-0 overflow-hidden transition-all duration-300 group-[.active]:max-h-screen">
        <div className="px-4 4xl:px-9 pb-4 4xl:pb-6">{description}</div>
      </div>
    </div>
  );
}
