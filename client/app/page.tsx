import Image from "next/image";
import TrendingCard from "./components/TrendingCard";
import blogData from "@/mock-data/data";

export default function Home() {
  return (
    <div className="">
      KZBlogs
      <div>
        <TrendingCard blogs={blogData} />
      </div>
    </div>
  );
}
