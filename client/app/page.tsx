import Image from "next/image";
import BookmarkCard from "./components/BookmarkCard";
import blogData from "@/mock-data/data";

export default function Home() {
  return (
    <div className="">
      KZBlogs
      <div>
        <BookmarkCard blogs={blogData} />
      </div>
    </div>
  );
}
