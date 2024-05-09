import componentConfig from './componentConfig.json';

interface Definitions {
  [key: string]: string;
}

export const getDefinitions = (names?: string[]): string => {
  const typedInterfaces: Definitions = componentConfig;
  if (names?.length) {
    return names.map(name => typedInterfaces[name] ?? '').join(', ');
  }
  return Object.values(typedInterfaces).join(', ');
};
