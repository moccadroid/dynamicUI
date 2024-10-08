import type { HeadlineProperties } from '@/dynamicUI/components/ComponentConfig';
import type { FC } from 'react';
import { Heading } from '@chakra-ui/react';
import { useFullPath } from '@/dynamicUI/state/PathProvider';
import { useSectionDataContext } from '@/dynamicUI/state/SectionDataProvider';

const HeadlineComponent: FC<{ properties: HeadlineProperties}> = ({ properties }) => {
  const { level, label, fieldName, align } = properties;
  const { getFullPath } = useFullPath();
  const { getSectionState } = useSectionDataContext();

  const headingSizes = {
    1: '4xl',
    2: '3xl',
    3: '2xl',
    4: 'xl',
    5: 'lg',
    6: 'md',
    7: 'sm',
    8: 'xs'
  };

  const value = fieldName ? getSectionState<string>(getFullPath(fieldName)) : (label ?? 'undefined');
  return <Heading textAlign={align as any} as={`h${level}`} size={headingSizes[level]} marginBottom={2}>{value}</Heading>;
};

export default HeadlineComponent;
