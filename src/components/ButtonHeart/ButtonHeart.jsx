import { useState } from "react";
import { LuHeart, LuHeartOff } from "react-icons/lu";

export default function ButtonHeart({ filled = false }) {
  const [liked, setLiked] = useState(filled);

  const handleOnClick = () => {
    setLiked(!liked);
  };

  return (
    <button
      className="flex justify-center items-center aspect-square w-8 lg:w-16 rounded-full transition-all duration-300 hover:opacity-70 bg-primary"
      onClick={handleOnClick}
    >
      <div className="shrink-0">
        {liked ? (
          <LuHeartOff className="w-3 lg:w-5 h-3 lg:h-5" color="white" />
        ) : (
          <LuHeart className="w-3 lg:w-5 h-3 lg:h-5" color="white" />
        )}
      </div>
    </button>
  );
}
