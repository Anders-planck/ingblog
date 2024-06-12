import { waitFor } from '@testing-library/react';
import { HomePage } from '@/pages/Home.page';
import { supabase } from '@/lib/supabase';
import { renderWithProviders } from '@/tests/utils';
import { useLazyGetProfileQuery } from '@/services/users';
import { useGetPostsQuery } from '@/services/posts';

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
    postApi: {
      ...original.postApi,
    },
    useGetPostsQuery: jest.fn(),
  };
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Home Page', () => {
  beforeEach(() => {
    (supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: { session: { user: userFake } },
    });
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({ data: { user: userFake } });
    (useLazyGetProfileQuery as jest.Mock).mockReturnValue([
      async () => ({
        data: profileFake,
      }),
      {
        data: profileFake,
        isLoading: false,
      },
    ]);
    (useGetPostsQuery as jest.Mock).mockReturnValue({
      data: postsFake,
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  //const user = userEvent.setup();

  describe('when a user on the home page he see list of posts', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('renders the home page correctly with post list not empty', async () => {
      let containerMaster: any;
      await waitFor(() => {
        const { container } = renderWithProviders(<HomePage />);
        containerMaster = container;
      });

      for (const post of postsFake) {
        expect(containerMaster).toHaveTextContent(post.title);
      }
    });

    it('renders the home page correctly with post list empty', async () => {
      (useGetPostsQuery as jest.Mock).mockReturnValue({
        data: [],
        isLoading: false,
      });
      let containerMaster: any;
      await waitFor(() => {
        const { container } = renderWithProviders(<HomePage />);
        containerMaster = container;
      });
      //expect(containerMaster).toMatchSnapshot();
      expect(containerMaster).toHaveTextContent('No posts yet');
    });
  });

  describe('when a user on the home page he see list of posts and make a search operations', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('check if modal search is open', async () => {
      let getByTestIdMaster: any;
      await waitFor(() => {
        const { getByTestId } = renderWithProviders(<HomePage />);
        getByTestIdMaster = getByTestId;
      });

      const searchButton = getByTestIdMaster('open-search-modal');
      expect(searchButton).toBeInTheDocument();

      await waitFor(() => {
        if (searchButton) {
          searchButton.click();
          const modalSearch = getByTestIdMaster('search-modal');
          expect(modalSearch).toBeInTheDocument();
          expect(modalSearch).toHaveTextContent('Search');
        }
      });
    });

    /*    describe('ckeck if when user digit title in the search input we have the component work well', () => {
      afterEach(() => {
        jest.clearAllMocks();
      });
      beforeEach(() => {
        (useGetPostsQuery as jest.Mock).mockImplementation((title: string | null | undefined) => ({
          data: title ? postsFake.filter((post) => post.title.includes(title)) : postsFake,
          isLoading: false,
        }));
      });
      it('the title of the post is not in the list of autocomplete not exit', async () => {
        let getByTestIdMaster: any;
        //let containerMaster: any;
        await waitFor(async () => {
          const { getByTestId } = renderWithProviders(<HomePage />);
          getByTestIdMaster = getByTestId;
          //containerMaster = container;
        });

        const searchButton = getByTestIdMaster('open-search-modal');
        expect(searchButton).toBeInTheDocument();

        await waitFor(async () => {
          if (searchButton) {
            searchButton.click();

            const modalSearch = getByTestIdMaster('search-modal');
            expect(modalSearch).toBeInTheDocument();
            expect(modalSearch).toHaveTextContent('Search');

            const searchInput = getByTestIdMaster('search-input');
            expect(searchInput).toBeInTheDocument();
            searchInput.focus();

            await user.type(searchInput, 'test not in the list!');
            expect(searchInput).toHaveValue('test not in the list!');

            // after the user type the title of the post, he press enter to search and close the modal automatically
            await user.type(searchInput, '{enter}');
          }
        });

        /!*await waitFor(() => {
          const modalSearchAfter = getByTestIdMaster('search-modal');
          expect(modalSearchAfter).toBeInTheDocument();
          expect(modalSearchAfter).not.toHaveTextContent('Search');
          expect(containerMaster).toHaveTextContent('No posts yet');
        });*!/
      });
    });*/
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

const profileFake = {
  full_name: 'John Doe',
  phone: '1234567890',
  work: 'Test Work',
  updated_at: '2024-05-31T11:30:14.691612Z',
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
