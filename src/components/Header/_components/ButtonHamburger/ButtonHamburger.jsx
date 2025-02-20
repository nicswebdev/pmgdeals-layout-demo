export default function Menu({ onClick }) {
  return (
    <button
      className="relative w-6 h-4 cursor-pointer"
      onClick={onClick}
      id="menuHamburger"
    >
      <span className="block absolute inset-x-0 top-0 w-full h-[0.125rem] bg-white group-[.active-scroll]:bg-primary"></span>
      <span className="block absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-[0.125rem] bg-white group-[.active-scroll]:bg-primary"></span>
      <span className="block absolute inset-x-0 bottom-0 w-full h-[0.125rem] bg-white group-[.active-scroll]:bg-primary"></span>
    </button>
  );
}
