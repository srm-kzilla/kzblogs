import { getTrending } from "@/utils/api";

interface TrendingCardProps {
  blogs: Blog[];
}

const TrendingCard = async () => {
  const data = await getTrending();

  return (
    <div className="bg-kz-card-dark p-4 w-full h-fit text-kz-secondary rounded-xl">
      <div>
        <h1 className="text-2xl text-transparent bg-clip-text bg-gradient-to-tr from-kz-highlight-dark via-kz-highlight-light via-40% to-kz-secondary to-90%">
          Trending
        </h1>
        <div className="flex flex-col mt-3">
          {data.map(({ _id, name, author }: Blog) => (
            <div key={_id} className="flex justify-between items-end my-3">
              <div>
                <h1>{name}</h1>
                <p className="text-xs font-extralight font-sans">{author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
