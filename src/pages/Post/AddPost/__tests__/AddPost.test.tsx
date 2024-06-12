import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { supabase } from '@/lib/supabase';
import { renderHookWithProviders, renderWithProviders } from '@/tests/utils';
import { useGetCategoriesQuery, usePostNewPostMutation } from '@/services/posts';
import { useAppSelector } from '@/store';
import { selectUser } from '@/store/auth';
import AddPost from '@/pages/Post/AddPost';

jest.setTimeout(300000);
const mockedUsedNavigate = jest.fn(() => {});
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('@/lib/supabase', () => ({
  supabase: {
    ...(jest.requireActual('@/lib/supabase').supabase as any),
    auth: {
      getSession: jest.fn().mockResolvedValue({ data: { session: { user: userFake } } }),
      getUser: jest.fn().mockResolvedValue({ data: { user: userFake } }),
      onAuthStateChange: jest
        .fn()
        .mockReturnValue({ data: { subscription: { unsubscribe: jest.fn() } } }),
    },
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    ilike: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
  },
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
    useGetCategoriesQuery: jest.fn(),
  };
});

jest.mock('@/store', () => ({
  ...jest.requireActual('@/store'),
  useAppSelector: jest.fn(),
}));

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Add Post Page', () => {
  beforeEach(() => {
    (supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: { session: { user: userFake } },
    });
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({ data: { user: userFake } });
    (useAppSelector as jest.Mock).mockImplementation((selector) => {
      if (selector === selectUser) {
        return userFake;
      }
      return null;
    });
    (useGetCategoriesQuery as jest.Mock).mockReturnValue({
      data: categoriesFake,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const user = userEvent.setup();

  describe(' submits the form successfully', () => {
    it('when user field correctly the form', async () => {
      let getByTestIdMaster: any;
      let containerMaster: any;

      await waitFor(() => {
        const { container, getByTestId } = renderWithProviders(<AddPost />);
        getByTestIdMaster = getByTestId;
        containerMaster = container;
      });

      expect(useAppSelector).toHaveBeenCalled();
      expect(useAppSelector).toHaveReturnedWith(userFake);

      expect(useAppSelector).toHaveBeenCalled();
      expect(useAppSelector).toHaveReturnedWith(userFake);

      expect(useGetCategoriesQuery).toHaveBeenCalled();
      expect(useGetCategoriesQuery).toHaveReturnedWith({ data: categoriesFake });

      const { result } = renderHookWithProviders(() => usePostNewPostMutation());

      const [postNewPost, initialResponse] = result.current;
      expect(initialResponse.data).toBeUndefined();
      expect(initialResponse.isLoading).toBe(false);

      // verify if the postView is render well
      expect(getByTestIdMaster('add-post')).toBeInTheDocument();

      // verify if the author is render well
      expect(containerMaster).toHaveTextContent('Post');

      // user bigin to fill the form
      const titleInput = getByTestIdMaster('post-title');
      expect(titleInput).toBeInTheDocument();
      await user.type(titleInput, 'test title');

      const imageInput = getByTestIdMaster('post-image');
      expect(imageInput).toBeInTheDocument();
      await user.type(imageInput, 'test image url');

      const overviewInput = getByTestIdMaster('post-overview');
      expect(overviewInput).toBeInTheDocument();
      await user.type(overviewInput, 'test overview');

      const categoryInput = getByTestIdMaster('post-category');
      expect(categoryInput).toBeInTheDocument();
      await user.click(screen.getByRole('textbox', { name: 'Category' }));
      await user.click(screen.getByRole('option', { name: 'Category 1' }));
      expect(screen.getByRole('textbox', { name: 'Category' })).toHaveValue('Category 1');

      const publishInput = getByTestIdMaster('post-publish');
      expect(publishInput).toBeInTheDocument();
      await user.click(publishInput);

      // fill the content
      const contentInput = getByTestIdMaster('rich-text-editor');
      expect(contentInput).toBeInTheDocument();
      await user.type(contentInput, 'test content');

      // submit the form
      const submitButton = getByTestIdMaster('post-save');
      expect(submitButton).toBeInTheDocument();
      await user.click(submitButton);

      await waitFor(async () => {
        await postNewPost({
          title: 'test title',
          image: 'test image url',
          content: 'test content',
          category: 'Category 1',
          publish: true,
          authorId: userFake.id,
        });
      });

      const loadedResponse = result.current[1];
      expect(loadedResponse.data).not.toBeUndefined();
      expect(loadedResponse.isLoading).toBe(false);
      expect(loadedResponse.isSuccess).toBe(true);

      //assert postNewPost is called with the correct values
      expect(supabase.from).toHaveBeenCalledWith('posts');
      expect(supabase.from('post').insert).toHaveBeenCalledWith([
        {
          title: 'test title',
          image: 'test image url',
          content: 'test content',
          category: 'Category 1',
          published: true,
          authorId: userFake.id,
        },
      ]);
    });
    it('when user field not correctly the form', async () => {
      let getByTestIdMaster: any;
      let containerMaster: any;

      await waitFor(() => {
        const { container, getByTestId } = renderWithProviders(<AddPost />);
        getByTestIdMaster = getByTestId;
        containerMaster = container;
      });

      expect(useAppSelector).toHaveBeenCalled();
      expect(useAppSelector).toHaveReturnedWith(userFake);

      expect(useAppSelector).toHaveBeenCalled();
      expect(useAppSelector).toHaveReturnedWith(userFake);

      expect(useGetCategoriesQuery).toHaveBeenCalled();
      expect(useGetCategoriesQuery).toHaveReturnedWith({ data: categoriesFake });

      const { result } = renderHookWithProviders(() => usePostNewPostMutation());

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, initialResponse] = result.current;
      expect(initialResponse.data).toBeUndefined();
      expect(initialResponse.isLoading).toBe(false);

      // verify if the postView is render well
      expect(getByTestIdMaster('add-post')).toBeInTheDocument();

      // verify if the author is render well
      expect(containerMaster).toHaveTextContent('Post');

      // user bigin to fill the form
      const titleInput = getByTestIdMaster('post-title');
      expect(titleInput).toBeInTheDocument();

      const imageInput = getByTestIdMaster('post-image');
      expect(imageInput).toBeInTheDocument();

      const overviewInput = getByTestIdMaster('post-overview');
      expect(overviewInput).toBeInTheDocument();

      const publishInput = getByTestIdMaster('post-publish');
      expect(publishInput).toBeInTheDocument();
      await user.click(publishInput);

      // fill the content
      const contentInput = getByTestIdMaster('rich-text-editor');
      expect(contentInput).toBeInTheDocument();
      await user.type(contentInput, ' ');

      const submitButton = getByTestIdMaster('post-save');
      expect(submitButton).toBeInTheDocument();
      await user.click(submitButton);

      expect(containerMaster).toHaveTextContent('Title is required');
      expect(containerMaster).toHaveTextContent('Category is required');
    });
  });
});

