import React from "react";
import { UserCircle2 } from "lucide-react";

interface BookmarkCardProps {
  blogs: Blog[];
}

const BookmarkCard = ({ blogs }: BookmarkCardProps) => {
  const bookmarkBlogs = blogs.filter((blog) => blog.bookmarked === true);
  const bookmarkNumber = bookmarkBlogs.length;

  return (
    <div>
      {bookmarkNumber === 0 ? (
        <div className="bg-gradient-to-tr from-kz-highlight-dark via-kz-highlight-light via-70% to-kz-secondary to-100% p-5 w-full h-fit text-kz-secondary rounded-3xl">
          <div className="flex-col">
            <h1 className="text-lg md:text-2xl ">Bookmarks</h1>
            <p className="my-3 font-sans text-base">
              Nothing here yet :(
              <br />Go get your first exciting read
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-kz-card-dark p-4 w-full h-fit text-kz-secondary rounded-xl">
          <h1 className="text-xl text-transparent bg-clip-text bg-gradient-to-tr from-kz-highlight-dark via-kz-highlight-light via-40% to-kz-secondary to-90%"> Bookmarked ( {bookmarkNumber} )</h1>
            <div className="flex max-h-40 no-scrollbar overflow-y-scroll flex-col mt-3">
            {blogs.map(({ bookmarked, id, title, author }) => (
              <div key={id} className="flex items-center justify-left my-3">
                <button className="mx-2">
                  <UserCircle2 width={30} height={30} />
                </button>
                <div className="mx-1 text-ellipsis">
                  <p className="text-sm">{title}</p>
                  <p className="text-xs font-extralight font-sans">
                    subtitle
                    {/* subtitle data source not set yet */}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-kz-primary font-sans text-xs flex justify-center items-center">
            <button className="bg-kz-secondary mt-1 px-3 py-1 rounded-3xl">
              See All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookmarkCard;