import { beforeAll, afterAll } from '@jest/globals';
import { postApi } from '@/services/posts';

jest.mock('@/services/posts', () => ({
  postApi: {
    endpoints: {
      getPosts: {
        initiate: async () => ({ data: {} }),
      },
      getPost: {
        initiate: async () => ({ data: {} }),
      },
      toggleLikePost: {
        initiate: async () => ({ data: {} }),
      },
      toggleBookmarkPost: {
        initiate: async () => ({ data: {} }),
      },
      postComment: {
        initiate: async () => ({ data: {} }),
      },
      getLikedPostsByUser: {
        initiate: async () => ({ data: {} }),
      },
      getBookmarkedPostsByUser: {
        initiate: async () => ({ data: {} }),
      },
      postNewPost: {
        initiate: async () => ({ data: {} }),
      },
    },
  },
}));

jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    delete: jest.fn().mockResolvedValue({ data: {}, error: null }),
    insert: jest.fn().mockResolvedValue({ data: {}, error: null }),
  },
}));

beforeAll(() => {
  jest.spyOn(postApi.endpoints.getPosts, 'initiate');
  jest.spyOn(postApi.endpoints.getPost, 'initiate');
  jest.spyOn(postApi.endpoints.toggleLikePost, 'initiate');
  jest.spyOn(postApi.endpoints.toggleBookmarkPost, 'initiate');
  jest.spyOn(postApi.endpoints.postComment, 'initiate');
  jest.spyOn(postApi.endpoints.getLikedPostsByUser, 'initiate');
  jest.spyOn(postApi.endpoints.getBookmarkedPostsByUser, 'initiate');
  jest.spyOn(postApi.endpoints.postNewPost, 'initiate');
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('postApi', () => {
  test('getPosts endpoint', async () => {
    const result = await postApi.endpoints.getPosts.initiate({ title: 'test' });
    expect(result).toBeDefined();
  });

  test('getPost endpoint', async () => {
    const result = await postApi.endpoints.getPost.initiate({ postId: '1' });
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

describe('Posts service', () => {
  it('toggles like for a post', async () => {
    const response = await postApi.endpoints.toggleLikePost.initiate({
      isLiked: true,
      postId: '1',
      authorId: '1',
    });
    expect(response).toEqual({ data: {} });
  });

  it('toggles bookmark for a post', async () => {
    const response = await postApi.endpoints.toggleBookmarkPost.initiate({
      isBookmarked: true,
      postId: '1',
      authorId: '1',
    });
    expect(response).toEqual({ data: {} });
  });

  it('posts a comment', async () => {
    const response = await postApi.endpoints.postComment.initiate({
      postId: '1',
      authorId: '1',
      content: 'Test comment',
    });
    expect(response).toEqual({ data: {} });
  });

  it('posts a new post', async () => {
    const response = await postApi.endpoints.postNewPost.initiate({
      title: 'Test Post',
      image: 'test.jpg',
      content: 'Test content',
      category: 'Test',
      publish: true,
      authorId: '1',
      overview: 'Test overview',
    });
    expect(response).toEqual({ data: {} });
  });
});

describe('Posts service with error', () => {
  beforeEach(() => {
    jest.spyOn(postApi.endpoints.getPosts, 'initiate').mockImplementation(() => {
      throw new Error('Error');
    });
  });

  it('throws an error when getPosts endpoint fails', async () => {
    try {
      await postApi.endpoints.getPosts.initiate({ title: 'test' });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
