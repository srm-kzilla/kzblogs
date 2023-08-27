import { BlogCard, BlogProps, BlogType, Navbar } from "@/components";
import type { NextPage } from "next";
import Head from "next/head";
import tags from "@/data/tags";
import { useEffect, useState, useRef } from "react";
import Tags from "@/components/Tags";
import Image from "next/image";
let arrayForHoldingTags: any = [];
const tagsPerPage = 3;

const ExplorePage: NextPage<BlogProps> = ({ blogs }) => {
  const recommend = ["google", "technology", "python"];
  const [tagsToShow, setTagsToShow] = useState([]);
  const ref = useRef(tagsPerPage);
  const loopWithSlice = (start: number, end: number) => {
    const slicedTags = tags.slice(start, end);
    arrayForHoldingTags = arrayForHoldingTags.concat(slicedTags);
    setTagsToShow(arrayForHoldingTags);
  };
  useEffect(() => {
    loopWithSlice(0, tagsPerPage);
  }, []);
  const handleShowMoreTags = () => {
    loopWithSlice(ref.current, ref.current + tagsPerPage);
    ref.current += tagsPerPage;
  };
  return (
    <div className="w-full h-full">
      <Head>
        <title>Explore</title>
        <meta name="description" content="Explore Blogs" />
      </Head>
      <div className="bg-kz-dark-grey">
        <div>
          <Navbar />
        </div>
        <div>
          <h1 className="select-none relative invisible z-20 h-36 md:visible md:text-8xl md:top-16 md:mt-2 md:ml-11 lg:text-9xl lg:top-36 lg:mt-3 xl:top-44 font-bold font-josefinSans text-transparent bg-clip-text bg-gradient-to-r from-kz-purple from-5% via-kz-blue via-25% to-kz-pink to-50% w-fit">
            Explore
          </h1>
          <div>
            <input
              type="text"
              name="Search"
              placeholder="Search your interests here"
              className="absolute text-xs text-left h-12 w-[90vw] rounded-xl p-2 ml-4 top-56 indent-2 md:ml-5 md:mt-3 lg:top-80 lg:mt-6 xl:mt-14 z-10 text-kz-grey bg-kz-purp-2"
            />
            <div className="absolute z-10 left-3/4 top-56 mt-3 md:mt-5 md:ml-10 lg:mt-32 xl:mt-40">
              <Image
                width={12}
                height={12}
                src="/search.svg"
                alt="search"
                className="w-5 md:w-8"
              />
            </div>
          </div>
          <Image
            width={48}
            height={32}
            src="/shapes.svg"
            alt="moon and shapes"
            className="absolute w-auto h-auto z-0 top-60 mt-5 left-12 md:mt-8 lg:mt-36 xl:mt-44"
          />
        </div>
        <div className="relative top-24 m-5 lg:top-48 xl:top-56 xl:ml-4">
          <div className="flex flex-row m-3 md:mt-8">
            <p className=" text-kz-grey text-base lg:text-lg">Recommended:</p>
            <div className="flex flex-row flex-wrap">
              {recommend.map((rec, index) => (
                <div
                  key={index}
                  className="text-sm text-center mx-2 my-0.5 md:my-0 md:mx-0 text-kz-grey md:text-base md:w-28 hover:underline"
                >
                  {rec}
                </div>
              ))}
            </div>
          </div>
          <div>
            <Tags tagsToRender={tagsToShow} />
            <button
              onClick={handleShowMoreTags}
              className="text-xs text-center m-1 p-1 mt-6 border border-transparent rounded-2xl w-7 h-7 mx-1 bg-kz-purp-2 text-kz-grey md:m-2 md:text-base md:w-10 md:h-9"
            >
              +
            </button>
          </div>
        </div>
        <div className="w-3/4">
          <div className="relative flex flex-col flex-wrap top-20 ml-3 md:flex-row md:top-56 md:ml-9 md:justify-start md:mr-7 lg:top-72">
            {blogs.map((blog: BlogType, index: number) => (
              <div key={index}>
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

export const getServerSideProps = async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?limit=10"
  );
  const data = await res.json();
  return {
    props: { blogs: data },
  };
};
