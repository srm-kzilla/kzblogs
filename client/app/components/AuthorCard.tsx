import { UserCircleIcon, UserPlus } from "lucide-react";
import { Blog } from "../types";

interface BlogCardProps {
  blog: Blog;
}

const AuthorCard = ({ blog }: BlogCardProps) => {
  const { author, last_edited } = blog;
  return (
    <div className="p-3 bg-kz-lightcard text-kz-secondary rounded-lg w-full h-fit">
      <div className="flex flex-row items-center justify-between gap-3">
        <div className="flex flex-row gap-3">
          <p className="text-xl lg:text-2xl font-medium mt-1">#1</p>
          <UserCircleIcon
            className="text-kz-highlightl mt-1"
            width={32}
            height={32}
          />
          <div className="flex flex-col">
            <p className="text-base font-bold font-sans">{author}</p>
            <p className="text-xs font-extralight font-sans">{last_edited}</p>
          </div>
        </div>
        <div>
          <UserPlus
            className="text-kz-highlightl w-5 h-5 lg:w-6 lg:h-6"
            width={32}
            height={32}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
