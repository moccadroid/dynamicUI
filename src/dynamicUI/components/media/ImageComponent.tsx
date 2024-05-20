import type { ImageProperties } from '@/dynamicUI/components/ComponentConfig';
import type { FC } from 'react';
import { Image } from '@chakra-ui/image';
import { useSectionDataContext } from '@/dynamicUI/state/SectionDataProvider';
import { useFullPath } from '@/dynamicUI/state/PathProvider';

const ImageComponent: FC<{properties: ImageProperties}> = ({ properties }) => {
  const { fieldName, alt, size } = properties;
  const { getSectionState } = useSectionDataContext();
  const { fullPath } = useFullPath(fieldName);
  const src = getSectionState<string>(fullPath);

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    <Image boxSize={size} objectFit='cover' src={String(src)} alt={alt}/>
  );
};

export default ImageComponent;
