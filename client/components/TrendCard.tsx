export type trendType = {
  id: number;
  img: string;
  content: string;
};

interface TrendProps {
  trendArr: trendType;
}

const TrendCard = ({ trendArr }: TrendProps) => {
  return (
    <>
      <div className="m-6 flex flex-row w-64 h-16 bg-kz-grey shadow-md rounded-s text-ellipsis overflow-clip md:w-44">
        <img
          className="w-1/4 h-7/8  p-2 rounded-sm md:h-5/6"
          src={trendArr.img}
          alt=""
        />
        <div>
          <p className="font-light text-sm p-2 text-black md:text-xs">
            {trendArr.content}
          </p>
        </div>
      </div>
    </>
  );
};

export default TrendCard;
