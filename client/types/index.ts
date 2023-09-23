type Comments =  {
  userId: string;
  content: string;
}

type Blog = {
  id: number;
  title: string;
  publishStatus: "draft" | "published";
  lastEdited: string;
  author: string;
  likes: number;
  comments?: Comments[];
  content: string;
}

type User = {
  id: number;
  name: string;
  username: string;
  avatar: string;
  bookmarks: Blog[];
  googleId: string;
  isAdmin: boolean;
}
type Challenge = {
  id: number;
  name: string;
  ongoingStatus: boolean;
  endingDate: string;
  description: string;
}
