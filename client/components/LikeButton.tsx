"use client";
import { useState } from "react";
import { toggleLike } from "@/utils/api";
import { Heart } from "lucide-react";

const LikeButton = ({ _id, likes, userId }: Blog & { userId: string }) => {
  const [isLiked, setIsLiked] = useState(likes.includes(userId));
  const [totalLikes, setTotalLikes] = useState(Object.keys(likes).length);
  return (
    <button
      onClick={() =>
        userId
          ? (toggleLike(_id),
            setIsLiked((prevState) => !prevState),
            setTotalLikes((prevLikes) =>
              isLiked ? prevLikes - 1 : prevLikes + 1,
            ))
          : undefined
      }
    >
      <div className="flex px-2 justify-center items-center text-sm sm:text-base">
        <Heart className={`pr-1 w-5 sm:w-6 ${isLiked ? "text-red-500" : ""}`} />
        {totalLikes}
      </div>
    </button>
  );
};

export default LikeButton;
