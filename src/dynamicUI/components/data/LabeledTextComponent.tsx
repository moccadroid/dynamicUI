import type { LabeledTextProperties } from '@/dynamicUI/components/ComponentConfig';
import type { FC } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { useSectionDataContext } from '@/dynamicUI/state/SectionDataProvider';
import { useFullPath } from '@/dynamicUI/state/PathProvider';
import useFormat from '@/dynamicUI/actions/format';

const LabeledTextComponent: FC<{ properties: LabeledTextProperties }> = ({ properties }) => {
  const { getState } = useSectionDataContext();
  const { fullPath } = useFullPath(properties.fieldName);
  const textValue = getState<string>(fullPath) ?? '';
  const format = useFormat(properties.format);

  return (
    <Flex>
      <Text as='b' fontSize={properties.fontSize}>{format(properties.label ?? '')}</Text>
      <span style={{ marginLeft: '5px', marginRight: '5px' }}>{properties.separator}</span>
      <Text fontSize={properties.fontSize}>{format(textValue)}</Text>
    </Flex>
  );
};

export default LabeledTextComponent;
