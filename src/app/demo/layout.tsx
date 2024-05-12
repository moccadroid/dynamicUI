'use client';

import type { ReactNode } from 'react';
import { Container } from '@chakra-ui/react';


export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <Container maxW="container.lg" marginBottom={50} marginTop={50}>
      { children }
    </Container>
  );
}
