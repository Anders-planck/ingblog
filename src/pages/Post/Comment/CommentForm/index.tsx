import React from 'react';
import { Button, Group, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { Post as PostType } from '@/types/post';
import { selectUser } from '@/store/auth';
import { useAppSelector } from '@/store';
import { usePostCommentMutation } from '@/services/posts';

type Props = {
  post: PostType;
};

const CommentForm = ({ post }: Props) => {
  const user = useAppSelector(selectUser);

  const form = useForm({
    initialValues: {
      content: '',
    },
    validate: {
      content: (value) => value.trim().length === 0 && 'comment is required',
    },
  });

  const [postComment, { isLoading }] = usePostCommentMutation();

  const handleOnSubmit = async (values: any) => {
    const { error } = await postComment({
      postId: post.id,
      authorId: user?.id,
      content: values.content,
    });

    if (error) {
      notifications.show({
        title: 'Sorry',
        message: 'Something wrong 🤥',
        color: 'red',
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleOnSubmit)} data-testid="comment-form">
      <Textarea
        label="hey 🙆🏽‍♂️"
        withAsterisk
        autosize
        description="tell me more about you think"
        key={form.key('content')}
        {...form.getInputProps('content')}
        placeholder="write here"
      />
      <Group justify="flex-end" mt="md">
        <Button
          type="submit"
          color="blue"
          loading={isLoading}
          disabled={isLoading || !form.isValid}
        >
          Tell me what you think 😎
        </Button>
      </Group>
    </form>
  );
};

export default CommentForm;
