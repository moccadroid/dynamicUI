import type { ButtonProperties } from '@/interfaces/components/ComponentConfig';
import { Button } from '@chakra-ui/react';
import type { FC } from 'react';
import { useStateContext } from '@/state/Provider';
import { getAction } from '@/actions/actions';

const ButtonComponent: FC<{ properties: ButtonProperties }> = ({ properties }) => {
  const { state } = useStateContext();
  const { text } = properties;
  const actionParams = { formData: state.data };
  return <Button onClick={getAction(properties, actionParams)}>{text}</Button>;
};

export default ButtonComponent;
