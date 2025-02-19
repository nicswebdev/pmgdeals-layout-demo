import { menuItems } from "./Menu.const";

export default function MenuDesktop() {
  return (
    <div className="pt-6 4xl:pt-10 px-6 4xl:px-12">
      <ul className="flex gap-6 4xl:gap-9">
        {menuItems.map((item) => (
          <li key={`menu-desktop-${item.id}`}>
            <a
              href={item.url}
              className="font-bold text-[1rem] transition-all duration-300 hover:opacity-70 text-white group-[.active-scroll]:text-primary"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
