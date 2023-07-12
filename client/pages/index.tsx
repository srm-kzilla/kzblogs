import { Navbar, BlogCard, TrendCard } from "@/components";
import type { BlogType, TrendType } from "@/components";
import type { NextPage } from "next";
import Head from "next/head";

const LandingPage: NextPage = ({ blogs }: any) => {
  return (
    <div>
      <Head>
        <title>KZBlogs</title>
        <meta name="description" content="Blogs from SRMKZILLA!" />
      </Head>
      <div className="bg-kz-dark-grey">
        <div>
          <Navbar />
          <div className="h-full w-full">
            <h1 className="select-none relative invisible z-20 h-36 md:visible md:text-8xl md:top-12 md:ml-11 lg:text-9xl lg:top-36 xl:top-40 font-bold font-josefinSans text-transparent bg-clip-text bg-gradient-to-r from-kz-purple from-5% via-kz-blue via-25% to-kz-pink to-50% w-fit">
              KZBlogs
            </h1>
            <div>
              <input
                type="text"
                name="Search"
                placeholder="Search your interests here"
                className="absolute text-xs text-left  text-kz-grey z-10 bg-[#232238] rounded-xl p-2 top-48 w-3/4  ml-8 indent-2 md:w-10/12 md:h-10 md:mt-5 lg:top-1/2 lg:-mt-3 xl:top-1/3 xl:mt-24"
              />
              <div className="absolute z-10 left-3/4 top-48 mt-1 md:mt-6 md:ml-10 lg:mt-40 lg:ml-10 xl:mt-48">
                <img src="/search.svg" alt="search" className="w-5 md:w-8 " />
              </div>
            </div>
            <img
              src="/shapes.svg"
              alt="moon and shapes"
              className="absolute z-0 w-7 h-7 top-52 mt-3 left-12 md:w-10 md:h-10 md:mt-9 lg:mt-44 xl:mt-52"
            />
          </div>
          <div className="relative flex flex-col">
            <h2 className="relative text-2xl text-white font-semibold top-48 ml-9 md:text-3xl md:mt-11 md:ml-12 lg:top-72 lg:ml-12">
              Trending Topics
            </h2>
            <div className="relative flex flex-col flex-wrap top-48 ml-3 md:flex-row md:top-56 md:ml-9 md:justify-start md:mr-7 lg:top-72">
              {blogs.map((blog: BlogType) => (
                <div key={blogs.id}>
                  <BlogCard {...blog} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

export const getStaticProps = async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?limit=10"
  );
  const data = await res.json();
  return {
    props: { blogs: data },
  };
};
