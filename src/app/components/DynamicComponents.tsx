'use client';
import type { FC } from 'react';
import type {
  LayoutConfig,
} from '@/interfaces/components/ComponentConfig';
import ParsedLayout from '@/parser/ParsedLayout';
import { Container, Stack, Text } from '@chakra-ui/react';
import { useStateContext } from '@/state/Provider';
import { getUUIDv4 } from '@/utils/getUUIDv4';

const DynamicComponents: FC<{ config?: LayoutConfig}> = ({ config }) => {
  const { state } = useStateContext();

  return (
    <Container maxW="container.md" marginBottom={50}>

      <Stack spacing={5}>
        { config
          ? Array.isArray(state.data) ? state.data.map(() => <ParsedLayout key={getUUIDv4()} config={config} />) : <ParsedLayout key={getUUIDv4()} config={config} />
          : <Text>Please generate or select a layout</Text> }
      </Stack>
    </Container>
  );
};

export default DynamicComponents;
