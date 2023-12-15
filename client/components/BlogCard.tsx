"use client";
import {
  Bookmark,
  BookmarkCheck,
  HeartIcon,
  MessageSquare,
} from "lucide-react";
import { toggleBookmark, toggleLike } from "@/utils/api";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import toast from "@/utils/toast";

const BlogCard = ({
  _id,
  name,
  author,
  content,
  likes,
  comments,
  user,
}: Blog & { user: User }) => {
  const [isLiked, setIsLiked] = useState(
    user ? likes.includes(user._id) : false,
  );
  const [totalLikes, setTotalLikes] = useState(Object.keys(likes).length);
  const [isBookmarked, setIsBookmarked] = useState(
    Object.keys(user).length != 0 ? user.bookmarks.includes(_id) : false,
  );
  const markdownToPlainText = (markdown: string) => {
    return markdown.replace(/[#*_]+/g, "");
  };
  return (
    <div className="p-3 bg-kz-card-light text-kz-secondary rounded-2xl w-full h-fit">
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <div className="md:w-[60%]">
          <h1 className="text-lg md:text-xl">{name}</h1>
        </div>
        <div className="flex flex-row align-middle gap-2">
          <Image
            src={author.image}
            alt=""
            className="rounded-full w-5 h-5 md:h-7 md:w-7"
            width={400}
            height={400}
          />
          <div className="flex flex-col">
            <a
              href={`/author/${author._id}`}
              className="text-sm md:text-base font-sans"
            >
              {author.name}
            </a>
          </div>
        </div>
      </div>
      <Link href={"/blogs/" + _id}>
        <p className="font-sans text-xs font-light mt-3 md:text-base line-clamp-2">
          {markdownToPlainText(content)}
        </p>
      </Link>
      <div className="font-sans relative flex flex-row justify-between mt-2 text-xs font-extralight items-baseline">
        <div className="flex flex-row gap-2 items-center">
          <button
            onClick={() =>
              Object.keys(user).length != 0
                ? (toggleLike(_id),
                  setIsLiked((prevState) => !prevState),
                  setTotalLikes((prevLikes) =>
                    isLiked ? prevLikes - 1 : prevLikes + 1,
                  ))
                : toast.error("Please Signin to like this blog.")
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
                  setIsBookmarked((prevState) => !prevState))
                : toast.error("Please Signin to bookmark this blog.")
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
    </div>
  );
};

export default BlogCard;
