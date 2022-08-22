import { useEffect, useState } from 'react';

interface ElapsedTime {
  elapsedTime: number;
}

const useDataElapsed = (props: any): ElapsedTime => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  // Every second the data is the same => time++.
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((elapsed) => elapsed + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Once the data refreshes => set time to 0.
  useEffect(() => {
    setElapsedTime(0);
  }, [props]);

  return {
    elapsedTime,
  };
};

export default useDataElapsed;
