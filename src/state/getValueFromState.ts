type Primitive = string | number | boolean;

export const getValueFromState = <T extends Primitive>(state: any, path: string, defaultValue: T): T => {
  const keys = path.split('.');
  let result: any = state;

  for (const key of keys) {
    if (result === null || result === undefined) {
      return defaultValue; // Use default value when path is invalid
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    result = result[key];
  }

  if (typeof result === 'string' || typeof result === 'number' || typeof result === 'boolean') {
    return result as T; // Return result with its actual type if it's a Primitive
  }

  return defaultValue; // Return default value if no types matched
};
