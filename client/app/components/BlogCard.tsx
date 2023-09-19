import {
  Bookmark,
  HeartIcon,
  MessageSquare,
  UserCircleIcon,
} from "lucide-react";
import { Blog } from "../types";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const { id, title, author, content, likes, last_edited, comments } = blog;
  return (
    <div className="p-3 bg-kz-lightcard text-kz-secondary rounded-lg w-full h-fit">
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <div className="flex flex-row align-middle gap-3">
          <UserCircleIcon
            className="text-kz-highlightl mt-1"
            width={32}
            height={32}
          />
          <div className="flex flex-col">
            <p className="text-base font-sans">{author}</p>
            <p className="text-xs font-extralight font-sans">{last_edited}</p>
          </div>
        </div>
        <div className="md:w-[60%]">
          <h1 className="text-lg md:text-right md:text-3xl md:ml-9">{title}</h1>
        </div>
      </div>
      <p className="font-sans text-xs font-light mt-3 md:text-lg">{content}</p>
      <div className="font-sans relative flex flex-row justify-between mt-2 text-xs font-extralight items-baseline">
        <div className="flex flex-row gap-2 items-center">
          <button className="flex flex-row gap-1 items-center">
            <HeartIcon width={14} />
            <p>{likes}</p>
          </button>
          <button className="flex flex-row gap-1 items-center">
            <MessageSquare width={14} />
            <p>{comments?.length}</p>
          </button>
        </div>
        <button className="flex flex-row gap-1">
          <Bookmark width={14} />
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
