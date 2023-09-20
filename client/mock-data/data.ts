import { Blog } from "@/app/types";

const blogData :Blog[] = [
    {
      id: 1,
      name: "Sample Blog 1",
      publish_status: "draft",
      last_edited:"Sep 11, 2023",
      author: "John Doe",
      likes: 100,
      bookmarked: true,
      content: "This is the content of Sample Blog 1.",
    },
    {
      id: 2,
      name: "Sample Blog 2",
      publish_status: "draft",
      last_edited:"Sep 11, 2023",
      author: "Jane Smith",
      likes: 50,
      bookmarked: false,
      content: "This is the content of Sample Blog 2.",
    },
    {
      id: 3,
      name: "Sample Blog 3",
      publish_status: "Published",
      last_edited:"Sep 11, 2023",
      author: "Alice Johnson",
      likes: 200,
      bookmarked: true,
      content: "This is the content of Sample Blog 3.",
    },
  ];
  
  export default blogData;
  