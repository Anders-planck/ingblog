export type Post = {
  id: number;
  title: string;
  content?: string;
  image?: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  likes?: Like[];
  comments?: Comment[];
  bookmarks?: Bookmark[];
  published: boolean;
};

export type Like = {
  id?: number;
  authorId: number;
  postId: number;
  createdAt?: string;
};

export type Bookmark = {
  id: number;
  authorId: number;
  postId: number;
  createdAt: string;
};

export type Comment = {
  id: number;
  content: string;
  postId: number;
  author: {
    name: string;
    avatar: string;
    id: number;
  };
  createdAt: string;
};
