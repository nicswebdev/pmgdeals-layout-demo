export default function ButtonBasic({
  element = "a",
  variant = "primary",
  children,
  rounded = false,
  ...props
}) {
  const Element = ["a", "button"].includes(element) ? element : "a";

  const buttonClassNames = [
    "flex justify-center items-center gap-2 md:gap-4 2xl:gap-6 py-3 px-4 4xl:px-9 transition-all duration-300 hover:opacity-70 hover:cursor-pointer",
  ];

  //   Handle variants
  if (variant === "primary") {
    buttonClassNames.push("text-white bg-primary");
  } else if (variant === "primary-outline") {
    buttonClassNames.push("text-primary border border-primary");
  } else if (variant === "white") {
    buttonClassNames.push("text-primary bg-white");
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
