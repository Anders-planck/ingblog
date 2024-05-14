import { Card, Avatar, Text, Group, useMatches } from '@mantine/core';
import classes from './Post.module.css';
import { formatPostDate } from '@/lib/utils';
import { Comment } from '@/types/post';

type Props = {
  item: Comment;
};

export function CommentCard({ item }: Props) {
  const radius = useMatches({
    base: 'none',
    md: 'md',
  });
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
