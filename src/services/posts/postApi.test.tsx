import { postApi } from '@/services/posts';

describe('postApi', () => {
  test('getPosts endpoint', async () => {
    const result = await postApi.endpoints.getPosts.initiate({ title: 'test' });
    expect(result).toBeDefined();
  });

  test('getPost endpoint', async () => {
    const result = await postApi.endpoints.getPost.initiate({ postId: '1' });
    expect(result).toBeDefined();
  });

  test('getIsLikedToUser endpoint', async () => {
    const result = await postApi.endpoints.getIsLikedToUser.initiate({
      postId: '1',
      authorId: '1',
    });
    expect(result).toBeDefined();
  });

  test('getIsBookmarkedToUser endpoint', async () => {
    const result = await postApi.endpoints.getIsBookmarkedToUser.initiate({
      postId: '1',
      authorId: '1',
    });
    expect(result).toBeDefined();
  });

  test('toggleLikePost endpoint', async () => {
    const result = await postApi.endpoints.toggleLikePost.initiate({
      isLiked: true,
      postId: '1',
      authorId: '1',
    });
    expect(result).toBeDefined();
  });

  test('toggleBookmarkPost endpoint', async () => {
    const result = await postApi.endpoints.toggleBookmarkPost.initiate({
      isBookmarked: true,
      postId: '1',
      authorId: '1',
    });
    expect(result).toBeDefined();
  });

  test('postComment endpoint', async () => {
    const result = await postApi.endpoints.postComment.initiate({
      postId: '1',
      authorId: '1',
      content: 'Test comment',
    });
    expect(result).toBeDefined();
  });

  test('getLikedPostsByUser endpoint', async () => {
    const result = await postApi.endpoints.getLikedPostsByUser.initiate({ authorId: '1' });
    expect(result).toBeDefined();
  });

  test('getBookmarkedPostsByUser endpoint', async () => {
    const result = await postApi.endpoints.getBookmarkedPostsByUser.initiate({ authorId: '1' });
    expect(result).toBeDefined();
  });
});
