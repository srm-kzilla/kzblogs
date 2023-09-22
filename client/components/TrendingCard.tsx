import React from "react";
import { Blog } from "@/types";

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
          {trendingBlogs.map(({ publishStatus, id, title, author }) => (
            <div key={id} className="flex justify-between items-end my-3">
              <div>
                <h1>{title}</h1>
                <p className="text-xs font-extralight font-sans">
                  {author}
                </p>
              </div>
            </div>
          )
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
