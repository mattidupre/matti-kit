import React, { useMemo } from 'react';
import { useEventMap } from '@matti-kit/utils';
import DragEventsContext from './lib/DragEventsContext';

import type { DragEventsContextValue } from './types';

type Props = { children: React.ReactNode };

const DragEventsProvider: React.FC<Props> = ({ children }) => {
  const startEvents = useEventMap();
  const moveEvents = useEventMap();
  const overEvents = useEventMap();
  const endEvents = useEventMap();
  const cancelEvents = useEventMap();

  const dragEventsContextValue = useMemo<DragEventsContextValue>(() => {
    return {
      start: startEvents,
      move: moveEvents,
      over: overEvents,
      end: endEvents,
      cancel: cancelEvents,
    };
  }, [cancelEvents, endEvents, moveEvents, overEvents, startEvents]);

  return (
    <DragEventsContext.Provider value={dragEventsContextValue}>
      {children}
    </DragEventsContext.Provider>
  );
};

export default DragEventsProvider;
