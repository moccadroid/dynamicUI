import type { ComponentConfig, LayoutConfig, } from '@/interfaces/components/ComponentConfig';
import ParsedComponent from '@/parser/ParsedComponent';
import type { FC } from 'react';
import { useMemo } from 'react';
import { getUUIDv4 } from '@/utils/getUUIDv4';

const ParsedLayout: FC<{ config: LayoutConfig}> = ({ config }) => {

  return useMemo(() => {
    if (Array.isArray(config.components)) {
      return config.components.map((componentConfig: ComponentConfig) => {
        return <ParsedComponent key={getUUIDv4()} config={componentConfig}/>;
      });
    } else {
      console.log(`illegal config ${config}`);
    }
  }, [config]);
};

export default ParsedLayout;
