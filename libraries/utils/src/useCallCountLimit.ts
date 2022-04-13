import { useRef } from 'react';

const useCallCountLimit = (maxCount: number, onMax?: () => void) => {
  const countRef = useRef<number>(0);
  countRef.current += 1;
  if (countRef.current > maxCount) {
    // eslint-disable-next-line no-console
    console.error('MAXIMUM CALL COUNT EXCEEDED');
    onMax?.();
    // eslint-disable-next-line no-debugger
    debugger;
  }
};

export default useCallCountLimit;
