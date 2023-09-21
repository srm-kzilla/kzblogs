import BlogCard from "@/components/BlogCard";
import Image from "next/image";
import AuthorCard from "@/components/AuthorCard";
import DraftCard from "@/components/DraftCard";

import blogData from "@/mock-data/data";
import { Blog } from "@/types";

export default function Home() {
  const publishedBlogs = blogData.filter(
    (blog) => blog.publishStatus === "published"
  );
  return (
    <div>
      <h1>KZBlogs</h1>
      <div>
        {publishedBlogs.map((blogs: Blog) => (
          <div key={blogs.id} className="w-[40vw] m-3">
            <BlogCard {...blogs} />
          </div>
        ))}
      </div>
      {blogData.map((blogs: Blog) => (
        <div key={blogs.id} className="w-1/4 m-3">
          <AuthorCard {...blogs} />
        </div>
      ))}
      <div className="w-[15vw] m-6">
        <DraftCard blogs={blogData} />
      </div>
    </div>
  );
}
