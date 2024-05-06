
export interface Agent<TProperties, TResult> {
  setProperties: (props: TProperties) => void;
  getProperty: <T>(name: string) => T;
  run: () => Promise<TResult>;
}
