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
            className={`group shrink-0 flex items-center gap-2 rounded-full px-8 py-2 cursor-pointer transition-all duration-300 [&.button-active]:bg-gray-dark hover:bg-gray-dark border-[0.0625rem] border-gray-600 ${
                isActive ? "button-active" : ""
            }`}
        >
            {icon && icon}

            <span className="shrink-0 transition-all duration-300 lg:text-[1.25rem] text-[#660000] group-hover:text-white group-[.button-active]:text-white">
                {label}
            </span>
        </a>
    );
}
