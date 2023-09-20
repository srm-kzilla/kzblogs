export interface Comments {
  author_id: string;
  content: string;
}

export interface Blog {
  id: number;
  name: string;
  publishStatus: string;
  lastEdited: string;
  author: string;
  likes: number;
  comments?: Comments[];
  bookmarked?: boolean;
  content: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
  bookmarks: Blog[];
  googleId: string;
  isAdmin: boolean;
}
