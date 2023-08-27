import Image from "next/image";

export interface BlogType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const BlogCard = ({ body, title }: BlogType) => {
  return (
    <>
      <div className="flex flex-col m-5 p-2 rounded-lg w-5/6 h-[30rem] mb-8 md:w-96 lg:w-80 bg-gradient-to-b from-kz-dull-purple from-50% to-black to-90% shadow-card-shadow hover:shadow-box-shadow transform transition duration-500 hover:scale-105">
        <Image
          className="w-auto h-1/2 p-2 rounded-lg"
          src="/tempCardImg.jpg"
          alt="Blog Img"
        />
        <div className="px-1">
          <h5 className="text-lg text-left ml-1 tracking-tight font-semibold text-white md:text-xl">
            {title}
          </h5>
          <p className="font-light text-xs p-1 text-white">{body}</p>
          <div className="mt-10 mb-5 text-center">
            <a href="#">
              <button className="text-white text-xs ml-32">Read More...</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
