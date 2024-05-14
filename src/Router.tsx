import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import RequireAuth from '@/RequireAuth';
import Authenticator from '@/pages/Auth';
import RootLayout from '@/Layout';
import Account from '@/pages/Account';
import AddPost from '@/pages/Post/AddPost';
import PostView from '@/pages/Post/PostView';

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Authenticator />,
  },
  {
    element: <RequireAuth />,
    children: [
      {
        path: '/',
        element: <RootLayout />,
        children: [
          {
            path: '',
            element: <HomePage />,
          },
          {
            path: '/account',
            element: <Account />,
          },
          {
            path: '/add-post',
            element: <AddPost />,
          },
          {
            path: '/post/:id',
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
