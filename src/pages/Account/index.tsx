import { rem, SimpleGrid, Tabs, Title, useMatches } from '@mantine/core';
import { IconMessageCircle, IconPhoto, IconSettings } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserInfoIcons } from '@/components/UserInfo';
import UpdateInfoUser from '@/components/Auth/UpdateInfoUser';
import { TAB_POSTS_LIKED, TAB_SAVED_POSTS, TAB_SETTINGS } from '@/routes';
import Page from '@/Layout/Page';
import { useAppSelector } from '@/store';
import { selectUser } from '@/store/auth';
import { Post } from '@/components/Post';
import { useGetBookmarkedPostsByUserQuery, useGetLikedPostsByUserQuery } from '@/services/posts';

export default function Account() {
  const padding = useMatches({
    base: 'md',
    md: 'none',
  });
  const iconStyle = { width: rem(12), height: rem(12) };
  const [searchParams, setSearchParams] = useSearchParams();
  const [tabValue, setTabValue] = useState(searchParams.get('tabValue') ?? TAB_SETTINGS);

  const user = useAppSelector(selectUser);

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

  useEffect(() => {
    if (searchParams.get('tabValue')) {
      setTabValue(searchParams.get('tabValue') as string);
    }
  }, [searchParams]);

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
            <UserInfoIcons />
            <UpdateInfoUser />
          </SimpleGrid>
        </Tabs.Panel>
      </Tabs>
    </Page>
  );
}
