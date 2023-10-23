type Comments = {
  userId: string;
  content: string;
};

type Blog = {
  _id: string;
  name: string;
  publishStatus: "draft" | "published";
  lastEdited: string;
  author: string;
  likes: string[];
  comments?: Comments[];
  content: string;
  trending: boolean;
  bookmarked: boolean;
};

type User = {
  id: number;
  name: string;
  username: string;
  avatar: string;
  bookmarks: Blog[];
  googleId: string;
  isAdmin: boolean;
};

type Challenge = {
  id: number;
  name: string;
  ongoingStatus: boolean;
  endingDate: string;
  description: string;
};
