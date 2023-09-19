import Image from "next/image";
import DraftCard from "./components/DraftCard";
import blogData from "@/mock-data/data";

export default function Home() {
  return (
    <div className="">
      KZBlogs
      <div>
        <DraftCard blogs={blogData} />
      </div>
    </div>
  );
}
