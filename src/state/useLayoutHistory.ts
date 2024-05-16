import { useAppState } from '@/dynamicUI/state/AppStateProvider';

export const useLayoutHistory = () => {
  const { appState, setAppState } = useAppState();

  const goForward = () => {
    const index = appState.app.layoutHistoryIndex + 1;
    if (index < appState.app.layoutHistory.length) {
      const layout = appState.app.layoutHistory[index];
      setAppState('layout', layout);
      setAppState('app.layoutHistoryIndex', index);
    }
  };

  const goBack = () => {
    const index = appState.app.layoutHistoryIndex - 1;
    if (index > 0) {
      const layout = appState.app.layoutHistory[index];
      setAppState('layout', layout);
      setAppState('app.layoutHistoryIndex', index);
    }
  };

  return { goForward, goBack };
};
