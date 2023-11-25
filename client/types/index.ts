type Comments = {
  userId: string;
  content: string;
};

type Blog = {
  index: number;
  _id: string;
  name: string;
  publish_status: boolean;
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
