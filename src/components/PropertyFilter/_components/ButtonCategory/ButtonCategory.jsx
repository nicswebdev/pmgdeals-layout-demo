import {useRouter} from "next/router";
import {useState} from "react";

export default function ButtonCategory({
    id,
    label,
    icon,
    href,
    isActive,
    onClick,
}) {
    const router = useRouter(); // Only for Next.js, remove if using standard React

    const handleClick = (e) => {
        e.preventDefault(); // Prevent full page reload
        onClick();
        router.push(href);
    };
    return (
        <a
            key={`link-${id}`}
            href={href}
            onClick={handleClick}
            htmlFor={`input-${id}`}
            className={`group shrink-0 flex items-center gap-2 px-8 py-2 cursor-pointer transition-all duration-300 [&.button-active]:border-b-[1.5px]  [&.button-active]:border-[#e2be93]  ${
                isActive ? "button-active" : ""
            }`}
        >
            {/* {icon && icon} */}

            <span className="uppercase shrink-0 transition-all duration-300 lg:text-[1.25rem] text-[#d29752] ">
                {label}
            </span>
        </a>
    );
}
