/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

export function pipe<T = any>(...args: Function[]): (value: any) => T {
  return (value: any): T => {
    return args.reduce((prev: any, curr: Function) => {
      return curr(prev);
    }, value);
  };
}

type PipePromise<T = any> = (value?: any) => Promise<T>;
export const pipePromise = <T>(...args: PipePromise[]): PipePromise<T> => {
  return (value: any): Promise<T> => {
    return args.reduce((prev: Promise<any>, curr: PipePromise) => {
      return prev.then((result: any) => {
        return curr(result);
      });
    }, Promise.resolve(value));
  };
};
