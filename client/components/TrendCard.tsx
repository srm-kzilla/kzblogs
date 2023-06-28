export interface TrendType {
  id: number;
  img: string;
  body: string;
}

const TrendCard = ({ body }: TrendType) => {
  return (
    <>
      <div className="m-6 flex flex-row w-64 h-16 bg-slate-950  shadow-md rounded-xl text-ellipsis overflow-clip md:w-44">
        <img
          className="w-1/4 h-7/8 p-2 rounded-sm md:h-5/6 border-solid border-white"
          src="/tempCardImg.jpg"
          alt=""
        />
        <div>
          <p className="font-light text-sm px-2 my-1 text-white md:text-xs">
            {body}
          </p>
        </div>
      </div>
    </>
  );
};

export default TrendCard;
