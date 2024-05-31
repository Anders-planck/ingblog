import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { LoadingOverlay, MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { Router } from '@/Router';
import { theme } from '@/theme';
import store, { useAppDispatch, useAppSelector } from '@/store';
import { supabase } from '@/lib/supabase';
import {
  selectUser,
  setLoginAttempted,
  selectProfile,
  setSession,
  setProfile,
  setUser,
} from '@/store/auth';
import { useLazyGetProfileQuery } from '@/services/users';

const Content = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const profile = useAppSelector(selectProfile);
  const [getProfile, { isLoading }] = useLazyGetProfileQuery();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setSession(session));
    });

    supabase.auth.getUser().then(({ data }) => {
      dispatch(setUser(data.user));
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session));
      dispatch(setLoginAttempted(true));
    });

    return () => {
      data?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    (async () => {
      if (profile) {
        return;
      }
      if (!user) {
        return;
      }

      if (!ignore) {
        const { data } = await getProfile({ userId: user.id });
        if (data) {
          dispatch(setProfile(data));
        }

        setLoginAttempted(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [user]);

  if (isLoading) {
    return (
      <LoadingOverlay
        visible
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'pink', type: 'dots' }}
      />
    );
  }

  return <Router />;
};

export default function App() {
  return (
    <Provider store={store}>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <ModalsProvider>
          <Notifications />
          <Content />
        </ModalsProvider>
      </MantineProvider>
    </Provider>
  );
}
