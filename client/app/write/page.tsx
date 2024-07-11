"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { addBlog, getCurrentUser, getBlogAdmin } from "@/utils/api";
import toast from "@/utils/toast";
import { useRouter, useSearchParams } from "next/navigation";

const CreatePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const draftId = searchParams.get("id");
  const [markdownInput, setMarkdownInput] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchDraft = async () => {
      if (draftId) {
        const draft = await getBlogAdmin(draftId);
        setTitle(draft.name);
        setMarkdownInput(draft.content);
      }
    };
    fetchDraft();
  }, [draftId]);

  const publishData = async () => {
    const { _id, author_name } = await getCurrentUser();
    try {
      const dataToPublish = {
        name: title,
        content: markdownInput,
        publish_status: true,
        author: _id,
        author_name: author_name,
      };

      const res = await addBlog(dataToPublish);
      router.push("/");
      toast.success("Your blog is live !");
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish your blog. Please try again.");
    }
  };

  const saveAsDraft = async () => {
    const { _id } = await getCurrentUser();
    try {
      const draft = {
        name: title,
        content: markdownInput,
        publish_status: false,
        author: _id,
      };

      const res = await addBlog(draft);
      toast.success("Your blog has been saved as draft.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save your blog as draft. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-2 justify-center h-full mt-8 px-5 md:px-24 lg:mt-16 lg:px-32 ">
        <div className="flex gap-5 justify-end">
          <Button onClick={saveAsDraft} variant="secondary">
            Save as Draft
          </Button>
          <Button onClick={publishData} variant="secondary">
            Publish
          </Button>
        </div>

        <form className="px-5">
          <div className="flex flex-col">
            <textarea
              id="title"
              className="mt-5 w-full text-white bg-transparent text-2xl resize-none outline-none lg:text-5xl"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-col lg:flex-row justify-evenly gap-20 text-white">
            <textarea
              className="outline-none border-none w-[75vw] lg:w-[40vw] h-[90vh] overflow-x-hidden text-base resize-none p-5 bg-kz-card-light rounded-2xl"
              value={markdownInput}
              placeholder="Type Away..."
              onChange={(e) => setMarkdownInput(e.target.value)}
            ></textarea>
            <div className="p-5 mb-10 outline-none border-none w-[75vw] h-fit lg:h-[90vh] lg:w-[40vw] overflow-x-hidden text-base resize-none bg-kz-card-light rounded-xl">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                className="prose prose-invert"
              >
                {markdownInput}
              </ReactMarkdown>
            </div>
          </div>
        </form>
        {/* <div className="flex justify-end">
          <Button onClick={publishData} variant="delete">
            Delete Blog
          </Button>
        </div> */}
      </div>
    </div>
  );
};
CreatePage.auth = {
  role: "admin",
  unauthorized: "/", // redirect to this url
};

export default CreatePage;
