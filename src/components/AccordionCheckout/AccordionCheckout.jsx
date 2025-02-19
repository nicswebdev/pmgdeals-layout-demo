import { useState } from "react";
import { FaMinus } from "react-icons/fa";

export default function AccordionCheckout({
  title,
  children,
  defaultOpen = false,
  ...props
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={`border-[0.0625rem] border-x-transparent border-y-gray-dark [&:not(:first-child)]:border-t-0 group ${
        open ? "active" : ""
      }`}
      {...props}
    >
      <button
        className="w-full text-left py-4 flex justify-between items-start"
        onClick={() => setOpen(!open)}
      >
        {title}

        <div className="relative shrink-0 h-6 4xl:h-[2.625rem] flex justify-center items-center">
          <FaMinus className="absolute w-4 h-4 transition-all duration-300 rotate-90 group-[.active]:rotate-180" />
          <FaMinus className="w-4 h-4 transition-all duration-300" />
        </div>
      </button>
      <div className="max-h-0 overflow-hidden transition-all duration-300 group-[.active]:max-h-screen">
        <div className="pb-4">{children}</div>
      </div>
    </div>
  );
}
