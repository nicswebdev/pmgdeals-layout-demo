export default function SectionHeading({ element = "p", children, ...props }) {
  const Element = ["h1", "h2", "h3", "h4", "h5", "h6", "p"].includes(element)
    ? element
    : "a";

  return (
    <Element
      className="font-medium text-[1.5rem] lg:text-[2.25rem] pb-10 lg:pb-16 text-[#660000]"
      {...props}
    >
      {children}
    </Element>
  );
}
