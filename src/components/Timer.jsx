// src/components/Timer.jsx
import { useEffect, useRef, useState } from 'react';

export default function Timer() {
  const [time, setTime] = useState(0);      // 경과 초
  const [running, setRunning] = useState(false);
  const idRef = useRef(null);               // setInterval ID

  const start = () => {
    if (running) return;
    setRunning(true);
    idRef.current = setInterval(() => setTime(t => t + 1), 1000);
  };

  const stop = () => {
    if (!running) return;
    clearInterval(idRef.current);
    idRef.current = null;
    setRunning(false);
  };

  const reset = () => {
    stop();
    setTime(0);
  };

  // 언마운트 시 인터벌 정리
  useEffect(() => () => idRef.current && clearInterval(idRef.current), []);

  return (
    <div>
      <h2>{time}s</h2>
      <button onClick={start}>시작</button>
      <button onClick={stop}>정지</button>
      <button onClick={reset}>리셋</button>
    </div>
  );
}
