import type { ComponentConfig, LayoutConfig, } from '@/interfaces/config/ComponentConfig';
import ParsedComponent from '@/parser/ParsedComponent';
import type { FC } from 'react';
import { useMemo } from 'react';
import { getUUIDv4 } from '@/utils/getUUIDv4';

const ParsedLayout: FC<{ config: LayoutConfig}> = ({ config }) => {

  return useMemo(() => {
    return config.components.map((componentConfig: ComponentConfig) => {
      return <ParsedComponent key={getUUIDv4()} config={componentConfig} />;
    });
  }, [config]);
};

export default ParsedLayout;
