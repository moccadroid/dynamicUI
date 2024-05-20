import type { FC, ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';
import type { FlexLayoutProperties } from '@/dynamicUI/components/ComponentConfig';

const FlexLayoutComponent: FC<{ children: ReactNode, properties: FlexLayoutProperties }> = ({ children, properties }) => {
  const { direction, align, justify, gap } = properties;
  return (
    <Flex gap={gap} flexDirection={direction} justifyContent={justify} alignItems={align}>
      {children}
    </Flex>
  );
};

export default FlexLayoutComponent;
