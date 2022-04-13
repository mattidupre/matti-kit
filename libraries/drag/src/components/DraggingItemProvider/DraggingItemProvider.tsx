import React, { useCallback, useMemo, useState } from 'react';
import DraggingItemContext from './lib/DraggingItemContext';

import type { DraggingItem, DraggingItemContextValue } from './types';

type Props = { children: React.ReactNode };

const DraggingItemProvider: React.FC<Props> = ({ children }) => {
  const [activeDragState, setActiveDragState] = useState<DraggingItem>({
    dragId: null,
    payload: null,
  });

  const updateDraggingItem = useCallback<
    DraggingItemContextValue['updateDraggingItem']
  >((draggingItem) => {
    setActiveDragState(draggingItem ?? { dragId: null, payload: null });
  }, []);

  const draggingItemContextValue = useMemo<DraggingItemContextValue>(
    () => ({
      ...activeDragState,
      updateDraggingItem,
    }),
    [activeDragState, updateDraggingItem],
  );

  return (
    <DraggingItemContext.Provider value={draggingItemContextValue}>
      {children}
    </DraggingItemContext.Provider>
  );
};

export default DraggingItemProvider;
