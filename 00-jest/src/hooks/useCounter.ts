import { useState, useCallback } from 'react';

type UseCounter = {
  count: number;
  increment: () => void;
  reset: () => void;
};

export default function useCounter(initialValue = 0): UseCounter {
  const [count, setCount] = useState(initialValue);
  const increment = useCallback(() => {
    setCount((x) => x + 1);
  }, []);
  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);
  return { count, increment, reset };
}
