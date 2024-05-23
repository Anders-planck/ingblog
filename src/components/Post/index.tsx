import {
  Card,
  Image,
  Avatar,
  Text,
  Group,
  useMantineTheme,
  Badge,
  ActionIcon,
  rem,
  useMatches,
  Box,
  Divider,
  Skeleton,
} from '@mantine/core';
import {
  IconBookmarks,
  IconBookmarksFilled,
  IconHeart,
  IconHeartFilled,
  IconMessagePlus,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classes from './Post.module.css';
import { formatPostDate } from '@/lib/utils';
import { Post as PostType } from '@/types/post';
import { supabase } from '@/lib/supabase';
import { useAppSelector } from '@/store';
import { selectUser } from '@/store/auth';
import { POST_ROUTE } from '@/routes';

type Props =
  | {
      item: PostType;
      handleUpdateSinglePost: (post: PostType) => void;
      skeleton?: false;
    }
  | {
      skeleton: true;
    };

export function Post({ skeleton, ...props }: Props) {
  const theme = useMantineTheme();

  const item = (skeleton ? {} : (props as any).item) as PostType;
  const handleUpdateSinglePost = (skeleton ? () => {} : (props as any).handleUpdateSinglePost) as (
    post: PostType
  ) => void;

  const paddingCard = useMatches({
    base: 'none',
    md: 'auto',
  });
  const withBorder = useMatches({
    base: false,
    md: true,
  });
  const padding = useMatches({
    base: 'xs',
    md: 'none',
  });
  const radius = useMatches({
    base: 'none',
    md: 'lg',
  });
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const getIsLiked = async () => {
    if (!user) return false;

    const { data, error } = await supabase
      .from('likes')
      .select('id')
      .eq('postId', item.id)
      .eq('authorId', user?.id);

    if (error) {
      console.error(error);
    }

    if (data) {
      return data.length > 0;
    }

    return false;
  };
  const toggleLikePosts = async () => {
    if (!user) return;

    if (isLiked) {
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('postId', item.id)
        .eq('authorId', user?.id);

      if (error) {
        console.error(error);
        return;
      }
      handleUpdateSinglePost({
        ...item,
        likes: item.likes?.filter((like) => like.authorId !== user?.id),
      });
    } else {
      const { data, error } = await supabase
        .from('likes')
        .insert([
          {
            postId: item.id,
            authorId: user?.id,
          },
        ])
        .select('*');

      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        handleUpdateSinglePost({
          ...item,
          likes: [
            ...(item.likes ?? []),
            ...data.map((like) => ({
              authorId: like.authorId,
              id: like.id,
              postId: like.postId,
              createdAt: like.createdAt,
            })),
          ],
        });
      }
    }

    setIsLiked(!isLiked);
  };

  const getIsBookmarked = async () => {
    if (!user) return false;
    const { data, error } = await supabase
      .from('bookmarks')
      .select('id')
      .eq('postId', item.id)
      .eq('authorId', user?.id);

    if (error) {
      console.error(error);
    }

    if (data) {
      return data.length > 0;
    }

    return false;
  };
  const toggleBookmarkPosts = async () => {
    if (!user) return;

    if (isBookmarked) {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('postId', item.id)
        .eq('authorId', user?.id);

      if (error) {
        console.error(error);
      }
    } else {
      const { data, error } = await supabase
        .from('bookmarks')
        .insert([
          {
            postId: item.id,
            authorId: user?.id,
          },
        ])
        .select('*');

      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        handleUpdateSinglePost({
          ...item,
          bookmarks: [
            ...(item.bookmarks ?? []),
            ...data.map((bookmark) => ({
              authorId: bookmark.authorId,
              id: bookmark.id,
              postId: bookmark.postId,
              createdAt: bookmark.createdAt,
            })),
          ],
        });
      }
    }
    setIsBookmarked(!isBookmarked);
  };

  useEffect(() => {
    getIsLiked().then((data) => {
      setIsLiked(data);
    });
    getIsBookmarked().then((data) => {
      setIsBookmarked(data);
    });
  }, [user]);

  if (skeleton) {
    return (
      <Box p={padding}>
        <Skeleton height={60} circle mb="xs" />
        <Skeleton height={180} radius="sm" />
        <Skeleton height={20} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="100%" radius="xl" />
        <Skeleton height={8} mt={6} width="60%" radius="xl" />
        <Skeleton height={8} mt={6} width="20%" radius="xl" />
      </Box>
    );
  }
  return (
    <Card withBorder={withBorder} padding={paddingCard} radius={radius} className={classes.card}>
      {item.image && (
        <Card.Section>
          <Image src={item.image} alt={item.title} height={180} />
        </Card.Section>
      )}

      <Box px={padding} pt={padding}>
        <Badge w="fit-content" variant="light">
          {item.category}
        </Badge>

        <Text
          fw={700}
          className={classes.title}
          mt="xs"
          onClick={() => {
            navigate(`${POST_ROUTE}/${item.id}`);
          }}
        >
          {item.title}
        </Text>

        <Group mt="sm" gap="xs">
          <Avatar src={item.author.avatar} radius="sm" />
          <div>
            <Text fw={500}>{item.author.name}</Text>
            <Text fz="xs" c="dimmed">
              {formatPostDate(new Date(item.createdAt))}
            </Text>
          </div>
        </Group>
      </Box>

      <Card.Section className={classes.footer}>
        <Group justify="flex-end">
          <Group gap={0}>
            <Group gap={0}>
              <Text fz="xs" c="dimmed" fw={600}>
                {item.likes?.length ?? 0}
              </Text>
              <ActionIcon variant="subtle" color="gray" onClick={toggleLikePosts}>
                {isLiked ? (
                  <IconHeartFilled
                    style={{
                      width: rem(20),
                      height: rem(20),
                    }}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                ) : (
                  <IconHeart
                    style={{
                      width: rem(20),
                      height: rem(20),
                    }}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                )}
              </ActionIcon>
            </Group>
            <Divider orientation="vertical" size="sm" mx={4} />
            <Group gap={0}>
              <Text fz="xs" c="dimmed" fw={600}>
                {item.bookmarks?.length ?? 0}
              </Text>
              <ActionIcon variant="subtle" color="gray" onClick={toggleBookmarkPosts}>
                {isBookmarked ? (
                  <IconBookmarksFilled
                    style={{
                      width: rem(20),
                      height: rem(20),
                    }}
                    color={theme.colors.yellow[6]}
                    stroke={1.5}
                  />
                ) : (
                  <IconBookmarks
                    style={{
                      width: rem(20),
                      height: rem(20),
                    }}
                    color={theme.colors.yellow[6]}
                    stroke={1.5}
                  />
                )}
              </ActionIcon>
            </Group>
            <Divider orientation="vertical" size="sm" mx={4} />
            <Group gap={0}>
              <Text fz="xs" c="dimmed" fw={600}>
                {item.comments?.length ?? 0}
              </Text>
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => {
                  navigate(`${POST_ROUTE}/${item.id}?#comments`);
                }}
              >
                <IconMessagePlus
                  style={{
                    width: rem(20),
                    height: rem(20),
                  }}
                  color={theme.colors.blue[6]}
                  stroke={1.5}
                />
              </ActionIcon>
            </Group>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}
