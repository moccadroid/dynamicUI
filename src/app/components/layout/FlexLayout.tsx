import type { FC, ReactNode } from 'react';
import { Flex, Stack } from '@chakra-ui/react';
import type { FlexLayoutProperties } from '@/interfaces/config/ComponentConfig';

const FlexLayout: FC<{ children: ReactNode, properties: FlexLayoutProperties }> = ({ children, properties }) => {
  return (
    <Stack spacing={4} flexDirection={properties.direction}>
      {children}
    </Stack>
  );
};

export default FlexLayout;
