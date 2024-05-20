import type { GetAppState, SetAppState } from '@/dynamicUI/state/AppStateProvider';

export interface ActionParams {
  setAppState: SetAppState;
  getAppState: GetAppState;
  setLoading: (key: string, state: boolean) => void;
  loadingStates: { [key: string]: boolean };
}

export interface Action {
  (params: ActionParams): (name: string, ...args: any[]) => Promise<void>;
}

export interface ActionMap {
  [key: string]: (name: string, ...args: any[]) => Promise<void>;
}

export interface Actions {
  [key: string]: Action;
}

export const createAction = (action: (params: ActionParams) => (name: string, ...args: any[]) => Promise<void>): Action => {
  return ({ setAppState, getAppState, setLoading, loadingStates }) => async (name: string, ...args: any[]) => {
    setLoading(name, true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await action({ setAppState, getAppState, setLoading, loadingStates })(name, ...args);
    } finally {
      setLoading(name, false);
    }
  };
};

export const internalActions : Actions = {


};


