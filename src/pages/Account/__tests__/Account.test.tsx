import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useLocation, useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { renderWithProviders } from '@/tests/utils';
import { useGetBookmarkedPostsByUserQuery, useGetLikedPostsByUserQuery } from '@/services/posts';
import { useAppSelector } from '@/store';
import { selectUser } from '@/store/auth';
import Account from '@/pages/Account';
import { useLazyGetProfileQuery, useUpdateProfileMutation } from '@/services/users';

jest.setTimeout(300000);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
  useSearchParams: jest.fn(),
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
  useUpdateProfileMutation: jest.fn(),
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
    postApi: {
      ...original.postApi,
    },
    useGetBookmarkedPostsByUserQuery: jest.fn(),
    useGetLikedPostsByUserQuery: jest.fn(),
  };
});

jest.mock('@/store', () => ({
  ...jest.requireActual('@/store'),
  useAppSelector: jest.fn(),
}));

beforeAll(() => {
  (useGetLikedPostsByUserQuery as jest.Mock).mockReturnValue({
    data: postsFake.filter((post) => post.likes.length > 0),
    isLoading: false,
  });
  (useGetBookmarkedPostsByUserQuery as jest.Mock).mockReturnValue({
    data: postsFake.filter((post) => post.bookmarks.length > 0),
    isLoading: false,
  });
  (useAppSelector as jest.Mock).mockImplementation((selector) => {
    if (selector === selectUser) {
      return userFake;
    }
    return null;
  });
  (supabase.auth.getSession as jest.Mock).mockResolvedValue({
    data: { session: { user: userFake } },
  });
  (supabase.auth.getUser as jest.Mock).mockResolvedValue({ data: { user: userFake } });
  (useLazyGetProfileQuery as jest.Mock).mockReturnValue([
    async () => ({
      data: userFake,
    }),
    {
      data: userFake,
      isLoading: false,
    },
  ]);
  (useUpdateProfileMutation as jest.Mock).mockReturnValue([
    async () => ({
      data: userFake,
    }),
    {
      data: userFake,
      isLoading: false,
    },
  ]);
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Account Page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    (useLocation as jest.Mock).mockReturnValue({
      pathname: '/account/settings',
    });
  });

  const user = userEvent.setup();

  describe('Check if tabs get all fields', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render tabs', async () => {
      let containerMaster: any;
      const updateProfile = jest.fn();
      (useUpdateProfileMutation as jest.Mock).mockReturnValue([
        updateProfile,
        { isLoading: false },
      ]);

      const searchParams = new URLSearchParams();
      searchParams.set('tabValue', 'settings');
      (useSearchParams as jest.Mock).mockReturnValue([searchParams]);

      await waitFor(() => {
        const { container } = renderWithProviders(<Account />);
        containerMaster = container;
      });
      expect(containerMaster).toMatchSnapshot();
      expect(containerMaster).toHaveTextContent('Liked');
      expect(containerMaster).toHaveTextContent('Saved');
      expect(containerMaster).toHaveTextContent('Settings');
    });

    it('should switch tabs when clicked', async () => {
      let containerMaster: any;
      const updateProfile = jest.fn();
      (useUpdateProfileMutation as jest.Mock).mockReturnValue([
        updateProfile,
        { isLoading: false },
      ]);

      const searchParams = new URLSearchParams();
      searchParams.set('tabValue', 'settings');
      (useSearchParams as jest.Mock).mockReturnValue([searchParams]);

      await waitFor(() => {
        const { container } = renderWithProviders(<Account />);
        containerMaster = container;
      });

      await user.click(containerMaster.querySelector('[aria-label="Liked"]'));
      expect(containerMaster).toMatchSnapshot();
      await user.click(containerMaster.querySelector('[aria-label="Saved"]'));
      expect(containerMaster).toMatchSnapshot();
      await user.click(containerMaster.querySelector('[aria-label="Settings"]'));
      expect(containerMaster).toMatchSnapshot();
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

const postsFake = [
  {
    id: '1',
    title: 'Interview with Anders',
    content:
      "<h2><strong>The future of Grafikart</strong></h2><p>The creation of Grafikart is a bit special, because I created it when I was a DUT student, to explain what I'd learned to my fellow students in a simpler way. At the time, the tutorials were related to graphics and design, so they tended to focus on Photoshop, Illustrator and After Effects. To avoid systematically repeating myself, I had created this channel on which I published videos to explain things just once, so that as many people as possible could use them. Eventually, I got into the swing of things and kept doing it, and it became a habit, with the channel growing over time.</p><p>As for the future of Grafikart, it's not necessarily obvious to me because it's always been something I've managed on a day-to-day basis. It's not necessarily a project for which I have any particular ambition or for which I've planned a certain evolution, a certain future. I see it in 10 years' time as it is today, continuing to produce content and, if possible, allocating myself a little more time to try and produce more polished content, always striving to help as many people as possible.</p><p>One of the avenues of development I had envisaged in the past was the translation of certain videos into English, but I've put that project on hold. Firstly, because it would require a lot more work than I'm doing now (I'm already having trouble finding time for French content...). The other concern is that I feel that in English, we already have a lot of resources, and the added value of my channel doesn't seem very relevant to me. Especially since, for the technologies I deal with, there's already quite a lot of content in English <strong>(Laracast, SymfonyCast, FrontEndMaster...)</strong>. And my added value, in my opinion, is French. On the other hand, I'm looking at artificial intelligence and new technologies to see if there are areas in which I can offer automatic translation for those who are interested.</p><h2>My background</h2><p>My educational path was a bit erratic at first. I started with a scientific baccalaureate because at the time I was good at maths <strong><em>(at the time my choice was limited to S, L and ES).</em></strong></p><p>Then I went to a preparatory school (Math Sup), which I successfully failed. And at the end of that year, they advised me to go for an equivalence and I ended up in a licence 2 in mathematics where I failed in the same way (because in fact I wasn't necessarily that good at maths). During that year, I also took the opportunity to give lessons and build up some income so that I could then choose the course I wanted to take. At the time, I wanted to work in 3D and animation, a field where training was very expensive.</p>",
    published: true,
    authorId: '1',
    category: 'Actuality',
    created_at: '2024-05-26T13:08:23.708004+02:00',
    image: '',
    overview:
      'I was recently contacted by believemy as part of its "portrait" format. Many thanks to Louis-Nicolas Leuillet, who came to Montpellier for the occasion. An interview that allows me to go back over my Grafikart philosophy and talk about my freelance activity.',
    profiles: {
      full_name: 'Anders 🤯',
      avatar_url: 'https://avatars.githubusercontent.com/u/71154960?v=4',
    },
    likes: [
      {
        id: '66eff7e4-eadd-4475-bc9b-5549c53a6244',
        postId: '1',
        authorId: '1',
        createdAt: '2024-05-26T13:22:55.55249+02:00',
      },
    ],
    bookmarks: [],
    comments: [
      {
        id: 'a961db00-495a-4841-8fd6-b455253bdc06',
        postId: '1',
        content: 'i think that is great ',
        authorId: '1',
        profiles: {
          id: '1',
          full_name: 'Anders 🤯',
          avatar_url: 'https://avatars.githubusercontent.com/u/71154960?v=4',
        },
        createdAt: '2024-05-26T13:16:48.075148+02:00',
        author: {
          name: 'Anders 🤯',
          avatar: 'https://avatars.githubusercontent.com/u/71154960?v=4',
        },
      },
    ],
    author: {
      name: 'Anders 🤯',
      avatar: 'https://avatars.githubusercontent.com/u/71154960?v=4',
    },
    createdAt: '2024-05-26T11:08:23.708Z',
    userLiked: true,
    userBookmarked: false,
  },
  {
    id: '2',
    title: 'secondo post',
    content:
      "<h2><strong>The future of Grafikart</strong></h2><p>The creation of Grafikart is a bit special, because I created it when I was a DUT student, to explain what I'd learned to my fellow students in a simpler way. At the time, the tutorials were related to graphics and design, so they tended to focus on Photoshop, Illustrator and After Effects. To avoid systematically repeating myself, I had created this channel on which I published videos to explain things just once, so that as many people as possible could use them. Eventually, I got into the swing of things and kept doing it, and it became a habit, with the channel growing over time.</p><p>As for the future of Grafikart, it's not necessarily obvious to me because it's always been something I've managed on a day-to-day basis. It's not necessarily a project for which I have any particular ambition or for which I've planned a certain evolution, a certain future. I see it in 10 years' time as it is today, continuing to produce content and, if possible, allocating myself a little more time to try and produce more polished content, always striving to help as many people as possible.</p><p>One of the avenues of development I had envisaged in the past was the translation of certain videos into English, but I've put that project on hold. Firstly, because it would require a lot more work than I'm doing now (I'm already having trouble finding time for French content...). The other concern is that I feel that in English, we already have a lot of resources, and the added value of my channel doesn't seem very relevant to me. Especially since, for the technologies I deal with, there's already quite a lot of content in English <strong>(Laracast, SymfonyCast, FrontEndMaster...)</strong>. And my added value, in my opinion, is French. On the other hand, I'm looking at artificial intelligence and new technologies to see if there are areas in which I can offer automatic translation for those who are interested.</p><h2>My background</h2><p>My educational path was a bit erratic at first. I started with a scientific baccalaureate because at the time I was good at maths <strong><em>(at the time my choice was limited to S, L and ES).</em></strong></p><p>Then I went to a preparatory school (Math Sup), which I successfully failed. And at the end of that year, they advised me to go for an equivalence and I ended up in a licence 2 in mathematics where I failed in the same way (because in fact I wasn't necessarily that good at maths). During that year, I also took the opportunity to give lessons and build up some income so that I could then choose the course I wanted to take. At the time, I wanted to work in 3D and animation, a field where training was very expensive.</p>",
    published: true,
    authorId: '1',
    category: 'Actuality',
    created_at: '2024-05-26T13:08:23.708004+02:00',
    image: '',
    overview:
      'I was recently contacted by believemy as part of its "portrait" format. Many thanks to Louis-Nicolas Leuillet, who came to Montpellier for the occasion. An interview that allows me to go back over my Grafikart philosophy and talk about my freelance activity.',
    profiles: {
      full_name: 'Anders 🤯',
      avatar_url: 'https://avatars.githubusercontent.com/u/71154960?v=4',
    },
    likes: [
      {
        id: '66eff7e4-eadd-4475-bc9b-5549c53a6244',
        postId: '2',
        authorId: '1',
        createdAt: '2024-05-26T13:22:55.55249+02:00',
      },
    ],
    bookmarks: [],
    comments: [
      {
        id: 'a961db00-495a-4841-8fd6-b455253bdc06',
        postId: '2',
        content: 'i think that is great ',
        authorId: '1',
        profiles: {
          id: '1',
          full_name: 'Anders 🤯',
          avatar_url: 'https://avatars.githubusercontent.com/u/71154960?v=4',
        },
        createdAt: '2024-05-26T13:16:48.075148+02:00',
        author: {
          name: 'Anders 🤯',
          avatar: 'https://avatars.githubusercontent.com/u/71154960?v=4',
        },
      },
    ],
    author: {
      name: 'Anders 🤯',
      avatar: 'https://avatars.githubusercontent.com/u/71154960?v=4',
    },
    createdAt: '2024-05-26T11:08:23.708Z',
    userLiked: true,
    userBookmarked: false,
  },
];
