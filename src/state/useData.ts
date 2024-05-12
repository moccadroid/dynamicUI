import type { State } from '@/state/Provider';
import { useStateContext } from '@/state/Provider';

export const useData = () => {
  const { state, setState } = useStateContext();

  const setData = (data?: any) => {
    setState((prevState: State) => {
      const newState = { ...prevState };
      newState.data = data;
      newState.exampleData = data;
      return newState;
    });
  };

  return { setData, data: state.data };
};
