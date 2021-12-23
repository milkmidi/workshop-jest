import { renderHook, cleanup, act } from '@testing-library/react-hooks';
import useCountDown from '../useCountdown';
import type { UseCountDownOptions } from '../useCountdown';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
  jest.useRealTimers();
});

const DAY = 1000 * 60 * 60 * 24;
describe('useCountDown', () => {
  test('should be defined', () => {
    expect(useCountDown).toBeDefined();
  });
  it('should display correct value', async () => {
    jest.useFakeTimers();
    const options: UseCountDownOptions = {
      endTime: Date.now() + DAY,
    };
    const { result } = renderHook(() => useCountDown(options));
    expect(result.current.isActive).toBeTruthy();
    expect(result.current.value).toBe('01:00:00:00');
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.value).toBe('00:23:59:59');
  });

  it('should not active when immediate set false', async () => {
    jest.useFakeTimers();
    const options: UseCountDownOptions = {
      endTime: Date.now() + DAY,
      immediate: false,
    };
    const { result } = renderHook(() => useCountDown(options));

    expect(result.current.isActive).toBeFalsy();
    expect(result.current.value).toBe('');
  });

  it('should display correct timeup message and toggle onTimeup handler', async () => {
    jest.useFakeTimers();

    const onTimeup = jest.fn();
    const options: UseCountDownOptions = {
      endTime: 2 * 1000,
      timeupMessage: 'Happy New Year!',
      onTimeup,
    };
    const { result } = renderHook(() => useCountDown(options));

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(result.current.value).toBe('Happy New Year!');
    expect(onTimeup).toBeCalledTimes(1);
  });

  it('should stop countdown when call onStop ', async () => {
    jest.useFakeTimers();

    const options: UseCountDownOptions = {
      endTime: Date.now() + DAY,
    };
    const { result } = renderHook(() => useCountDown(options));
    expect(result.current.isActive).toBeTruthy();
    expect(result.current.value).toBe('01:00:00:00');
    act(() => {
      jest.advanceTimersByTime(2000);
      result.current.onStop();
    });
    expect(result.current.isActive).toBeFalsy();
    expect(result.current.value).toBe('00:23:59:58');
    act(() => {
      jest.advanceTimersByTime(2000);
      result.current.onStart();
    });
    expect(result.current.value).toBe('00:23:59:56');
  });
});
