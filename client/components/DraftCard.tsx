import React from "react";
import { PenLine, PlusCircleIcon } from "lucide-react";

interface DraftCardProps {
  blogs: Blog[];
}

const DraftCard = ({ blogs }: DraftCardProps) => {
  const draftBlogs = blogs.filter((blog) => blog.publishStatus === "draft");
  const draftNumber = draftBlogs.length;

  return (
    <div className="bg-kz-darkcard px-4 py-3 w-full h-fit text-kz-secondary rounded-xl">
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
          <h1 className="text-xl">Drafts ( {draftNumber} )</h1>
          <div className="flex flex-col mt-3">
            {draftBlogs.map(({ id, title, lastEdited }) => (
              <div key={id} className="flex justify-between items-end my-3">
                <div>
                  <h1>{title}</h1>
                  <p className="text-xs font-extralight font-sans">
                    {lastEdited}
                  </p>
                </div>
                <button>
                  <PenLine width={18} height={18} />
                </button>
              </div>
            ))}
          </div>
          <div className="text-kz-primary font-sans text-xs flex justify-center">
            <button className="bg-kz-secondary px-2 py-0.5 rounded-3xl">
              See All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DraftCard;
