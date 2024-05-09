import type { State } from '@/state/Provider';

type Primitive = string | number | boolean | [];

export interface GetValueParams<T> {
  state: State,
  path: string,
  defaultValue: T,
  prefix?: string,
}

export const getValueFromState = <T extends Primitive>({ state, path, defaultValue, prefix = 'data' }: GetValueParams<T>): T => {
  const keys = (prefix + '.' + path).split('.');
  let result: any = state;

  for (const key of keys) {
    if (result === null || result === undefined) {
      return defaultValue; // Use default value when path is invalid
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    result = result[key];
  }

  if (typeof result === 'string' || typeof result === 'number' || typeof result === 'boolean' || Array.isArray(result)) {
    return result as T; // Return result with its actual type if it's a Primitive
  }

  return defaultValue; // Return default value if no types matched
};
