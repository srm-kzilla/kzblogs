import {
  Bookmark,
  HeartIcon,
  MessageSquare,
  UserCircleIcon,
} from "lucide-react";

const BlogCard = () => {
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
            <p className="text-base font-sans">Taylor Swift</p>
            <p className="text-xs font-extralight font-sans">Sep 13, 2023</p>
          </div>
        </div>
        <div className="md:w-[60%]">
          <h1 className="text-lg md:text-right md:text-3xl md:ml-9">
            Why the Eras tour is not coming to India?
          </h1>
        </div>
      </div>
      <p className="font-sans text-xs font-light mt-3 md:text-lg">
        We are never getting back together.
      </p>
      <div className="font-sans relative flex flex-row justify-between mt-2 text-xs font-extralight items-baseline">
        <div className="flex flex-row gap-2 items-center">
          <button className="flex flex-row gap-1 items-center">
            <HeartIcon width={14} />
            <p>1331</p>
          </button>
          <button className="flex flex-row gap-1 items-center">
            <MessageSquare width={14} />
            <p>13</p>
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
