// hook for countdown timer

import { useCallback, useEffect, useRef, useState } from "react";

type useCountdownProps = {
  initial: number;
  onCompleted?(): void;
};

export default function useCountdown({ initial, onCompleted }: useCountdownProps) {
  const timerId = useRef<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(initial);
  const [isActive, setIsActive] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const start = () => {
    setIsActive(true);
    setIsRunning(true);
  };

  const stop = useCallback(() => {
    timerId.current && clearInterval(timerId.current);
    timerId.current = null;
    setIsActive(false);
    setIsRunning(false);
    setTimeLeft(initial);
  }, [initial]);

  const pause = () => {
    if (isRunning && isActive) {
      setIsRunning(false);
    }
  };

  const resume = () => {
    if (!isRunning && isActive) {
      setIsRunning(true);
    }
  };

  useEffect(() => {
    const tick = () => {
      if (timeLeft > 0) {
        setTimeLeft((timeLeft) => timeLeft - 1);
      } else {
        stop();
        onCompleted && onCompleted();
      }
    };
    if (isRunning && isActive) {
      timerId.current = window.setInterval(tick, 1000);
    }
    return () => {
      timerId.current && clearInterval(timerId.current);
    };
  }, [isActive, isRunning, onCompleted, stop, timeLeft]);

  useEffect(() => {
    setTimeLeft(initial);
  }, [initial]);

  return {
    timeLeft,
    isActive,
    isRunning,
    start,
    pause,
    stop,
    resume,
  };
}
