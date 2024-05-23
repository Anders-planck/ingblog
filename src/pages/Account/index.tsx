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
import { supabase } from '@/lib/supabase';
import { formatPost } from '@/pages/Post/utils';
import { Post as PostType } from '@/types/post';
import { Post } from '@/components/Post';

export default function Account() {
  const padding = useMatches({
    base: 'md',
    md: 'none',
  });
  const iconStyle = { width: rem(12), height: rem(12) };
  const [searchParams, setSearchParams] = useSearchParams();
  const [tabValue, setTabValue] = useState(searchParams.get('tabValue') ?? TAB_SETTINGS);
  const [loading, setLoading] = useState(true);

  const [postsLiked, setpostsLiked] = useState<PostType[]>([]);
  const [savedPosts, setSavedPosts] = useState<PostType[]>([]);

  const user = useAppSelector(selectUser);

  const fetchPosts = async () => {
    if (!user) return;

    setLoading(true);
    // liked posts from user
    const { data, error } = await supabase
      .from('likes')
      .select(
        '*, posts:posts(*, profiles(full_name, avatar_url), likes:likes(*), bookmarks:bookmarks(*), comments:comments(*, profiles(full_name, avatar_url, id)))'
      )
      .eq('authorId', user.id);

    const { data: savedData, error: savedError } = await supabase
      .from('bookmarks')
      .select(
        '*, posts:posts(*, profiles(full_name, avatar_url), likes:likes(*), bookmarks:bookmarks(*), comments:comments(*, profiles(full_name, avatar_url, id)))'
      )
      .eq('authorId', user.id);

    if (error || savedError) {
      console.error(error || savedError);
    }

    if (data) {
      setpostsLiked(data.map((item) => formatPost(item.posts)));
    }

    if (savedData) {
      setSavedPosts(savedData.map((item) => formatPost(item.posts)));
    }

    setLoading(false);
  };

  const updateSinglePostsLiked = (post: PostType) => {
    // remove post from liked
    setpostsLiked((current) => current.filter((item) => item.id !== post.id));
  };

  const updateSingleSavedPosts = (post: PostType) => {
    // remove post from saved
    setSavedPosts((current) => current.filter((item) => item.id !== post.id));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const items = postsLiked.map((post) => (
    <Post key={post.id} item={post} handleUpdateSinglePost={updateSinglePostsLiked} />
  ));

  const itemsSaved = savedPosts.map((post) => (
    <Post key={post.id} item={post} handleUpdateSinglePost={updateSingleSavedPosts} />
  ));

  const spacing = useMatches({
    base: 'xs',
    md: 'sm',
  });

  const cols = useMatches({
    base: 1,
    md: 2,
  });
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
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => <Post key={index} skeleton />)
            ) : items.length > 0 ? (
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
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => <Post key={index} skeleton />)
            ) : itemsSaved.length > 0 ? (
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
