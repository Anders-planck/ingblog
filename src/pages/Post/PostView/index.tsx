import { useParams } from 'react-router-dom';
import { Avatar, Box, Group, Image, SimpleGrid, Text, Title, useMatches } from '@mantine/core';
import Page from '@/Layout/Page';
import { formatPostDate } from '@/lib/utils';
import RichTextInput from '@/components/RichTextInput';
import CommentForm from '../Comment/CommentForm';
import CommentView from '@/pages/Post/Comment/CommentView';
import { useAppSelector } from '@/store';
import { selectUser } from '@/store/auth';
import { useGetPostQuery } from '@/services/posts';

const PostView = () => {
  const { id } = useParams();

  const { data: post } = useGetPostQuery({
    postId: id as string,
  });

  const padding = useMatches({
    base: 'xs',
    md: 'none',
  });

  const radius = useMatches({
    base: 'none',
    md: 'lg',
  });

  const user = useAppSelector(selectUser);

  return (
    <Page title={post?.title || 'Post'}>
      {post && (
        <Box>
          {post.image && <Image src={post.image} alt={post.title} height={180} radius={radius} />}

          <SimpleGrid cols={1} spacing="xs" p={padding}>
            <Title order={1} mt="sm">
              {post.title}
            </Title>

            <Group justify="space-between">
              <Group mt="sm" gap="xs">
                <Avatar src={post.author.avatar} radius="sm" />
                <div>
                  <Text fw={500}>{post.author.name}</Text>
                  <Text fz="xs" c="dimmed">
                    {formatPostDate(new Date(post.createdAt))}
                  </Text>
                </div>
              </Group>

              <Group justify="flex-end" gap="xs">
                <Text fz="xs" c="dimmed">
                  {post.likes?.length ?? 0} likes
                </Text>
                <Text fz="xs" c="dimmed">
                  {post.bookmarks?.length ?? 0} bookmarks
                </Text>
                <Text fz="xs" c="dimmed">
                  {post.comments?.length ?? 0} comments
                </Text>
              </Group>
            </Group>

            <RichTextInput readonly content={post.content} />

            {user && <CommentForm post={post} />}
            <CommentView comments={post.comments?.reverse() ?? []} />
          </SimpleGrid>
        </Box>
      )}
    </Page>
  );
};

export default PostView;
