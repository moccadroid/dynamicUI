import type { FC } from 'react';
import type { CodeProperties } from '@/dynamicUI/components/ComponentConfig';
import { Code } from '@chakra-ui/react';
import { useFullPath } from '@/dynamicUI/state/PathProvider';
import { useSectionDataContext } from '@/dynamicUI/state/SectionDataProvider';

const CodeComponent: FC<{ properties: CodeProperties}> = ({ properties }) => {
  const { fieldName } = properties;
  const { getState } = useSectionDataContext();
  const { fullPath } = useFullPath(fieldName);
  const code = getState<string>(fullPath);

  return (
    <Code children={code} variant="subtle" padding={3}/>
  );
};

export default CodeComponent;
