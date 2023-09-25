import BlogCard from "@/components/BlogCard";
import Navbar from "@/components/Navbar";
import AuthorCard from "@/components/AuthorCard";
import DraftCard from "@/components/DraftCard";
import ChallengesCard from "@/components/ChallengesCard";
import blogData from "@/mock-data/data";
import TrendingCard from "@/components/TrendingCard";
import challengeData from "@/mock-data/ChallengeData";
import Footer from "@/components/Footer";

export default function Home() {
  const publishedBlogs = blogData.filter(
    (blog) => blog.publishStatus === "published"
  );
  return (
    <div>
      <Navbar />
      <h1>KZBlogs</h1>
      <div>
        {publishedBlogs.map((blogs: Blog) => (
          <div key={blogs.id} className="w-[40vw] m-3">
            <BlogCard {...blogs} />
          </div>
        ))}
      </div>
      {blogData.map((blogs: Blog) => (
        <div key={blogs.id} className="w-1/4 m-3">
          <AuthorCard {...blogs} />
        </div>
      ))}
      <div className="w-[15vw] m-6">
        <DraftCard blogs={blogData} />
      </div>
      <div className="w-[15vw] m-6">
        <TrendingCard blogs={blogData} />
      </div>
      <div className="w-[15vw] m-6">
        <ChallengesCard challenges={challengeData}/>
      </div>
      <div className="w-[15vw] m-6">
        <ChallengesCard challenges={challengeData} />
      </div>
      <div className="w-full">
        <Footer/>
       </div>
    </div>
  );
}