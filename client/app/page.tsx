import Image from "next/image";
import AuthorCard from "./components/AuthorCard";
import blogData from "@/mock-data/data";
import { Blog } from "./types";

export default function Home() {
  return (
    <div className="text-5xl text-kz-highlightl font-extrabold">
      KZBlogs
      {blogData.map((blogs: Blog) => (
        <div>
          <AuthorCard blog={blogs} />
        </div>
      ))}
    </div>
  );
}
