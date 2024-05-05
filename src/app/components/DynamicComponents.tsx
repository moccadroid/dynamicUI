'use client';
import type { FC } from 'react';
import { useMemo } from 'react';
import type {
  LayoutConfig,
} from '@/interfaces/components/ComponentConfig';
import ParsedLayout from '@/parser/ParsedLayout';
import { Container, Stack, Text } from '@chakra-ui/react';
import { useStateContext } from '@/state/Provider';
import { getUUIDv4 } from '@/utils/getUUIDv4';

const DynamicComponents: FC<{ config?: LayoutConfig}> = () => {
  const { state } = useStateContext();

  const layout = useMemo(() => {
    if (state.layout) {
      return <ParsedLayout key={getUUIDv4()} config={state.layout} />;
    }
    return <Text>Please generate or select a layout</Text>;
  }, [state.layout]);

  return (
    <Container maxW="container.md" marginBottom={50}>

      <Stack spacing={5}>
        { layout }
      </Stack>
    </Container>
  );
};

export default DynamicComponents;
