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
  published: boolean;
};

export type Like = {
  id: number;
  userId: number;
  postId: number;
  createdAt: string;
};

export type Comment = {
  id: number;
  content: string;
  postId: number;
  userId: number;
  createdAt: string;
};
