import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@/lib/supabase';
import { Post } from '@/types/post';
import { formatPost } from '@/pages/Post/utils';

type GetPostsParams = {
  title?: string;
};

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery(),
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
          .order('created_at', { ascending: false });

        // Se title è definito, aggiungi il filtro .ilike()
        if (title) {
          query = query.ilike('title', `%${title}%`);
        }

        const { data, error } = await query;

        if (error) {
          return { error };
        }

        return { data: data.map(formatPost) };
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

    getIsLikedToUser: builder.query<
      boolean,
      {
        postId: string;
        authorId: string;
      }
    >({
      // @ts-ignore
      queryFn: async ({ postId, authorId }) => {
        const { data, error } = await supabase
          .from('likes')
          .select('id')
          .eq('postId', postId)
          .eq('authorId', authorId);

        if (error) {
          return { error };
        }

        return { data: data.length > 0 };
      },
    }),

    getIsBookmarkedToUser: builder.query<
      boolean,
      {
        postId: string;
        authorId: string;
      }
    >({
      // @ts-ignore
      queryFn: async ({ postId, authorId }) => {
        const { data, error } = await supabase
          .from('bookmarks')
          .select('id')
          .eq('postId', postId)
          .eq('authorId', authorId);

        if (error) {
          return { error };
        }

        return { data: data.length > 0 };
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
  useLazyGetPostsQuery,
  useGetIsLikedToUserQuery,
  useGetIsBookmarkedToUserQuery,
  useGetLikedPostsByUserQuery,
  useGetBookmarkedPostsByUserQuery,
  useToggleLikePostMutation,
  useToggleBookmarkPostMutation,
  usePostCommentMutation,
} = postApi;
