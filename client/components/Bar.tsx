"use client";
import { toggleBookmark, toggleLike } from "@/utils/api";
import {
  Bookmark,
  BookmarkCheck,
  HeartIcon,
  MessageSquare,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface BarProps {
  _id: string;
  user: User;
  likes: string[];
  comments: Comments[] | undefined;
}
const Bar = ({ _id, user, likes, comments }: BarProps) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(
    user ? likes.includes(user._id) : false,
  );
  const [totalLikes, setTotalLikes] = useState(Object.keys(likes).length);
  const [isBookmarked, setIsBookmarked] = useState(
    Object.keys(user).length != 0 ? user.bookmarks.includes(_id) : false,
  );
  return (
    <div>
      <div className="flex flex-row gap-2 items-center">
        <button
          onClick={() =>
            Object.keys(user).length != 0
              ? (toggleLike(_id),
                setIsLiked((prevState) => !prevState),
                setTotalLikes((prevLikes) =>
                  isLiked ? prevLikes - 1 : prevLikes + 1,
                ),
                router.refresh())
              : toast.error("Please Sign In to like this blog.")
          }
          className="flex flex-row gap-1 items-center"
        >
          <HeartIcon
            width={`${isLiked ? 16 : 14}`}
            className={`${isLiked ? "text-red-500" : ""}`}
          />
          <p>{totalLikes}</p>
        </button>
        <button className="flex flex-row gap-1 items-center">
          <MessageSquare width={14} />
          <p>{comments ? comments.length : 0}</p>
        </button>
      </div>
      <div>
        <button
          onClick={() =>
            Object.keys(user).length != 0
              ? (toggleBookmark(_id),
                setIsBookmarked((prevState) => !prevState),
                router.refresh())
              : toast.error("Please Sign In to bookmark this blog.")
          }
        >
          {isBookmarked ? (
            <BookmarkCheck
              width={16}
              className={`${isBookmarked ? "text-kz-highlight-light" : ""}`}
            />
          ) : (
            <Bookmark width={14} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Bar;
