import {
  SimpleGrid,
  Stack,
  TextInput,
  Title,
  Divider,
  Button,
  Loader,
  Group,
  Alert,
  Text,
  useMantineColorScheme,
  Switch,
  rem,
  useMantineTheme,
} from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { upperFirst } from '@mantine/hooks';
import { IconInfoCircle, IconMoonStars, IconSun, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectUser, setProfile } from '@/store/auth';
import { supabase } from '@/lib/supabase';
import { ConfirmationModal } from '@/components/ConfirmationModal';

const UpdateInfoUser = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const deleteAccount = async () => {
    await logout();
  };

  return (
    <SimpleGrid cols={1} spacing="md">
      <Stack>
        <Title order={4}>Email</Title>
        <TextInput
          required
          value={user?.email}
          placeholder="hello@mantine.dev"
          disabled
          radius="md"
        />
      </Stack>
      <Divider />
      <UpdateName />
      <Divider />
      <SettingsApp />
      <Divider
        label={
          <Text size="xs" color="red" fw="bold">
            Danger zone
          </Text>
        }
        my="sm"
      />
      <SimpleGrid cols={2} spacing="md">
        <Button onClick={logout} radius="sm">
          Logout
        </Button>
        <ConfirmationModal
          onConfirm={deleteAccount}
          labelButton="Delete account"
          buttonProps={{
            leftSection: <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />,
            color: 'red',
            fullWidth: true,
            m: 1,
          }}
        />
      </SimpleGrid>
    </SimpleGrid>
  );
};

const UpdateName = () => {
  const user = useAppSelector(selectUser);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [work, setWork] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const icon = <IconInfoCircle />;

  const update = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);
    const updated_at = new Date();
    const updates = {
      id: user?.id,
      full_name: name,
      phone,
      work,
      updated_at,
    };
    const { error } = await supabase.from('profiles').upsert(updates);
    if (error) {
      //@ts-ignore
      setErrorMessage(error.message);
    }
    setSuccessMessage('Profile updated successfully');
    dispatch(
      setProfile({
        full_name: name,
        phone,
        work,
        updated_at,
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      if (!user) return;
      setErrorMessage(null);
      setSuccessMessage(null);
      setLoading(true);

      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, phone, work, updated_at ')
        .eq('id', user?.id)
        .limit(1);

      if (!ignore) {
        if (error) {
          //@ts-ignore
          setErrorMessage(error.message);
        } else if (data[0]) {
          setName(data[0].full_name);
          setPhone(data[0].phone);
          setWork(data[0].work);

          dispatch(
            setProfile({
              full_name: data[0].full_name,
              phone: data[0].phone,
              work: data[0].work,
              updated_at: data[0].updated_at,
            })
          );
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [user]);

  return (
    <SimpleGrid cols={1} spacing="md">
      {errorMessage && (
        <Alert
          variant="light"
          color="red"
          radius="md"
          withCloseButton
          title="Error"
          icon={icon}
          onClose={() => setErrorMessage(null)}
          mb="md"
        >
          {errorMessage}
        </Alert>
      )}

      {successMessage && (
        <Alert
          variant="light"
          color="green"
          radius="md"
          withCloseButton
          onClose={() => setSuccessMessage(null)}
          title="Success"
          icon={icon}
          mb="md"
        >
          {successMessage}
        </Alert>
      )}
      <Title order={4}>Update your Information</Title>
      <SimpleGrid cols={2} spacing="md">
        <TextInput
          required
          label="Full name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder={name}
          radius="md"
        />

        <TextInput
          required
          label="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.currentTarget.value)}
          placeholder={phone ?? '1234567890'}
          radius="md"
        />
      </SimpleGrid>

      <TextInput
        required
        label="Work"
        value={work}
        placeholder={work ?? 'Software engineer'}
        radius="md"
        onChange={(e) => setWork(e.currentTarget.value)}
      />

      <Group justify="flex-end">
        <Button onClick={update} radius="xl">
          {loading ? <Loader color="white" size="sm" /> : upperFirst('Save')}
        </Button>
      </Group>
    </SimpleGrid>
  );
};

const SettingsApp = () => {
  const theme = useMantineTheme();
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );

  return (
    <SimpleGrid cols={1} spacing="md">
      <Title order={4}>App settings</Title>
      <Switch
        size="sm"
        color="dark.4"
        label="Change color theme"
        onLabel={sunIcon}
        offLabel={moonIcon}
        onChange={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
      />
    </SimpleGrid>
  );
};

export default UpdateInfoUser;
