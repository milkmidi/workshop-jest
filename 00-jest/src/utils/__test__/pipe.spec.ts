/* eslint-disable @typescript-eslint/no-explicit-any */
import { pipe, pipePromise } from '../pipe';

describe('#pipe', () => {
  it('should execute functions with pipe sequence', () => {
    const funcList = [(v: any) => v + 5, (v: any) => v * 9, (v: any) => `$${v}`];

    const result = pipe<string>(...funcList)(2);
    expect(result).toBe('$63');
  });

  it('should execute functions by pipe flow and return result', () => {
    const funcList = [(v: any) => v - 654, (v: any) => v * 987.987, Math.abs, Math.round];

    expect(pipe<number>(...funcList)(17)).toBe(629348);
    expect(pipe<number>(...funcList)(2)).toBe(644168);
  });
});

describe('#pipePromise', () => {
  it('should execute functions with pipe sequence', async () => {
    const funcList = [
      (v: any) => Promise.resolve(v + 5),
      (v: any) => Promise.resolve(v * 9),
      (v: any) => Promise.resolve(`$${v}`),
    ];

    const result = await pipePromise(...funcList)(2);
    expect(result).toBe('$63');
  });
});
