import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Avatar, Box, Group, Image, SimpleGrid, Text, Title, useMatches } from '@mantine/core';
import { supabase } from '@/lib/supabase';
import { Post as PostType } from '@/types/post';
import { formatPost } from '@/pages/Post/utils';
import Page from '@/Layout/Page';
import { formatPostDate } from '@/lib/utils';
import RichTextInput from '@/components/RichTextInput';
import CommentForm from '../Comment/CommentForm';
import CommentView from '@/pages/Post/Comment/CommentView';

const PostView = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostType | null>(null);

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select(
        '*, profiles(full_name, avatar_url), likes:likes(*), bookmarks:bookmarks(*), comments:comments(*, profiles(full_name, avatar_url, id))'
      )
      .eq('id', id)
      .single();

    if (error) {
      console.error(error);
    }

    if (data) {
      setPost(formatPost(data));
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const padding = useMatches({
    base: 'xs',
    md: 'none',
  });

  const radius = useMatches({
    base: 'none',
    md: 'lg',
  });

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

            <CommentForm post={post} refresh={fetchPost} />
            <CommentView comments={post.comments?.reverse() ?? []} />
          </SimpleGrid>
        </Box>
      )}
    </Page>
  );
};

export default PostView;
