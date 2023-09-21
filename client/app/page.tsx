import Image from "next/image";
import AuthorCard from "@/components/AuthorCard";
import blogData from "@/mock-data/data";
import { Blog } from "@/types";

export default function Home() {
  return (
    <div>
      KZBlogs
      {blogData.map((blogs: Blog) => (
        <div key={blogs.id} className="w-1/4 m-3">
          <AuthorCard {...blogs} />
        </div>
      ))}
    </div>
  );
}
