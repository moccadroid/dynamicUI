import type { FC } from 'react';
import type { TextProperties } from '@/dynamicUI/components/ComponentConfig';
import { Text } from '@chakra-ui/react';
import { useSectionDataContext } from '@/dynamicUI/state/SectionDataProvider';
import { useFullPath } from '@/dynamicUI/state/PathProvider';
import useFormat from '@/dynamicUI/actions/format';

const TextComponent: FC<{ properties: TextProperties }> = ({ properties }) => {
  const { fieldName, format: formats, fontSize, align } = properties;
  const { getSectionState } = useSectionDataContext();
  const { fullPath } = useFullPath(fieldName);
  const textValue = getSectionState<string>(fullPath) ?? '';
  const format = useFormat(formats);

  return (
    <Text textAlign={align as any} fontSize={fontSize}>{format(textValue)}</Text>
  );
};

export default TextComponent;
