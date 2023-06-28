export interface BlogType {
  id: number;
  title: string;
  img: string;
  body: string;
}

const BlogCard = ({ body, title }: BlogType) => {
  return (
    <>
      <div className="flex flex-col w-96 h-[30rem] m-5 p-2 bg-slate-950 shadow-card-shadow hover:shadow-box-shadow rounded-3xl md:w-5/6 transform transition duration-500 hover:scale-105">
        <img
          className="w-auto h-1/2 p-2 rounded-3xl"
          src="/tempCardImg.jpg"
          alt=""
        />
        <div>
          <h5 className="p-1 mt-5 text-xl text-center font-semibold text-white sm:text-xl">
            {title}
          </h5>
          <p className="px-2 mt-3 font-light text-xs text-white">
            {body}
          </p>
          <div className="mt-10 mb-5 text-center">
            <a href="#">
              <button className="bg-black border rounded-full text-white text-xs px-2 py-1  ">
                Read More
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
