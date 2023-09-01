import Image from "next/image";
import Link from "next/link";

export interface BlogType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface BlogProps {
  blogs: BlogType[];
}

const BlogCard = ({ body, title }: BlogType) => {
  return (
    <>
      <div className="flex flex-col p-1 m-5 rounded-lg w-64 h-[27rem] mb-8 md:w-80 lg:w-80 bg-gradient-to-b from-kz-dull-purple from-50% to-black to-90% shadow-card-shadow hover:shadow-box-shadow transform transition duration-500 hover:scale-105">
        <Image
          className="w-auto h-auto p-2 rounded-lg"
          src="/tempCardImg.jpg"
          width={240}
          height={120}
          alt="Blog Img"
        />
        <div className="px-1">
          <h5 className="text-lg text-left ml-1 tracking-tight font-semibold text-white md:text-xl">
            {title}
          </h5>
          <p className="font-light text-xs p-1 text-white">{body}</p>
          <div className="absolute bottom-5 right-5">
            <Link href={"/"}>
              <button className="text-white text-xs">Read More...</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
