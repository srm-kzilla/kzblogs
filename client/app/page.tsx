import Image from "next/image";
import AuthorCard from "./components/AuthorCard";
import blogData from "@/mock-data/data";
import { Blog } from "./types";

export default function Home() {
  return (
    <div className="">
      KZBlogs
      {blogData.map((blogs: Blog) => (
        <div className="w-1/4 m-3">
          <AuthorCard blog={blogs} />
        </div>
      ))}
    </div>
  );
}
