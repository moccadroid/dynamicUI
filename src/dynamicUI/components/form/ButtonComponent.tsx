import type { ButtonProperties } from '@/dynamicUI/components/ComponentConfig';
import { Button } from '@chakra-ui/react';
import type { FC } from 'react';

const ButtonComponent: FC<{ properties: ButtonProperties }> = ({ properties }) => {
  const { text } = properties;

  return <Button type={properties.type}>{text}</Button>;
};

export default ButtonComponent;
