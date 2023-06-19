export type TrendType = {
  id: number;
  img: string;
  body: string;
};

export interface TrendProps {
  blogs: TrendType;
}

const TrendCard = ({ blogs }: TrendProps) => {
  return (
    <>
      <div className="m-6 flex flex-row w-64 h-16 bg-kz-grey shadow-md rounded-s text-ellipsis overflow-clip md:w-44">
        <img
          className="w-1/4 h-7/8  p-2 rounded-sm md:h-5/6"
          src="tempCardImg.jpg"
          alt=""
        />
        <div>
          <p className="font-light text-sm p-2 text-black md:text-xs">
            {blogs.body}
          </p>
        </div>
      </div>
    </>
  );
};

export default TrendCard;
