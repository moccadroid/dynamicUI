import type { FC, ReactNode } from 'react';
import type { CardLayoutProperties } from '@/interfaces/components/ComponentConfig';
import { Card, CardBody, CardHeader } from '@chakra-ui/card';
import { Heading } from '@chakra-ui/react';

const CardLayoutComponent: FC<{ children: ReactNode, properties: CardLayoutProperties }> = ({ children, properties }) => {

  return (
    <Card>
      <CardHeader>
        <Heading size="md">{properties.title}</Heading>
      </CardHeader>
      <CardBody>
        {children}
      </CardBody>
    </Card>
  );
};

export default CardLayoutComponent;
