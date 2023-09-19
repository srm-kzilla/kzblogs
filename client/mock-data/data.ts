import { Blog } from "@/app/types";

const blogData :Blog[] = [
    {
      id: 1,
      title: "Why the eras tour is not coming to India?",
      publish_status: "draft",
      last_edited:"Sep 11, 2023",
      author: "Taylor Swift",
      likes: 50,
      content: "We are never getting back together.",
    },
    {
      id: 2,
      title: "Why the eras tour is not coming to India?",
      publish_status: "draft",
      last_edited:"Sep 11, 2023",
      author: "Taylor Swift",
      likes: 100,
      content: "We are never getting back together.",
    },
    {
      id: 3,
      title: "Why the eras tour is not coming to India?",
      publish_status: "published",
      last_edited:"Sep 11, 2023",
      author: "Taylor Swift",
      likes: 150,
      content: "We are never getting back together.",
      comments: [
        {
          author_id: "1234",
          content: "Great start!",
        },
        {
          author_id: "5678",
          content: "Looking forward to more.",
        },
      ],
    },
    {
      id: 4,
      title: "Why the eras tour is not coming to India?",
      publish_status: "published",
      last_edited:"Sep 11, 2023",
      author: "Taylor Swift",
      likes: 200,
      content: "We are never getting back together.",
      comments: [
        {
          author_id: "1234",
          content: "Great start!",
        },
        {
          author_id: "5678",
          content: "Looking forward to more.",
        },
      ],
    },
  ];
  
  export default blogData;
  