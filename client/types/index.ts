type Comments = {
  userId: string;
  content: string;
};

type Blog = {
  index: number;
  _id: string;
  name: string;
  publish_status: boolean;
  author: {
    name: string;
    _id: string;
    image: string;
  };
  authName: string;
  likes: string[];
  comments?: Comments[];
  content: string;
  trending: boolean;
  bookmarked: boolean;
};

type User = {
  _id: string;
  name: string;
  email: string;
  image: string;
  bookmarks: string[];
  followers: string[];
  isAdmin: boolean;
};

type Challenge = {
  id: number;
  name: string;
  ongoingStatus: boolean;
  endingDate: string;
  description: string;
};
