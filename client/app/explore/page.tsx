import AuthorCard from "@/components/AuthorCard";
import ChallengesCard from "@/components/ChallengesCard";
import Navbar from "@/components/Navbar";
import challengeData from "@/mock-data/ChallengeData";
import Image from "next/image";
const Explore = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center mt-12">
        <div className="text-kz-secondary text-2xl md:text-4xl lg:text-6xl font-serif text-center w-[60vw]">
          <h1>Discover the new article that will blow your mind.</h1>
        </div>
      </div>
      <div className="flex flex-col items-center mt-10 lg:mt-20">
        <div>
          <Image
            width={12}
            height={12}
            src="/search.svg"
            alt="search"
            className="w-5 md:w-8 relative z-10 top-8 lg:top-10 ml-2"
          />
          <input
            type="text"
            name="Search"
            placeholder="What's your mood?"
            className="indent-10 text-xs text-left h-12 w-[65vw] lg:w-[50vw] rounded-xl p-2"
          />
        </div>
      </div>
      <div className="mt-10 flex md:flex-col mb-5 items-center">
        <div className="flex flex-col ml-8 md:flex-row justify-evenly w-[80vw] md:w-[90vw]">
          <div className="md:w-[40vw]">
            <h1 className="text-kz-secondary text-left mb-4 lg:mb-7 text-2xl lg:text-3xl font-serif">
              Trending Writers
            </h1>
            <AuthorCard />
          </div>
          <div className="md:w-[30vw] mt-5 md:mt-12 lg:mt-16">
            <ChallengesCard challenges={challengeData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
