import Navbar from "@/components/Navbar";
import Image from "next/image";
import AuthorCard from "@/components/AuthorCard";
import DraftCard from "@/components/DraftCard";
import blogData from "@/mock-data/data";
import { Blog } from "@/types";

export default function Home() {
  return (
    <div>
      <Navbar />
      KZBlogs
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
