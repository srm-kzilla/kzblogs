interface ChallengesCardProps {
  challenges: Challenge[];
}

const ChallengesCard = ({ challenges }: ChallengesCardProps) => {
  const challengesBlogs = challenges.filter((blog) => blog.ongoingStatus);
  const challengesNumber = challengesBlogs.length;

  return (
    <div>
      {challengesNumber === 0 ? (
        <div className="bg-kz-card-dark font-breeSerif p-4 w-full h-fit text-kz-secondary rounded-xl">
          <div className="flex-col">
            <h1 className="text-lg md:text-2xl ">Challenges</h1>
            <p className="mt-3 font-sans text-xs">
              Nothing here yet :(
              <br />
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-kz-card-dark font-breeSerif p-4 w-full h-fit text-kz-secondary rounded-xl">
          <h1 className="text-2xl text-transparent bg-clip-text bg-gradient-to-tr from-kz-highlight-dark via-kz-highlight-light via-40% to-kz-secondary to-90%">
            Challenges
          </h1>
          <div className="flex flex-col mt-1">
            {challengesBlogs.map(({ id, name, description, endingDate }) => (
              <div
                key={id}
                className="flex w-full items-center justify-left my-3"
              >
                <div className="mx-2 w-full">
                  <h1>{name}</h1>
                  <p className="text-[12px] font-extralight font-sans">
                    {endingDate}
                  </p>
                  <p className="text-sm w-full font-sans truncate">
                    {description ? description : "No description"}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-kz-primary font-sans text-xs flex justify-center items-center">
            <button className="bg-kz-secondary px-3 py-1 rounded-3xl">
              See All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengesCard;
