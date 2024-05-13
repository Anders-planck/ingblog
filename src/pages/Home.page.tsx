import { ActionIcon, Affix, Flex, Group, Loader, SimpleGrid, Stack, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconAdjustmentsOff, IconSearch, IconTextPlus } from '@tabler/icons-react';
import { Post } from '@/components/Post';
import { supabase } from '@/lib/supabase';
import { Post as PostType } from '@/types/post';
import Page from '@/Layout/Page';
import { useAppDispatch, useAppSelector } from '@/store';
import { openSearchModal, selectSearch, setSearch } from '@/store/app/search';
import SearchModal from '@/components/SearchModal';

export function HomePage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearch);

  const formatPosts = (data: any[]) =>
    data.map((post) => ({
      ...post,
      author: {
        name: post.profiles.full_name,
        avatar: post.profiles.avatar_url,
      },
      createdAt: new Date(post.created_at).toISOString(),
      likes: post.likes,
      comments: post.comments,
    }));

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*, profiles(full_name, avatar_url), likes:likes(*), comments:comments(*)');

    if (error) {
      console.error(error);
    }

    if (data) {
      setPosts(formatPosts(data));
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*, profiles(full_name, avatar_url), likes:likes(*), comments:comments(*)')
      .ilike('title', `%${search}%`);

    if (error) {
      console.error(error);
    }

    if (data) {
      setPosts(formatPosts(data));
    }

    setLoading(false);
  };

  useEffect(() => {
    if (search) {
      handleSearch();
    } else {
      fetchPosts();
    }
  }, [search]);

  const handleOpenSearchModal = () => {
    dispatch(openSearchModal());
  };

  const clearSearch = () => {
    dispatch(setSearch(''));
  };

  const items = posts.map((post) => <Post key={post.id} item={post} />);
  return (
    <Page title="Posts">
      <SimpleGrid cols={1} spacing="md">
        <Group justify="space-between">
          <Title order={1}>Posts</Title>
          <Group visibleFrom="xs" gap={search ? 6 : 4}>
            {search ? (
              <ActionIcon color="blue" radius="md" size={40} onClick={clearSearch}>
                <IconAdjustmentsOff stroke={1.5} size={20} />
              </ActionIcon>
            ) : (
              <ActionIcon color="blue" radius="md" size={40} onClick={handleOpenSearchModal}>
                <IconSearch stroke={1.5} size={20} />
              </ActionIcon>
            )}

            <ActionIcon color="blue" radius="md" size={40}>
              <IconTextPlus stroke={1.5} size={20} />
            </ActionIcon>
          </Group>
        </Group>
        {loading ? (
          <Flex justify="center">
            <Loader size="xl" />
          </Flex>
        ) : items.length > 0 ? (
          items
        ) : (
          <Title order={5} mt="lg" style={{ textAlign: 'center' }}>
            No posts yet
          </Title>
        )}
      </SimpleGrid>
      <Affix position={{ bottom: 40, right: 40 }} hiddenFrom="xs">
        <Stack gap={10}>
          {search ? (
            <ActionIcon color="blue" radius="xl" size={55} onClick={clearSearch}>
              <IconAdjustmentsOff stroke={1.5} size={25} />
            </ActionIcon>
          ) : (
            <ActionIcon color="blue" radius="xl" size={55} onClick={handleOpenSearchModal}>
              <IconSearch stroke={1.5} size={25} />
            </ActionIcon>
          )}
          <ActionIcon color="blue" radius="xl" size={55}>
            <IconTextPlus stroke={1.5} size={25} />
          </ActionIcon>
        </Stack>
      </Affix>
      <SearchModal />
    </Page>
  );
}
