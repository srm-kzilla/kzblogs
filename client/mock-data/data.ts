import { Blog } from "@/types";

const blogData: Blog[] = [
  {
    id: 1,
    name: "Sample Blog 1",
    publishStatus: "trending",
    lastEdited: "Sep 11, 2023",
    author: "John Doe",
    likes: 100,
    content: "This is the content of Sample Blog 1.",
  },
  {
    id: 2,
    name: "Sample Blog 2",
    publishStatus: "trending",
    lastEdited: "Sep 11, 2023",
    author: "Jane Smith",
    likes: 50,
    content: "This is the content of Sample Blog 2.",
  },
  {
    id: 3,
    name: "Sample Blog 3",
    publishStatus: "Published",
    lastEdited: "Sep 11, 2023",
    author: "Alice Johnson",
    likes: 200,
    content: "This is the content of Sample Blog 3.",
  },
];

export default blogData;
