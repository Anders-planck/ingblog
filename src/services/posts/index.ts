import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@/lib/supabase';
import { Post } from '@/types/post';
import { formatPost } from '@/pages/Post/utils';

type GetPostsParams = {
  title?: string;
};

type PostNewPostParams = {
  title: string;
  image: string;
  content: string;
  overview: string;
  category: string;
  publish: boolean;
  authorId: string;
};

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['POSTS', 'LIKED_POSTS', 'BOOKMARKED_POSTS'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], GetPostsParams>({
      // @ts-ignore
      queryFn: async ({ title }) => {
        let query = supabase
          .from('posts')
          .select(
            '*, profiles(full_name, avatar_url), likes:likes(*), bookmarks:bookmarks(*), comments:comments(*, profiles(full_name, avatar_url, id))'
          )
          .order('created_at', { ascending: false })
          .eq('published', true);

        // Se title è definito, aggiungi il filtro .ilike()
        if (title) {
          query = query.textSearch('title', title, { type: 'websearch' });
        }

        const { data, error } = await query;

        return { data: data?.map(formatPost) ?? null, error: error ?? null };
      },
      providesTags: ['POSTS'],
    }),

    getPost: builder.query<Post, { postId: string }>({
      // @ts-ignore
      queryFn: async ({ postId }) => {
        const { data, error } = await supabase
          .from('posts')
          .select(
            '*, profiles(full_name, avatar_url), likes:likes(*), bookmarks:bookmarks(*), comments:comments(*, profiles(full_name, avatar_url, id))'
          )
          .eq('id', postId)
          .single();

        if (error) {
          return { error };
        }

        return { data: formatPost(data) };
      },
      providesTags: ['POSTS'],
    }),

    getCategories: builder.query<string[], void>({
      // @ts-ignore
      queryFn: async () => {
        const { data, error } = await supabase
          .schema('public')
          .rpc('get_types', { enum_type: 'category' });

        if (error) {
          return { error };
        }

        return { data };
      },
    }),

    toggleLikePost: builder.mutation<
      void,
      {
        isLiked: boolean;
        postId: string;
        authorId: string;
      }
    >({
      // @ts-ignore
      queryFn: async ({ isLiked, postId, authorId }) => {
        if (isLiked) {
          const { error } = await supabase
            .from('likes')
            .delete()
            .eq('postId', postId)
            .eq('authorId', authorId);

          if (error) {
            return { error };
          }
        } else {
          const { error } = await supabase.from('likes').insert([
            {
              postId,
              authorId,
            },
          ]);

          if (error) {
            return { error };
          }
        }
        return {};
      },
      invalidatesTags: ['POSTS', 'LIKED_POSTS', 'BOOKMARKED_POSTS'],
    }),

    toggleBookmarkPost: builder.mutation<
      void,
      {
        isBookmarked: boolean;
        postId: string;
        authorId: string;
      }
    >({
      // @ts-ignore
      queryFn: async ({ isBookmarked, postId, authorId }) => {
        if (isBookmarked) {
          const { error } = await supabase
            .from('bookmarks')
            .delete()
            .eq('postId', postId)
            .eq('authorId', authorId);

          if (error) {
            return { error };
          }
        } else {
          const { error } = await supabase.from('bookmarks').insert([
            {
              postId,
              authorId,
            },
          ]);

          if (error) {
            return { error };
          }
        }
        return {};
      },
      invalidatesTags: ['POSTS', 'LIKED_POSTS', 'BOOKMARKED_POSTS'],
    }),

    postComment: builder.mutation<
      void,
      {
        postId: string;
        authorId: string;
        content: string;
      }
    >({
      // @ts-ignore
      queryFn: async ({ postId, authorId, content }) => {
        const { error } = await supabase.from('comments').insert([
          {
            postId,
            authorId,
            content,
          },
        ]);

        if (error) {
          return { error };
        }

        return {};
      },
      invalidatesTags: ['POSTS'],
    }),

    postNewPost: builder.mutation<void, PostNewPostParams>({
      // @ts-ignore
      queryFn: async ({ title, image, content, category, publish, authorId, overview }) => {
        const { error } = await supabase.from('posts').insert([
          {
            title,
            image,
            content,
            category,
            published: publish,
            authorId,
            overview,
          },
        ]);

        if (error) {
          return {
            error,
            data: null,
          };
        }

        return {
          error: null,
          data: null,
        };
      },
      invalidatesTags: ['POSTS'],
    }),

    getLikedPostsByUser: builder.query<Post[], { authorId: string }>({
      // @ts-ignore
      queryFn: async ({ authorId }) => {
        const { data, error } = await supabase
          .from('likes')
          .select(
            '*, posts:posts(*, profiles(full_name, avatar_url), likes:likes(*), bookmarks:bookmarks(*), comments:comments(*, profiles(full_name, avatar_url, id)))'
          )
          .eq('authorId', authorId);

        if (error) {
          return { error };
        }

        return { data: data.map((item) => formatPost(item.posts)) };
      },
      providesTags: ['LIKED_POSTS'],
    }),

    getBookmarkedPostsByUser: builder.query<Post[], { authorId: string }>({
      // @ts-ignore
      queryFn: async ({ authorId }) => {
        const { data, error } = await supabase
          .from('bookmarks')
          .select(
            '*, posts:posts(*, profiles(full_name, avatar_url), likes:likes(*), bookmarks:bookmarks(*), comments:comments(*, profiles(full_name, avatar_url, id)))'
          )
          .eq('authorId', authorId);

        if (error) {
          return { error };
        }

        return { data: data.map((item) => formatPost(item.posts)) };
      },
      providesTags: ['BOOKMARKED_POSTS'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetCategoriesQuery,
  useGetLikedPostsByUserQuery,
  useGetBookmarkedPostsByUserQuery,
  useToggleLikePostMutation,
  useToggleBookmarkPostMutation,
  usePostCommentMutation,
  usePostNewPostMutation,
} = postApi;
