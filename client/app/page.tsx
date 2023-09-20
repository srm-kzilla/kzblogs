import ChallengesCard from "@/app/components/ChallengesCard";
import challengeData from "@/mock-data/data";

export default function Home() {
  return (
    <div className="">
      KZBlogs
      <div>
        <ChallengesCard challenges = {challengeData} />
      </div>
    </div>
  );
}
