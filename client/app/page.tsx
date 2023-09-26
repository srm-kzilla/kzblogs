import BlogCard from "@/components/BlogCard";
import Navbar from "@/components/Navbar";
import DraftCard from "@/components/DraftCard";
import blogData from "@/mock-data/data";
import TrendingCard from "@/components/TrendingCard";

export default function Home() {
  const publishedBlogs = blogData.filter(
    (blog) => blog.publishStatus === "published"
  );
  return (
    <div>
      <Navbar />
      <div className="flex w-full mt-24 justify-between gap-12">
        <div className="w-9/12 flex justify-end">
          <div className="">
            <div className="font-serif text-3xl text-kz-secondary m-3">What’s <span className="text-kz-highlight-light">New</span> </div>
            {publishedBlogs.map((blogs: Blog) => (
              <div key={blogs.id} className="w-[50vw] m-3">
                <BlogCard {...blogs} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-3/12 justify-start mr-20 mt-10">
          <div className="">
            <div className="w-[20vw] m-6">
              <DraftCard blogs={blogData} />
            </div>
            <div className="w-[20vw] m-6">
              <TrendingCard blogs={blogData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}