import React, { useMemo } from 'react';
import { useEventMap } from '@matti-kit/utils';
import TargetEventsContext from './lib/TargetEventsContext';

import type { TargetEventsContextValue } from './types';

type Props = {
  children: React.ReactNode;
};

const TargetEventsProvider: React.FC<Props> = ({ children }) => {
  const overEvents = useEventMap();
  const outEvents = useEventMap();
  const dropEvents = useEventMap();

  const dragEventsContextValue = useMemo<TargetEventsContextValue>(() => {
    return {
      over: overEvents,
      out: outEvents,
      drop: dropEvents,
    };
  }, [dropEvents, outEvents, overEvents]);

  return (
    <TargetEventsContext.Provider value={dragEventsContextValue}>
      {children}
    </TargetEventsContext.Provider>
  );
};

export default TargetEventsProvider;
