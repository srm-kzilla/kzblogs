"use client";
import React, { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { getAllBlogs } from "@/app/api/helpers/route";

const BookmarkButton = ({ id }: any) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkClick = async () => {
    try {
      await getAllBlogs(); // Call your addBookmark function with the appropriate blogId
      setIsBookmarked(true);
    } catch (error) {
      console.error("Error bookmarking the blog:", error);
    }
  };

  return (
    <button className="flex flex-row gap-1" onClick={handleBookmarkClick}>
      {isBookmarked ? <BookmarkCheck width={14} /> : <Bookmark width={14} />}
    </button>
  );
};

export default BookmarkButton;
