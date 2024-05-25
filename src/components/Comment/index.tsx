import { Card, Avatar, Text, Group, useMatches, Box, Skeleton } from '@mantine/core';
import classes from './Post.module.css';
import { formatPostDate } from '@/lib/utils';
import { Comment } from '@/types/post';

type Props =
  | {
      item: Comment;
      skeleton?: false;
    }
  | {
      skeleton: true;
    };

export function CommentCard({ skeleton, ...props }: Props) {
  const item = (skeleton ? {} : (props as any).item) as Comment;

  const radius = useMatches({
    base: 'none',
    md: 'md',
  });

  const padding = useMatches({
    base: 'xs',
    md: 'none',
  });

  if (skeleton) {
    return (
      <Box p={padding}>
        <Skeleton height={60} circle mb="xs" />
        <Skeleton height={20} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="60%" radius="xl" />
        <Skeleton height={8} mt={6} width="20%" radius="xl" />
      </Box>
    );
  }

  return (
    <Card radius={radius} className={classes.card}>
      <Card.Section>
        <Text>{item.content}</Text>
        <Group mt="sm" gap="xs">
          <Avatar src={item.author.avatar} radius="sm" />
          <div>
            <Text fw={500}>{item.author.name}</Text>
            <Text fz="xs" c="dimmed">
              {formatPostDate(new Date(item.createdAt))}
            </Text>
          </div>
        </Group>
      </Card.Section>
    </Card>
  );
}
