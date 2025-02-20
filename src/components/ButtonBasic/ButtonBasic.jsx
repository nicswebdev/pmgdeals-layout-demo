export default function ButtonBasic({
  element = "a",
  variant = "primary",
  children,
  rounded = false,
  ...props
}) {
  const Element = ["a", "button"].includes(element) ? element : "a";

  const buttonClassNames = [
    "w-full flex justify-center items-center gap-2 md:gap-4 2xl:gap-6 py-3 px-4 xl:px-8 transition-all duration-300 hover:opacity-70 hover:cursor-pointer",
  ];

  //   Handle variants
  if (variant === "primary") {
    buttonClassNames.push("text-white bg-primary");
  } else if (variant === "primary-outline") {
    buttonClassNames.push("text-primary border border-primary");
  } else if (variant === "white") {
    buttonClassNames.push("text-primary bg-white");
  } else if (variant === "gray") {
    buttonClassNames.push("text-white bg-gray-dark");
  } else if (variant === "gray-light") {
    buttonClassNames.push("bg-[#D9D9D9]");
  }

  if (rounded) {
    buttonClassNames.push("rounded-full");
  }

  return (
    <Element className={buttonClassNames.join(" ")} {...props}>
      {children}
    </Element>
  );
}
