import React from "react";
import { PenLine, PlusCircleIcon } from "lucide-react";
import { Blog } from "../types";

interface DraftCardProps {
  blogs: Blog[];
}

const DraftCard = ({ blogs }: DraftCardProps) => {
  const draftBlogs = blogs.filter((blog) => blog.publish_status === "draft");
  const draftNumber = draftBlogs.length;

  return (
    <div className="bg-kz-darkcard p-4 w-full h-fit text-kz-secondary rounded-xl">
      {draftNumber === 0 ? (
        <div>
          <div className="flex flex-row justify-between gap-5">
            <h1 className="text-lg md:text-2xl">Drafts ( {draftNumber} )</h1>
            <button>
              <PlusCircleIcon />
            </button>
          </div>
          <p className="mt-4 font-sans text-xs">
            No drafts yet :(
            <br /> Write one now!
          </p>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl">Drafts ( {draftNumber} )</h1>
          <div className="flex flex-col mt-3">
            {blogs.map(({ publish_status, id, name, last_edited }) =>
              publish_status === "draft" ? (
                <div key={id} className="flex justify-between items-end my-3">
                  <div>
                    <h1>{name}</h1>
                    <p className="text-xs font-extralight font-sans">
                      {last_edited}
                    </p>
                  </div>
                  <button>
                    <PenLine width={18} height={18} />
                  </button>
                </div>
              ) : null
            )}
          </div>
          <div className="text-kz-primary font-sans text-sm flex justify-center items-center">
            <button className="bg-kz-secondary px-4 py-1 rounded-3xl">
              See All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DraftCard;
