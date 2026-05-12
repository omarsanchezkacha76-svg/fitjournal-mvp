import { useState, useEffect, useCallback, useRef } from 'react';

export function useWorkoutTimer() {
  const [elapsed, setElapsed] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const restIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setElapsed(e => e + 1);
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startRest = useCallback((seconds: number) => {
    setRestTime(seconds);
    setIsResting(true);
    if (restIntervalRef.current) clearInterval(restIntervalRef.current);
    restIntervalRef.current = setInterval(() => {
      setRestTime(t => {
        if (t <= 1) {
          setIsResting(false);
          if (restIntervalRef.current) clearInterval(restIntervalRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, []);

  const skipRest = useCallback(() => {
    setIsResting(false);
    setRestTime(0);
    if (restIntervalRef.current) clearInterval(restIntervalRef.current);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return { elapsed, restTime, isResting, startRest, skipRest, formatTime };
}
