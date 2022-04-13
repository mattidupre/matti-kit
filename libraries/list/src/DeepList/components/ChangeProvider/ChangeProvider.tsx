import React, { useMemo } from 'react';
import useGlobalContextValue from '../../lib/useGlobalContextValue';
import ChangeContext from './lib/ChangeContext';

type Props = {
  children: React.ReactNode;
};

const ChangeProvider: React.FC<Props> = ({ children }) => {
  const treesByDragId = useGlobalContextValue(
    ChangeContext,
    'treesByDragId',
    () => new Map(),
  );

  const changeQueue = useGlobalContextValue(
    ChangeContext,
    'changeQueue',
    () => [],
  );

  const pushToChangeQueue = useGlobalContextValue(
    ChangeContext,
    'pushToChangeQueue',
    () => (queueValues) => {
      changeQueue.push(queueValues);
    },
  );

  const flushChangeQueue = useGlobalContextValue(
    ChangeContext,
    'flushChangeQueue',
    () => () => {
      const currentChangeQueue = [...changeQueue];
      changeQueue.length = 0;
      return currentChangeQueue;
    },
  );

  const contextValue = useMemo(
    () => ({
      treesByDragId,
      changeQueue,
      pushToChangeQueue,
      flushChangeQueue,
    }),
    [treesByDragId, changeQueue, flushChangeQueue, pushToChangeQueue],
  );

  return (
    <ChangeContext.Provider value={contextValue}>
      {children}
    </ChangeContext.Provider>
  );
};

export default ChangeProvider;
