import type { FC } from 'react';
import type { TextProperties } from '@/interfaces/components/ComponentConfig';
import { getValueFromState } from '@/state/getValueFromState';
import { useStateContext } from '@/state/Provider';
import { Text } from '@chakra-ui/react';

const TextComponent: FC<{ properties: TextProperties }> = ({ properties }) => {
  const { state } = useStateContext();
  const textValue = getValueFromState({ state, path: properties.fieldName, defaultValue: '' });
  return (
    <Text fontSize={properties.fontSize}>{textValue}</Text>
  );
};

export default TextComponent;
