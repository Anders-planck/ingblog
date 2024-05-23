import { Container, Flex } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Page from '@/Layout/Page';
import { AuthForm } from '@/components/Auth';
import { useAppSelector } from '@/store';
import { selectIsAuthenticated } from '@/store/auth';
import { HOME_ROUTE } from '@/routes';

const Authenticator = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(HOME_ROUTE);
    }
  }, [isAuthenticated]);

  return (
    <Page title="Authenticator">
      <Container size="xs">
        <Flex
          direction="column"
          align="center"
          justify="center"
          style={{
            height: 'calc(100vh - 100px)',
          }}
        >
          <AuthForm />
        </Flex>
      </Container>
    </Page>
  );
};

export default Authenticator;
