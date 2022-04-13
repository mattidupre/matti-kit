import { useRef } from 'react';

const useIsInitial = () => {
  const isRendered = useRef<boolean>(false);
  if (isRendered.current === false) {
    isRendered.current = true;
    return true;
  }
  return false;
};

export default useIsInitial;
