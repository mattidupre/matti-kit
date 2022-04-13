import { useMemo } from 'react';
import { useDraggingItemContext } from './components/DraggingItemProvider';

const useDraggingItem = () => {
  const { dragId, payload } = useDraggingItemContext();
  return useMemo(() => ({ dragId, payload }), [dragId, payload]);
};

export default useDraggingItem;
