import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import RequireAuth from '@/RequireAuth';
import Authenticator from '@/pages/Auth';
import RootLayout from '@/Layout';
import Account from '@/pages/Account';
import AddPost from '@/pages/Post/AddPost';
import PostView from '@/pages/Post/PostView';
import { ACCOUNT_ROUTE, ADD_POST_ROUTE, AUTH_ROUTE, HOME_ROUTE, POST_ROUTE } from '@/routes';

export const router = createBrowserRouter([
  {
    path: AUTH_ROUTE,
    element: <Authenticator />,
  },
  {
    element: <RequireAuth />,
    children: [
      {
        path: HOME_ROUTE,
        element: <RootLayout />,
        children: [
          {
            path: '',
            element: <HomePage />,
          },
          {
            path: `${ACCOUNT_ROUTE}`,
            element: <Account />,
          },
          {
            path: ADD_POST_ROUTE,
            element: <AddPost />,
          },
          {
            path: `${POST_ROUTE}/:id`,
            element: <PostView />,
          },
        ],
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
