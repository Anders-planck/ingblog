import { Anchor, Container, Group, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './Footer.module.css';
import { HOME_ROUTE } from '@/routes';

const links = [{ link: HOME_ROUTE, label: 'Home' }];

export function Footer() {
  const navigate = useNavigate();
  const items = links.map((link) => (
    <Anchor
      onClick={() => navigate(link.link)}
      key={link.label}
      style={{
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <Text size="sm" className={classes.link} c="dimmed">
        {link.label}
      </Text>
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text size="sm">© 2024 Isa-blog</Text>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}
