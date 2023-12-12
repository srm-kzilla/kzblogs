import Navbar from "@/components/Navbar";
import { getBlog, getCurrentUser } from "@/utils/api";
import LikeButton from "@/components/LikeButton";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function Page({ params }: { params: { id: string } }) {
  const blog: Blog = await getBlog(params.id);
  const { _id } = await getCurrentUser();
  // console.log(_id);
  return (
    <div className="w-full">
      <Navbar />
      <div className="flex-col justify-center py-10">
        <div className="flex justify-center">
          <div className="prose prose-invert px-4 overflow-auto max-w-[86ch] xl:mx-auto">
            <h1 className="text-3xl text-center sm:text-5xl mb-3">{blog.name}</h1>
            <div className="flex text-lg m-1 flex-col  sm:flex-row justify-center items-center">
              <div className="flex px-2 mb-2 sm:mb-0 justify-center items-center text-sm sm:text-base">
                <Image
                  src={blog.author.image}
                  alt=""
                  className="rounded-full mr-1 w-5 h-5 sm:h-7 sm:w-7"
                  width={40}
                  height={40}
                />
                {blog.author.name}
              </div>
              <LikeButton {...blog} userId={_id} />
            </div>
            <div className="">
              <ReactMarkdown
                children={blog.content}
                remarkPlugins={[remarkGfm]}
                className="prose prose-invert"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
