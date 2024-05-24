export type Post = {
  id: string;
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

export const fakePost: Post = {
  id: '1',
  title: 'Title',
  content: 'Content goes here...',
  createdAt: new Date().toISOString(),
  category: 'Category',
  image: 'https://via.placeholder.com/180',
  author: {
    name: 'John Doe',
    avatar: 'https://avatars.dicebear.com/api/avataaars/john-doe.svg',
  },
  likes: [],
  comments: [],
  bookmarks: [],
  published: true,
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

export const fakeComment: Comment = {
  id: 1,
  content: 'Comment goes here...',
  postId: 1,
  createdAt: new Date().toISOString(),
  author: {
    name: 'John Doe',
    avatar: 'https://avatars.dicebear.com/api/avataaars/john-doe.svg',
    id: 1,
  },
};
