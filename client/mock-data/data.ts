import { Blog } from "@/types";

const blogData :Blog[] = [
    {
      id: 1,
      title: "Why the eras tour is not coming to India?",
      publishStatus: "draft",
      lastEdited:"Sep 11, 2023",
      author: "Taylor Swift",
      likes: 50,
      content: "We are never getting back together.",
    },
    {
      id: 2,
      title: "Why the eras tour is not coming to India?",
      publishStatus: "draft",
      lastEdited:"Sep 11, 2023",
      author: "Taylor Swift",
      likes: 100,
      content: "We are never getting back together.",
    },
    {
      id: 3,
      title: "Why the eras tour is not coming to India?",
      publishStatus: "published",
      lastEdited:"Sep 11, 2023",
      author: "Taylor Swift",
      likes: 150,
      content: "We are never getting back together.",
      // comments: [
      //   {
      //     authorId: "1234",
      //     content: "Great start!",
      //   },
      //   {
      //     authorId: "5678",
      //     content: "Looking forward to more.",
      //   },
      // ],
    },
    {
      id: 4,
      title: "Why the eras tour is not coming to India?",
      publishStatus: "published",
      lastEdited:"Sep 11, 2023",
      author: "Taylor Swift",
      likes: 200,
      content: "We are never getting back together.",
      comments: [
        {
          authorId: "1234",
          content: "Great start!",
        },
        {
          authorId: "5678",
          content: "Looking forward to more.",
        },
      ],
    },
  ];
  
  export default blogData;
  