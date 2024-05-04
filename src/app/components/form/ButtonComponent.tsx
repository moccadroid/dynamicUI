import type { ButtonProperties } from '@/interfaces/config/ComponentConfig';
import { Button } from '@chakra-ui/react';
import type { FC } from 'react';
import { useStateContext } from '@/state/Provider';
import { getAction } from '@/actions/actions';

const ButtonComponent: FC<{ properties: ButtonProperties }> = ({ properties }) => {
  const { state, setState } = useStateContext();
  const { text } = properties;
  const actionProps = { state, setState };
  return <Button onClick={getAction(properties, actionProps)}>{text}</Button>;
};

export default ButtonComponent;
