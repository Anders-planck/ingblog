import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mantine/core';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';

const RootLayout = () => (
  <div>
    <Header />
    <Container size="xs">
      <Outlet />
    </Container>
    <Footer />
  </div>
);

export default RootLayout;
