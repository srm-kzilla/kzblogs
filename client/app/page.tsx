import Navbar from "@/components/Navbar";
import DraftCard from "@/components/DraftCard";
import TrendingCard from "@/components/TrendingCard";
import BookmarkCard from "@/components/BookmarkCard";
import { getAllBlogs, getCurrentUser, getSessionToken } from "@/utils/api";
import BlogList from "@/components/BlogList";

export default async function Home() {
  const blogs = await getAllBlogs();
  const sessionToken = getSessionToken();
  let is_admin = false;
  const user = await getCurrentUser();
  if (sessionToken !== undefined) {
    is_admin = user?.is_admin;
  }
  return (
    <div className="min-h-screen h-full">
      <Navbar />
      <div className="flex w-full md:px-10 lg:px-32 mt-12 lg:mt-24 justify-between">
        <div className="w-full md:w-9/12 flex justify-center md:justify-start">
          <div>
            <div className="font-serif text-3xl text-kz-secondary m-3">
              What’s <span className="text-kz-highlight-light">New</span>
            </div>
            <BlogList blogs={blogs} user={user} />
          </div>
        </div>
        <div className="hidden md:flex w-3/12 justify-end mt-10">
          <div>
            <div className="md:w-[25vw] lg:w-[18vw] m-6">
              <BookmarkCard />
            </div>
            {sessionToken !== undefined && is_admin && (
              <div className="md:w-[25vw] lg:w-[18vw] m-6">
                <DraftCard />
              </div>
            )}

            <div className="md:w-[25vw] lg:w-[18vw] m-6">
              <TrendingCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
