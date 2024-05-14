import { SimpleGrid, useMatches } from '@mantine/core';
import { UserInfoIcons } from '@/components/UserInfo';
import UpdateInfoUser from '@/components/Auth/UpdateInfoUser';

export default function Account() {
  const padding = useMatches({
    base: 'xs',
    md: 'none',
  });
  return (
    <SimpleGrid cols={1} spacing="xl" p={padding}>
      <UserInfoIcons />
      <UpdateInfoUser />
    </SimpleGrid>
  );
}
