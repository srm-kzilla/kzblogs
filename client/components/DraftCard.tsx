import { getDraftBlogs } from "@/utils/api";
import { PenLine, PlusCircleIcon } from "lucide-react";
import Link from "next/link";

const DraftCard = async () => {
  const draftBlogs = await getDraftBlogs();
  const draftNumber = draftBlogs.length;
  const draftsShown = draftBlogs.slice(0, 3);

  return (
    <div className="bg-kz-card-dark px-4 py-3 w-full h-fit text-kz-secondary rounded-xl">
      {draftNumber === 0 ? (
        <div>
          <div className="flex flex-row justify-between gap-5">
            <h1 className="text-lg md:text-2xl">Drafts ( {draftNumber} )</h1>
            <Link href="/write">
              <PlusCircleIcon />
            </Link>
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
            {draftsShown.map(({ _id, name, author }: Blog) => (
              <div key={_id} className="flex justify-between items-end my-3">
                <div>
                  <h1>{name}</h1>
                  <p className="text-xs">{author.name}</p>
                </div>
                <Link href={`/write?id=${_id}`}>
                  <PenLine width={18} height={18} />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-kz-primary font-sans text-xs flex justify-center">
            <Link
              href={"/me"}
              className="bg-kz-secondary px-2 py-0.5 rounded-3xl"
            >
              See All
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DraftCard;
