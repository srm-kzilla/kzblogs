"use client";
import { toggleLike, } from "@/utils/api";
import { Heart } from "lucide-react";

const LikeButton = ({
  _id,
  likes,
}: Blog) => {
  const isLiked = false;
  return (
    <button onClick={() => toggleLike(_id)}>
      <div className="flex px-2 justify-center items-center text-sm sm:text-base">
        <Heart className="pr-1 w-5 sm:w-6" />
        {Object.keys(likes).length}
      </div>
    </button>
  );
};

export default LikeButton;
