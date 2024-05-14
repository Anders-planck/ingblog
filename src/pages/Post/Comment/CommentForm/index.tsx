import React, { useState } from 'react';
import { Button, Group, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Post as PostType } from '@/types/post';
import { supabase } from '@/lib/supabase';
import { selectUser } from '@/store/auth';
import { useAppSelector } from '@/store';

type Props = {
  post: PostType;
  refresh: () => void;
};

const CommentForm = ({ post, refresh }: Props) => {
  const user = useAppSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      content: '',
    },
    validate: {
      content: (value) => value.trim().length === 0 && 'comment is required',
    },
  });
  const handleOnSubmit = async (values: any) => {
    setLoading(true);
    const { error } = await supabase.from('comments').insert([
      {
        postId: post.id,
        content: values.content,
        authorId: user?.id,
      },
    ]);

    if (error) {
      console.error(error);
    }

    setLoading(false);
    refresh();
  };

  return (
    <form onSubmit={form.onSubmit(handleOnSubmit)}>
      <Textarea
        label="hey 🙆🏽‍♂️"
        withAsterisk
        description="tell me more about you think"
        key={form.key('content')}
        {...form.getInputProps('content')}
        placeholder="write here"
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit" color="blue" loading={loading} disabled={loading || !form.isValid}>
          Tell me what you think 😎
        </Button>
      </Group>
    </form>
  );
};

export default CommentForm;
