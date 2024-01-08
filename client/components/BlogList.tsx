"use client";
import React, { useState } from "react";
import BlogCard from "./BlogCard";
import Button from "./Button";
import { ArrowUp } from "lucide-react";

interface BlogListProps {
  blogs: Blog[];
  user: User;
}
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const BlogList = ({ blogs, user }: BlogListProps) => {
  const [visibleBlogs, setVisibleBlogs] = useState(4);

  const loadMoreBlogs = () => {
    setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 3);
  };

  return (
    <div>
      {blogs.slice(0, visibleBlogs).map((blog: Blog) => (
        <div key={blog._id} className="w-[80vw] mb-10 md:w-[50vw] m-3">
          <BlogCard {...blog} user={user} />
        </div>
      ))}
      <div className="flex justify-end align-middle gap-4 pb-5">
        {visibleBlogs < blogs.length && (
          <Button variant="primary" onClick={loadMoreBlogs}>
            See More
          </Button>
        )}
        <ArrowUp
          className="text-kz-button w-5 md:w-9 hover:scale-150"
          onClick={scrollToTop}
        />
      </div>
    </div>
  );
};

export default BlogList;
