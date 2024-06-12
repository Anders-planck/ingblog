import { formatPost, formatComment } from '@/pages/Post/utils';

describe('Post utils', () => {
  it('should format post correctly', () => {
    const mockPost = {
      profiles: {
        full_name: 'John Doe',
        avatar_url: 'avatar.jpg',
      },
      created_at: '2022-01-01T00:00:00.000Z',
      likes: [],
      bookmarks: [],
      comments: [],
      author_id: '1',
    };

    const expectedPost = {
      ...mockPost,
      author: {
        name: 'John Doe',
        avatar: 'avatar.jpg',
      },
      createdAt: new Date('2022-01-01T00:00:00.000Z').toISOString(),
      userLiked: false,
      userBookmarked: false,
    };

    expect(formatPost(mockPost)).toEqual(expectedPost);
  });

  it('should format comment correctly', () => {
    const mockComment = {
      profiles: {
        full_name: 'John Doe',
        avatar_url: 'avatar.jpg',
      },
      author_id: '1',
    };

    const expectedComment = {
      ...mockComment,
      author: {
        name: 'John Doe',
        avatar: 'avatar.jpg',
        id: '1',
      },
    };

    expect(formatComment(mockComment)).toEqual(expectedComment);
  });
});
