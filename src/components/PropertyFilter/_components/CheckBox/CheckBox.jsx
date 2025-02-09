export default function CheckBox({ id, label, icon, value }) {
  return (
    <label
      key={`label-${id}`}
      htmlFor={`input-${id}`}
      className={`group shrink-0 flex items-center gap-2 rounded-full px-4 py-2 cursor-pointer transition-all duration-300 has-[:checked]:bg-gray-dark hover:bg-gray-dark border-[0.0625rem] border-gray-600`}
    >
      <div className="peer hidden">
        <input
          type="checkbox"
          id={`input-${id}`}
          name="category"
          value={value}
        />
      </div>

      {icon && icon}

      <span className="shrink-0 transition-all duration-300 text-primary group-hover:text-white peer-has-[:checked]:text-white">
        {label}
      </span>
    </label>
  );
}
