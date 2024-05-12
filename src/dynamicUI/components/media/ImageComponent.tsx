import type { ImageProperties } from '@/dynamicUI/components/ComponentConfig';
import type { FC } from 'react';
import { Image } from '@chakra-ui/image';
import { useSectionDataContext } from '@/dynamicUI/state/SectionDataProvider';
import { useFullPath } from '@/dynamicUI/state/PathProvider';

const ImageComponent: FC<{properties: ImageProperties}> = ({ properties }) => {
  const { getState } = useSectionDataContext();
  const { fullPath } = useFullPath(properties.fieldName);
  const src = getState<string>(fullPath);

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    <Image objectFit='cover' src={String(src)} alt={properties.alt}/>
  );
};

export default ImageComponent;
