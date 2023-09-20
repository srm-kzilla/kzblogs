import React from "react";
import { Challenge } from "@/app/types";

interface ChallengesCardProps {
  challenges: Challenge[];
}

const ChallengesCard = ({ challenges }: ChallengesCardProps) => {
  const challengesBlogs = challenges.filter((blog) => blog.ongoingStatus === true);
  const challengesNumber = challengesBlogs.length;

  return (
    <div>
      {challengesNumber === 0 ? (
        <div className="bg-kz-darkcard font-breeSerif p-4 w-full h-fit text-kz-secondary rounded-xl">
          <div className="flex-col">
            <h1 className="text-lg md:text-2xl ">Challenges</h1>
            <p className="mt-3 font-sans text-xs">
              Nothing here yet :(
              <br />
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-kz-darkcard font-breeSerif p-4 w-full h-fit text-kz-secondary rounded-xl">
          <h1 className="text-2xl text-transparent bg-clip-text bg-gradient-to-tr from-[#0A427D] via-[#3AA39B] via-40% to-[#D9D9D9] to-90%">Ongoing Challenges</h1>
          <div className="flex flex-col mt-1">
            {challenges.map(({ ongoingStatus, id, name, description, endingDate }) =>
              ongoingStatus === true ? (
                <div key={id} className="flex items-center justify-left my-3">
                  <div className="mx-2">
                    <h1>{name}</h1>
                    <p className="text-[12px] font-extralight font-sans">
                      {endingDate}
                    </p>
                    <p className="text-sm font-sans text-ellipsis">
                      {description ? description : "No description"}
                    </p>
                  </div>
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

export default ChallengesCard;
