import AuthorCard from "@/components/AuthorCard";
import Navbar from "@/components/Navbar";
import { getCurrentUser, getTrending, getTrendingWriters } from "@/utils/api";
import BlogCard from "@/components/BlogCard";
import SearchBar from "@/components/SearchBar";

const Explore = async () => {
  const data = await getTrendingWriters();
  const blogs = await getTrending(4);
  const user = await getCurrentUser();
  return (
    <div className="min-h-screen h-full">
      <Navbar />
      <div className="flex flex-col items-center mt-12">
        <div className="text-kz-secondary text-2xl md:text-4xl lg:text-6xl font-serif text-center w-[60vw]">
          <h1>
            Discover the{" "}
            <span className="text-kz-highlight-light">new article</span> that
            will blow your mind.
          </h1>
        </div>
      </div>
      <SearchBar />
      <div className="mt-10 flex md:flex-col mb-5 items-center">
        <div className="flex flex-col ml-8 md:flex-row justify-evenly w-[80vw] md:w-[90vw]">
          <div className="md:w-[40vw]">
            <h1 className="text-kz-secondary text-left mb-4 lg:mb-7 text-2xl lg:text-3xl font-serif">
              Trending Writers
            </h1>
            {data.map((user: User, index: number) => (
              <div key={user._id} className="m-3 w-[80vw] md:w-[40vw]">
                <AuthorCard author={user} index={++index} />
              </div>
            ))}
          </div>
          <div>
            <h1 className="text-kz-secondary text-left mb-4 lg:mb-7 text-2xl lg:text-3xl font-serif">
              Trending Blogs
            </h1>
            <div>
              {blogs.map((blog: Blog) => (
                <div key={blog._id} className="w-[80vw] mb-3 md:w-[40vw] m-3">
                  <BlogCard {...blog} user={user} visible={false} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
