import { Button, ButtonProps } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';
import React from 'react';

type GithubButtonProps = ButtonProps &
  React.ComponentPropsWithoutRef<'button'> & {
    signInWithGithub: any;
  };
export function GithubButton({ signInWithGithub, ...props }: GithubButtonProps) {
  return (
    <Button
      onClick={signInWithGithub}
      leftSection={<IconBrandGithub style={{ width: '1rem', height: '1rem' }} color="#fff" />}
      variant="default"
      fullWidth
      {...props}
    />
  );
}
