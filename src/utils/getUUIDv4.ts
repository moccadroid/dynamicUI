import { v4 } from 'uuid';

type UUIDv4 = () => string;

export const getUUIDv4 = () => {
  return (v4 as UUIDv4)();
};
