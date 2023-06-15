import type { NextPage } from "next";
import Navbar from "@/components/Navbar";
import BlogCard from "@/components/BlogCard";
import TrendCard from "@/components/TrendCard";
const LandingPage: NextPage = () => {
  return (
    <div className="font-body">
        <div>
            <Navbar />
        </div>
        <div>
            <h1 className="title">KZBlogs</h1>
            <div>
                <input type="text" name="Search" placeholder="Search your interests here" className="absolute h-[4rem] w-[50rem] left-[23rem] top-[20rem] bg-[#FAFAFA] rounded-3xl text-left indent-11 z-[1] sm:w-[20rem] sm:h-[4rem] sm:left-[2rem]" />
                <div className="absolute right-[30rem] top-[21rem] z-[2] sm:right-[1rem] ">
                    <img src="search.svg" alt="search" />
                </div>
            </div>
            <img src="shapes.svg" alt="moon and shapes" className="z-0 absolute left-[400px] top-[370px] sm:left-[5rem] sm:w-[3rem] sm:top-[23.5rem]" />
        </div>
      <div>
        <img src="smallCircles.svg" alt="small circles" className="absolute w-[8rem] h-[8rem] right-[27rem] top-[7rem] sm:w-[5rem] sm:h-[5rem] sm:right-[12rem] sm:top-[9rem]" />
        <img src="bigCircles.svg" alt="big circles"  className="absolute w-[16rem] h-[16rem] right-[11rem] top-[11rem] sm:w-[10rem] sm:h-[10rem] sm:right-[1rem] sm:top-[10rem]"/>
      </div>
        <div className="flex flex-col">
            <div className="flex flex-col absolute left-[6.5rem] top-[31rem] font-semibold text-3xl p-[10px] text-black sm:left-[2rem]">
                <h2>Explore</h2>
                <div className="flex flex-row flex-wrap ">
                <div>
                    <BlogCard/>
                </div> 
                <div>
                    <BlogCard/>
                </div>
                </div>
            </div>
            <div className=" flex flex-col absolute right-[6.5rem] top-[31rem] font-semibold text-3xl p-[0.5rem] text-black sm:hidden">
                <h2 >Trending Topics</h2>
                <div className="flex flex-col">
                    <div>
                        <TrendCard/>
                    </div>
                    <div>
                        <TrendCard/>
                    </div>
                    <div>
                        <TrendCard/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default LandingPage;