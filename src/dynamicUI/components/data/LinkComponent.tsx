import type { LinkProperties } from '@/dynamicUI/components/ComponentConfig';
import NextLink from 'next/link';
import type { FC } from 'react';
import { Link } from '@chakra-ui/react';
import { useFullPath } from '@/dynamicUI/state/PathProvider';
import { useSectionDataContext } from '@/dynamicUI/state/SectionDataProvider';

const LinkComponent: FC<{ properties: LinkProperties }> = ({ properties }) => {
  const { fieldName, label, labelField } = properties;
  const { fullPath, getFullPath } = useFullPath(fieldName);
  const { getState } = useSectionDataContext();
  const href = getState<string>(fullPath);
  const text = labelField ? getState<string>(getFullPath(labelField)) : (label ?? href);

  return (
    <Link target="_blank" rel="noopener noreferrer" as={NextLink} href={typeof href === 'string' ? href : ''}>{text}</Link>
  );
};

export default LinkComponent;
