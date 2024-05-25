import { Meta, StoryObj } from '@storybook/react';
import { Container } from '@mantine/core';
import { Post } from '@/components/Post/index';
import { fakePost } from '@/types/post';

const meta: Meta<typeof Post> = {
  component: Post,
  title: 'Components/Post',
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  decorators: [
    (Story) => (
      <Container size="md">
        <Story />
      </Container>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Post>;

export const Default = () => <Post skeleton />;

export const primary: Story = {
  args: {
    item: fakePost,
  },
};
