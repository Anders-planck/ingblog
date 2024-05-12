import { Flex, Loader, SimpleGrid, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Post } from '@/components/Post';
import { supabase } from '@/lib/supabase';
import { Post as PostType } from '@/types/post';

export function HomePage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*, profiles(full_name, avatar_url), likes:likes(*), comments:comments(*)');

    if (error) {
      console.error(error);
    }
    if (data) {
      setPosts(
        data.map((post) => ({
          ...post,
          author: {
            name: post.profiles.full_name,
            avatar: post.profiles.avatar_url,
          },
          createdAt: new Date(post.created_at).toISOString(),
          likes: post.likes,
          comments: post.comments,
        }))
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const items = posts.map((post) => <Post key={post.id} item={post} />);
  return (
    <SimpleGrid cols={1} spacing="md">
      <Title order={1}>Home</Title>
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
  );
}
