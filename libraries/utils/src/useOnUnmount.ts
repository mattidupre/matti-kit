import { useEffect, useRef } from 'react';

type Callback = () => void;

const useOnUnmount = (callback: Callback) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  useEffect(() => () => callbackRef.current(), []);
};

export default useOnUnmount;
