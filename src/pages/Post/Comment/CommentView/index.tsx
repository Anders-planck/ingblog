import { SimpleGrid, Title } from '@mantine/core';
import { Comment } from '@/types/post';
import { CommentCard } from '@/components/Comment';

type Props = {
  comments: Comment[];
};
const CommentView = ({ comments }: Props) => {
  const items = comments.map((item) => <CommentCard key={item.id} item={item} />);

  return (
    <SimpleGrid cols={1} spacing="xs" data-testid="comments-list">
      <Title order={2} fw={900}>
        Comments
      </Title>

      <SimpleGrid cols={1} spacing="xs" pl="md">
        {items}
      </SimpleGrid>
    </SimpleGrid>
  );
};

export default CommentView;
