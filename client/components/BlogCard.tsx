import { HeartIcon, MessageSquare, UserCircleIcon } from "lucide-react";
import BookmarkButton from "./BookmarkButton";

const BlogCard = ({
  _id,
  name,
  author,
  content,
  likes,
  lastEdited,
  comments,
  bookmarked,
}: Blog) => {
  return (
    <div className="p-3 bg-kz-card-light text-kz-secondary rounded-2xl w-full h-fit">
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <div className="flex flex-row align-middle gap-3">
          <UserCircleIcon
            className="text-kz-highlight-light mt-1"
            width={32}
            height={32}
          />
          <div className="flex flex-col">
            <p className="text-base font-sans">{author}</p>
            <p className="text-xs font-extralight font-sans">{lastEdited}</p>
          </div>
        </div>
        <div className="md:w-[60%]">
          <h1 className="text-lg md:text-right md:text-2xl md:ml-9">{name}</h1>
        </div>
      </div>
      <p className="font-sans text-xs font-light mt-3 md:text-lg">{content}</p>
      <div className="font-sans relative flex flex-row justify-between mt-2 text-xs font-extralight items-baseline">
        <div className="flex flex-row gap-2 items-center">
          <button className="flex flex-row gap-1 items-center">
            <HeartIcon width={14} />
            <p>{likes ? likes.length : 0}</p>
          </button>
          <button className="flex flex-row gap-1 items-center">
            <MessageSquare width={14} />
            <p>{comments ? comments.length : 0}</p>
            {_id}
          </button>
        </div>
        <BookmarkButton id={_id} />
      </div>
    </div>
  );
};

export default BlogCard;
