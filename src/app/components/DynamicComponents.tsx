'use client';
import type { FC } from 'react';
import type {
  LayoutConfig,
} from '@/dynamicUI/components/ComponentConfig';
import { Container, Stack } from '@chakra-ui/react';
import { useStateContext } from '@/state/Provider';
import Section from '@/dynamicUI/components/Section';

const DynamicComponents: FC<{ config?: LayoutConfig}> = () => {
  const { state } = useStateContext();

  return (
    <Container maxW="container.lg" marginBottom={50}>
      <Stack spacing={5}>
        <Section layout={state.layout as LayoutConfig} data={state.data}/>
      </Stack>
    </Container>
  );
};

export default DynamicComponents;
