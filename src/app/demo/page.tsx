'use client';

import Section from '@/dynamicUI/components/Section';
import homepageLayout from './layouts/homepage.layout.json';
import homepageData from './data/homepage.data.json';

import { Container } from '@chakra-ui/react';
import type { LayoutConfig } from '@/dynamicUI/components/ComponentConfig';

export default function HomePage() {

  return (
    <Container maxW="container.md" marginBottom={50} marginTop={50}>
      <Section layout={homepageLayout as LayoutConfig} data={homepageData} />
    </Container>
  );
}
