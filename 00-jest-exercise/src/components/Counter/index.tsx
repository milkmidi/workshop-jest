import { useState, useCallback, memo } from 'react';

type CounterProps = {
  defaultCount?: number;
};

const Counter: React.FC<CounterProps> = ({ defaultCount = 0 }) => {
  const [count, setCount] = useState(defaultCount);

  const atIncrease = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);
  const atDecrease = useCallback(() => {
    setCount((prev) => prev + -1);
  }, []);

  return (
    <section data-name="Counter">
      <div>
        <span data-testid="display_count">{count}</span>
      </div>
      <button className="add_button" type="button" onClick={atIncrease}>
        Increase
      </button>
      <button className="add_button" type="button" onClick={atDecrease}>
        Decrease
      </button>
    </section>
  );
};

export default memo(Counter);
