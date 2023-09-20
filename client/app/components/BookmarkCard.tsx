import React from "react";
import { UserCircle2, PlusCircleIcon } from "lucide-react";
import { Blog } from "../types";

interface BookmarkCardProps {
  blogs: Blog[];
}

const BookmarkCard = ({ blogs }: BookmarkCardProps) => {
  const bookmarkBlogs = blogs.filter((blog) => blog.bookmarked === true);
  const bookmarkNumber = bookmarkBlogs.length;

  return (
    <div>
      {bookmarkNumber === 0 ? (
        <div className="bg-gradient-to-tr from-[#0A427D] via-[#3AA39B] via-70% to-[#D9D9D9] to-100% p-4 w-full h-fit text-kz-secondary rounded-xl">
          <div className="flex-col">
            <h1 className="text-lg md:text-2xl ">Bookmarks</h1>
            <p className="mt-3 font-sans text-xs">
              Nothing here yet :(
              <br />Go get your first exciting read
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-kz-darkcard p-4 w-full h-fit text-kz-secondary rounded-xl">
            <h1 className="text-2xl text-transparent bg-clip-text bg-gradient-to-tr from-[#0A427D] via-[#3AA39B] via-40% to-[#D9D9D9] to-90%">Bookmarked ( {bookmarkNumber} )</h1>
          <div className="flex flex-col mt-3">
            {blogs.map(({ bookmarked, id, name, author }) =>
              bookmarked === true ? (
                <div key={id} className="flex items-center justify-left my-3">
                  <button className="mx-2">
                    <p className="text-xs max-w-[30px] whitespace-nowrap overflow-hidden font-extralight font-sans">
                      {author}
                    </p>
                    <UserCircle2 width={30} height={30} />
                  </button>
                  <div className="mx-2">
                    <h1>{name}</h1>
                    <p className="text-xs font-extralight font-sans">
                      {author}
                    </p>
                  </div>
                </div>
              ) : null
            )}
          </div>
          <div className="text-kz-primary font-sans text-sm flex justify-center items-center">
            <button className="bg-kz-secondary px-4 py-1 rounded-3xl">
              See All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookmarkCard;
