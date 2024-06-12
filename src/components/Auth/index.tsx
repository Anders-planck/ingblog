import {
  Alert,
  Button,
  Divider,
  Group,
  Loader,
  Paper,
  PaperProps,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import { IconInfoCircle } from '@tabler/icons-react';
import React, { useState } from 'react';
import { GithubButton } from './GitHubButton';
import { GoogleButton } from './GoogleButton';
import { supabase } from '@/lib/supabase';
import { useAppDispatch } from '@/store';
import { setLoginAttempted } from '@/store/auth';

export function AuthForm(props: PaperProps) {
  const [message, setMessage] = React.useState<string | null>(null);
  const [errorMessages, setErrorMessages] = React.useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const dispatch = useAppDispatch();

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    dispatch(setLoginAttempted(true));
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      //@ts-ignore
      setErrorMessages(error.error_description || error.message);
    } else {
      setMessage('Check your email for the login link!');
    }
    setLoading(false);
  };

  const signInWithGithub = async () => {
    dispatch(setLoginAttempted(true));
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });

    if (error) {
      setErrorMessages(error.message);
    }
  };

  const signInWithGoogle = async () => {
    dispatch(setLoginAttempted(true));
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      setErrorMessages(error.message);
    }
  };

  const icon = <IconInfoCircle />;

  return (
    <Paper
      radius="md"
      p="xl"
      style={{
        width: '100%',
      }}
      withBorder
      {...props}
    >
      {errorMessages && (
        <Alert
          variant="light"
          color="red"
          radius="md"
          withCloseButton
          title="Error"
          icon={icon}
          mb="md"
        >
          {errorMessages}
        </Alert>
      )}

      <Text size="lg" fw={500}>
        Welcome to Isa-blog, Let&apos;s get started!
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton signInWithGoogle={signInWithGoogle} radius="xl">
          Google
        </GoogleButton>
        <GithubButton signInWithGithub={signInWithGithub} radius="xl">
          Github
        </GithubButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      {message ? (
        <Alert
          variant="light"
          color="green"
          radius="md"
          withCloseButton
          title="Success"
          icon={icon}
          mb="md"
        >
          {message}
        </Alert>
      ) : (
        <>
          <Stack>
            <TextInput
              data-testid="email-input"
              required
              label="Email"
              value={email}
              placeholder="hello@mantine.dev"
              onChange={(event) => setEmail(event.currentTarget.value)}
              radius="md"
            />
          </Stack>

          <Group justify="flex-end" mt="xl">
            <Button onClick={handleLogin} radius="xl" data-testid="login-button">
              {loading ? <Loader color="white" size="sm" /> : upperFirst("Let's go")}
            </Button>
          </Group>
        </>
      )}
    </Paper>
  );
}
