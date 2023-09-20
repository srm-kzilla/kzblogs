import React from "react";
import { PenLine, PlusCircleIcon } from "lucide-react";
import { Blog } from "../types";

interface TrendingCardProps {
  blogs: Blog[];
}

const TrendingCard = ({ blogs }: TrendingCardProps) => {
  const trendingBlogs = blogs.filter((blog) => blog.publishStatus === "trending");

  return (
    <div className="bg-kz-darkcard p-4 w-full h-fit text-kz-secondary rounded-xl">
        <div>
          <h1 className="text-2xl">Trending</h1>
          <div className="flex flex-col mt-3">
            {blogs.map(({ publishStatus, id, name, author }) =>
              publishStatus === "trending" ? (
                <div key={id} className="flex justify-between items-end my-3">
                  <div>
                    <h1>{name}</h1>
                    <p className="text-xs font-extralight font-sans">
                      {author}
                    </p>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
    </div>
  );
};

export default TrendingCard;
