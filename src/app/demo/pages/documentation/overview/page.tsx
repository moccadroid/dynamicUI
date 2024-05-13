'use client';

import Section from '@/dynamicUI/components/Section';
import componentOverviewLayout from '../../../layouts/componentOverview.layout.json';
import componentOverviewData from '../../../data/componentOverview.data.json';
import type { LayoutConfig } from '@/dynamicUI/components/ComponentConfig';
import { Stack } from '@chakra-ui/react';

export default function DocumentationOverviewPage() {


  return (
    <Stack spacing={8}>
      <Section layout={componentOverviewLayout as LayoutConfig} data={componentOverviewData} />;
    </Stack>
  );
}
