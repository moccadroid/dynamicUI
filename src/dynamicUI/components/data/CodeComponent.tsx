import type { FC } from 'react';
import type { CodeProperties } from '@/dynamicUI/components/ComponentConfig';
import { Box, Code, Text } from '@chakra-ui/react';
import { useFullPath } from '@/dynamicUI/state/PathProvider';
import { useSectionDataContext } from '@/dynamicUI/state/SectionDataProvider';

const CodeComponent: FC<{ properties: CodeProperties}> = ({ properties }) => {
  const { fieldName, description, type } = properties;
  const { getState } = useSectionDataContext();
  const { fullPath } = useFullPath(fieldName);
  const code = getState<string>(fullPath);

  if (code && type === 'json') {
    try {
      const json = JSON.parse(code);
      const visual = JSON.stringify(json, null, 4);

      return (
        <Box bg={'gray.200'} padding={4}>
          <pre>{visual}</pre>
          <Text textAlign="right" fontSize={'sm'}>{description}</Text>
        </Box>
      );
    } catch (e) {
      console.error('code json could not be parsed', code);
    }
  }
  return (
    <Code children={code} variant="subtle" padding={3}/>
  );
};

export default CodeComponent;
