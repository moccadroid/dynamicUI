'use client';

import Section from '@/dynamicUI/components/Section';
import documentationLayout from '../../layouts/documentation.layout.json';
import documentationData from '../../data/documentation.data.json';
import type { LayoutConfig } from '@/dynamicUI/components/ComponentConfig';
import { Stack } from '@chakra-ui/react';

export default function DocumentationPage() {


  return (
    <Stack spacing={8}>
      { Object.entries(documentationData).map(([key, value]) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return <Section key={key} layout={documentationLayout[key] as LayoutConfig} data={value} />;
      })}

    </Stack>
  );
}
