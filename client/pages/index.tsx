import { Navbar, BlogCard } from "@/components";
import type { BlogProps, BlogType } from "@/components";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const LandingPage: NextPage<BlogProps> = ({ blogs }) => {
  return (
    <div className="w-screen h-full">
      <Head>
        <title>KZBlogs</title>
        <meta name="description" content="Blogs from SRMKZILLA!" />
      </Head>
      <div className="bg-kz-dark-grey">
        <div>
          <Navbar />
          <div>
            <h1 className="select-none relative invisible z-20 h-36 md:visible md:text-8xl md:top-20 md:ml-11 lg:text-9xl lg:top-36 lg:mt-6 xl:top-44 font-bold font-josefinSans text-transparent bg-clip-text bg-gradient-to-r from-kz-purple from-5% via-kz-blue via-25% to-kz-pink to-50% w-fit">
              KZBlogs
            </h1>
            <div>
              <input
                type="text"
                name="Search"
                placeholder="Search your interests here"
                className="absolute text-xs text-left h-12 w-[90vw] rounded-xl p-2 ml-4 top-56 indent-2 md:ml-6 md:mt-3 lg:top-80 lg:mt-6 xl:mt-14 z-10 text-kz-grey bg-kz-purp-2"
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
              className="absolute top-64 mt-2 w-10 h-10 z-0 left-12 md:mt-5 md:h-12 md:w-12 lg:top-80 lg:mt-16 xl:w-16 xl:h-16 xl:mt-24"
            />
          </div>
          <div className="relative flex flex-col w-screen top-44 md:top-60 lg:top-72">
            <h2 className="relative text-left ml-10 text-2xl text-white font-semibold md:text-left md:text-3xl md:ml-20 lg:ml-12">
              Trending Topics
            </h2>
            <div className="w-[93vw]">
              <div className="relative flex flex-wrap left-5 md:flex-row md:ml-9 md:justify-start md:mr-7 lg:ml-0">
                {blogs.map((blog: BlogType) => (
                  <div key={blog.id}>
                    <BlogCard {...blog} />
                  </div>
                ))}
              </div>
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
