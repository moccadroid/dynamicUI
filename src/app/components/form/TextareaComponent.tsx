import type { TextareaProperties } from '@/interfaces/components/ComponentConfig';
import type { FC } from 'react';
import { FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { useStateContext } from '@/state/Provider';
import { getAction } from '@/actions/actions';
import { getValueFromState } from '@/state/getValueFromState';
import type { UpdateFieldParams } from '@/interfaces/actions/ActionConfig';

const TextareaComponent: FC<{ properties: TextareaProperties }> = ({ properties }) => {
  const { state, setState } = useStateContext();
  const { label, fieldName, placeholder } = properties;
  const value = getValueFromState<string | number>(
    { state, path: fieldName, defaultValue: '' }
  );
  const actionParams: UpdateFieldParams = {
    setState,
    fieldName,
    defaultValue: value,
  };
  return (
    <FormControl variant="floating">
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      <Textarea placeholder={placeholder} value={value} onChange={getAction(properties, actionParams)}/>
      <FormLabel>{label}</FormLabel>
    </FormControl>
  );
};

export default TextareaComponent;
