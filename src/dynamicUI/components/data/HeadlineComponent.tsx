import type { HeadlineProperties } from '@/dynamicUI/components/ComponentConfig';
import type { FC } from 'react';
import { Heading } from '@chakra-ui/react';

const HeadlineComponent: FC<{ properties: HeadlineProperties}> = ({ properties }) => {
  return <Heading as={`h${properties.level}`} marginBottom={8}>{properties.text}</Heading>;
};

export default HeadlineComponent;
