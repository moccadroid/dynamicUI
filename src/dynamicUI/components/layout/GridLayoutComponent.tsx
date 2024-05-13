import type { FC, ReactNode } from 'react';
import type { GridLayoutProperties } from '@/dynamicUI/components/ComponentConfig';
import { Grid } from '@chakra-ui/react';

const GridLayoutComponent: FC<{ children: ReactNode ,properties: GridLayoutProperties}> = ({ children, properties }) => {
  const { gridSettings } = properties;

  return (
    <Grid>
      { children }
    </Grid>
  );
};

export default GridLayoutComponent;
