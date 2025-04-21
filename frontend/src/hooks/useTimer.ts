import { useEffect, useRef } from 'react';

type TimerType = 'timeout' | 'interval';

interface UseTimerOptions {
  delay: number; // milliseconds
  type?: TimerType;
  immediate?: boolean;
}

const useTimer = (
  callback: () => void,
  { delay, type = 'timeout', immediate = false }: UseTimerOptions
) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (immediate) savedCallback.current();

    let timerId: ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>;

    if (type === 'timeout') {
      timerId = setTimeout(() => savedCallback.current(), delay);
    } else {
      timerId = setInterval(() => savedCallback.current(), delay);
    }

    return () => {
      if (type === 'timeout') clearTimeout(timerId as ReturnType<typeof setTimeout>);
      else clearInterval(timerId as ReturnType<typeof setInterval>);
    };
  }, [delay, type, immediate]);
};

export default useTimer;
