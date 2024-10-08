import { useAppState } from '@/dynamicUI/state/AppStateProvider';

export const useData = () => {
  const { appState, setAppState } = useAppState();

  const setData = (data?: any) => {
    setAppState('data', data);
  };

  return { setData, data: appState.data };
};
