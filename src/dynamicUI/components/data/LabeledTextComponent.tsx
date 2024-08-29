import type { LabeledTextProperties } from '@/dynamicUI/components/ComponentConfig';
import type { FC } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { useSectionDataContext } from '@/dynamicUI/state/SectionDataProvider';
import { useFullPath } from '@/dynamicUI/state/PathProvider';
import useFormat from '@/dynamicUI/actions/format';

const LabeledTextComponent: FC<{ properties: LabeledTextProperties }> = ({ properties }) => {
  const { fieldName, separator, label, fontSize } = properties;
  const { getSectionState } = useSectionDataContext();
  const { fullPath } = useFullPath(fieldName);
  const textValue = getSectionState<string>(fullPath) ?? '';
  const format = useFormat(properties.format);

  return (
    <Flex>
      <Text as='b' fontSize={fontSize}>{format(label ?? '')}</Text>
      <span style={{ marginLeft: '5px', marginRight: '5px' }}>{separator}</span>
      <Text fontSize={fontSize}>{format(textValue)}</Text>
    </Flex>
  );
};

export default LabeledTextComponent;
