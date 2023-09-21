import BlogCard from "@/components/BlogCard";
import blogData from "@/mock-data/data";
import { Blog } from "@/types";

export default function Home() {
  return (
    <div>
      <h1>KZBlogs</h1>
      <div>
        {blogData.map((blogs: Blog) => (
          <div key={blogs.id} className="w-[40vw] m-3">
            {blogs.publishStatus === "published" && <BlogCard {...blogs} />}
          </div>
        ))}
      </div>
    </div>
  );
}
