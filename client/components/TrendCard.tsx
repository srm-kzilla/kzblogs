export interface TrendType {
  id: number;
  img: string;
  body: string;
}

const TrendCard = ({ body }: TrendType) => {
  return (
    <>
      <div className="m-6 flex flex-row w-44 h-16 bg-[#232238]  shadow-md rounded-xl text-ellipsis overflow-clip md:w-64">
        <img
          className="w-1/4 h-5/6 p-2 rounded-sm md:h-7/8 border-solid border-white"
          src="/tempCardImg.jpg"
          alt=""
        />
        <div>
          <p className="font-light text-xs px-2 my-1 text-white md:text-sm">
            {body}
          </p>
        </div>
      </div>
    </>
  );
};

export default TrendCard;
