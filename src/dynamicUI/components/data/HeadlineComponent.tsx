import type { HeadlineProperties } from '@/dynamicUI/components/ComponentConfig';
import type { FC } from 'react';
import { Heading } from '@chakra-ui/react';
import { useFullPath } from '@/dynamicUI/state/PathProvider';
import { useSectionDataContext } from '@/dynamicUI/state/SectionDataProvider';

const HeadlineComponent: FC<{ properties: HeadlineProperties}> = ({ properties }) => {
  const { level, text, fieldName } = properties;
  const { getFullPath } = useFullPath();
  const { getState } = useSectionDataContext();

  const value = fieldName ? getState<string>(getFullPath(fieldName)) : (text ?? 'undefined');
  return <Heading as={`h${level}`} marginBottom={8}>{value}</Heading>;
};

export default HeadlineComponent;
