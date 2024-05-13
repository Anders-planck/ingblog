import { IconAB2 } from '@tabler/icons-react';
import { Group, rem, Text } from '@mantine/core';

type LogoProps = {
  size?: number;
};
const IsaBlogLogo = ({ size }: LogoProps) => (
  <Group gap={5} align="center">
    <IconAB2 style={{ width: rem(size ?? 32), height: rem(size ?? 32) }} stroke={1.5} />
    <Text size="xl">Isa-blog</Text>
  </Group>
);

export default IsaBlogLogo;
