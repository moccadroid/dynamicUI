import type { FC } from 'react';
import type { TextProperties } from '@/dynamicUI/components/ComponentConfig';
import { Text } from '@chakra-ui/react';
import { useSectionDataContext } from '@/dynamicUI/state/SectionDataProvider';
import { useFullPath } from '@/dynamicUI/state/PathProvider';
import useFormat from '@/dynamicUI/actions/format';

const TextComponent: FC<{ properties: TextProperties }> = ({ properties }) => {
  const { getState } = useSectionDataContext();
  const { fullPath } = useFullPath(properties.fieldName);
  console.log(fullPath);

  const textValue = getState<string>(fullPath) ?? '';
  console.log(textValue);
  const format = useFormat(properties.format);

  return (
    <Text fontSize={properties.fontSize}>{format(textValue)}</Text>
  );
};

export default TextComponent;
