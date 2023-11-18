import Navbar from "@/components/Navbar";
import { getBlog, toggleLike } from "@/utils/api";
import { Heart, UserIcon } from "lucide-react";
import Markdown from "react-markdown";

export default async function Page({ params }: { params: { id: string } }) {
  const blog : Blog = await getBlog(params.id);

  return (
    <div className="w-full">
      <Navbar />
      <div className="flex-col justify-center py-10">
        <div className="flex justify-center">
          <div className="prose prose-invert px-4 overflow-auto max-w-[86ch] xl:mx-auto">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl mb-5">{blog.name}</h1>
              <div className="flex justify-center text-lg m-1">
                <div className="flex flex-col sm:flex-row">
                  <div className="flex px-2 sm:mb-2 justify-center items-center text-2xl sm:text-lg">
                    <UserIcon className="pr-1 w-fit" />
                    {blog.author}
                  </div>
                  <div className="flex justify-center items-center text-base sm:text-lg">
                    <div className="flex px-2">
                      <Heart className="pr-1 w-fit" />
                      {Object.keys(blog.likes).length}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-left">
                <Markdown>{blog.content}</Markdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
