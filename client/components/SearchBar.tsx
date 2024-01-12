"use client";
import { getCurrentUser, getSearch } from "@/utils/api";
import { Divide, SearchIcon } from "lucide-react";
import { useState } from "react";
import BlogCard from "./BlogCard";
import AuthorCard from "./AuthorCard";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [authors, setAuthors] = useState<User[]>([]);
  const [user, setUser] = useState<User[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await getSearch(query);
      const user = await getCurrentUser();
      setUser(user);
      setBlogs(response.blogs);
      setAuthors(response.users);
      setSearchPerformed(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 lg:mt-20">
      <div>
        <button className="relative top-3 z-10 left-9" onClick={handleSearch}>
          <SearchIcon className="h-9" />
        </button>
        <input
          onKeyDown={handleKeyPress}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          name="Search"
          placeholder="What's your mood?"
          className="indent-10 text-xs text-left h-12 w-[65vw] lg:w-[50vw] rounded-xl p-2"
        />
      </div>

      {authors.length > 0 && (
        <div className="mt-10 flex md:flex-col mb-5 items-center">
          <div className="flex flex-col ml-8 md:flex-row justify-evenly w-[80vw] md:w-[90vw]">
            <div className="md:w-[40vw]">
              <h1 className="text-kz-secondary text-left mb-4 lg:mb-7 text-2xl lg:text-3xl font-serif">
                Search Results: Writers
              </h1>
              {authors.map((user: User, index: number) => (
                <div key={user._id} className="m-3">
                  <AuthorCard author={user} index={++index} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {blogs.length > 0 && (
        <div className="mt-10 flex md:flex-col mb-5 items-center">
          <div className="flex flex-col ml-8 md:flex-row justify-evenly w-[80vw] md:w-[90vw]">
            <div>
              <h1 className="text-kz-secondary text-left mb-4 lg:mb-7 text-2xl lg:text-3xl font-serif">
                Search Results: Blogs
              </h1>
              <div>
                {blogs.map((blog: Blog) => (
                  <div key={blog._id} className="w-[40vw] mb-3 md:w-[40vw] m-3">
                    <BlogCard {...blog} user={user[0]} visible={false} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {searchPerformed && authors.length === 0 && blogs.length === 0 && (
        <div className="mt-5 text-kz-highlight-light">
          No results found for your search.
        </div>
      )}
    </div>
  );
};

export default SearchBar;
