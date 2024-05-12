import type { FC, ReactNode } from 'react';
import { Stack } from '@chakra-ui/react';
import type { FlexLayoutProperties } from '@/dynamicUI/components/ComponentConfig';

const FlexLayoutComponent: FC<{ children: ReactNode, properties: FlexLayoutProperties }> = ({ children, properties }) => {
  const { direction, align, justify } = properties;
  return (
    <Stack spacing={4} flexDirection={direction} justifyContent={justify} alignItems={align}>
      {children}
    </Stack>
  );
};

export default FlexLayoutComponent;
