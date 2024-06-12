import { Avatar, Text, Group } from '@mantine/core';
import { IconPhoneCall, IconAt } from '@tabler/icons-react';
import classes from './UserInfoIcons.module.css';

type UserInfoIconsProps = {
  user: any;
  profile: any;
};

export function UserInfoIcons({ user, profile }: UserInfoIconsProps) {
  //console.log('user info icons', user, profile);
  return (
    <div>
      <Group wrap="nowrap">
        <Avatar
          src={
            user?.user_metadata.avatar_url ||
            'https://images.unsplash.com/photo-1573497019700-5f3e7c5f9d59'
          }
          size={profile?.updated_at ? 114 : 94}
          radius="md"
        />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            {profile?.work || 'What is your work?'}
          </Text>

          <Text fz="lg" fw={500} className={classes.name}>
            {profile?.full_name || 'What is your name?'}
          </Text>

          <Group wrap="nowrap" gap={10} mt={3}>
            <IconAt stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {user?.email || 'What is your email?'}
            </Text>
          </Group>

          <Group wrap="nowrap" gap={10} mt={5}>
            <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {profile?.phone || 'What is your phone number?'}
            </Text>
          </Group>

          {profile?.updated_at && (
            <Text fz="xs" c="dimmed" mt={5}>
              Last updated: {new Date(profile.updated_at).toLocaleString()}
            </Text>
          )}
        </div>
      </Group>
    </div>
  );
}
