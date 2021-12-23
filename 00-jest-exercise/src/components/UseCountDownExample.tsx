import React from 'react';
import useCountDown from '@/hooks/useCountdown';

const endTime = Date.now() + 1000 * 60 * 60;

const UseCountDownExample: React.FC = () => {
  const { value } = useCountDown({
    endTime,
  });
  return (
    <section data-name="useCountDown">
      <h1>{value}</h1>
    </section>
  );
};

export default UseCountDownExample;
