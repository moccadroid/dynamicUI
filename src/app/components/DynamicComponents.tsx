'use client';
import type {
  LayoutConfig,
} from '@/dynamicUI/components/ComponentConfig';
import { Container, Stack } from '@chakra-ui/react';
import Section from '@/dynamicUI/components/Section';
import { useAppState } from '@/dynamicUI/state/AppStateProvider';

const DynamicComponents = () => {
  const { appState } = useAppState();

  return (
    <Container maxW="container.lg" marginBottom={50}>
      <Stack spacing={5}>
        <Section layout={appState.layout as LayoutConfig} data={appState.data} debug={appState.debug} />
      </Stack>
    </Container>
  );
};

export default DynamicComponents;
