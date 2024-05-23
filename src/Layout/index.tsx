import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Container, useMatches } from '@mantine/core';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { ACCOUNT_ROUTE } from '@/routes';

const RootLayout = () => {
  const paddingContainer = useMatches({
    base: '0',
    md: 'xs',
  });

  const { pathname } = useLocation();

  const isAccountPage = pathname.includes(ACCOUNT_ROUTE);
  return (
    <div>
      <Header />
      <Container size={isAccountPage ? 'sm' : 'xs'} p={paddingContainer}>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default RootLayout;
