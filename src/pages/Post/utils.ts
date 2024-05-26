import { Post as PostType, Comment } from '@/types/post';

export const formatPost = (post: any) =>
  ({
    ...post,
    author: {
      name: post.profiles.full_name,
      avatar: post.profiles.avatar_url,
    },
    createdAt: new Date(post.created_at).toISOString(),
    likes: post.likes,
    bookmarks: post.bookmarks,
    comments: post.comments.map(formatComment),
    userLiked: post.likes.some((like: any) => like.author_id === post.author_id),
    userBookmarked: post.bookmarks.some((bookmark: any) => bookmark.author_id === post.author_id),
  }) as PostType;

export const formatComment = (comment: any) =>
  ({
    ...comment,
    author: {
      name: comment.profiles.full_name,
      avatar: comment.profiles.avatar_url,
      id: comment.author_id,
    },
  }) as Comment;
