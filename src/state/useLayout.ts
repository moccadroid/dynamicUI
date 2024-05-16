import type { LayoutConfig } from '@/dynamicUI/components/ComponentConfig';
import { useAppState } from '@/dynamicUI/state/AppStateProvider';

export const useLayout = () => {
  const { appState, setAppState } = useAppState();

  const setLayout = (layout?: LayoutConfig) => {
    const history = appState.app.layoutHistory;
    let index = appState.app.layoutHistoryIndex;
    if (layout) {
      history.push(layout);
      index = history.length - 1;
    }
    setAppState('layout', layout);
    setAppState('layoutHistory', history);
    setAppState('app.layoutHistoryIndex', index);
  };

  const setLayoutName = (layoutName?: string) => {
    setAppState('layoutName', layoutName);
  };

  return { layout: appState.layout, setLayout, layoutName: appState.layoutName, setLayoutName };
};
