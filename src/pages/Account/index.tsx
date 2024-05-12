import { SimpleGrid } from '@mantine/core';
import { UserInfoIcons } from '@/components/UserInfo';
import UpdateInfoUser from '@/components/Auth/UpdateInfoUser';

export default function Account() {
  return (
    <SimpleGrid cols={1} spacing="xl">
      <UserInfoIcons />
      <UpdateInfoUser />
    </SimpleGrid>
  );
}
