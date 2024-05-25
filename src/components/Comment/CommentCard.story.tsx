import { Meta, StoryObj } from '@storybook/react';
import { Container } from '@mantine/core';
import { CommentCard } from '@/components/Comment/index';
import { fakeComment } from '@/types/post';

const meta: Meta<typeof CommentCard> = {
  component: CommentCard,
  title: 'Components/CommentCard',
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  decorators: [
    (Story) => (
      <Container size="sm" style={{ padding: '1rem' }}>
        <Story />
      </Container>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CommentCard>;

export const Default = () => <CommentCard skeleton />;

export const primary: Story = {
  args: {
    item: fakeComment,
    skeleton: false,
  },
};
