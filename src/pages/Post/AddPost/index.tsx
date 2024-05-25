import {
  Box,
  Button,
  Checkbox,
  Group,
  Select,
  Stack,
  TextInput,
  Title,
  useMatches,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Page from '@/Layout/Page';
import RichTextInput from '@/components/RichTextInput';
import { useAppSelector } from '@/store';
import { selectUser } from '@/store/auth';
import { AUTH_ROUTE, HOME_ROUTE } from '@/routes';
import { useGetCategoriesQuery, usePostNewPostMutation } from '@/services/posts';

const AddPost = () => {
  const [content, setContent] = useState<any>(null);
  const [errorContent, setErrorContent] = useState<string | null>(null);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const padding = useMatches({
    base: 'xs',
    md: 'none',
  });

  const { data: categories } = useGetCategoriesQuery();
  const [postNewPost, { error, isLoading: isSubmitting }] = usePostNewPostMutation();

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

  const handleSubmit = async (values: any) => {
    if (!user) return;

    if (!content) {
      setErrorContent('Content is required');
      return;
    }

    await postNewPost({
      title: values.title,
      image: values.image,
      content,
      category: values.category,
      publish: values.publish,
      authorId: user.id,
    });

    if (error) {
      return;
    }

    navigate(HOME_ROUTE);
  };

  useEffect(() => {
    if (!user) {
      navigate(AUTH_ROUTE);
    }
  }, []);

  return (
    <Page title="Add Post">
      <Box p={padding}>
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
                label="Image"
                placeholder="Post image URL"
                key={form.key('image')}
                {...form.getInputProps('image')}
              />

              <Select
                withAsterisk
                searchable
                label="Category"
                placeholder="Post category"
                data={categories ?? []}
                key={form.key('category')}
                {...form.getInputProps('category')}
              />

              <RichTextInput
                label="Content"
                key="content"
                handleOnChange={(value) => setContent(value)}
                //@ts-ignore
                error={errorContent}
                placeholder="write your post content here"
                content=""
              />

              <Checkbox
                mt="md"
                label="Do you want to publish this post?"
                key={form.key('publish')}
                {...form.getInputProps('publish', { type: 'checkbox' })}
              />

              <Group justify="flex-end" mt="md">
                <Button
                  type="submit"
                  disabled={!form.isValid || isSubmitting}
                  loading={isSubmitting}
                >
                  {isSubmitting ? 'saving...' : 'save'}
                </Button>
              </Group>
            </Stack>
          </form>
        </Box>
      </Box>
    </Page>
  );
};

export default AddPost;
