"use client";
import React, { useState } from "react";
import BlogCard from "./BlogCard";
import Button from "./Button";

interface BlogListProps {
  blogs: Blog[];
  user: User;
}

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
      <div className="flex justify-end pb-7">
        {visibleBlogs < blogs.length && (
          <Button variant="primary" onClick={loadMoreBlogs}>
            See More
          </Button>
        )}
      </div>
    </div>
  );
};

export default BlogList;
