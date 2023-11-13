import BlogCard from "@/components/BlogCard";
import Navbar from "@/components/Navbar";
import { getBookmarkBlogs } from "@/utils/api";

export default async function Home() {
  const bookmarkBlogs = await getBookmarkBlogs();
  return (
    <div>
      <Navbar />
      <div className="flex w-full p-6 mt-8 lg:mt-18 justify-center">
        <div className="md:max-w-2xl">
          <div className="font-serif md:mb-12 text-center text-2xl md:text-4xl lg:text-5xl text-kz-secondary">
            All your <span className="text-kz-highlight-light">favorite</span>{" "}
            articles in one place
          </div>
          {bookmarkBlogs.map((blogs: Blog) => (
            <div key={blogs._id} className=" my-6 m-3">
              <BlogCard {...blogs} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
