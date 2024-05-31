import { waitFor } from '@testing-library/react';
import App from '@/App';
import { supabase } from '@/lib/supabase';
import { renderWithProviders } from '@/tests/utils';
import { useLazyGetProfileQuery } from '@/services/users';

jest.mock('@/lib/supabase', () => ({
  supabase: {
    ...(jest.requireActual('@/lib/supabase').supabase as any),
    auth: {
      getSession: jest.fn().mockResolvedValue({ data: { session: { user: null } } }),
      getUser: jest.fn().mockResolvedValue({ data: { user: null } }),
      onAuthStateChange: jest
        .fn()
        .mockReturnValue({ data: { subscription: { unsubscribe: jest.fn() } } }),
    },
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
  },
}));

jest.mock('@/services/users', () => ({
  ...jest.requireActual('@/services/users'),
  userApi: {
    ...jest.requireActual('@/services/users').usersApi,
    endpoints: (builder: any) => ({
      ...jest.requireActual('@/services/users').usersApi.endpoints(builder),
      getProfile: builder.query({
        queryFn: jest.fn(),
        providesTags: ['PROFILE'],
      }),
    }),
    middleware: jest.requireActual('@/services/users').usersApi.middleware,
  },
  useLazyGetProfileQuery: jest.fn(),
}));

jest.mock('@/store/listener', () => ({
  listenerMiddleware: {
    ...jest.requireActual('@/store/listener').listenerMiddleware,
  },
}));

jest.mock('@/services/posts', () => {
  const original = jest.requireActual('@/services/posts');
  return {
    ...original,
    useGetPostsQuery: jest.fn(() => ({
      data: null,
      isLoading: false,
    })),
  };
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('App', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when no user is logged in', () => {
    beforeEach(() => {
      (supabase.auth.getSession as jest.Mock).mockResolvedValue({
        data: { session: { user: null } },
      });
      (supabase.auth.getUser as jest.Mock).mockResolvedValue({ data: { user: null } });
      (useLazyGetProfileQuery as jest.Mock).mockReturnValue([
        async () => ({
          data: null,
        }),
        {
          data: null,
          isLoading: false,
        },
      ]);
    });

    it('renders the main page correctly', async () => {
      await waitFor(() => {
        renderWithProviders(<App />);
        expect(useLazyGetProfileQuery).toHaveBeenCalled();
        expect(supabase.auth.getSession).toHaveBeenCalled();
        expect(supabase.auth.getUser).toHaveBeenCalled();
        expect(supabase.auth.onAuthStateChange).toHaveBeenCalled();
        expect(useLazyGetProfileQuery).toHaveBeenCalled();
      });
    });
  });
});
