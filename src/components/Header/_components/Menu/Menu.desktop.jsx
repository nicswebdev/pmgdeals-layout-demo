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

                    // Parent with dropdown
                    return (
                        <li
                            key={`menu-desktop-${item.id}`}
                            className="relative group"
                        >
                            {/* Parent button (no navigation) */}
                            <button
                                type="button"
                                className="font-regular uppercase text-[1.3rem] transition-all duration-300 hover:opacity-70 text-[#d29752] inline-flex items-center gap-2"
                                aria-haspopup="menu"
                                aria-expanded="false"
                            >
                                {item.title}
                                <svg
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-4 h-4 translate-y-[1px]"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>

                            {/* Dropdown menu */}
                            <ul
                                role="menu"
                                className="absolute left-0 top-full mt-3 w-96 bg-white shadow-lg ring-1 ring-black/5 opacity-0 pointer-events-none translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 z-50"
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
