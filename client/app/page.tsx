import Image from "next/image";
import BlogCard from "./components/BlogCard";
import blogData from "@/mock-data/data";
import { Blog } from "./types";

export default function Home() {
  return (
    <div>
      <h1 className="">KZBlogs</h1>
      <div>
        {blogData.map((blogs: Blog) => (
          <div key={blogs.id}>
            {blogs.publish_status === "published" && <BlogCard blog={blogs} />}
          </div>
        ))}
      </div>
    </div>
  );
}
