import Image from "next/image";
import BlogCard from "./components/BlogCard";

export default function Home() {
  return (
    <div>
      <h1 className="">KZBlogs</h1>
      <div>
        <BlogCard />
      </div>
    </div>
  );
}
