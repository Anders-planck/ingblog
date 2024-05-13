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
} from '@mantine/core';
import { IconBookmark, IconHeart, IconShare } from '@tabler/icons-react';
import classes from './Post.module.css';
import { formatPostDate } from '@/lib/utils';
import { Post as PostType } from '@/types/post';

type Props = {
  item: PostType;
};

export function Post({ item }: Props) {
  const theme = useMantineTheme();

  return (
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      {item.image && (
        <Card.Section mb="sm">
          <Image src={item.image} alt={item.title} height={180} />
        </Card.Section>
      )}

      <Badge w="fit-content" variant="light">
        {item.category}
      </Badge>

      <Text fw={700} className={classes.title} mt="xs">
        {item.title}
      </Text>

      <Group mt="lg">
        <Avatar src={item.author.avatar} radius="sm" />
        <div>
          <Text fw={500}>{item.author.name}</Text>
          <Text fz="xs" c="dimmed">
            {formatPostDate(new Date(item.createdAt))}
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.footer}>
        <Group justify="space-between">
          <Text fz="xs" c="dimmed">
            {item.likes?.length ?? 0} people liked this
          </Text>
          <Group gap={0}>
            <ActionIcon variant="subtle" color="gray">
              <IconHeart
                style={{ width: rem(20), height: rem(20) }}
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray">
              <IconBookmark
                style={{ width: rem(20), height: rem(20) }}
                color={theme.colors.yellow[6]}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray">
              <IconShare
                style={{ width: rem(20), height: rem(20) }}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}
