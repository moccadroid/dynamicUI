import type { FC, ReactNode } from 'react';
import type { CardLayoutProperties } from '@/dynamicUI/components/ComponentConfig';
import { Card, CardBody } from '@chakra-ui/card';

const CardLayoutComponent: FC<{ children: ReactNode, properties: CardLayoutProperties }> = ({ children, properties }) => {

  return (
    <Card width="100%">
      <CardBody>
        {children}
      </CardBody>
    </Card>
  );
};

export default CardLayoutComponent;
