import BlogCard from "@/components/BlogCard";
import Navbar from "@/components/Navbar";

export default async function Home() {
  const response = await fetch(`http://127.0.0.1:8000/api/bookmarks`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "X-Session-Id": "53c0b781-cd91-4958-82d3-c1e1eb65971c",
    },
  });
  const data = await response.json();

  return (
    <div>
      <Navbar />
      <div className="flex w-full p-6 mt-8 lg:mt-18 justify-center">
        <div className="md:max-w-2xl">
          <div className="font-serif md:mb-12 text-center text-2xl md:text-4xl lg:text-5xl text-kz-secondary">
            All your <span className="text-kz-highlight-light">favorite</span>{" "}
            articles in one place
          </div>
          {data.map((blogs: Blog) => (
            <div key={blogs._id} className=" my-6 m-3">
              <BlogCard {...blogs} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
