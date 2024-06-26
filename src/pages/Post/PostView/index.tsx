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
import { Post } from '@/components/Post';

const PostView = () => {
  const { id } = useParams();

  const { data: post, isLoading } = useGetPostQuery({
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

  if (isLoading) {
    return (
      <Page title="Post">
        <Post skeleton />
      </Page>
    );
  }

  return (
    <Page title={post?.title || 'Post'}>
      {post ? (
        <Box data-testid="post-view">
          {post.image && <Image src={post.image} alt={post.title} height={180} radius={radius} />}

          <SimpleGrid cols={1} spacing="xs" p={padding}>
            <Title order={1} fw={900} mt="sm">
              {post.title}
            </Title>

            <Title order={5} fw={400}>
              {post.overview}
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
            {post.comments && post.comments.length > 0 && (
              <CommentView comments={[...post.comments].reverse()} />
            )}
          </SimpleGrid>
        </Box>
      ) : (
        <Box
          data-testid="post-view-not-fount"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Title order={1} mt="xl">
            Post not found
          </Title>
        </Box>
      )}
    </Page>
  );
};

export default PostView;
