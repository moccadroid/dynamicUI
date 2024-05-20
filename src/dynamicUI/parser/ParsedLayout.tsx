import type { ComponentConfig, LayoutConfig, } from '@/dynamicUI/components/ComponentConfig';
import ParsedComponent from '@/dynamicUI/parser/ParsedComponent';
import type { FC } from 'react';
import { useMemo } from 'react';
import { getUUIDv4 } from '@/utils/getUUIDv4';

const ParsedLayout: FC<{ config: LayoutConfig, debug?: boolean }> = ({ config, debug = false }) => {

  return useMemo(() => {
    if (Array.isArray(config?.components)) {
      return config.components.map((componentConfig: ComponentConfig) => {
        return <ParsedComponent key={getUUIDv4()} config={componentConfig} debug={debug}/>;
      });
    } else {
      console.log('illegal config', config);
    }
  }, [config, debug]);
};

export default ParsedLayout;
