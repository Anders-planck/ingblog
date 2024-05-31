import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Authenticator from '@/pages/Auth';
import { renderWithProviders } from '@/tests/utils';
import { useAppSelector } from '@/store';
import { selectIsAuthenticated } from '@/store/auth';

jest.setTimeout(300000);

const mockNavigate = jest.fn().mockImplementation(() => {});
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('@/lib/supabase', () => ({
  ...jest.requireActual('@/lib/supabase'),
  supabase: {
    ...jest.requireActual('@/lib/supabase').supabase,
    auth: {
      signInWithOAuth: jest.fn().mockResolvedValue({
        error: null,
        data: {},
      }),
      signInWithOtp: jest.fn().mockResolvedValue({
        error: null,
        data: {},
      }),
    },
  },
}));

jest.mock('@/store/listener', () => ({
  listenerMiddleware: {
    ...jest.requireActual('@/store/listener').listenerMiddleware,
  },
}));

jest.mock('@/store', () => ({
  ...jest.requireActual('@/store'),
  useAppSelector: jest.fn(),
}));

afterAll(() => {
  jest.restoreAllMocks();
});

test('renders Authenticator', async () => {
  let containerMaster: any;

  await waitFor(() => {
    const { container } = renderWithProviders(<Authenticator />);
    containerMaster = container;
  });
  expect(containerMaster).toMatchSnapshot();
  expect(containerMaster).toHaveTextContent("Welcome to Isa-blog, Let's get started!");
});

const navigate = jest.fn();
jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

test('navigates to home route if user is authenticated', async () => {
  (useAppSelector as jest.Mock).mockImplementation(
    (selector) => selector === selectIsAuthenticated
  );

  await waitFor(() => {
    renderWithProviders(<Authenticator />);
  });

  expect(navigate).toHaveBeenCalledWith('/');
});

const signInWithOAuth = jest.fn().mockResolvedValue({ error: null, data: {} });
jest
  .spyOn(require('@/lib/supabase').supabase.auth, 'signInWithOAuth')
  .mockImplementation(signInWithOAuth);

const signInWithOtp = jest.fn().mockResolvedValue({ error: null, data: {} });
jest
  .spyOn(require('@/lib/supabase').supabase.auth, 'signInWithOtp')
  .mockImplementation(signInWithOtp);

test('does not navigate to home route if user is not authenticated', async () => {
  (useAppSelector as jest.Mock).mockImplementation(
    (selector) => selector !== selectIsAuthenticated
  );

  await waitFor(() => {
    renderWithProviders(<Authenticator />);
  });

  expect(navigate).not.toHaveBeenCalled();
});

test('check if buttons are on the screen', async () => {
  let containerMaster: any;
  let getByTestIdMaster: any;
  await waitFor(() => {
    const { container, getByTestId } = renderWithProviders(<Authenticator />);
    containerMaster = container;
    getByTestIdMaster = getByTestId;
  });
  expect(containerMaster).toMatchSnapshot();

  const githubButton = getByTestIdMaster('github-button');
  expect(githubButton).toBeInTheDocument();

  await waitFor(() => {
    githubButton.click();
    expect(signInWithOAuth).toHaveBeenCalledWith({ provider: 'github' });
  });

  const googleButton = getByTestIdMaster('google-button');
  expect(googleButton).toBeInTheDocument();

  await waitFor(() => {
    googleButton.click();
    expect(signInWithOAuth).toHaveBeenCalledWith({ provider: 'google' });
  });

  const emailInput = getByTestIdMaster('email-input');
  expect(emailInput).toBeInTheDocument();
  await userEvent.type(emailInput, 'john@doe.com');
  expect(emailInput).toHaveValue('john@doe.com');

  const button = getByTestIdMaster('login-button');
  expect(button).toBeInTheDocument();

  await waitFor(() => {
    button.click();
    expect(signInWithOtp).toHaveBeenCalledWith({ email: 'john@doe.com' });
  });
});
