import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from '../useCounter';

// https://react-hooks-testing-library.com/usage/basic-hooks
describe('useCounter', () => {
  test('should increment counter from custom initial value', () => {
    const { result } = renderHook(() => useCounter(9000));

    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(9001);
  });

  test('should reset counter to updated initial value', () => {
    const { result, rerender } = renderHook(({ initialValue }) => useCounter(initialValue), {
      initialProps: { initialValue: 0 },
    });

    rerender({ initialValue: 10 });
    act(() => {
      result.current.reset();
    });
    expect(result.current.count).toBe(10);
  });
});
