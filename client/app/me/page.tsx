import BlogCard from "@/components/BlogCard";
import Navbar from "@/components/Navbar";
import { getAllBlogsAdmin, getCurrentUser, getDraftBlogs} from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import Drafts from "@/components/Draft";

export default async function Page() {
  const currentUser = await getCurrentUser();
  const draftBlogs = await getDraftBlogs();
  const blogs=await getAllBlogsAdmin()
  const publishedBlogs=blogs.filter((blog:Blog)=>blog.publish_status===true);
    return (
      <div className="min-h-screen h-full">
        <Navbar />
        <div className="mt-12 flex flex-col items-center gap-12">
          <div className="flex flex-wrap gap-6 items-center">
            <Image
              width={100}
              height={100}
              src={currentUser.image}
              alt="profile pic"
              className="rounded-full w-12 h-12 ml-3"
            />
            <div className="flex flex-col gap-1 lg:gap-3">
              <h1 className="text-kz-secondary text-xl lg:text-3xl">
                {currentUser.name}
              </h1>
              <p className="text-kz-secondary text-xs">
                {currentUser.followers.length} followers{" "}
                {currentUser.following.length} following
              </p>
            </div>
           
          </div>
          <div className="flex flex-col lg:flex-row gap-5">
          <div>
              <h1 className="text-kz-secondary text-3xl ml-5">Published Blogs</h1>
              {publishedBlogs.map((blogs: Blog) => (
                <div key={blogs._id} className="my-6 m-3 w-[80vw] lg:w-[40vw]">
              
              <BlogCard {...blogs} user={currentUser} />
               
                
                </div>
              ))}
            </div>
            <div>
              <h1 className="text-kz-secondary text-3xl ml-5">Draft Blogs</h1>
              {draftBlogs.map((blogs: Blog) => (
                <div key={blogs._id} className="my-6 m-3 w-[80vw] lg:w-[40vw]">
                  <Link href={`/write?id=${blogs._id}`}>
                  <Drafts {...blogs}  />
                  </Link>
                
                </div>
              ))}
            </div>
            
           
          </div>
        </div>
      </div>
    );
  } 

