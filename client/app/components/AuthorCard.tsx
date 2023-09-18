import { UserCircleIcon, UserPlus } from "lucide-react";

const AuthorCard = () => {
  return (
    <div className="p-3 bg-kz-lightcard text-kz-secondary rounded-lg w-full h-fit">
      <div className="flex flex-row align-middle justify-between gap-3">
        <div className="flex flex-row gap-3">
          <p className="text-2xl mt-1">#1</p>
          <UserCircleIcon
            className="text-kz-highlightl mt-1"
            width={32}
            height={32}
          />
          <div className="flex flex-col">
            <p className="text-base font-sans">Taylor Swift</p>
            <p className="text-xs font-extralight font-sans">Sep 13, 2023</p>
          </div>
        </div>

        <div>
          <UserPlus
            className="text-kz-highlightl mt-1"
            width={32}
            height={32}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
