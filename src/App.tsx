import '@mantine/core/styles.css';
import { LoadingOverlay, MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { ModalsProvider } from '@mantine/modals';
import { Router } from '@/Router';
import { theme } from '@/theme';
import store, { useAppDispatch, useAppSelector } from '@/store';
import { supabase } from '@/lib/supabase';
import { selectUser, setLoginAttempted, setProfile, setSession, setUser } from '@/store/auth';

const Content = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setSession(session));
      dispatch(setLoginAttempted(false));
    });

    supabase.auth.getUser().then(({ data }) => {
      dispatch(setUser(data.user));
      dispatch(setLoginAttempted(false));
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session));
      dispatch(setLoginAttempted(false));
    });

    return () => {
      data?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      if (!user) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, phone, work, updated_at ')
        .eq('id', user?.id)
        .limit(1);

      if (!ignore) {
        if (error) {
          //@ts-ignore
          setErrorMessage(error.message);
        } else if (data[0]) {
          dispatch(
            setProfile({
              full_name: data[0].full_name,
              phone: data[0].phone,
              work: data[0].work,
              updated_at: data[0].updated_at,
            })
          );
        }
      }
      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [user]);

  if (loading) {
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
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <Content />
        </ModalsProvider>
      </MantineProvider>
    </Provider>
  );
}
