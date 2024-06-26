import Navbar from "@/components/Navbar";
import { getBlog, getCurrentUser } from "@/utils/api";
import LikeButton from "@/components/LikeButton";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const fetchBlog = async () => {
    try {
      const blog: Blog = await getBlog(params.id);
      if (!blog) {
        throw new Error("Blog not found");
      }

      const { _id } = await getCurrentUser();

      return (
        <div className="min-h-screen h-full mb-10">
          <Navbar />
          <div className="flex flex-col justify-start items-center mt-10 prose prose-invert w-[90vw] mx-auto">
            <h1 className="text-3xl text-center sm:text-5xl mb-3">
              {blog.name}
            </h1>
            <div className="flex items-center justify-center text-lg mb-3">
              <div className="flex items-center">
                <Image
                  src={blog.author.image}
                  alt={blog.author.name}
                  className="rounded-full mr-2 w-8 h-8 sm:w-10 sm:h-10"
                  width={40}
                  height={40}
                />
                <span className="text-sm sm:text-base">{blog.author.name}</span>
              </div>
              <div className="ml-4">
                <LikeButton {...blog} userId={_id} />
              </div>
            </div>
            <div className="prose prose-invert">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {blog.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      );
    } catch (error) {
      notFound();
    }
  };

  return fetchBlog();
}
