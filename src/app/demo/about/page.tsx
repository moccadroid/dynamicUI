'use client';

import Section from '@/dynamicUI/components/Section';
import landingpageLayout from '../layouts/landingpage.layout.json';
import landingpageData from '../data/landingpage.data.json';

import { Container, Stack } from '@chakra-ui/react';
import type { LayoutConfig } from '@/dynamicUI/components/ComponentConfig';

export default function HomePage() {

  return (

    <Section layout={landingpageLayout as LayoutConfig} data={landingpageData} />

  );
}
