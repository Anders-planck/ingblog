import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@/lib/supabase';
import { Profile } from '@/store/auth';

type GetProfileParams = {
  userId: string;
};

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['PROFILE'],
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, GetProfileParams>({
      // @ts-ignore
      queryFn: async ({ userId }) => {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, phone, work, updated_at ')
          .eq('id', userId)
          .limit(1);

        if (error) {
          return {
            data: null,
          };
        }

        return {
          data: {
            full_name: data[0].full_name,
            phone: data[0].phone,
            work: data[0].work,
            updated_at: data[0].updated_at,
          },
        };
      },
      providesTags: ['PROFILE'],
    }),
    updateProfile: builder.mutation<void, Profile>({
      // @ts-ignore
      queryFn: async (profile) => {
        const { error } = await supabase.from('profiles').upsert(profile);
        if (error) {
          return {
            error: {
              message: error.message,
            },
          };
        }
        return {
          data: null,
        };
      },
      invalidatesTags: ['PROFILE'],
    }),
  }),
});

export const { useLazyGetProfileQuery, useUpdateProfileMutation } = usersApi;
