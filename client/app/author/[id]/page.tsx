import BlogCard from "@/components/BlogCard";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import { getCurrentUser, getUser, toggleFollow } from "@/utils/api";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function Page({ params }: { params: { id: string } }) {
  const currentUser = await getCurrentUser();
  try {
    const userData = await getUser(params.id);
    const authorBlogs = userData.blogs.map((blog: Blog) => {
      return {
        ...blog,
        author: userData,
      };
    });
    if (!userData) {
      throw new Error("Blog not found");
    }
    const follow = async () => {
      "use server";
      toggleFollow(userData._id);
    };
    const publishedBlogs = authorBlogs.filter(
      (blog: Blog) => blog.publish_status === true,
    );

    return (
      <div className="min-h-screen h-full">
        <Navbar />
        <div className="mt-12 flex flex-col items-center gap-12">
          <div className="flex flex-wrap gap-6 items-center">
            <Image
              width={100}
              height={100}
              src={userData.image}
              alt="profile pic"
              className="rounded-full w-12 h-12 ml-3"
            />
            <div className="flex flex-col gap-1 lg:gap-3">
              <h1 className="text-kz-secondary text-xl lg:text-3xl">
                {userData.name}
              </h1>
              <p className="text-kz-secondary text-xs">
                {userData.followers.length} followers{" "}
                {userData.following.length} following
              </p>
            </div>
            <div>
              <form action={follow}>
                <Button variant="primary">Follow</Button>
              </form>
            </div>
          </div>
          <div>
            {publishedBlogs.map((blogs: Blog) => (
              <div key={blogs._id} className="my-6 m-3 w-[80vw] lg:w-[60vw]">
                <BlogCard {...blogs} user={currentUser} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (e) {
    notFound();
  }
}
