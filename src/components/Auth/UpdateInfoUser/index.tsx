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
  Switch,
  rem,
} from '@mantine/core';
import React from 'react';
import { upperFirst } from '@mantine/hooks';
import { IconInfoCircle, IconMoonStars, IconSun, IconTrash } from '@tabler/icons-react';
import { ConfirmationModal } from '@/components/ConfirmationModal';

type UpdateInfoUserProps = {
  user: any;
  logout: any;
  deleteAccount: any;
  updateNameProps: UpdateNameProps;
  settingAppProps: SettingsAppProps;
};
const UpdateInfoUser = ({
  user,
  logout,
  deleteAccount,
  settingAppProps,
  updateNameProps,
}: UpdateInfoUserProps) => (
  <SimpleGrid cols={1} spacing="md">
    <Stack>
      <Title order={4}>Email</Title>
      <TextInput required value={user?.email} placeholder="john@doe.io" disabled radius="md" />
    </Stack>
    <Divider />
    <UpdateName {...updateNameProps} />
    <Divider />
    <SettingsApp {...settingAppProps} />
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

type UpdateNameProps = {
  name: any;
  phone: any;
  work: any;
  setName: any;
  setPhone: any;
  setWork: any;
  errorMessage: any;
  successMessage: any;
  setErrorMessage: any;
  setSuccessMessage: any;
  loading: any;
  isLoading: any;
  update: any;
};
export const UpdateName = ({
  name,
  phone,
  work,
  setName,
  setPhone,
  setWork,
  errorMessage,
  successMessage,
  setErrorMessage,
  setSuccessMessage,
  loading,
  isLoading,
  update,
}: UpdateNameProps) => {
  const [initialName, setInitialName] = React.useState(name);
  const [initialPhone, setInitialPhone] = React.useState(phone);
  const [initialWork, setInitialWork] = React.useState(work);

  const handleSave = () => {
    update();
  };

  const handleSetName = (e: any) => {
    setName(e.target.value);
    setInitialName(e.target.value);
  };

  const handleSetPhone = (e: any) => {
    setPhone(e.target.value);
    setInitialPhone(e.target.value);
  };

  const handleSetWork = (e: any) => {
    setWork(e.target.value);
    setInitialWork(e.target.value);
  };
  const icon = <IconInfoCircle />;

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
          value={initialName}
          onChange={handleSetName}
          placeholder={initialName ?? 'John Doe'}
          radius="md"
        />

        <TextInput
          required
          label="Phone number"
          value={initialPhone}
          onChange={handleSetPhone}
          placeholder={initialPhone ?? '1234567890'}
          radius="md"
        />
      </SimpleGrid>

      <TextInput
        required
        label="Work"
        value={initialWork}
        placeholder={initialWork ?? 'Software engineer'}
        radius="md"
        onChange={handleSetWork}
      />

      <Group justify="flex-end">
        <Button onClick={handleSave} radius="xl">
          {loading || isLoading ? <Loader color="white" size="sm" /> : upperFirst('Save')}
        </Button>
      </Group>
    </SimpleGrid>
  );
};

type SettingsAppProps = {
  setColorScheme: any;
  colorScheme: any;
  theme: any;
};
export const SettingsApp = ({ setColorScheme, colorScheme, theme }: SettingsAppProps) => {
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
