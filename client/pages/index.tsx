import type { NextPage } from "next";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import BlogCard from "@/components/BlogCard";
import TrendCard from "@/components/TrendCard";

const LandingPage: NextPage = () => {
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    axios.get("./data/blogSampleData.json").then((res) => setBlog(res.data));
  }, []);

  const [trend, setTrend] = useState([]);
  useEffect(() => {
    axios.get("./data/trendSampleData.json").then((res) => setTrend(res.data));
  }, []);

  return (
    <div>
      <header>
        <meta name="description" content="blog by kzilla" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>KZBlogs</title>
      </header>
      <div>
        <div>
          <Navbar />
        </div>
        <div>
          <h1 className="absolute font-bold text-[10vw] h-64 w-2/4 from-kz-blue via-kz-green to-kz-orange bg-gradient-to-r bg-clip-text text-transparent">
            KZBlogs
          </h1>
          <div>
            <input
              type="text"
              name="Search"
              placeholder="Search your interests here"
              className="absolute m-2 h-16 w-1/2 left-1/4 top-80 lg:text-lg bg-kz-grey rounded-3xl text-left indent-11 z-10 sm:text-xs sm:indent-5"
            />
            <div className="absolute m-1 mr-8 right-1/4 top-80 mt-6 z-10 sm:top-88 sm:mr-3 sm:mt-3">
              <img src="search.svg" alt="search" className="sm:w-5 " />
            </div>
          </div>
          <img
            src="shapes.svg"
            alt="moon and shapes"
            className="absolute z-0 left-1/3 top-72 mt-20 -ml-11 p-3 sm:w-16 sm:left-48 sm:pt-4 "
          />
        </div>
        <div>
          <img
            src="smallCircles.svg"
            alt="small circles"
            className="absolute w-1/6 h-1/6 right-1/3 mr-3 top-32 sm:top-32 sm:left-1/3 sm:ml-11 "
          />
          <img
            src="bigCircles.svg"
            alt="big circles"
            className="absolute w-2/6 h-2/6 left-2/4 ml-32 mt-3 top-32 md:left-1/3 md:top-40"
          />
        </div>
        <div className="relative w-full top-96 flex flex-row justify-around sm:flex-col ">
          <div className="relative">
            <h2 className="relative left-20 font-semibold text-3xl p-1 text-black">
              Explore
            </h2>
            <div className="flex flex-row flex-wrap ml-11 m-5">
              {blog.map((blog: any) => {
                return (
                  <div id={blog.id}>
                    <BlogCard blogArr={blog} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative right-20 ">
            <h2 className="relative font-semibold text-right text-3xl p-1 text-black sm:text-center sm:left-11">
              Trending Topics
            </h2>
            <div className="flex flex-col flex-wrap m-3 relative left-20 sm:left-32">
              <div>
                {trend.map((trend: any) => {
                  return (
                    <div id={trend.id}>
                      <TrendCard trendArr={trend} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
