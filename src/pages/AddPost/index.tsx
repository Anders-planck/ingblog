import { Box, Button, Checkbox, Group, Select, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

import Page from '@/Layout/Page';
import RichTextInput from '@/components/RichTextInput';
import { useAppSelector } from '@/store';
import { selectUser } from '@/store/auth';

const c =
  '<h2 style="text-align: center;">Welcome to Isa-blog</h2>' +
  '<p><code>write any think you want here</code></p>';

const AddPost = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [content, setContent] = useState<any>(null);
  const [errorContent, setErrorContent] = useState<string | null>(null);
  const user = useAppSelector(selectUser);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      publish: false,
      title: '',
      image: '',
      category: null,
    },

    validate: {
      category: (value) => !value && 'Category is required',
      title: (value) => value.trim().length === 0 && 'Title is required',
    },
  });

  const handleCategory = async () => {
    const { data, error } = await supabase
      .schema('public')
      .rpc('get_types', { enum_type: 'category' });

    if (error) {
      setCategories([]);
    }
    if (data) {
      setCategories(data);
    }
  };

  const handleSubmit = async (values: any) => {
    if (!user) return;

    if (!content) {
      setErrorContent('Content is required');
      return;
    }

    const { error } = await supabase.from('posts').insert([
      {
        title: values.title,
        image: values.image,
        content,
        category: values.category,
        published: values.publish,
        authorId: user.id,
      },
    ]);

    if (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleCategory();
  }, []);

  return (
    <Page title="Add Post">
      <Title order={1}>Post</Title>

      <Box mt="lg">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              withAsterisk
              label="Title"
              placeholder="Post title"
              key={form.key('title')}
              {...form.getInputProps('title')}
            />

            <TextInput
              withAsterisk
              label="Image"
              placeholder="Post image URL"
              key={form.key('image')}
              {...form.getInputProps('image')}
            />

            <Select
              label="Category"
              placeholder="Post category"
              data={categories}
              key={form.key('category')}
              {...form.getInputProps('category')}
            />

            <RichTextInput
              label="Content"
              key="content"
              handleOnChange={(value) => setContent(value)}
              //@ts-ignore
              error={errorContent}
              content={c}
            />

            <Checkbox
              mt="md"
              label="Do you want to publish this post?"
              key={form.key('publish')}
              {...form.getInputProps('publish', { type: 'checkbox' })}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </Stack>
        </form>
      </Box>
    </Page>
  );
};

export default AddPost;
