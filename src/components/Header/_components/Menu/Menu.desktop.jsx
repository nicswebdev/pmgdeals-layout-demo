// Menu.desktop.jsx
import {menuItems} from "./Menu.const";

export default function MenuDesktop() {
    return (
        <div className="h-full mx-6 lg:mx-12 border-[0.0625rem] border-transparent flex items-center justify-center">
            <ul className="flex gap-6 lg:gap-9">
                {menuItems.map((item) => {
                    const hasChildren =
                        Array.isArray(item.children) &&
                        item.children.length > 0;

                    if (!hasChildren) {
                        return (
                            <li
                                key={`menu-desktop-${item.id}`}
                                className="relative"
                            >
                                <a
                                    href={item.url}
                                    target={item.target}
                                    className="font-regular uppercase text-[1.3rem] transition-all duration-300 hover:opacity-70 text-[#d29752]"
                                >
                                    {item.title}
                                </a>
                            </li>
                        );
                    }

                    return (
                        <li
                            key={`menu-desktop-${item.id}`}
                            className="relative group/deals" // <-- named group
                        >
                            <button
                                type="button"
                                className="font-regular uppercase text-[1.3rem] transition-all duration-300 hover:opacity-70 text-[#d29752] inline-flex items-center gap-2"
                                aria-haspopup="menu"
                            >
                                {item.title}
                                <svg
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-4 h-4 translate-y-[1px]"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>

                            <ul
                                role="menu"
                                className="
    absolute left-0 top-full w-96 bg-white z-50
    opacity-0 pointer-events-none translate-y-2 transition-all duration-200
    group-hover/deals:opacity-1 group-hover/deals:opacity-100 group-hover/deals:pointer-events-auto group-hover/deals:translate-y-0
    group-focus-within/deals:opacity-100 group-focus-within/deals:pointer-events-auto group-focus-within/deals:translate-y-0

    /* Hover bridge (optional, for a tiny visual gap without losing hover) */
    before:content-[''] before:absolute before:inset-x-0 before:-top-3 before:h-3 before:block
  "
                            >
                                {item.children.map((child) => (
                                    <li
                                        key={child.id}
                                        role="none"
                                        className="first:rounded-t-2xl last:rounded-b-2xl"
                                    >
                                        <a
                                            role="menuitem"
                                            href={child.url}
                                            target={child.target}
                                            className="block px-5 py-3 text-lg leading-tight transition-colors duration-150 hover:bg-[#f8f5f1] text-gray-800"
                                        >
                                            {child.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
