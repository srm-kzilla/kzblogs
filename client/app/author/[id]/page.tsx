import BlogCard from "@/components/BlogCard";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import { getAllBlogs } from "@/utils/api";
import { UserPlus } from "lucide-react";
import Image from "next/image";

export default async function Page({ params }: { params: { id: string } }) {
  const blogs = await getAllBlogs();
  const authorName = params.id.replace(/\%20/g, " ");
  const authorBlogs = blogs.filter((blog: Blog) => blog.author === authorName);

  return (
    <div>
      <Navbar />
      <div className="mt-12 flex flex-col items-center gap-12">
        <div className="flex flex-wrap gap-6 items-center">
          <img
            width={100}
            height={100}
            src="https://images.unsplash.com/photo-1682687982141-0143020ed57a?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="profile pic"
            className="rounded-full"
          />
          <div className="flex flex-col gap-3">
            <h1 className="text-kz-secondary text-3xl">{authorName}</h1>
            <p className="text-kz-secondary text-xs">An amazin Bio</p>
            <p className="text-kz-secondary text-xs">
              4.2k followers 2 following
            </p>
          </div>
          <div>
            <Button variant="secondary">Follow</Button>
          </div>
        </div>
        <div className="">
          {authorBlogs.map((blogs: Blog) => (
            <div key={blogs._id} className=" my-6 m-3">
              <BlogCard {...blogs} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
