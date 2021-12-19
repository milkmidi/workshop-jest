/* eslint-disable no-bitwise */
import { useState, useCallback, useRef, useEffect } from 'react';

const SECOND = 1;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const digi = (value: number): string => (value < 10 ? `0${value}` : `${value}`);

export type UseCountDownOptions = {
  endTime: number | string;
  timeupMessage?: string;
  onTimeup?: () => void;
  immediate?: boolean;
};
type UseCountDownType = {
  onStart: () => void;
  onStop: () => void;
  isActive: boolean;
  value: string;
};
export default function useCountDown(options: UseCountDownOptions): UseCountDownType {
  const { endTime, timeupMessage = '', onTimeup, immediate = true } = options;

  const [value, setValue] = useState('');
  const [isActive, setActive] = useState(immediate);
  const endTimeRef = useRef(+new Date(endTime));
  const onTimeupRef = useRef(onTimeup);
  onTimeupRef.current = onTimeup;

  useEffect(() => {
    let timeId: any;
    if (isActive) {
      const tick = () => {
        const diffSec = ~~((endTimeRef.current - Date.now()) / 1000);
        if (diffSec <= 0) {
          setActive(false);
          setValue(timeupMessage);
          onTimeupRef.current?.();
          return;
        }
        const sec = diffSec % 60;
        const min = ~~((diffSec / MINUTE) % 60);
        const hour = ~~((diffSec / HOUR) % 24);
        const day = ~~(diffSec / DAY);
        setValue(`${digi(day)}:${digi(hour)}:${digi(min)}:${digi(sec)}`);
      };
      timeId = setInterval(tick, 1000);
      tick();
    }
    return () => {
      clearInterval(timeId);
    };
  }, [isActive, timeupMessage]);

  const onStart = useCallback(() => setActive(true), []);
  const onStop = useCallback(() => setActive(false), []);

  return {
    value,
    isActive,
    onStart,
    onStop,
  };
}
