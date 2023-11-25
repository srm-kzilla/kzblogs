"use client";
import BlogCard from "@/components/BlogCard";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import { getAllBlogs, getUser, toggleFollow } from "@/utils/api";

export default async function Page({ params }: { params: { id: string } }) {
  const blogs = await getAllBlogs();
  const { name, _id, followers, following, images } = await getUser(params.id);
  const authorBlogs = blogs.filter((blog: Blog) => blog.author === name);
  const follow = async () => {
    toggleFollow(_id);
  };
  return (
    <div>
      <Navbar />
      <div className="mt-12 flex flex-col items-center gap-12">
        <div className="flex flex-wrap gap-6 items-center">
          <img
            width={100}
            height={100}
            src={images}
            alt="profile pic"
            className="rounded-full"
          />
          <div className="flex flex-col gap-3">
            <h1 className="text-kz-secondary text-3xl">{name}</h1>
            <p className="text-kz-secondary text-xs">An amazin Bio</p>
            <p className="text-kz-secondary text-xs">
              {followers} followers {following} following
            </p>
          </div>
          <div>
            <Button onClick={follow} variant="secondary">
              Follow
            </Button>
          </div>
        </div>
        <div className="">
          {authorBlogs.map((blogs: Blog) => (
            <div key={blogs._id} className=" my-6 m-3 w-[60vw]">
              <BlogCard {...blogs} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
