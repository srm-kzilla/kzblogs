import { UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const AuthorCard = ({ author, index }: { author: User; index: number }) => {
  return (
    <div className="p-1 px-3 bg-kz-card-light text-kz-secondary rounded-lg w-full h-fit">
      <div className="flex flex-row items-start align-top justify-between mx-1 my-3 gap-3">
        <div className="flex flex-row gap-2 lg:gap-4">
          <p className="text-sm mt-5 lg:text-xl font-medium m-1"># {index}</p>
          <Image
            src={author.image}
            className="rounded-full w-10 h-10 mt-3"
            width={40}
            height={32}
            alt={author.name}
          />
          <div className="flex flex-col justify-center">
            <Link
              href={`/author/${author._id}`}
              className="text-base font-bold font-sans lg:mt-3"
            >
              {author.name}
            </Link>
          </div>
        </div>
        {/* <div>
          <UserPlus
            className="text-kz-highlight-light mt-5 w-5 h-5 md:mt-0 lg:w-6 lg:h-6 lg:mt-4"
            width={32}
            height={32}
          />
        </div> */}
      </div>
    </div>
  );
};

export default AuthorCard;
