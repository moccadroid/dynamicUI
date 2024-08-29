'use client';

import Section from '@/dynamicUI/components/Section';
import homepageLayout from './layouts/homepage.layout.json';
import homepageData from './data/homepage.data.json';

import { Stack } from '@chakra-ui/react';
import type { LayoutConfig } from '@/dynamicUI/components/ComponentConfig';

export default function HomePage() {

  return (
    <Stack spacing={5}>
      <Section layout={homepageLayout as LayoutConfig} data={homepageData} />
    </Stack>
  );
}
