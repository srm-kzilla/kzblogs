import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[86vh]">
        <h2 className="text-7xl md:text-9xl text-kz-highlight-light font-bold mb-4">
          404
        </h2>
        <p className="text-lg text-kz-secondary mb-3">
          Looks like you are lost
        </p>
        <p className="text-xs text-kz-secondary mb-8">
          The page you are looking for is not available
        </p>
        <Button variant="secondary">
          <Link legacyBehavior href="/">
            Go back Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
