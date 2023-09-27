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
      <div className="flex w-full md:px-10 lg:px-20 mt-12 md:mt-24 justify-between">
        <div className="w-full md:w-9/12 flex justify-center md:justify-start">
          <div>
            <div className="font-serif text-3xl text-kz-secondary m-3">What’s <span className="text-kz-highlight-light">New</span> </div>
            {publishedBlogs.map((blogs: Blog) => (
              <div key={blogs.id} className="w-[80vw] mb-10 md:w-[50vw] m-3">
                <BlogCard {...blogs} />
              </div>
            ))}
          </div>
        </div>
        <div className="hidden md:flex w-3/12 justify-end mt-10">
          <div>
            <div className="md:w-[25vw] lg:w-[17vw] m-6">
              <DraftCard blogs={blogData} />
            </div>
            <div className="md:w-[25vw] lg:w-[17vw] m-6">
              <TrendingCard blogs={blogData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}