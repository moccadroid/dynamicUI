import type { ImageProperties } from '@/interfaces/config/ComponentConfig';
import type { FC } from 'react';
import { Image } from '@chakra-ui/image';
import { useStateContext } from '@/state/Provider';
import { getValueFromState } from '@/state/getValueFromState';

const ImageComponent: FC<{properties: ImageProperties}> = ({ properties }) => {
  const { state } = useStateContext();
  const src = getValueFromState<string>(state, properties.fieldName, '');
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    <Image src={String(src)} alt={properties.alt}/>
  );
};

export default ImageComponent;
