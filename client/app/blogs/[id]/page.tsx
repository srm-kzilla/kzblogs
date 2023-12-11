import Navbar from "@/components/Navbar";
import { getBlog, toggleLike } from "@/utils/api";
import { UserIcon } from "lucide-react";
import Markdown from "react-markdown";
import LikeButton from "@/components/LikeButton";

export default async function Page({ params }: { params: { id: string } }) {
  const blog: Blog = await getBlog(params.id);

  return (
    <div className="w-full">
      <Navbar />
      <div className="flex-col justify-center py-10">
        <div className="flex justify-center">
          <div className="prose prose-invert px-4 overflow-auto max-w-[86ch] xl:mx-auto text-center">
            <h1 className="text-3xl sm:text-5xl mb-5">{blog.name}</h1>
            <div className="flex text-lg m-1 flex-col  sm:flex-row justify-center items-center">
              <div className="flex px-2 mb-2 sm:mb-0 justify-center items-center text-sm sm:text-base">
                <UserIcon className="pr-1 w-5 sm:w-6" />
                {blog.author}
              </div>
              <LikeButton {...blog} />
            </div>
            <div className="flex justify-center">
              <Markdown>{blog.content}</Markdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
