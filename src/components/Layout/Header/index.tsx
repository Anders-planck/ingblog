import {
  Avatar,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Container,
  Divider,
  Drawer,
  Group,
  Menu,
  ScrollArea,
  Tabs,
  Text,
  ThemeIcon,
  UnstyledButton,
  rem,
  useMantineTheme,
  Anchor,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconChevronDown,
  IconHeart,
  IconLogout,
  IconMessage,
  IconSettings,
  IconStar,
  IconTrash,
} from '@tabler/icons-react';
import cx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Header.module.css';
import { useAppSelector } from '@/store';
import { selectProfile, selectUser } from '@/store/auth';
import { supabase } from '@/lib/supabase';
import { ConfirmationModal } from '@/components/ConfirmationModal';

const tabs = ['Home'];

const BlogsLinks = [
  {
    icon: IconHeart,
    title: 'Likes posts',
    description: 'Posts you liked',
  },
  {
    icon: IconStar,
    title: 'Saved posts',
    description: 'Posts you saved',
  },
  {
    icon: IconMessage,
    title: 'Your comments',
    description: 'Comments you left',
  },
];

export function Header() {
  const theme = useMantineTheme();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const user = useAppSelector(selectUser);
  const profile = useAppSelector(selectProfile);
  const navigate = useNavigate();

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  const links = BlogsLinks.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const deleteAccount = async () => {
    await logout();
  };
  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="space-between">
          <Text size="xl">Isa-blog</Text>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="xs" size="sm" />

          {user ? (
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: 'pop-top-right' }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: userMenuOpened,
                  })}
                >
                  <Group gap={7}>
                    <Avatar
                      src={user.user_metadata.avatar_url}
                      alt={user.user_metadata.full_name}
                      radius="xl"
                      size={20}
                    />
                    <Text fw={500} size="sm" lh={1} mr={3}>
                      {profile?.full_name ?? user?.user_metadata.full_name}
                    </Text>
                    <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={
                    <IconHeart
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.red[6]}
                      stroke={1.5}
                    />
                  }
                >
                  Liked posts
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconStar
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.yellow[6]}
                      stroke={1.5}
                    />
                  }
                >
                  Saved posts
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconMessage
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.blue[6]}
                      stroke={1.5}
                    />
                  }
                >
                  Your comments
                </Menu.Item>

                <Menu.Label>Settings</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                  }
                  onClick={() => navigate('/account')}
                >
                  Account settings
                </Menu.Item>
                <Menu.Item
                  style={{
                    width: '100%',
                  }}
                  type="submit"
                  leftSection={
                    <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                  }
                  onClick={logout}
                >
                  Logout
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>

                <ConfirmationModal
                  onConfirm={deleteAccount}
                  labelButton="Delete account"
                  buttonProps={{
                    leftSection: (
                      <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    ),
                    color: 'red',
                    fullWidth: true,
                    m: 1,
                  }}
                />
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Group visibleFrom="sm">
              <Anchor href="/auth">
                <Button>Let&apos;s go</Button>
              </Anchor>
            </Group>
          )}
        </Group>
      </Container>
      <Container size="md">
        <Tabs
          defaultValue="Home"
          variant="outline"
          visibleFrom="sm"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
      </Container>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Isa-blog"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Anchor onClick={() => navigate('/')} className={classes.link_mega}>
            Home
          </Anchor>
          <UnstyledButton className={classes.link_mega} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Blog
              </Box>
              <IconChevronDown
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <Divider my="sm" />
          {!user ? (
            <>
              <Group justify="center" grow pb="xl" px="md">
                <Anchor
                  href="/auth"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <Button fullWidth>Let&apos;s go</Button>
                </Anchor>
              </Group>
            </>
          ) : (
            <Anchor href="/account">
              <Group justify="space-between" px="md">
                <Group>
                  <Avatar radius="xl" src={user?.user_metadata.avatar_url} />

                  <div>
                    <Text fw={500}>{profile?.full_name ?? user?.user_metadata.full_name}</Text>
                    <Text size="xs" c="dimmed">
                      {user?.email}
                    </Text>
                  </div>
                </Group>
                <IconSettings style={{ width: rem(32), height: rem(32) }} stroke={1.5} />
              </Group>
            </Anchor>
          )}
        </ScrollArea>
      </Drawer>
    </div>
  );
}
