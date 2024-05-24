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
import { notifications } from '@mantine/notifications';
import classes from './Post.module.css';
import { formatPostDate } from '@/lib/utils';
import { Post as PostType } from '@/types/post';
import { useAppSelector } from '@/store';
import { selectUser } from '@/store/auth';
import { POST_ROUTE } from '@/routes';
import {
  useGetIsBookmarkedToUserQuery,
  useGetIsLikedToUserQuery,
  useToggleBookmarkPostMutation,
  useToggleLikePostMutation,
} from '@/services/posts';

type Props =
  | {
      item: PostType;
      skeleton?: false;
    }
  | {
      skeleton: true;
    };

export function Post({ skeleton, ...props }: Props) {
  const theme = useMantineTheme();

  const item = (skeleton ? {} : (props as any).item) as PostType;

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

  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const { data: isLikedRes } = useGetIsLikedToUserQuery(
    {
      postId: item.id as string,
      authorId: user?.id as string,
    },
    {
      skip: !user || !item.id,
    }
  );

  const { data: isBookMarkRes } = useGetIsBookmarkedToUserQuery(
    {
      postId: item.id as string,
      authorId: user?.id as string,
    },
    {
      skip: !user || !item.id,
    }
  );

  const [isLiked, setIsLiked] = useState(isLikedRes ?? false);
  const [isBookmarked, setIsBookmarked] = useState(isBookMarkRes ?? false);

  const [toggleBookmarkPost] = useToggleBookmarkPostMutation();
  const [toggleLikePost] = useToggleLikePostMutation();

  const toggleLikePosts = async () => {
    if (!user) return;
    const { error } = await toggleLikePost({
      isLiked,
      postId: item.id,
      authorId: user.id,
    });
    if (error) {
      notifications.show({
        title: 'Sorry',
        message: 'Something wrong 🤥',
        color: 'red',
      });
      return;
    }
    setIsLiked(!isLiked);
  };

  const toggleBookmarkPosts = async () => {
    if (!user) return;
    const { error } = await toggleBookmarkPost({
      isBookmarked,
      postId: item.id,
      authorId: user.id,
    });

    if (error) {
      notifications.show({
        title: 'Sorry',
        message: 'Something wrong 🤥',
        color: 'red',
      });
      return;
    }
    setIsBookmarked(!isBookmarked);
  };

  useEffect(() => {
    if (isLikedRes !== undefined) {
      setIsLiked(isLikedRes);
    }
    if (isBookMarkRes !== undefined) {
      setIsBookmarked(isBookMarkRes);
    }
  }, [isLikedRes, isBookMarkRes]);

  if (skeleton) {
    return (
      <Box p={padding} id={`post-skeleton-${item.id}`}>
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
    <Card
      id={`post-${item.id}`}
      withBorder={withBorder}
      padding={paddingCard}
      radius={radius}
      className={classes.card}
    >
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
