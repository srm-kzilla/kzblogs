"use client";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import { Image, PenSquareIcon } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const CreatePage = () => {
  const [markdownInput, setMarkdownInput] = useState("");
  const [subtitle, setSubtitle] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-y-scroll w-full overflow-x-hidden">
      <div className="flex h-screen w-full flex-col">
        <Navbar />
        <div className="p-2 justify-center h-full mt-8 px-5 md:px-24 lg:mt-16 lg:px-32 ">
          <div className="flex flex-col lg:flex-row items-end lg:justify-between gap-5 lg:items-center">
            <div className="flex flex-row">
              <Button variant="primary">
                <Image className="h-4 md:h-6" />
                <p>Add Cover Image</p>
              </Button>
              <Button variant="primary" onClick={() => setSubtitle(!subtitle)}>
                <PenSquareIcon className="h-4 md:h-6" />
                <p>Add Subtitle</p>
              </Button>
            </div>
            <Button variant="secondary">Publish</Button>
          </div>
          <form className="px-5">
            <div className="flex flex-col">
              <textarea
                id="title"
                className="mt-5 w-full text-white bg-transparent text-2xl resize-none outline-none lg:text-5xl"
                placeholder="Title"
              ></textarea>
              <textarea
                id="tagline"
                className={
                  (subtitle
                    ? "resize-none outline-none w-full text-kz-secondary ml-2 bg-transparent text-xs md:text-base lg:text-xl"
                    : "hidden") + ""
                }
                placeholder="Tagline"
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
                  children={markdownInput}
                  remarkPlugins={[remarkGfm]}
                  className="prose prose-invert"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
