'use client';

import Section from '@/dynamicUI/components/Section';
import documentationLayout from '../../layouts/documentation.layout.json';
import documentationData from '../../data/documentation.data.json';
import type { LayoutConfig } from '@/dynamicUI/components/ComponentConfig';
import { Stack } from '@chakra-ui/react';

export default function HomePage() {


  return (
    <Stack spacing={5}>
      { Object.entries(documentationData).map(([key, value]) => {
        // @ts-ignore
        return <Section layout={documentationLayout[key] as LayoutConfig} data={value} />;
      })}

    </Stack>
  );
}
