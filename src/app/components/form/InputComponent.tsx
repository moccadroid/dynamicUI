import type { InputProperties } from '@/interfaces/config/ComponentConfig';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import type { FC } from 'react';
import { getAction } from '@/actions/actions';
import { useStateContext } from '@/state/Provider';
import { getValueFromState } from '@/state/getValueFromState';
import type { UpdateFieldParams } from '@/interfaces/actions/ActionConfig';

const InputComponent: FC<{ properties: InputProperties }> = ({ properties }) => {
  const { state, setState } = useStateContext();
  const { label, fieldName, ...props } = properties;
  const value = getValueFromState<string | number>(state, fieldName, '');
  const actionParams: UpdateFieldParams = {
    setState,
    fieldName,
    defaultValue: value,
  };
  return (
    <FormControl variant="floating">
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      <Input {...props} value={value} onChange={getAction(properties, actionParams)}/>
      <FormLabel>{label}</FormLabel>
    </FormControl>
  );
};

export default InputComponent;
