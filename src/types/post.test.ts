import { expectType, expectError } from 'tsd';
import { Post, Like, Bookmark, Comment } from './post';

test('Post type', () => {
  // Test Post type
  const validPost: Post = {
    id: '1',
    title: 'Title',
    overview: 'Overview',
    createdAt: new Date().toISOString(),
    category: 'Category',
    author: {
      name: 'John Doe',
      avatar: 'https://avatars.dicebear.com/api/avataaars/john-doe.svg',
    },
    published: true,
  };

  expectType<Post>(validPost);

  const invalidPost = {
    id: 1, // should be string
    title: 'Title',
    createdAt: new Date().toISOString(),
    category: 'Category',
    author: {
      name: 'John Doe',
      avatar: 'https://avatars.dicebear.com/api/avataaars/john-doe.svg',
    },
    published: true,
  };

  // @ts-expect-error
  expectError<Post>(invalidPost);

  // Test Like type
  const validLike: Like = {
    authorId: '1',
    postId: '1',
  };

  expectType<Like>(validLike);

  const invalidLike = {
    authorId: '1', // should be number
    postId: 1,
  };

  // @ts-expect-error
  expectError<Like>(invalidLike);

  // Test Bookmark type
  const validBookmark: Bookmark = {
    id: '1',
    authorId: '1',
    postId: '1',
    createdAt: new Date().toISOString(),
  };

  expectType<Bookmark>(validBookmark);

  const invalidBookmark = {
    id: 1,
    authorId: '1',
    postId: '1',
    createdAt: new Date().toISOString(),
  };

  // @ts-expect-error
  expectError<Bookmark>(invalidBookmark);

  // Test Comment type
  const validComment: Comment = {
    id: '1',
    content: 'Content',
    postId: '1',
    author: {
      name: 'John Doe',
      avatar: 'https://avatars.dicebear.com/api/avataaars/john-doe.svg',
      id: '1',
    },
    createdAt: new Date().toISOString(),
  };

  expectType<Comment>(validComment);

  const invalidComment = {
    id: '1',
    content: 'Content',
    postId: '1',
    author: {
      name: 'John Doe',
      avatar: 'https://avatars.dicebear.com/api/avataaars/john-doe.svg',
      id: 1, // should be string
    },
    createdAt: new Date().toISOString(),
  };

  // @ts-expect-error
  expectError<Comment>(invalidComment);
});
