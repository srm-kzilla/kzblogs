import ChallengesCard from "@/components/ChallengesCard";
import challengeData from "@/mock-data/ChallengeData";

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
