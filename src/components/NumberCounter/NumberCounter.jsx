import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

export default function NumberCounter({ name }) {
  const [value, setValue] = useState(0);

  const handleIncrement = () => setValue((prev) => prev + 1);
  const handleDecrement = () => setValue((prev) => prev - 1);
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value) || 0;
    setValue(newValue);
  };

  return (
    <div className="relative flex items-center max-w-[6.25rem]">
      <button
        type="button"
        onClick={handleDecrement}
        className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-2 h-9 "
      >
        <FaMinus className="text-[0.75rem] text-gray-600" />
      </button>
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        className="bg-gray-50 border border-x-0 border-gray-300 h-9 text-center text-gray-900 text-[0.75rem] block w-full"
        required
      />
      <button
        type="button"
        onClick={handleIncrement}
        className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-2 h-9 "
      >
        <FaPlus className="text-[0.75rem] text-gray-600" />
      </button>
    </div>
  );
}
