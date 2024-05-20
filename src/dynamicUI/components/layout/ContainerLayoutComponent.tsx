import type { ContainerLayoutProperties } from '@/dynamicUI/components/ComponentConfig';
import type { FC, ReactNode } from 'react';
import { Container } from '@chakra-ui/react';

const ContainerLayoutComponent: FC<{ children: ReactNode, properties: ContainerLayoutProperties }> =
  ({ children, properties }) => {
    const { maxWidth, maxHeight, centerContent } = properties;
    return (
      <Container overflow="auto" maxHeight={maxHeight ?? 'auto'} maxWidth={maxWidth ?? '100%'} centerContent={centerContent}>
        { children }
      </Container>
    );
  };

export default ContainerLayoutComponent;
