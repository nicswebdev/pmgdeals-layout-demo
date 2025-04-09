import {menuItems} from "./Menu.const";

export default function MenuDesktop() {
    return (
        <div className="pt-6 lg:pt-10 mx-6 lg:mx-12 border-[0.0625rem] border-transparent">
            <ul className="flex gap-6 lg:gap-9">
                {menuItems.map((item) => (
                    <li key={`menu-desktop-${item.id}`}>
                        <a
                            href={item.url}
                            target={item.target}
                            className="font-bold text-[1.3rem] transition-all duration-300 hover:opacity-70 text-white"
                        >
                            {item.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
