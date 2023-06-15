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
                <input type="text" name="Search" placeholder="Search your interests here" className="absolute h-[61px] w-[800px] left-[373px] top-[323px] bg-[#FAFAFA] rounded-3xl text-left indent-11 z-[1]" />
                <div className="absolute right-[400px] top-[340px] z-[2]">
                 <img src="search.svg" alt="search" />
                </div>
            </div>
            <img src="shapes.svg" alt="moon and shapes" className="z-0 absolute left-[400px] top-[370px]" />
        </div>
      <div>
        <img src="smallCircles.svg" alt="small circles" className="absolute w-[125px] h-[125px] right-[400px] top-[125px]" />
        <img src="bigCircles.svg" alt="big circles"  className="absolute w-[250px] h-[250px] right-[175px] top-[200px]"/>
      </div>
      <div className="flex flex-row">
        <div className="absolute left-[109px] top-[500px] font-semibold text-3xl p-[10px] text-black">
            <h2>Explore</h2>
            <div className="flex flex-row flex-wrap justify-around">
            <div>
            <BlogCard/>
            </div> 
            <div>
                <BlogCard/>
            </div>
            </div>
        </div>
        <div className="absolute right-[109px] top-[500px] font-semibold text-3xl p-[10px] text-black">
            <h2 >Trending Topics</h2>
            <div className="flex flex-col flex-wrap">
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