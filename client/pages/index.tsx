import { Navbar, BlogCard, TrendCard } from "@/components";
import type { BlogType, TrendType } from "@/components";
import type { NextPage } from "next";
import Head from "next/head";

const LandingPage: NextPage = ({ blogs }: any) => {
  return (
    <>
      <Head>
        <title>KZBlogs</title>
        <meta name="description" content="Blogs from SRMKZILLA!" />
      </Head>
      <div className="bg-kz-dark-grey">
        <div>
          <div className="overflow-x-clip">
            <Navbar />
          </div>
          <div className="h-20 w-full">
            <h1 className="select-none relative left-1/4 top-20 mt-32 ml-5  z-0 md:mt-11 sm:top-4 font-bold font-josefinSans text-transparent text-[10vw] bg-clip-text bg-gradient-to-r from-kz-deepblue from-5% via-kz-lightblue via-20% to-kz-orange to-40% w-fit">
              KZBlogs
            </h1>
            <div>
              <input
                type="text"
                name="Search"
                placeholder="Search your interests here"
                className="absolute m-2 h-16 w-1/2 left-1/4 top-80 text-xs bg-kz-grey rounded-3xl text-left indent-5 z-10 sm:text-lg sm:indent-11"
              />
              <div className="absolute m-1 mr-3 right-1/4 top-88 mt-3 z-10 sm:top-80 sm:mr-8 sm:mt-6">
                <img src="/search.svg" alt="search" className="w-5 sm:w-auto" />
              </div>
            </div>
            <img
              src="/shapes.svg"
              alt="moon and shapes"
              className="absolute z-0 left-48 top-72 mt-20 -ml-11 p-3 pt-3 w-16 sm:w-auto sm:left-1/3 sm:pt-3 "
            />
          </div>
          <div>
            <img
              src="/smallCircles.svg"
              alt="small circles"
              className="absolute w-1/6 h-1/6 top-32 left-1/3 ml-11 sm:right-1/3 sm:ml-auto sm:mr-3"
            />
            <img
              src="/bigCircles.svg"
              alt="big circles"
              className="absolute w-2/6 h-2/6 left-1/3 ml-32 mt-3 top-40 md:left-2/4 md:top-32"
            />
          </div>
          <div className="relative w-full top-96 flex flex-col justify-around sm:flex-row ">
            <div className="relative">
              <h2 className="relative left-20 font-semibold text-3xl p-1 text-white w-fit">
                Explore
              </h2>
              <div className="flex flex-row flex-wrap ml-11 m-5">
                {blogs.map((blog: BlogType) => (
                  <div key={blogs.id}>
                    <BlogCard {...blog} />
                  </div>
                ))}
              </div>
            </div>
            <div className="relative right-20 ">
              <h2 className="relative font-semibold text-center text-3xl p-1 text-white sm:text-right left-11 sm:left-0">
                Trending Topics
              </h2>
              <div className="flex flex-col flex-wrap m-3 relative left-32 sm:left-20">
                <div>
                  {blogs.map((blog: TrendType) => (
                    <div key={blogs.id}>
                      <TrendCard {...blog} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
