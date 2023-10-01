"use client";
import React, { useState } from "react";
import axios from "axios";
import { Bookmark, BookmarkCheck } from "lucide-react";

const BookmarkButton = ({ id }: any) => {
  const bodyData = {
    user_id: "651666df0a7ca753949b1832",
  };
  const [isBookmarked, setIsBookmarked] = useState(false);

  async function addBookmark() {
    await axios.get(`http://127.0.0.1:8000/admin/all`, {
      method: "GET",
      headers: {
        "X-Session-Id": "22fde352-d03d-492a-b469-8114f81414d7",
      },
      //   body: JSON.stringify(bodyData),
    });
  }

  return (
    <button className="flex flex-row gap-1" onClick={() => addBookmark()}>
      {isBookmarked ? <BookmarkCheck width={14} /> : <Bookmark width={14} />}
    </button>
  );
};

export default BookmarkButton;
