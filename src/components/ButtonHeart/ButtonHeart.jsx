import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

export default function ButtonHeart({ filled = false }) {
  const [liked, setLiked] = useState(filled);

  const handleOnClick = () => {
    setLiked(!liked);
  };

  return (
    <button
      className="flex justify-center items-center aspect-square w-8 sm:w-12 rounded-full transition-all duration-300 hover:opacity-70 bg-primary"
      onClick={handleOnClick}
    >
      <div className="shrink-0">
        {liked ? (
          <FaHeart className="w-4 h-4" color="white" />
        ) : (
          <FaRegHeart className="w-4 h-4" color="white" />
        )}
      </div>
    </button>
  );
}
