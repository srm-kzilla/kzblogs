import React from "react";
import { UserCircle2 } from "lucide-react";
import Link from "next/link";
import { getBookmarkBlogs } from "@/utils/api";

const BookmarkCard = async () => {
  const bookmarkBlogs = await getBookmarkBlogs();
  const bookmarkNumber = bookmarkBlogs.length;
  const markdownToPlainText = (markdown: string) => {
    return markdown.replace(/[#*_]+/g, "");
  };
  return (
    <div>
      {bookmarkNumber === 0 ? (
        <div className="bg-gradient-to-tr from-kz-highlight-dark via-kz-highlight-light via-70% to-kz-secondary to-100% p-5 w-full h-fit text-kz-secondary rounded-3xl">
          <div className="flex-col">
            <h1 className="text-lg md:text-2xl">Bookmarks</h1>
            <p className="my-3 font-sans text-base">
              Nothing here yet :(
              <br />
              Go get your first exciting read
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-kz-card-dark p-4 w-full h-fit text-kz-secondary rounded-xl">
          <h1 className="text-xl text-transparent bg-clip-text bg-gradient-to-tr from-kz-highlight-dark via-kz-highlight-light via-40% to-kz-secondary to-90%">
            {" "}
            Bookmarked ( {bookmarkNumber} )
          </h1>
          <div className="flex max-h-40 no-scrollbar w-full flex-col mt-3">
            {bookmarkBlogs.slice(0, 2).map(({ _id, name, content }: Blog) => (
              <div key={_id} className="flex items-center justify-left my-3">
                <div className="mx-1 text-ellipsis w-full">
                  <p className="text-sm">{name}</p>
                  <p className="text-xs font-extralight font-sans line-clamp-2">
                    {markdownToPlainText(content)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-kz-primary font-sans text-xs flex justify-center items-center">
            <Link href="/bookmarks">
              <button className="bg-kz-secondary mt-3 px-3 py-1 rounded-3xl">
                See All
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookmarkCard;
