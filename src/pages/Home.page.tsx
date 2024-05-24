import { ActionIcon, Affix, Group, SimpleGrid, Stack, Title, useMatches } from '@mantine/core';
import { IconAdjustmentsOff, IconSearch, IconTextPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Post } from '@/components/Post';
import Page from '@/Layout/Page';
import { useAppDispatch, useAppSelector } from '@/store';
import { openSearchModal, selectSearch, setSearch } from '@/store/app/search';
import SearchModal from '@/components/SearchModal';
import { selectUser } from '@/store/auth';
import { ADD_POST_ROUTE } from '@/routes';
import { useGetPostsQuery } from '@/services/posts';

export function HomePage() {
  //const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearch);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const { data, isLoading } = useGetPostsQuery({
    title: search,
  });

  const handleOpenSearchModal = () => {
    dispatch(openSearchModal());
  };

  const clearSearch = () => {
    dispatch(setSearch(''));
  };

  const items = data?.map((post) => <Post key={post.id} skeleton={false} item={post} />);

  const padding = useMatches({
    base: 'xs',
    md: 'none',
  });

  const spacing = useMatches({
    base: 'xs',
    md: 'lg',
  });

  return (
    <Page title="Posts">
      <SimpleGrid cols={1} spacing={spacing} id="posts-list">
        <Group justify="space-between" p={padding}>
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

            {user && (
              <ActionIcon
                color="blue"
                radius="md"
                size={40}
                onClick={() => navigate(ADD_POST_ROUTE)}
              >
                <IconTextPlus stroke={1.5} size={20} />
              </ActionIcon>
            )}
          </Group>
        </Group>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => <Post key={index} skeleton />)
        ) : items && items.length > 0 ? (
          items
        ) : (
          <Title order={5} mt="lg" style={{ textAlign: 'center' }}>
            No posts yet
          </Title>
        )}
      </SimpleGrid>
      <Affix position={{ bottom: 20, right: 10 }} hiddenFrom="xs">
        <Stack gap={10}>
          {search ? (
            <ActionIcon color="blue" radius="xl" size={40} onClick={clearSearch}>
              <IconAdjustmentsOff stroke={1.5} size={20} />
            </ActionIcon>
          ) : (
            <ActionIcon color="blue" radius="xl" size={40} onClick={handleOpenSearchModal}>
              <IconSearch stroke={1.5} size={20} />
            </ActionIcon>
          )}
          {user && (
            <ActionIcon color="blue" radius="xl" size={40} onClick={() => navigate(ADD_POST_ROUTE)}>
              <IconTextPlus stroke={1.5} size={20} />
            </ActionIcon>
          )}
        </Stack>
      </Affix>
      <SearchModal />
    </Page>
  );
}
