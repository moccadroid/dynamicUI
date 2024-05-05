import type { TextareaProperties } from '@/interfaces/components/ComponentConfig';
import type { FC } from 'react';
import { FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { useStateContext } from '@/state/Provider';
import { getAction } from '@/actions/actions';
import { getValueFromState } from '@/state/getValueFromState';

const TextareaComponent: FC<{ properties: TextareaProperties }> = ({ properties }) => {
  const { state, setState } = useStateContext();
  const { label, fieldName, ...props } = properties;
  const actionProps = { state, setState };
  const value = getValueFromState<string>({ state, path: fieldName, defaultValue: '' });
  return (
    <FormControl variant="floating">
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      <Textarea {...props} value={value} onChange={getAction(properties, actionProps)}/>
      <FormLabel>{label}</FormLabel>
    </FormControl>
  );
};

export default TextareaComponent;
