import { BlogCard, BlogType, Navbar } from "@/components";
import type { NextPage } from "next";
import Head from "next/head";
interface ExploreProps {
  blogs: BlogType;
  recommend: Array<string>;
  rec: string;
  tag: string;
  tags: Array<string>;
}
const ExplorePage: NextPage = ({ blogs }: any) => {
  const recommend = ["google", "technology", "python"];
  const tags = ["google", "technology", "python"];
  return (
    <div className="">
      <Head>
        <title>Explore</title>
        <meta name="description" content="Explore Blogs" />
      </Head>
      <div className="bg-kz-dark-grey">
        <div>
          <Navbar />
        </div>
        <div className="">
          <div className="h-full w-full">
            <h1 className="select-none relative top-11 left-5 text-3xl h-36  md:text-4xl md:top-12 md:ml-6 lg:text-6xl lg:top-36 xl:top-40 font-bold font-josefinSans text-transparent bg-clip-text bg-gradient-to-r from-kz-purple from-5% via-kz-blue via-25% to-kz-pink to-50% w-fit">
              Explore
            </h1>
            <div>
              <div>
                <input
                  type="text"
                  name="Search"
                  placeholder="Search your interests here"
                  className="absolute text-xs text-left h-12 w-[90vw] rounded-xl p-2 ml-4 top-48 indent-2 md:ml-5 md:mt-3 lg:top-80 lg:mt-6 xl:mt-14 z-10 text-kz-grey bg-kz-purp-2"
                />
              </div>
              <div className="absolute z-10 left-3/4 top-48 mt-3 md:mt-5 md:ml-10 lg:mt-40 lg:ml-10 xl:mt-48">
                <img src="/search.svg" alt="search" className="w-5 md:w-8 " />
              </div>
            </div>
            <img
              src="/shapes.svg"
              alt="moon and shapes"
              className="absolute z-0 w-7 h-7 top-52 mt-7 left-12 md:w-10 md:h-10 md:mt-9 lg:mt-44 xl:mt-52"
            />
          </div>
          <div className="relative top-12 m-2 lg:top-48 xl:top-56 xl:ml-4">
            <div className="flex flex-row m-3 md:mt-8">
              <p className=" text-kz-grey text-base lg:text-lg">Recommended:</p>
              <div className="flex flex-row flex-wrap">
                {recommend.map((rec) => (
                  <div className="text-base text-center mx-4 text-kz-grey md:text-lg md:w-28 hover:underline">
                    {rec}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-row flex-wrap justify-start">
              {tags.map((tag) => (
                <div className="text-xs text-center m-1 p-1 mt-6 border border-transparent rounded-2xl w-20 h-7 mx-1 bg-kz-purp-2 text-kz-grey md:m-2 md:text-base md:w-28 md:h-9">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-3/4">
          <div className="relative flex flex-col flex-wrap top-12 ml-3 md:flex-row md:top-56 md:ml-9 md:justify-start md:mr-7 lg:top-72">
            {blogs.map((blog: BlogType) => (
              <div key={blogs.id}>
                <BlogCard {...blog} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;

export const getStaticProps = async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?limit=10"
  );
  const data = await res.json();
  return {
    props: { blogs: data },
  };
};
