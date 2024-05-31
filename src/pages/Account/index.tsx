import {
  rem,
  SimpleGrid,
  Tabs,
  Title,
  useMantineColorScheme,
  useMantineTheme,
  useMatches,
} from '@mantine/core';
import { IconMessageCircle, IconPhoto, IconSettings } from '@tabler/icons-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserInfoIcons } from '@/components/UserInfo';
import UpdateInfoUser from '@/components/Auth/UpdateInfoUser';
import { AUTH_ROUTE, TAB_POSTS_LIKED, TAB_SAVED_POSTS, TAB_SETTINGS } from '@/routes';
import Page from '@/Layout/Page';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectProfile, selectUser, setProfile, setSession, setUser } from '@/store/auth';
import { Post } from '@/components/Post';
import {
  postApi,
  useGetBookmarkedPostsByUserQuery,
  useGetLikedPostsByUserQuery,
} from '@/services/posts';
import { supabase } from '@/lib/supabase';
import { useLazyGetProfileQuery, useUpdateProfileMutation } from '@/services/users';

export default function Account() {
  const padding = useMatches({
    base: 'md',
    md: 'none',
  });

  const iconStyle = { width: rem(12), height: rem(12) };
  const [searchParams, setSearchParams] = useSearchParams();
  const [tabValue, setTabValue] = useState(searchParams.get('tabValue') ?? TAB_SETTINGS);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [work, setWork] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const profile = useAppSelector(selectProfile);
  const theme = useMantineTheme();
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const { data: postsLiked, isLoading: isLoadingLiked } = useGetLikedPostsByUserQuery(
    {
      authorId: user?.id as string,
    },
    {
      skip: !user,
    }
  );

  const { data: savedPosts, isLoading: isLoadingSaved } = useGetBookmarkedPostsByUserQuery(
    {
      authorId: user?.id as string,
    },
    {
      skip: !user,
    }
  );
  const [updateProfile, { isLoading: loading, error }] = useUpdateProfileMutation();
  const [getProfile, { isLoading }] = useLazyGetProfileQuery();

  const items = postsLiked?.map((post) => <Post key={post.id} item={post} />);

  const itemsSaved = savedPosts?.map((post) => <Post key={post.id} item={post} />);

  const spacing = useMatches({
    base: 'xs',
    md: 'sm',
  });

  const cols = useMatches({
    base: 1,
    md: 1,
  });

  const logout = async () => {
    await supabase.auth.signOut();
    dispatch(setUser(null));
    dispatch(setProfile(null));
    dispatch(setSession(null));

    dispatch(postApi.util.resetApiState());
    navigate(AUTH_ROUTE);
  };

  const deleteAccount = async () => {
    await logout();
  };

  const update = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const updated_at = new Date().toISOString();
    const updates = {
      id: user?.id,
      full_name: name,
      phone,
      work,
      updated_at,
    };
    await updateProfile(updates);
    if (error) {
      //@ts-ignore
      setErrorMessage(error.message);
    }
    setSuccessMessage('Profile updated successfully');
    dispatch(
      setProfile({
        full_name: name,
        phone,
        work,
        updated_at,
      })
    );
  };

  useEffect(() => {
    if (searchParams.get('tabValue')) {
      setTabValue(searchParams.get('tabValue') as string);
    }
  }, [searchParams]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      if (!user) {
        return;
      }
      setErrorMessage(null);
      setSuccessMessage(null);

      if (!ignore) {
        const { data } = await getProfile({ userId: user.id });
        if (data) {
          setName(data.full_name);
          setPhone(data.phone);
          setWork(data.work);
          dispatch(setProfile(data));
        }
      }
    })();
    return () => {
      ignore = true;
    };
  }, [user]);

  return (
    <Page title="Account">
      <Tabs
        value={tabValue}
        orientation="horizontal"
        variant="default"
        defaultValue="settings"
        onChange={(value) => {
          if (!value) setTabValue(TAB_SETTINGS);
          if (value === tabValue) return;
          if (value) {
            setSearchParams({ tabValue: value });
            setTabValue(value);
          }
        }}
      >
        <Tabs.List grow mt="md">
          <Tabs.Tab value={TAB_SETTINGS} leftSection={<IconSettings style={iconStyle} />}>
            Settings
          </Tabs.Tab>
          <Tabs.Tab value={TAB_POSTS_LIKED} leftSection={<IconPhoto style={iconStyle} />}>
            Liked
          </Tabs.Tab>
          <Tabs.Tab value={TAB_SAVED_POSTS} leftSection={<IconMessageCircle style={iconStyle} />}>
            Saved
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={TAB_POSTS_LIKED}>
          <SimpleGrid cols={cols} spacing={spacing} mt="lg">
            {isLoadingLiked ? (
              Array.from({ length: 5 }).map((_, index) => <Post key={index} skeleton />)
            ) : items && items?.length > 0 ? (
              items
            ) : (
              <Title order={5} mt="lg" style={{ textAlign: 'center' }}>
                No Likes posts yet
              </Title>
            )}
          </SimpleGrid>
        </Tabs.Panel>

        <Tabs.Panel value={TAB_SAVED_POSTS}>
          <SimpleGrid cols={cols} spacing={spacing} mt="lg">
            {isLoadingSaved ? (
              Array.from({ length: 5 }).map((_, index) => <Post key={index} skeleton />)
            ) : itemsSaved && itemsSaved?.length > 0 ? (
              itemsSaved
            ) : (
              <Title order={5} mt="lg" style={{ textAlign: 'center' }}>
                No Saved posts yet
              </Title>
            )}
          </SimpleGrid>
        </Tabs.Panel>

        <Tabs.Panel value={TAB_SETTINGS}>
          <SimpleGrid cols={1} spacing="xl" p={padding}>
            <UserInfoIcons user={user} profile={profile} />
            <UpdateInfoUser
              user={user}
              logout={logout}
              deleteAccount={deleteAccount}
              settingAppProps={{
                colorScheme,
                setColorScheme,
                theme,
              }}
              updateNameProps={{
                name: profile?.full_name,
                phone: profile?.phone,
                work: profile?.work,
                setName,
                setPhone,
                setWork,
                update,
                loading,
                isLoading,
                errorMessage,
                successMessage,
                setErrorMessage,
                setSuccessMessage,
              }}
            />
          </SimpleGrid>
        </Tabs.Panel>
      </Tabs>
    </Page>
  );
}
