"use client";
import {
  Bookmark,
  BookmarkCheck,
  HeartIcon,
  MessageSquare,
  UserCircleIcon,
} from "lucide-react";
import { toggleBookmark, toggleLike } from "@/utils/api";
import Link from "next/link";

const BlogCard = ({
  _id,
  name,
  author,
  content,
  likes,
  comments,
  bookmarked,
}: Blog) => {
  const isBookmarked = false;
  return (
    <div className="p-3 bg-kz-card-light text-kz-secondary rounded-2xl w-full h-fit">
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <div className="flex flex-row align-middle gap-3">
          <img
            src={author.image}
            className="rounded-full"
            width={40}
            height={32}
          />
          <div className="flex flex-col">
            <a href={`/author/${author._id}`} className="text-base font-sans">
              {author.name}
            </a>
          </div>
        </div>
        <div className="md:w-[60%]">
          <h1 className="text-lg md:text-right md:text-2xl md:ml-9">{name}</h1>
        </div>
      </div>
      <p className="font-sans text-xs font-light mt-3 md:text-lg line-clamp-2">
        {content}
      </p>
      <div className="font-sans relative flex flex-row justify-between mt-2 text-xs font-extralight items-baseline">
        <div className="flex flex-row gap-2 items-center">
          <button
            onClick={() => toggleLike(_id)}
            className="flex flex-row gap-1 items-center"
          >
            <HeartIcon width={14} />
            <p>{likes.length}</p>
          </button>
          <button className="flex flex-row gap-1 items-center">
            <MessageSquare width={14} />
            <p>{comments ? comments.length : 0}</p>
          </button>
        </div>
        <div>
          <button onClick={() => toggleBookmark(_id)}>
            {isBookmarked ? (
              <BookmarkCheck width={14} />
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
