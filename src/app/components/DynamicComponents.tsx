'use client';

import type { FC } from 'react';
import type {
  LayoutConfig,
} from '@/interfaces/config/ComponentConfig';
import { StateProvider } from '@/state/Provider';
import ParsedLayout from '@/parser/ParsedLayout';
import { Container } from '@chakra-ui/react';

const DynamicComponents: FC<{ config: LayoutConfig, data: any}> = ({ config, data }) => {

  return (
    <StateProvider initialState={data}>
      <Container maxW="container.md" marginBottom={50}>
        <ParsedLayout config={config} />
      </Container>
    </StateProvider>

  );
};

export default DynamicComponents;
