"use client";
import BlogCard from "@/components/BlogCard";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import { getAllBlogs, getUser, toggleFollow } from "@/utils/api";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [blogs, setBlogs] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    _id: "",
    followers: [],
    following: [],
    image: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedBlogs = await getAllBlogs();
      const fetchedUserData = await getUser(params.id);

      setBlogs(fetchedBlogs);
      setUserData(fetchedUserData);
    };

    fetchData();
  }, [params.id]);

  const authorBlogs = blogs.filter(
    (blog: Blog) => blog.author._id === userData._id,
  );

  const follow = async () => {
    toggleFollow(userData._id);
  };

  return (
    <div>
      <Navbar />
      <div className="mt-12 flex flex-col items-center gap-12">
        <div className="flex flex-wrap gap-6 items-center">
          <img
            width={100}
            height={100}
            src={userData.image}
            alt="profile pic"
            className="rounded-full"
          />
          <div className="flex flex-col gap-3">
            <h1 className="text-kz-secondary text-3xl">{userData.name}</h1>
            <p className="text-kz-secondary text-xs">
              {userData.followers.length} followers {userData.following.length}{" "}
              following
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
