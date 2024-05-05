import type { ImageProperties } from '@/interfaces/components/ComponentConfig';
import type { FC } from 'react';
import { Image } from '@chakra-ui/image';
import { useStateContext } from '@/state/Provider';
import { getValueFromState } from '@/state/getValueFromState';

const ImageComponent: FC<{properties: ImageProperties}> = ({ properties }) => {
  const { state } = useStateContext();
  const src = getValueFromState<string>({ state, path: properties.fieldName, defaultValue: '' });
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    <Image src={String(src)} alt={properties.alt}/>
  );
};

export default ImageComponent;
