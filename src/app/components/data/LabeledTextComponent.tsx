import type { LabeledTextProperties } from '@/interfaces/components/ComponentConfig';
import type { FC } from 'react';
import { useStateContext } from '@/state/Provider';
import { getValueFromState } from '@/state/getValueFromState';
import { Flex, Text } from '@chakra-ui/react';

const LabeledTextComponent: FC<{ properties: LabeledTextProperties }> = ({ properties }) => {
  const { state } = useStateContext();
  const text = getValueFromState({ state, path: properties.fieldName, defaultValue: '' });
  return (
    <Flex>

      <Text as='b' fontSize={properties.fontSize}>{properties.label}</Text>
      <span style={{ marginLeft: '5px', marginRight: '5px' }}>{properties.separator}</span>
      <Text fontSize={properties.fontSize}>{text}</Text>
    </Flex>
  );
};

export default LabeledTextComponent;
