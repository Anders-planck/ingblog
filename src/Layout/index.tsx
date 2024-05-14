import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, useMatches } from '@mantine/core';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';

const RootLayout = () => {
  const paddingContainer = useMatches({
    base: '0',
    md: 'lg',
  });

  return (
    <div>
      <Header />
      <Container size="xs" p={paddingContainer}>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default RootLayout;