const userFake = {
  id: '1',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'john@doe.fr',
  email_confirmed_at: '2024-05-12T22:09:32.208122Z',
  phone: '',
  confirmed_at: '2024-05-12T22:09:32.208122Z',
  recovery_sent_at: '2024-05-15T14:26:21.994698Z',
  last_sign_in_at: '2024-05-31T11:30:14.685927Z',
  app_metadata: {
    provider: 'google',
    providers: ['google', 'github'],
  },
  user_metadata: {
    avatar_url: 'https://avatars.githubusercontent.com/u/71154960?v=4',
    email: 'john@doe.fr',
    email_verified: true,
    full_name: 'john doe',
    iss: 'https://api.github.com',
    name: 'john doe',
    phone_verified: false,
    picture:
      'https://lh3.googleusercontent.com/a/ACg8ocKa7uPAT69vOVG6e9mEWLNVMkDKZQ8ZMzX7GUied627apEbMtmV=s96-c',
    preferred_username: 'john-doe',
    provider_id: '71154960',
    sub: '71154960',
    user_name: 'john-doe',
  },
  identities: [
    {
      identity_id: '4d991ea6-d2c9-4a90-8b29-e9b25724eb24',
      id: '100753573952344834909',
      user_id: '1',
      identity_data: {
        avatar_url:
          'https://lh3.googleusercontent.com/a/ACg8ocKa7uPAT69vOVG6e9mEWLNVMkDKZQ8ZMzX7GUied627apEbMtmV=s96-c',
        email: 'john@doe.fr',
        email_verified: true,
        full_name: 'john doe',
        iss: 'https://accounts.google.com',
        name: 'john doe',
        phone_verified: false,
        picture:
          'https://lh3.googleusercontent.com/a/ACg8ocKa7uPAT69vOVG6e9mEWLNVMkDKZQ8ZMzX7GUied627apEbMtmV=s96-c',
        provider_id: '100753573952344834909',
        sub: '100753573952344834909',
      },
      provider: 'google',
      last_sign_in_at: '2024-05-22T21:49:54.444998Z',
      created_at: '2024-05-22T21:49:54.446461Z',
      updated_at: '2024-05-22T21:49:54.446461Z',
      email: 'john@doe.fr',
    },
    {
      identity_id: '5d06b9c4-ac84-4476-aa10-38976d28be0f',
      id: '71154960',
      user_id: '1',
      identity_data: {
        avatar_url: 'https://avatars.githubusercontent.com/u/71154960?v=4',
        email: 'john@doe.fr',
        email_verified: true,
        full_name: 'Anders',
        iss: 'https://api.github.com',
        name: 'Anders',
        phone_verified: false,
        preferred_username: 'john-doe',
        provider_id: '71154960',
        sub: '71154960',
        user_name: 'john-doe',
      },
      provider: 'github',
      last_sign_in_at: '2024-05-12T22:09:32.202374Z',
      created_at: '2024-05-12T22:09:32.202433Z',
      updated_at: '2024-05-31T11:30:14.676039Z',
      email: 'john@doe.fr',
    },
  ],
  created_at: '2024-05-12T22:09:32.193011Z',
  updated_at: '2024-05-31T11:30:14.691612Z',
  is_anonymous: false,
};

const categoriesFake = ['Category 1', 'Category 2'];
