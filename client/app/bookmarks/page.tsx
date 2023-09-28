import BlogCard from "@/components/BlogCard";
import Navbar from "@/components/Navbar";
import blogData from "@/mock-data/data";

export default function Home() {
  const publishedBlogs = blogData.filter((blog) => blog.bookmarked);
  return (
    <div>
      <Navbar />
      <div className="flex w-full p-6 mt-12 lg:mt-24 justify-between gap-y-11">
        <div className="w-full flex justify-center">
          <div className="md:max-w-2xl">
            <div className="font-serif text-center text-2xl md:text-4xl lg:text-5xl text-kz-secondary m-3">
              All your{" "}<span className="text-kz-highlight-light">favorite</span>{" "}
              articles in one place{" "}
            </div>
            {publishedBlogs.map((blogs: Blog) => (
              <div key={blogs.id} className=" my-6 m-3">
                <BlogCard {...blogs} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
