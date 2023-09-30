import { UserCircleIcon, UserPlus } from "lucide-react";

const AuthorCard = ({ id, lastEdited, author }: Blog) => {
  return (
    <div className="p-1 px-3 bg-kz-card-light text-kz-secondary rounded-lg w-full h-fit">
      <div className="flex flex-row items-start align-top justify-between mx-1 my-3 gap-3">
        <div className="flex flex-row gap-2">
          <p className="text-xl lg:text-xl font-medium m-1"># {id}</p>
          <UserCircleIcon
            className="text-kz-highlight-light"
            width={32}
            height={32}
          />
          <div className="flex flex-col">
            <p className="text-base font-bold font-sans">{author}</p>
            <p className="text-xs font-extralight font-sans">{lastEdited}</p>
          </div>
        </div>
        <div>
          <UserPlus
            className="text-kz-highlight-light w-5 h-5 lg:w-6 lg:h-6"
            width={32}
            height={32}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
