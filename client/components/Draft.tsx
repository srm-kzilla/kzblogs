"use client";

import Image from "next/image";


const Drafts = ({

  name,
  author,
  content,

}: Blog) => {
  const markdownToPlainText = (markdown: string) => {
    return markdown?.replace(/[#*_]+/g, "");
  };
  return (
    <div className="p-3 bg-kz-card-light text-kz-secondary rounded-2xl w-full h-fit">
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <div className="md:w-[60%]">
  
            <h1 className="text-lg md:text-xl">{name}</h1>

        </div>
        <div className="flex flex-row align-middle gap-2">
          <Image
            src={author.image}
            alt={author.name}
            className="rounded-full w-5 h-5 md:h-7 md:w-7"
            width={400}
            height={400}
          />
        
        </div>
      </div>
   
        <p className="font-sans text-xs font-light mt-3 md:text-base line-clamp-2">
          {markdownToPlainText(content)}
        </p>
    </div>
  );
};

export default Drafts;
