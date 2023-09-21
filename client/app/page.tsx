import DraftCard from "@/components/DraftCard";
import blogData from "@/mock-data/data";

export default function Home() {
  return (
    <div className="w-[15vw] m-6">
      <DraftCard blogs={blogData} />
    </div>
  );
}
